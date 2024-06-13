<template>
  <div id="app">
    <h1>달력 및 가계부</h1>
    <div id="header">
      <div class="selection">
        <label for="year">연도:</label>
        <input v-model.number="year" type="number" id="year" />
      </div>
      <div class="selection">
        <label for="month">월:</label>
        <select v-model.number="month" id="month" @change="generateCalendar">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
        </select>
      </div>
      <button @click="generateCalendar">달력 생성</button>
    </div>

    <div class="top-bar">
      <button @click="goToInOut" class="plus-button">+</button>
    </div>

    <div v-if="days.length">
      <h2>{{ year }}년 {{ month }}월</h2>
      <div class="calendar">
        <div class="day-header" v-for="day in dayNames" :key="day">
          {{ day }}
        </div>
        <div
          class="day"
          v-for="(day, index) in days"
          :key="index"
          @click="selectDay(day.date)"
        >
          <div>{{ day.date }}</div>
          <div v-if="day.date">
            <div>수입: {{ day.incomeTotal }}</div>
            <div>지출: {{ day.expenseTotal }}</div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedDate">
      <h2>{{ selectedDate }}에 거래 추가하기</h2>
      <div>
        <label for="amount">금액:</label>
        <input v-model.number="amount" type="number" id="amount" />
        <label for="type">유형:</label>
        <select v-model="type" id="type">
          <option value="income">수입</option>
          <option value="expense">지출</option>
        </select>
      </div>
      <div v-if="type === 'income'">
        <label>수입 카테고리:</label>
        <button
          v-for="category in incomeCategories"
          :key="category"
          @click="addTransaction(category)"
        >
          {{ category }}
        </button>
      </div>
      <div v-if="type === 'expense'">
        <label>지출 카테고리:</label>
        <button
          v-for="category in expenseCategories"
          :key="category"
          @click="addTransaction(category)"
        >
          {{ category }}
        </button>
      </div>
    </div>

    <div class="total-wrapper">
      <div class="total-item">
        <h2>전체 총 수입: {{ monthlyTotalIncome }}</h2>
      </div>
      <div class="total-item">
        <h2>전체 총 지출: {{ monthlyTotalExpense }}</h2>
      </div>
      <div class="total-item">
        <h2>전체 잔액: {{ monthlyBalance }}</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    transactions: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      days: [],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      selectedDate: null,
      amount: 0,
      type: 'income',
      incomeCategories: ['용돈', '주식', '월급'],
      expenseCategories: ['미용', '병원', '교통'],
      localTransactions: {}, // transactions를 복사할 객체
    };
  },
  computed: {
    monthlyTransactions() {
      const monthlyDatePrefix = `${this.year}-${String(this.month).padStart(
        2,
        '0'
      )}-`;
      const transactions = [];

      for (const [date, trans] of Object.entries(this.localTransactions)) {
        if (date.startsWith(monthlyDatePrefix)) {
          transactions.push(...trans);
        }
      }

      return transactions;
    },
    monthlyTotalIncome() {
      return this.calculateTotal(this.monthlyTransactions, 'income');
    },
    monthlyTotalExpense() {
      return this.calculateTotal(this.monthlyTransactions, 'expense');
    },
    monthlyBalance() {
      return this.monthlyTotalIncome - this.monthlyTotalExpense;
    },
    allTransactions() {
      return Object.values(this.localTransactions).reduce(
        (acc, transactions) => acc.concat(transactions),
        []
      );
    },
  },
  methods: {
    async fetchTransactions() {
      try {
        const incomeResponse = await axios.get('http://localhost:3000/users');
        const expenseResponse = await axios.get(
          'http://localhost:3000/expenditures'
        );

        const transactions = {};

        incomeResponse.data.forEach((transaction) => {
          const date = transaction.date;
          if (!transactions[date]) {
            transactions[date] = [];
          }
          transactions[date].push(transaction);
        });

        expenseResponse.data.forEach((transaction) => {
          const date = transaction.date;
          if (!transactions[date]) {
            transactions[date] = [];
          }
          transactions[date].push(transaction);
        });

        this.localTransactions = transactions;
        this.generateCalendar();
      } catch (error) {
        console.error('거래 불러오기 오류:', error);
      }
    },
    generateCalendar() {
      const date = new Date(this.year, this.month - 1, 1);
      const days = [];
      const firstDayIndex = date.getDay();
      const lastDay = new Date(this.year, this.month, 0).getDate();
      for (let i = 0; i < firstDayIndex; i++) {
        days.push({
          date: '',
          incomeTotal: 0,
          expenseTotal: 0,
          transactions: [],
        });
      }
      for (let i = 1; i <= lastDay; i++) {
        const dateStr = `${this.year}-${String(this.month).padStart(
          2,
          '0'
        )}-${String(i).padStart(2, '0')}`;
        const transactions = this.localTransactions[dateStr] || [];
        const incomeTotal = this.calculateTotal(transactions, 'income');
        const expenseTotal = this.calculateTotal(transactions, 'expense');
        days.push({
          date: i,
          incomeTotal,
          expenseTotal,
          transactions,
        });
      }
      this.days = days;
    },
    selectDay(day) {
      if (day) {
        this.selectedDate = `${this.year}-${String(this.month).padStart(
          2,
          '0'
        )}-${String(day).padStart(2, '0')}`;
      }
    },
    async addTransaction(category) {
      if (this.selectedDate && this.amount > 0) {
        const newTransaction = {
          date: this.selectedDate,
          amount: this.amount,
          type: this.type,
          category: category,
        };

        try {
          const response = await axios.post(
            `http://localhost:3000/${
              this.type === 'income' ? 'users' : 'expenditures'
            }`,
            newTransaction
          );
          console.log('새로운 거래:', response.data); // 추가된 데이터를 확인하기 위한 로그
          if (!this.localTransactions[this.selectedDate]) {
            this.localTransactions[this.selectedDate] = [];
          }
          this.localTransactions[this.selectedDate].push(response.data);
          this.amount = 0;
          this.generateCalendar(); // 달력을 다시 생성하여 거래 내역 업데이트
        } catch (error) {
          console.error('거래 추가 오류:', error);
        }
      }
    },
    calculateTotal(transactions, type) {
      return transactions
        .filter((transaction) => transaction.type === type)
        .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
    },
    goToInOut() {
      this.$router.push({ path: '/inout' }); // Ensure the path matches the router setup
    },
  },
  async mounted() {
    await this.fetchTransactions();
  },
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: auto;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  width: 100%;
  max-width: 1200px; /* 최대 너비 설정 */
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
}

input,
select {
  margin: 5px;
}

button {
  margin: 10px;
  color: rgb(224, 255, 220);
  background-color: rgb(9, 5, 54);
  border-radius: 10px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 14px; /* 버튼 폰트 크기 조정 */
}

button:hover {
  background-color: #16c5ff;
  color: #000001;
}

/* 전체 달력 컨테이너 */
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 20px;
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
}

/* 날짜 헤더 */
.day-header {
  font-weight: bold;
  padding: 10px;
  border: 1px solid #dcdcdc;
  text-align: center;
  background-color: #f8fafc;
}

/* 각 날짜 */
.day {
  padding: 10px;
  border: 1px solid #dcdcdc;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* 날짜 호버 시 배경색 변경 */
.day:hover {
  background-color: #70c6ff;
}

/* 선택된 날짜 */
.selected-day {
  background-color: rgb(176, 244, 255);
  color: #ffffff;
  border-radius: 50%;
}

/* 날짜가 비어있는 경우 */
.empty-day {
  visibility: hidden;
}

#header {
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  margin-bottom: 20px;
}

#header .left {
  display: flex;
  align-items: center;
  margin-right: 20px; /* 왼쪽에 여백 추가 */
}

#header .left label {
  margin-right: 10px;
}

#header .right select {
  margin-left: 10px;
}

.total-wrapper {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.total-item {
  width: 30%;
  background-color: #f0f4f8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0px 3px 15px rgba(0, 0, 0, 0.1);
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}

.plus-button {
  background-color: #f5f5f5;
  border: none;
  padding: 10px;
  font-size: 20px;
  cursor: pointer;
}

.plus-button:hover {
  background-color: #e0e0e0;
}
</style>
