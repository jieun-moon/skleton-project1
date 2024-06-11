<template>
  <div id="app" class="container">
    <h1 class="my-4">달력 및 가계부</h1>
    <div class="mb-3">
      <label for="year" class="form-label">연도:</label>
      <input
        v-model.number="year"
        type="number"
        id="year"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="month" class="form-label">월:</label>
      <select v-model.number="month" id="month" class="form-select">
        <option v-for="m in 12" :key="m" :value="m">{{ m }}월</option>
      </select>
    </div>
    <button @click="generateCalendar" class="btn btn-primary mb-3">
      달력 생성
    </button>
    <div v-if="days.length">
      <h2>{{ year }}년 {{ month }}월</h2>
      <div class="calendar mb-4">
        <div class="day-header" v-for="day in dayNames" :key="day">
          {{ day }}
        </div>
        <div
          class="day"
          v-for="(day, index) in days"
          :key="index"
          :class="{ 'bg-light': !day, 'bg-white': day }"
          @click="selectDay(day)"
        >
          {{ day }}
          <div v-if="day" class="transactions">
            <div
              v-for="transaction in transactionsByDate[
                formatDate(year, month, day)
              ]"
              :key="transaction.id"
              class="transaction"
            >
              {{ transaction.type === 'income' ? '수입' : '지출' }}:
              {{ transaction.amount }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="selectedDate">
      <h2>{{ selectedDate }}의 수입 및 지출 내역</h2>
      <ul class="list-group mb-3">
        <li
          v-for="(transaction, index) in transactionsByDate[selectedDate]"
          :key="index"
          class="list-group-item"
        >
          {{ transaction.type === 'income' ? '수입' : '지출' }}:
          {{ transaction.amount }}
          <button
            @click="editTransaction(index)"
            class="btn btn-sm btn-secondary float-end ms-2"
          >
            편집
          </button>
          <button
            @click="deleteTransaction(index)"
            class="btn btn-sm btn-danger float-end"
          >
            삭제
          </button>
        </li>
      </ul>
      <div v-if="isEditing">
        <h3>편집</h3>
        <div class="mb-3">
          <label for="edit-amount" class="form-label">금액:</label>
          <input
            v-model.number="editTransactionData.amount"
            type="number"
            id="edit-amount"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="edit-source" class="form-label">사용처:</label>
          <input
            v-model="editTransactionData.source"
            type="text"
            id="edit-source"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <label for="edit-memo" class="form-label">메모:</label>
          <textarea
            v-model="editTransactionData.memo"
            id="edit-memo"
            class="form-control"
          ></textarea>
        </div>
        <button @click="saveTransaction" class="btn btn-success">저장</button>
        <button @click="cancelEdit" class="btn btn-secondary">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      days: [],
      dayNames: ['일', '월', '화', '수', '목', '금', '토'],
      selectedDate: null,
      isEditing: false,
      editTransactionData: {
        amount: 0,
        source: '',
        memo: '',
        type: '',
      },
      editIndex: null,
    };
  },
  computed: {
    ...mapState(['transactions']),
    ...mapGetters(['transactionsByDate']),
  },
  methods: {
    ...mapActions([
      'addTransaction',
      'updateTransactions',
      'fetchTransactions',
    ]),
    generateCalendar() {
      const date = new Date(this.year, this.month - 1, 1);
      const days = [];
      const firstDayIndex = date.getDay();
      const lastDay = new Date(this.year, this.month, 0).getDate();
      for (let i = 0; i < firstDayIndex; i++) {
        days.push('');
      }
      for (let i = 1; i <= lastDay; i++) {
        days.push(i);
      }
      this.days = days;
    },
    selectDay(day) {
      if (day) {
        this.selectedDate = this.formatDate(this.year, this.month, day);
        this.isEditing = false;
      }
    },
    formatDate(year, month, day) {
      return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(
        2,
        '0'
      )}`;
    },
    editTransaction(index) {
      this.isEditing = true;
      this.editIndex = index;
      const transaction = this.transactionsByDate[this.selectedDate][index];
      this.editTransactionData = { ...transaction };
    },
    saveTransaction() {
      const transactions = [...this.transactionsByDate[this.selectedDate]];
      transactions[this.editIndex] = this.editTransactionData;
      this.updateTransactions({ date: this.selectedDate, transactions });
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
    deleteTransaction(index) {
      const transactions = [...this.transactionsByDate[this.selectedDate]];
      transactions.splice(index, 1);
      this.updateTransactions({ date: this.selectedDate, transactions });
    },
  },
  mounted() {
    this.fetchTransactions();
    this.generateCalendar();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input,
select {
  margin: 5px;
}
button {
  margin: 10px;
}
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  margin-top: 20px;
}
.day-header {
  font-weight: bold;
  background-color: #f8f9fa;
}
.day {
  padding: 10px;
  border: 1px solid #dee2e6;
  text-align: center;
  cursor: pointer;
  background-color: #fff;
}
.day:hover {
  background-color: #e9ecef;
}
.bg-light {
  background-color: #f8f9fa !important;
}
.transaction {
  font-size: 0.8rem;
}
</style>
