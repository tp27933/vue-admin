<template>
  <div id="header-wrap">
    <div class="header-icon floatL" @click="navMenuSate">
      <svg-icon iconClass="menu" className="menu" />
    </div>
    <div class="header-icon floatR " @click="logout()">
      <div class="user-info"></div>
      <svg-icon iconClass="loginout" className="loginout" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'layouHeader',
  setup(props, { root }) {
    const navMenuSate = () => {
      root.$store.commit('app/SET_COLLAPSE');
    };
    const logout = () => {
      root.$store.dispatch('app/logout').then(() => {
        root.$router.push({
          name: 'Login'
        });
      });
    };
    return {
      logout,
      navMenuSate
    };
  }
};
</script>
<style lang="scss" scoped>
@import '../../../styles/config.scss';

#header-wrap {
  position: fixed;
  z-index: 1999;
  top: 0;
  right: 0;
  left: 250px;
  height: 40px;
  background-color: #fff;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 3px 16px;
  /deep/ svg {
    fill: currentColor;
    color: #031833;
    width: 1.5rem;
    height: 2rem;
    cursor: pointer;
  }
}
</style>
