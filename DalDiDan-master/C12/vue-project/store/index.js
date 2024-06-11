import { createStore } from 'vuex';

export default createStore({
  state: {
    transactions: {}, // 날짜별 수입/지출 내역
  },
  mutations: {
    addTransaction(state, transaction) {
      const date = transaction.date;
      if (!state.transactions[date]) {
        state.transactions[date] = [];
      }
      state.transactions[date].push(transaction);
    },
    updateTransactions(state, { date, transactions }) {
      state.transactions[date] = transactions;
    },
  },
  actions: {
    addTransaction({ commit }, transaction) {
      commit('addTransaction', transaction);
    },
    updateTransactions({ commit }, payload) {
      commit('updateTransactions', payload);
    },
  },
  getters: {
    transactionsByDate: (state) => (date) => {
      return state.transactions[date] || [];
    },
    totalIncome: (state) => {
      let total = 0;
      for (const date in state.transactions) {
        total += state.transactions[date]
          .filter((t) => t.type === 'income')
          .reduce((sum, t) => sum + t.amount, 0);
      }
      return total;
    },
    totalExpense: (state) => {
      let total = 0;
      for (const date in state.transactions) {
        total += state.transactions[date]
          .filter((t) => t.type === 'expense')
          .reduce((sum, t) => sum + t.amount, 0);
      }
      return total;
    },
    balance: (state, getters) => {
      return getters.totalIncome - getters.totalExpense;
    },
  },
});
