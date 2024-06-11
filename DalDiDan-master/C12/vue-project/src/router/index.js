import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import CardRecommendation from '@/pages/CardRecommendation.vue';
import TodoList from '@/pages/TodoList.vue';
import Budget from '@/pages/Budget.vue';
import Income from '@/pages/Income.vue';
import Expenditure from '@/pages/Expenditure.vue';
import NotFound from '@/pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/cardRecommendation', component: CardRecommendation },
    { path: '/money', component: TodoList },
    { path: '/budget', component: Budget },
    { path: '/income', component: Income },
    { path: '/expenditure', component: Expenditure },
    { path: '/:paths(.*)*', component: NotFound },
  ],
});

export default router;
