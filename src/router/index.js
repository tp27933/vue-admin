import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: 'login',
    hidden: true,
    meta: {
      name: '主頁'
    }
  },
  {
    path: '/login',
    name: 'Login',
    hidden: true,
    meta: {
      name: '登入'
    },
    component: () => import('../views/Login/index.vue')
  },
  {
    path: '/home',
    name: 'Home',
    redirect: 'index',
    meta: {
      name: '首頁',
      icon: 'el-icon-s-home'
    },
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/index',
        name: 'Index  ',
        meta: {
          name: '主要內容'
        },
        component: () => import('../views/Home/index.vue')
      }
    ]
  },
  {
    path: '/member',
    name: 'Member',
    meta: {
      name: '會員管理',
      iconfont: 'member'
    },
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/signup',
        name: 'Signup',
        meta: {
          name: '申辦會員卡'
        },
        component: () => import('../views/member/signup/index.vue')
      },
      {
        path: '/operation',
        name: 'Operation',
        meta: {
          name: '會員操作'
        },
        component: () => import('../views/member/operation/index.vue')
      }
    ]
  },
  {
    path: '/expense',
    name: 'History',
    redirect: 'history',
    meta: {
      name: '消費紀錄',
      icon: 'el-icon-money'
    },
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/history',
        name: 'History  ',
        meta: {
          name: '歷史紀錄'
        },
        component: () => import('../views/history/index.vue')
      }
    ]
  },
  {
    path: '/employee',
    name: 'Employee',
    meta: {
      name: '員工管理',
      icon: 'el-icon-user'
    },
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/totalEmployee',
        name: 'TotalEmployee  ',
        meta: {
          name: '員工總攬'
        },
        component: () => import('../views/employee/index.vue')
      }
    ]
  },
{
    path: '/page404',
    meta: {
      name: '404',
      icon: '404'
    },
    hidden:true,
    component: () => import('../views/Layout/index.vue'),
    children: [
      {
        path: '/404',
        meta: {
          name: '404'
        },
        component: () => import('../views/404.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
];

const router = new VueRouter({
  routes
});

export default router;
