import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/pages/Home.vue';
import CardRecommendation from '@/pages/CardRecommendation.vue';
import TodoList from '@/pages/TodoList.vue';
import NotFound from '@/pages/NotFound.vue';
import InOut from '@/pages/InOut.vue';
import ListView from '@/pages/ListView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', component: Home },
        { path: '/cardRecommendation', component: CardRecommendation },
        { path: '/money', component: TodoList },
        { path: '/:paths(.*)*', component: NotFound },
        { path: '/InOut', component: InOut },
        { path: '/ListView', component: ListView },
        // { path: '/TotalIncome', component: TotalIncome },
    ],
});

export default router;
