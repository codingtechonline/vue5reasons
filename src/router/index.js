import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import CurrencyCalculator from "../views/CurrencyCalculator.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/currency",
    name: "Currency Calculator",
    component: CurrencyCalculator,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
