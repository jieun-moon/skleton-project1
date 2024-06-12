<template>
  <div class="container">
    <Header />
    <router-view />
    <Loading v-if="states.isLoading" />
  </div>
</template>

<script setup>
import { reactive, provide, ref, computed } from 'vue';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';

const BASEURI = 'http://localhost:3001'; // JSON Server URL

const states = reactive({ isLoading: false });

// 상태 관리와 관련된 코드
// 수입 목록 상태 관리
const incomeList = ref([]);

// 지출 목록 상태 관리
const expenditureList = ref([]);

// 수입 목록을 조회합니다.
const fetchIncomeList = async () => {
  states.isLoading = true;
  try {
    const response = await axios.get(`${BASEURI}/incomes`);
    if (response.status === 200) {
      incomeList.value = response.data;
    } else {
      alert('수입 데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 지출 목록을 조회합니다.
const fetchExpenditureList = async () => {
  states.isLoading = true;
  try {
    const response = await axios.get(`${BASEURI}/expenditures`);
    if (response.status === 200) {
      expenditureList.value = response.data;
    } else {
      alert('지출 데이터 조회 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 새로운 수입 항목을 추가합니다.
const addIncome = async (income, successCallback) => {
  states.isLoading = true;
  try {
    const response = await axios.post(`${BASEURI}/incomes`, income);
    if (response.status === 201) {
      incomeList.value.push(response.data);
      successCallback();
    } else {
      alert('수입 추가 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 새로운 지출 항목을 추가합니다.
const addExpenditure = async (expenditure, successCallback) => {
  states.isLoading = true;
  try {
    const response = await axios.post(`${BASEURI}/expenditures`, expenditure);
    if (response.status === 201) {
      expenditureList.value.push(response.data);
      successCallback();
    } else {
      alert('지출 추가 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 수입 항목을 삭제합니다.
const deleteIncome = async (id) => {
  states.isLoading = true;
  try {
    const response = await axios.delete(`${BASEURI}/incomes/${id}`);
    if (response.status === 200) {
      const index = incomeList.value.findIndex((income) => income.id === id);
      incomeList.value.splice(index, 1);
    } else {
      alert('수입 삭제 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 지출 항목을 삭제합니다.
const deleteExpenditure = async (id) => {
  states.isLoading = true;
  try {
    const response = await axios.delete(`${BASEURI}/expenditures/${id}`);
    if (response.status === 200) {
      const index = expenditureList.value.findIndex(
        (expenditure) => expenditure.id === id
      );
      expenditureList.value.splice(index, 1);
    } else {
      alert('지출 삭제 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 수입 항목을 업데이트합니다.
const updateIncome = async (income, successCallback) => {
  states.isLoading = true;
  try {
    const response = await axios.put(`${BASEURI}/incomes/${income.id}`, income);
    if (response.status === 200) {
      const index = incomeList.value.findIndex((i) => i.id === income.id);
      incomeList.value[index] = income;
      successCallback();
    } else {
      alert('수입 변경 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

// 지출 항목을 업데이트합니다.
const updateExpenditure = async (expenditure, successCallback) => {
  states.isLoading = true;
  try {
    const response = await axios.put(
      `${BASEURI}/expenditures/${expenditure.id}`,
      expenditure
    );
    if (response.status === 200) {
      const index = expenditureList.value.findIndex(
        (e) => e.id === expenditure.id
      );
      expenditureList.value[index] = expenditure;
      successCallback();
    } else {
      alert('지출 변경 실패');
    }
  } catch (error) {
    alert('에러발생 :' + error);
  }
  states.isLoading = false;
};

provide(
  'incomeList',
  computed(() => incomeList.value)
);
provide(
  'expenditureList',
  computed(() => expenditureList.value)
);
provide('actions', {
  fetchIncomeList,
  fetchExpenditureList,
  addIncome,
  addExpenditure,
  deleteIncome,
  deleteExpenditure,
  updateIncome,
  updateExpenditure,
});

// 데이터 초기화
fetchIncomeList();
fetchExpenditureList();
</script>

<style>
.container {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
