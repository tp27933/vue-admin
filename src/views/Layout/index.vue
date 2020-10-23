<template>
  <div
    id='layout-wrap'
    :class="[menuStatus ? 'close' :'open' ]"
  >

    <!--1. 將組件放置版面中--->
    <LayoutHeader />
    <LayoutMain />
    <LayoutNav />
  </div>
</template>

<script>

import LayoutHeader from './Components/Header.vue'
import LayoutMain from './Components/Main.vue'
import LayoutNav from './Components/Nav.vue'
import { computed, ref } from '@vue/composition-api'

export default {
  name: 'layout',
  // 2. 在 vue 宣告使用
  components: { LayoutHeader, LayoutMain, LayoutNav },
  setup (props, { root }) {


    const menuStatus = computed(() => root.$store.state.app.isCollapse)
    return {
      menuStatus,

    }
  }

}
</script>
<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 10px;
} /* this targets the default scrollbar (compulsory) */
::-webkit-scrollbar-track {
  background-color: #344a5f;
} /* the new scrollbar will have a flat appearance with the set background color */

::-webkit-scrollbar-thumb {
  background-color: #909399;
} /* this will style the thumb, ignoring the track */

#layout-wrap {
  width: 100%;
  height: 100vh;
  background-color: #f7f7f7;
  overflow: scroll;
  overflow-x: hidden;
}
</style>