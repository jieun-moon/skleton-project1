<template>
    <div id="app">
        <ExpenseForm />
    </div>
</template>

<script>
import ExpenseForm from '../components/ExpenseForm.vue';

export default {
    name: 'App',
    components: {
        ExpenseForm,
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
