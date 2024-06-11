<template>
    <div>
        <select v-model="selectedMonth">
            <option v-for="month in months" :key="month" :value="month">{{ month }}월</option>
        </select>

        <div v-if="showIncomeForm">
            <h2>수입 입력</h2>
            <!-- 수입 입력 폼 -->
        </div>

        <div v-if="showExpenseForm">
            <h2>지출 입력</h2>
            <!-- 지출 입력 폼 -->
        </div>

        <h2>수입 내역</h2>
        <ul>
            <li v-for="(income, index) in incomes[selectedMonth - 1]" :key="index">{{ income }}</li>
        </ul>

        <h2>지출 내역</h2>
        <ul>
            <li v-for="(expense, index) in expenses[selectedMonth - 1]" :key="index">{{ expense }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showIncomeForm: false,
            showExpenseForm: false,
            selectedMonth: 1, // 선택한 월을 기본적으로 1월로 설정합니다.
            incomeAmount: '',
            expenseAmount: '',
            incomes: Array.from({ length: 12 }, () => []),
            expenses: Array.from({ length: 12 }, () => []),
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        };
    },
    methods: {
        toggleForm(type) {
            // 폼을 토글하는 메서드
        },
        addIncome() {
            // 수입을 추가하는 메서드
        },
        addExpense() {
            // 지출을 추가하는 메서드
        },
    },
};
</script>
