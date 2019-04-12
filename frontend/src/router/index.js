import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Home from "@/components/Home.vue";
import SignUp from "@/components/SignUp.vue";
import Dashboard from "@/components/Dashboard.vue";
import DashboardUsers from "@/components/dashboard/Users.vue";
import UserProfile from "@/components/User.vue";
import UserProfileEdit from "@/components/dashboard/UserEdit.vue";

import authMiddleware from '@/middleware/auth.js';
import authRoleMiddleware from '@/middleware/authWRoleCheck.js';

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      beforeEnter: authMiddleware,
    },
    {
      path: "/dashboard/users",
      name: "Users",
      component: DashboardUsers,
      beforeEnter: authRoleMiddleware,
      meta: {
        allowedRoles: [0, 1, 2, 3]
      }
    },
    { 
      path: '/user/:id',
      name: 'User',
      component: UserProfile
    },
    { 
      path: '/user/:id/edit',
      name: 'UserEdit',
      component: UserProfileEdit,
      beforeEnter: authRoleMiddleware,
      meta: {
        allowedRoles: [0, 1, 2, 3]
      }
    }
  ]
})
