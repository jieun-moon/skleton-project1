<template>
  <div class="container mt-5 custom-container">
    <div class="row">
      <div class="col-md-4">
        <div class="form-container">
          <div class="buttons mb-3">
            <button
              :class="{ active: mode === 'income' }"
              @click="mode = 'income'"
            >
              수입
            </button>
            <button
              :class="{ active: mode === 'expense' }"
              @click="mode = 'expense'"
            >
              지출
            </button>
          </div>
          <div class="categories mb-3">
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
          <div class="mb-3">
            <label for="date">날짜:</label>
            <input type="date" id="date" v-model="date" class="form-control" />
          </div>
          <div class="mb-3">
            <label for="amount">금액:</label>
            <input
              type="text"
              id="amount"
              v-model="formattedAmount"
              @input="formatAmount"
              class="form-control"
            />
          </div>
          <div class="mb-3">
            <label for="expense-category">카테고리:</label>
            <select
              id="expense-category"
              v-model="expenseCategory"
              class="form-control"
            >
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
          <div class="mb-3">
            <label for="description">메모:</label>
            <textarea
              id="description"
              v-model="description"
              class="form-control"
            ></textarea>
          </div>
          <div class="mb-3">
            <label for="file">이미지 첨부파일:</label>
            <input
              type="file"
              id="file"
              @change="handleFileUpload"
              accept="image/*"
              class="form-control"
            />
          </div>
          <div v-if="imageUrl" class="mb-3">
            <img
              :src="imageUrl"
              alt="첨부 이미지"
              style="max-width: 100%; margin-top: 10px"
            />
          </div>
          <div class="action-buttons">
            <button @click="handleSubmit" class="btn btn-primary me-2">
              추가
            </button>
            <button @click="handleCancel" class="btn btn-secondary">
              취소
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">날짜</th>
              <th scope="col">유형</th>
              <th scope="col">카테고리</th>
              <th scope="col">금액</th>
              <th scope="col">메모</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in expenses" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.date }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.amount.toLocaleString() }}원</td>
              <td>{{ item.memo }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

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
      expenses: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/users');
      this.expenses = response.data;
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  },
  methods: {
    formatAmount() {
      const numericValue = this.formattedAmount.replace(/\D/g, '');
      this.formattedAmount = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
    async handleSubmit() {
      const formData = {
        date: this.date,
        type: this.mode,
        category: this.expenseCategory,
        amount: parseInt(this.amount, 10),
        memo: this.description,
      };

      try {
        const response = await axios.post(
          'http://localhost:3000/users',
          formData
        );
        alert('데이터가 성공적으로 추가되었습니다.');
        this.expenses.push(response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('데이터 추가 중 오류가 발생했습니다.');
      }
    },
    handleCancel() {
      this.resetForm();
    },
    resetForm() {
      this.mode = 'income';
      this.category = 'salary';
      this.date = '';
      this.amount = '';
      this.formattedAmount = '';
      this.expenseCategory = '';
      this.description = '';
      this.file = null;
      this.imageUrl = null;
    },
  },
};
</script>

<style scoped>
.container.custom-container {
  max-width: 1200px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
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

.action-buttons {
  display: flex;
  justify-content: space-between;
}
</style>
