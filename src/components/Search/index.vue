<template>
  <div class="ces-search">
    <el-form :size="config.size" inline :rules="config.rules" :label-width="config.labelWidth">
      <el-form-item v-for="(item, index) in content" :label="item.label" :key="index">
        <!-- 輸入框 -->
        <el-input v-if="item.type === 'Input'" v-model="valueInput" size="mini"> </el-input>
        <!-- 日期 -->
        <el-date-picker
          v-if="item.type === 'Date'"
          v-model="searchData[item.prop]"
        ></el-date-picker>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, watch } from '@vue/composition-api';

export default {
  name: 'search',
  props: {
    config: {
      type: Object,
      defalut: {}
    },
    content: {
      type: Array,
      defalut: []
    },
    input_value: {
      type: String,
      defalut: ''
    }
  },
  setup(prop, { root, emit }) {
    const valueInput = ref('');
    /*---------------函數聲明----------------*/

    watch(
      () => valueInput,
      (value, oldValue) => {
        emit('update:valueInput', val);
      }
    );

    return {
      valueInput
    };
  }
};
</script>

<style lang="scss" scoped></style>
