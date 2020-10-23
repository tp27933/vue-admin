<template>
  <div id='main-wrap'>
    <div class="content  clearFix">
      <router-view class="view" />
    </div>

  </div>
</template>

<script>
export default {

}
</script>
<style lang="scss" scoped>
@import "../../../styles/config.scss";

#main-wrap {
  width: 100vw;
  height: 100vh;
  padding: 60px 30px 0 230px;

  transition: all 0.3s ease 0s;
  -o-box-sizing: border-box;
  -ms-box-sizing: border-box;
  box-sizing: border-box;
}
.main-content {
  width: 100%;
  height: 100%;
  padding-top: 60px;
  padding-right: 30px;

  @include webkit(transition, all 0.3s ease 0s);

  @include webkit(box-sizing, border-box);
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}

.close {
  #main-wrap {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  width: 100%;
  padding: 20px 0 0 0;
  @include webkit(box-sizing, border-box);
}

.view {
  width: 100%;
  height: 100%;
}
</style>