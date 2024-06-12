<template>
  <div class="container">
    <Header />
    <router-view v-bind="routerViewProps" />
    <Loading v-if="states.isLoading" />
  </div>
</template>

<script setup>
import { reactive, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';
import axios from 'axios';

const states = reactive({ isLoading: false });
const transactions = reactive({});
const route = useRoute();

const updateTransactions = (date, transaction) => {
  if (!transactions[date]) {
    transactions[date] = [];
  }
  transactions[date].push(transaction);
};

const routerViewProps = computed(() => {
  if (route.meta.needsTransactions) {
    return {
      transactions: transactions || {},
      'onUpdate-transactions': updateTransactions,
    };
  }
  return {};
});

onMounted(async () => {
  try {
    states.isLoading = true;
    const response = await axios.get('http://localhost:3000/transactions'); // db.json URL에 맞게 수정
    Object.assign(transactions, response.data);
  } catch (error) {
    console.error('Error loading transactions:', error);
  } finally {
    states.isLoading = false;
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
