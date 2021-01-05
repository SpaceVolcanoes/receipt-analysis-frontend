import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Register from "../views/Register.vue";
import ReceiptDetail from "../views/ReceiptDetail.vue";
import EntryDetail from "../views/EntryDetail.vue";
import CustomerReceipts from "../views/CustomerReceipts.vue";
import Login from "../views/Login";
import Images from "../views/Images";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: function() {
      return import(/* webpackChunkName: "about" */ "../views/About.vue");
    }
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/customers/:id/receipts",
    name: "Receipts",
    component: CustomerReceipts
  },
  {
    path: "/receipts/:id",
    name: "ReceiptDetail",
    component: ReceiptDetail
  },
  {
    path: "/entries/:id",
    name: "EntryDetail",
    component: EntryDetail
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/images",
    name: "Images",
    component: Images
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
