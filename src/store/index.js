import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app.js';
import userData from './modules/userData.js';
export default new Vuex.Store({
  modules: { app, userData }
});
