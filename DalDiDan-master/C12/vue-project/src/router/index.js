import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import About from '@/pages/About.vue';
import TodoList from '@/pages/TodoList.vue';
import Budget from '@/pages/Budget.vue';
import Income from '@/pages/Income.vue';
import Expenditure from '@/pages/Expenditure.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/money', component: TodoList },
    { path: '/money/budget', component: Budget },
    { path: '/money/income/:id', component: Income },
    { path: '/money/expenditure/:id', component: Expenditure },
    { path: '/:paths(.*)*', component: NotFound },
  ],
});

export default router;
