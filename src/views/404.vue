<template>
  <div class="page404">
    <p><span>404</span><br/>
    PAGE NOT FOUND</p>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';
export default {
  name: 'Page404',
  computed: {
    message() {
      return 'The webmaster said you can not enter this page...';
    }
  }
};
</script>
<style lang="scss" scoped>
.page404{
  text-align: center;
  height: 470px;
      line-height: 100px;
}
.page404::after{
  content: '';
  height:100%;
  display:inline-block;
  vertical-align:  middle;
}

p{
  font-size: 56px;
   display:inline-block;
  vertical-align:middle;
}
span{
  font-size: 128px;
}
</style>
