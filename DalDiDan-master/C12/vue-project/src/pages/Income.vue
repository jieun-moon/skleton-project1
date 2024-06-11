<template>
  <div class="container">
    <div class="row">
      <div class="col p-3">
        <h2>수입 입력</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label for="date">날짜:</label>
          <input
            type="date"
            class="form-control"
            id="date"
            v-model="income.date"
          />
        </div>
        <div class="form-group">
          <label for="amount">금액:</label>
          <input
            type="number"
            class="form-control"
            id="amount"
            v-model="income.amount"
          />
        </div>
        <div class="form-group">
          <label for="source">사용처:</label>
          <input
            type="text"
            class="form-control"
            id="source"
            v-model="income.source"
          />
        </div>
        <div class="form-group">
          <label for="memo">메모:</label>
          <textarea
            class="form-control"
            rows="3"
            id="memo"
            v-model="income.memo"
          ></textarea>
        </div>
        <div class="form-group">
          <button type="button" class="btn btn-primary m-1" @click="saveIncome">
            저장
          </button>
          <button
            type="button"
            class="btn btn-secondary m-1"
            @click="clearForm"
          >
            취소
          </button>
        </div>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <h2>수입 리스트</h2>
        <ul>
          <TodoItem
            v-for="incomeItem in incomeList"
            :key="incomeItem.id"
            :item="incomeItem"
            type="income"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, inject } from 'vue';
import TodoItem from '@/components/TodoItem.vue';

const incomeList = inject('incomeList'); // 상태 주입
const { addIncome, deleteIncome, updateIncome, fetchIncomeList } =
  inject('actions');

const income = reactive({
  date: '',
  amount: 0,
  source: '',
  memo: '',
  id: null,
});

// 수입 항목 저장
const saveIncome = async () => {
  if (!income.date || !income.amount || !income.source) {
    alert('모든 필드를 채워주세요');
    return;
  }
  try {
    if (income.id === null) {
      await addIncome(income, clearForm);
    } else {
      await updateIncome(income, clearForm);
    }
    await fetchIncomeList();
  } catch (error) {
    alert('오류가 발생했습니다. 다시 시도해주세요.');
    console.error(error);
  }
};

// 폼 초기화
const clearForm = () => {
  income.date = '';
  income.amount = 0;
  income.source = '';
  income.memo = '';
  income.id = null;
};

// 컴포넌트가 마운트될 때 데이터를 가져옵니다.
fetchIncomeList();
</script>

<style scoped>
.form-group {
  margin-bottom: 1rem;
}
</style>
