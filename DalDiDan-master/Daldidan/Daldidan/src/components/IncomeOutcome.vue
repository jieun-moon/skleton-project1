<template>
    <div>
        <button @click="toggleForm('income')">수입</button>
        <button @click="toggleForm('expense')">지출</button>

        <div v-if="showIncomeForm">
            <h2>수입 입력</h2>
            <form @submit.prevent="addIncome">
                <label for="incomeAmount">금액:</label>
                <input type="number" id="incomeAmount" v-model="incomeAmount" required />
                <button type="submit">저장</button>
            </form>
        </div>

        <div v-if="showExpenseForm">
            <h2>지출 입력</h2>
            <form @submit.prevent="addExpense">
                <label for="expenseAmount">금액:</label>
                <input type="number" id="expenseAmount" v-model="expenseAmount" required />
                <button type="submit">저장</button>
            </form>
        </div>

        <h2>수입 내역</h2>
        <ul>
            <li v-for="(income, index) in incomes" :key="index">{{ income }}</li>
        </ul>

        <h2>지출 내역</h2>
        <ul>
            <li v-for="(expense, index) in expenses" :key="index">{{ expense }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // data 내용은 이전 코드와 동일합니다.
        };
    },
    methods: {
        toggleForm(type) {
            // 폼을 토글하는 메서드
        },
        addIncome() {
            this.incomes[this.selectedMonth - 1].push(this.incomeAmount); // 선택한 월에 대한 수입 추가
            this.incomeAmount = ''; // 입력 필드 초기화
        },
        addExpense() {
            this.expenses[this.selectedMonth - 1].push(this.expenseAmount); // 선택한 월에 대한 지출 추가
            this.expenseAmount = ''; // 입력 필드 초기화
        },
    },
    watch: {
        selectedMonth(newValue, oldValue) {
            // 월이 변경될 때마다 해당 월의 수입과 지출 내역을 다시 불러옵니다.
            // 예를 들어 API 호출이 필요하면 이곳에서 호출합니다.
        },
    },
};
</script>
