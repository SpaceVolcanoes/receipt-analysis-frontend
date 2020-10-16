import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ReceiptDetail from "../views/ReceiptDetail.vue";
import CustomerReceipts from "../views/CustomerReceipts.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  },
  {
    path: "/customer/:id/receipts",
    name: "CustomerReceipts",
    component: CustomerReceipts
  },
  {
    path: "/receipt/:id",
    name: "ReceiptDetail",
    component: ReceiptDetail
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
