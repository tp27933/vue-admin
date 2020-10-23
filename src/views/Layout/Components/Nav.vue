<template>
  <div id="nav-wrap">
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      border="none"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routers">
        <el-submenu
          v-if="!item.hidden"
          :key="item.id"
          :index="index + ''"
        >
          <template slot="title">
            <i :class="item.meta.icon"></i>

            <span slot="title">{{
              item.meta.name
            }}</span>
          </template>

          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
            >{{ subItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
//vue3.0 composition-api
import {
  reactive,
  ref,
  isRef,
  toRefs,
  onMounted,
  computed
} from '@vue/composition-api';

export default {
  name: 'navMenu',
  props: {
    data: {
      tpye: String
    }
  },
  setup(props, { root, emit }) {
    localStorage.setItem(
      'numbers',
      JSON.stringify('1324')
    );

    console.log(
      root.$router.options.routes[1].meta.name
    );

    const routers = reactive(
      root.$router.options.routes
    );

    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });

    return {
      isCollapse,
      routers
    };
  }
};
</script>
<style lang="scss">
@import '../../../styles/config.scss';

#nav-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: $navMenu;
  height: 100vh;
  background: linear-gradient(
    to bottom,
    #0e2e58,
    #031833
  );

  @include webkit(transition, all 0.3s ease 0s);

  svg {
    font-size: 20px;
    margin-right: 10px;
  }
  .el-menu {
    border: none;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
}
</style>
