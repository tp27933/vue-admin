<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { watch } from '@vue/composition-api';
export default {
  name: 'app',
  setup(prop, { root }) {
    watch(
      () => root.$route,
      (value, oldValue) => {
        root.$store.dispatch('userData/REST_USER_STATE');
      }
    );
  }
};
</script>
<style lang="scss"></style>
