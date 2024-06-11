import { createStore } from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    transactions: {}, // 날짜별 수입/지출 내역
  },
  mutations: {
    setTransactions(state, transactions) {
      state.transactions = transactions;
    },
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
    async fetchTransactions({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/transactions');
        commit('setTransactions', response.data);
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      }
    },
    async addTransaction({ commit }, transaction) {
      try {
        const response = await axios.post(
          'http://localhost:3000/transactions',
          transaction
        );
        commit('addTransaction', response.data);
      } catch (error) {
        console.error('Failed to add transaction:', error);
      }
    },
    async updateTransactions({ commit }, payload) {
      try {
        await axios.put(
          `http://localhost:3000/transactions/${payload.date}`,
          payload.transactions
        );
        commit('updateTransactions', payload);
      } catch (error) {
        console.error('Failed to update transactions:', error);
      }
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
