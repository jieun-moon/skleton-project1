<template>
  <div class="container mt-5 custom-container">
    <div class="row">
      <div class="col-md-4">
        <div class="form-container">
          <div class="buttons mb-3 text-center">
            <button
              :class="{ active: mode === 'income' }"
              @click="setMode('income')"
            >
              수입
            </button>
            <button
              :class="{ active: mode === 'expense' }"
              @click="setMode('expense')"
            >
              지출
            </button>
          </div>
          <div class="categories mb-3 text-center">
            <button
              v-for="category in currentCategories"
              :key="category"
              :class="{ active: selectedCategory === category }"
              @click="selectedCategory = category"
            >
              {{ category }}
            </button>
            <button
              @click="showAddCategoryModal"
              class="btn btn-secondary btn-sm"
            >
              +
            </button>
          </div>
          <div class="mb-3 text-center">
            <label for="date">날짜:</label>
            <input type="date" id="date" v-model="date" class="form-control" />
          </div>
          <div class="mb-3 text-center">
            <label for="amount">금액:</label>
            <input
              type="text"
              id="amount"
              v-model="formattedAmount"
              @input="formatAmount"
              class="form-control"
            />
          </div>
          <div class="mb-3 text-center">
            <label for="description">메모:</label>
            <textarea
              id="description"
              v-model="description"
              class="form-control"
            ></textarea>
          </div>
          <div class="mb-3 text-center" v-if="mode === 'expense'">
            <label for="usage">사용처:</label>
            <input
              type="text"
              id="usage"
              v-model="usage"
              class="form-control"
            />
          </div>
          <div class="mb-3 text-center">
            <label for="file">이미지 첨부파일:</label>
            <input
              type="file"
              id="file"
              @change="handleFileUpload"
              accept="image/*"
              class="form-control"
            />
          </div>
          <div v-if="imageUrl" class="mb-3 text-center">
            <img
              :src="imageUrl"
              alt="첨부 이미지"
              style="max-width: 100%; margin-top: 10px"
            />
          </div>
          <div class="action-buttons text-center">
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
        <!-- 필터 드롭다운 및 정렬 드롭다운 -->
        <div class="filters mb-3">
          <select
            v-model="filterDate"
            class="form-control mb-2"
            @change="applyFilters"
          >
            <option value="">날짜 선택</option>
            <option v-for="date in uniqueDates" :key="date" :value="date">
              {{ date }}
            </option>
          </select>
          <select
            v-model="filterType"
            class="form-control mb-2"
            @change="applyFilters"
          >
            <option value="">유형 선택</option>
            <option value="income">수입</option>
            <option value="expense">지출</option>
          </select>
          <select
            v-model="filterCategory"
            class="form-control mb-2"
            @change="applyFilters"
          >
            <option value="">카테고리 선택</option>
            <option
              v-for="category in allCategories"
              :key="category"
              :value="category"
            >
              {{ category }}
            </option>
          </select>
          <select
            v-model="sortDirection"
            class="form-control"
            @change="applyFilters"
          >
            <option value="asc">오래된 순</option>
            <option value="desc">최신 순</option>
          </select>
        </div>
        <table class="table mt-5">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">날짜</th>
              <th scope="col">유형</th>
              <th scope="col">카테고리</th>
              <th scope="col">금액</th>
              <th scope="col">메모</th>
              <th scope="col">사용처</th>
              <th scope="col">영수증 내역</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in sortedExpenses" :key="item.id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ item.date }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.amount ? item.amount.toLocaleString() : 0 }}원</td>
              <td>{{ item.memo }}</td>
              <td>{{ item.usage }}</td>
              <td>
                <img
                  v-if="item.imageUrl"
                  :src="item.imageUrl"
                  alt="첨부 이미지"
                  style="max-width: 100px"
                />
              </td>
            </tr>
            <!-- 총계 추가 -->
            <tr>
              <td colspan="2"><strong>총 수입</strong></td>
              <td colspan="2">{{ totalIncome.toLocaleString() }}원</td>
              <td colspan="2"><strong>총 지출</strong></td>
              <td colspan="2">{{ totalExpense.toLocaleString() }}원</td>
              <td colspan="2"><strong>총 잔액</strong></td>
              <td colspan="2">{{ balance.toLocaleString() }}원</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div
      class="modal"
      tabindex="-1"
      :class="{ show: isModalVisible }"
      style="display: block"
      v-if="isModalVisible"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">카테고리 추가</h5>
            <button
              type="button"
              class="btn-close"
              @click="hideAddCategoryModal"
            ></button>
          </div>
          <div class="modal-body">
            <input
              type="text"
              v-model="newCategory"
              class="form-control"
              placeholder="새 카테고리 이름"
            />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addCategory">
              추가
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              @click="hideAddCategoryModal"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['transactions'],
  data() {
    return {
      mode: 'income',
      date: '',
      amount: '',
      formattedAmount: '',
      selectedCategory: '',
      description: '',
      usage: '',
      file: null,
      imageUrl: null,
      incomeCategories: ['용돈', '월급', '주식'],
      expenseCategories: [
        '음식',
        '교통',
        '통신',
        '공과금',
        '미용',
        '문화생활',
        '교육',
        '병원',
      ],
      isModalVisible: false,
      newCategory: '',
      filterDate: '',
      filterType: '',
      filterCategory: '',
      sortDirection: 'asc', // 추가된 데이터
    };
  },
  computed: {
    currentCategories() {
      return this.mode === 'income'
        ? this.incomeCategories
        : this.expenseCategories;
    },
    allCategories() {
      return [...this.incomeCategories, ...this.expenseCategories];
    },
    uniqueDates() {
      return Object.keys(this.transactions);
    },
    filteredExpenses() {
      const expenses = Object.values(this.transactions).flat();
      return expenses.filter((expense) => {
        return (
          (!this.filterDate || expense.date === this.filterDate) &&
          (!this.filterType || expense.type === this.filterType) &&
          (!this.filterCategory || expense.category === this.filterCategory)
        );
      });
    },
    sortedExpenses() {
      return this.filteredExpenses.sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return new Date(a.date) - new Date(b.date);
        } else {
          return new Date(b.date) - new Date(a.date);
        }
      });
    },
    totalIncome() {
      return this.filteredExpenses
        .filter((expense) => expense.type === 'income')
        .reduce((total, expense) => total + expense.amount, 0);
    },
    totalExpense() {
      return this.filteredExpenses
        .filter((expense) => expense.type === 'expense')
        .reduce((total, expense) => total + expense.amount, 0);
    },
    balance() {
      return this.totalIncome - this.totalExpense;
    },
  },

  methods: {
    setMode(mode) {
      this.mode = mode;
      this.selectedCategory = ''; // 모드를 변경할 때 선택된 카테고리 초기화
    },
    showAddCategoryModal() {
      this.isModalVisible = true;
    },
    hideAddCategoryModal() {
      this.isModalVisible = false;
      this.newCategory = '';
    },
    addCategory() {
      if (!this.newCategory) {
        alert('카테고리 이름을 입력해 주세요.');
        return;
      }
      if (this.mode === 'income') {
        this.incomeCategories.push(this.newCategory);
      } else {
        this.expenseCategories.push(this.newCategory);
      }
      this.hideAddCategoryModal();
    },
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
      if (!this.selectedCategory) {
        alert('카테고리를 선택해 주세요.');
        return;
      }
      try {
        const response = await axios.post(
          'http://localhost:3000/transactions',
          formData
        ); // db.json URL에 맞게 수정
        this.$emit('add-transaction', this.date, response.data);
        this.resetForm();
      } catch (error) {
        console.error('Error submitting transaction:', error);
      }
      const formData = {
        date: this.date,
        type: this.mode,
        category: this.selectedCategory,
        amount: parseInt(this.amount, 10),
        memo: this.description,
        usage: this.usage,
        imageUrl: this.imageUrl,
      };

      this.$emit('update-transactions', this.date, formData);
      this.resetForm();
    },
    handleCancel() {
      this.resetForm();
    },
    resetForm() {
      this.mode = 'income';
      this.date = '';
      this.amount = '';
      this.formattedAmount = '';
      this.selectedCategory = '';
      this.description = '';
      this.usage = '';
      this.file = null;
      this.imageUrl = null;
    },
    applyFilters() {
      this.sortedExpenses;
    },
    sortByDate(direction) {
      this.sortDirection = direction;
      this.applyFilters();
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

.filters {
  display: flex;
  justify-content: space-between;
}

.filters select {
  margin-right: 10px;
}

.modal.show {
  display: block;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
}

.modal-dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

label {
  display: inline-block;
  width: 100%;
  text-align: center;
}

.form-control {
  width: 100%;
}
</style>
