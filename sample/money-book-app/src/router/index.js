import { createRouter, createWebHistory } from 'vue-router';
import DefaultComponent from '../components/DefaultComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: DefaultComponent,
  },
  {
    path: '/about',
    name: 'about',
    component: DefaultComponent,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
