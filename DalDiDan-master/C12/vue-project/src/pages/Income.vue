<template>
  <div>
    <h2>수입 입력</h2>
    <div class="mb-3">
      <label for="date" class="form-label">날짜:</label>
      <input
        v-model="transaction.date"
        type="date"
        id="date"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="amount" class="form-label">금액:</label>
      <input
        v-model.number="transaction.amount"
        type="number"
        id="amount"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="source" class="form-label">사용처:</label>
      <input
        v-model="transaction.source"
        type="text"
        id="source"
        class="form-control"
      />
    </div>
    <div class="mb-3">
      <label for="memo" class="form-label">메모:</label>
      <textarea
        v-model="transaction.memo"
        id="memo"
        class="form-control"
      ></textarea>
    </div>
    <button @click="handleAddTransaction" class="btn btn-success">저장</button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      transaction: {
        date: '',
        amount: 0,
        source: '',
        memo: '',
        type: 'income',
      },
    };
  },
  methods: {
    ...mapActions(['addTransaction']),
    handleAddTransaction() {
      if (this.transaction.date && this.transaction.amount) {
        this.addTransaction(this.transaction);
        this.clearForm();
      } else {
        alert('날짜와 금액을 입력해주세요.');
      }
    },
    clearForm() {
      this.transaction.date = '';
      this.transaction.amount = 0;
      this.transaction.source = '';
      this.transaction.memo = '';
    },
  },
};
</script>
