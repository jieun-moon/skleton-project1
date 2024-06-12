<template>
  <div class="container">
    <Header />
    <router-view v-bind="routerViewProps" />
    <Loading v-if="states.isLoading" />
  </div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import Header from '@/components/Header.vue';
import Loading from '@/components/Loading.vue';

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
