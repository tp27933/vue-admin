<template>
  <div>
   
    <svg :class="svgClass" aria-hidden="false">
      <use :xlink:href="iconName"></use>
      
    </svg>
     <slot></slot>
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

<style lang="scss" scoped>
.svg-icon{
  width: 1rem;
  height: 1rem;
  fill:currentColor;
  color:#909399;
  &.font12{
    font-size: 12px;
  }
  &.font24{
    font-size: 24px;
  }
}
</style>
