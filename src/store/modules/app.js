
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
}
const getters = {
  isCollapse: state => state.isCollapse,
}
const mutations = {
  SET_COLLAPSE (state, value) {
    state.isCollapse = !state.isCollapse
    //html5 本地儲存
    sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse))
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};