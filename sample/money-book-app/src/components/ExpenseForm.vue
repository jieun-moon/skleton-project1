<template>
  <div class="form-container">
    <div class="buttons">
      <button :class="{ active: mode === 'income' }" @click="mode = 'income'">
        수입
      </button>
      <button :class="{ active: mode === 'expense' }" @click="mode = 'expense'">
        지출
      </button>
    </div>
    <div class="categories">
      <button
        :class="{ active: category === 'salary' }"
        @click="category = 'salary'"
      >
        월급
      </button>
      <button
        :class="{ active: category === 'allowance' }"
        @click="category = 'allowance'"
      >
        용돈
      </button>
      <!-- Add more category buttons as needed -->
    </div>
    <div>
      <label for="date">날짜:</label>
      <input type="date" id="date" v-model="date" />
    </div>
    <div>
      <label for="amount">금액:</label>
      <input
        type="text"
        id="amount"
        v-model="formattedAmount"
        @input="formatAmount"
      />
    </div>
    <div>
      <label for="expense-category">카테고리:</label>
      <select id="expense-category" v-model="expenseCategory">
        <option value="" disabled>=====선택=====</option>
        <option value="food">음식</option>
        <option value="transport">교통</option>
        <option value="communication">통신</option>
        <option value="utilities">공과금</option>
        <option value="beauty">미용</option>
        <option value="culture">문화생활</option>
        <option value="education">교육</option>
        <option value="hospital">병원</option>
      </select>
    </div>
    <div>
      <label for="description">메모:</label>
      <textarea id="description" v-model="description"></textarea>
    </div>
    <div>
      <label for="file">이미지 첨부파일:</label>
      <input
        type="file"
        id="file"
        @change="handleFileUpload"
        accept="image/*"
      />
    </div>
    <div v-if="imageUrl">
      <img
        :src="imageUrl"
        alt="첨부 이미지"
        style="max-width: 100%; margin-top: 10px"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'income',
      category: 'salary',
      date: '',
      amount: '',
      formattedAmount: '',
      expenseCategory: '',
      description: '',
      file: null,
      imageUrl: null,
    };
  },
  methods: {
    formatAmount() {
      // Remove any non-digit characters
      const numericValue = this.formattedAmount.replace(/\D/g, '');
      // Format the number with commas
      this.formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      // Update the amount with the raw numeric value
      this.amount = numericValue;
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.file = file;

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imageUrl = null;
      }
    },
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
}

.form-container .buttons,
.form-container .categories {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.form-container .buttons button,
.form-container .categories button {
  flex: 1;
  margin: 0 5px;
}

.form-container .buttons .active,
.form-container .categories .active {
  background-color: #ffcccc;
}

input,
textarea,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
