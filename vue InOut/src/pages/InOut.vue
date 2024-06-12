<template>
  <div id="app">
    <ExpenseForm
      :transactions="transactions"
      @add-transaction="addTransaction"
    />
  </div>
</template>

<script>
import ExpenseForm from '../components/ExpenseForm.vue';

export default {
  name: 'InOut',
  props: ['transactions'],
  components: {
    ExpenseForm,
  },
  methods: {
    addTransaction(date, transaction) {
      this.$emit('update-transactions', date, transaction);
    },
  },
};
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
