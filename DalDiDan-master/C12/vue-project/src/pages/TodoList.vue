<template>
  <div class="todo-list">
    <h2>수입 리스트</h2>
    <button @click="router.push('/income')">할일 추가</button>
    <button @click="router.push('/expenditure')">새로 고침</button>
    <ul>
      <li v-for="income in incomeList" :key="income.id">
        {{ income.date }} - {{ income.amount }} - {{ income.source }} -
        {{ income.memo }}
        <button @click="deleteIncome(income.id)">삭제</button>
        <button @click="editIncome(income.id)">편집</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const router = useRouter();
const incomeList = inject('incomeList'); // 상태 주입

const fetchIncomes = async () => {
  try {
    const response = await axios.get('http://localhost:3000/incomes');
    incomeList.value = response.data;
  } catch (error) {
    console.error('Error fetching incomes:', error);
  }
};

const deleteIncome = async (id) => {
  try {
    await axios.delete(`http://localhost:3000/incomes/${id}`);
    incomeList.value = incomeList.value.filter((income) => income.id !== id);
  } catch (error) {
    console.error('Error deleting income:', error);
  }
};

const editIncome = (id) => {
  router.push(`/income/${id}`);
};

// 컴포넌트가 마운트될 때 데이터를 가져옵니다.
fetchIncomes();
</script>

<style scoped>
.todo-list {
  padding: 20px;
}
</style>
