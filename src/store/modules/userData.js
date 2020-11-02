import { UpdataUserData } from '@/api/user.js';
const state = {
  tabsDisable: true,
  userForm: {
    name: '',
    gender: '',
    phoneNumber: '',
    cardNumber: '',
    level: '',
    amount: '',
    note: '',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
  }
};
const mutations = {
  RESET_USER(state) {
    const getDefaultState = () => {
      return {
        name: '',
        gender: '',
        phoneNumber: '',
        cardNumber: '',
        level: '',
        amount: '',
        note: '',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      };
    };
    Object.assign(state.userForm, getDefaultState());
  },
  RENDER_USER(state, data) {
    console.log(data);
    let arr = [];
    Object.keys(state.userForm).map(function(key, index) {
      state.userForm[key] = data[key];
    });
  },
  SET_TABS_DISABLED(state, data) {
    state.tabsDisable = data;
  }
};
const actions = {
  REST_USER_STATE({ commit }) {
    commit('RESET_USER');
  },
  UPDATE_USER_DATA({ commit, state }, requestData) {
    requestData.cardNumber = state.userForm.cardNumber;
    return new Promise((resolve, rejcet) => {
      UpdataUserData(requestData)
        .then(response => {
          commit('RENDER_USER', response.data);
          resolve(response);
        })
        .catch(error => {
          rejcet(error);
        });
    });
  }
};

export default {
  namespaced: true,
  actions,
  state,
  mutations
};
