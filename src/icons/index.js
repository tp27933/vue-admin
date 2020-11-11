import Vue from 'vue';

import SvgIcon from './Svgicon.vue'; // svg组件

Vue.component('svg-icon', SvgIcon);
/*require.context : 讀取指定目錄所有文件
  第一個:目錄
  第二個:是否遍歷子級目錄
  第三個:定義遍歷文件規則
*/

// register globally
Vue.component('svg-icon', SvgIcon);

const req = require.context('./svg', false, /\.svg$/);
const requireAll = requireContext => {
  requireContext.keys().map(requireContext);
};

requireAll(req);
