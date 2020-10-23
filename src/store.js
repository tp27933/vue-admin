import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "./store/modules/app.js"
import userData from "./store/modules/userData.js"
export default new Vuex.Store({
  modules: { app, userData },

});
