import { Login } from '@/api/login.js';
import {
  setToken,
  setUserName,
  getUserName,
  removeToken,
  removeUserName
} from '../../utils/getToken';
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
  token: '',
  name: getUserName() || ''
};
const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {
  SET_COLLAPSE(state, value) {
    state.isCollapse = !state.isCollapse;
    //html5 本地儲存
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
  },
  SET_TOKEN(state, value) {
    console.log(value);
    state.token = value;
  },
  SET_USERNAME(sate, value) {
    state.name = value;
  }
};
const actions = {
  login({ commit }, requestData) {
    return new Promise((resolve, rejcet) => {
      Login(requestData)
        .then(response => {
          let data = response.data.data;
          console.log(data.token);
          commit('SET_TOKEN', data.token);
          commit('SET_USERNAME', data.username);
          setToken(data.token);
          setUserName(data.username);
          resolve(response);
        })
        .catch(error => {
          rejcet(error);
        });
    });
  },
  logout({ commit }) {
    return new Promise((resolve, rejcet) => {
      removeToken();
      console.log('logout');
      removeUserName();
      commit('SET_TOKEN', '');
      commit('SET_USERNAME', '');
      resolve();
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
