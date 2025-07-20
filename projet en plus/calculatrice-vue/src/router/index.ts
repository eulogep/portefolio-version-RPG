import { createRouter, createWebHistory } from 'vue-router';
import SimpleCalculator from '../views/SimpleCalculator.vue';
import AdvancedCalculator from '../views/AdvancedCalculator.vue';
import NotFound from '../views/NotFound.vue';

const routes = [
  { path: '/', name: 'Simple', component: SimpleCalculator },
  { path: '/avancee', name: 'Avancee', component: AdvancedCalculator },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

export default createRouter({
  history: createWebHistory(),
  routes,
}); 