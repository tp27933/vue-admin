<template>
  <div>
    <svg :class="svgClass" aria-hidden="false">
      <use :xlink:href="iconName"></use>
    </svg>
  </div>
</template>

<script>
import { reactive, ref, computed } from '@vue/composition-api';

export default {
  name: 'svgicon',
  props: {
    iconClass: {
      type: String,
      deafault: ''
    },
    className: {
      type: String,
      deafault: ''
    }
  },
  setup(props) {
    const msg = ref('hid');

    const iconName = computed(() => `#icon-${props.iconClass}`);

    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return 'svg-icon ';
      }
    });

    return {
      msg,
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped></style>
