import router from './index';
import store from '../store/index';
import { getToken, removeToken, removeUserName } from '@/utils/getToken';
const whiteRouter = ['/login'];
/* router.beforeEach((to, from, next) => {
if (getToken()) {
    removeToken();
    removeUserName();
    store.commit('app/SET_TOKEN', '');
    store.commit('app/SET_USERNAME', '');

    next();
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});*/
