<template>
  <div>
    <div class="select">
      <select v-model="selectedYear" @change="updateCalendar">
        <option v-for="year in years" :key="year" :value="year">
          {{ year }}
        </option>
      </select>
      <select v-model="selectedMonth" @change="updateCalendar">
        <option
          v-for="(month, index) in months"
          :key="index"
          :value="index + 1"
        >
          {{ month }}
        </option>
      </select>
    </div>
    <div class="calendar">
      <table>
        <thead>
          <tr>
            <th v-for="day in days" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr class="day" v-for="(week, index) in calendar" :key="index">
            <td v-for="date in week" :key="date" :class="{ disabled: !date }">
              <div class="date-container">
                <span>{{ date || '' }}</span>
                <img
                  v-if="date && hasExpense(date)"
                  src="./sticker.png"
                  alt="달성"
                  class="sticker"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { reactive } from 'vue';

export default {
  data() {
    return {
      selectedYear: new Date().getFullYear(),
      selectedMonth: new Date().getMonth() + 1,
      days: ['일', '월', '화', '수', '목', '금', '토'],
      months: [
        '1월',
        '2월',
        '3월',
        '4월',
        '5월',
        '6월',
        '7월',
        '8월',
        '9월',
        '10월',
        '11월',
        '12월',
      ],
      calendar: [],
      expenditureData: reactive({ todoList: [] }), // 지출 데이터를 저장할 배열
    };
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
      return Array.from({ length: 10 }, (_, i) => currentYear - 5 + i);
    },
  },
  methods: {
    async fetchExpenditureData() {
      // 지출 데이터를 받아오는 API 호출
      try {
        const response = await axios.get('http://localhost:3000/expenditures');
        if (response.status === 200) {
          this.expenditureData.todoList = Array.isArray(response.data)
            ? response.data
            : [];
        } else {
          alert('데이터 조회 실패');
        }
      } catch (error) {
        alert('에러발생 : ' + error);
      }
    },
    hasExpense(date) {
      const formattedDate = `${this.selectedYear}-${String(
        this.selectedMonth
      ).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
      const expenseOnDate = this.expenditureData.todoList.find(
        (item) => item.date === formattedDate && item.type === 'expense'
      );
      const incomeOnDate = this.expenditureData.todoList.find(
        (item) => item.date === formattedDate && item.type === 'income'
      );

      return !expenseOnDate && !incomeOnDate;
    },

    updateCalendar() {
      const daysInMonth = new Date(
        this.selectedYear,
        this.selectedMonth,
        0
      ).getDate();
      const firstDayOfMonth = new Date(
        this.selectedYear,
        this.selectedMonth - 1,
        1
      ).getDay();
      const calendar = [];
      let date = 1;

      for (let i = 0; i < 6; i++) {
        const week = [];
        for (let j = 0; j < 7; j++) {
          if (i === 0 && j < firstDayOfMonth) {
            week.push(null);
          } else if (date > daysInMonth) {
            week.push(null);
          } else {
            week.push(date++);
          }
        }
        calendar.push(week);
        if (date > daysInMonth) break;
      }

      this.calendar = calendar;
    },
  },
  async mounted() {
    this.updateCalendar();
    await this.fetchExpenditureData(); // 지출 데이터를 받아옴
  },
};
</script>

<style scoped>
.select {
  display: flex;
  justify-content: end;
  align-items: end;
}
.calendar {
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
}

table {
  border-collapse: collapse;
  width: 100%;
  max-width: 600px;
}

th,
td {
  border: 1px solid #ddd;
  padding: 1rem;
  text-align: center;
}

th {
  background-color: #f4f4f4;
}

td {
  height: 100px;
  vertical-align: top;
}

.disabled {
  color: #ccc;
}

.date-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.sticker {
  width: 70px;
  height: 70px;
  position: absolute;
  top: -50;
  left: 50%;
  transform: translate(-50%, 5%);
  /* opacity: 50%; */
}
</style>
