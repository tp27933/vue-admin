//引用公共組件
//全局引入
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionApi from "@vue/composition-api"
import "./icons/index.js"

import echarts from "echarts";
Vue.prototype.$echarts = echarts;


Vue.use(ElementUI);
Vue.use(VueCompositionApi);
Vue.config.productionTip = false;



//runtime運行模式
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
