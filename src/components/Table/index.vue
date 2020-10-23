<template>
  <div id="table">
    <slot></slot>
    <el-table
      :data="data.tableData"
      style="width: 100%; "
      border
      :row-class-name="getRowClassName"
    >
      <el-table-column
        v-for="(item, index) in data.tHead"
        :key="index"
        :prop="item.name"
        :label="item.label"
        :min-width="item.width"
      ></el-table-column>

      <el-table-column type="expand" width="100">
        <template slot-scope="scope">
          <div
            v-for="(item, index) in scope.row
              .detail"
            :key="index"
          >
            <el-form
              label-position="left"
              inline
              class="demo-table-expand"
            >
              <el-form-item label="操作">
                <span>{{
                  childrenData[item.value].label
                }}</span>
              </el-form-item>
              <el-form-item label="金額">
                <span>{{ item.amount }}</span>
              </el-form-item>
            </el-form>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { initDate } from '@/utils/init_data';

import {
  reactive,
  ref,
  watch,
  onBeforeMount
} from '@vue/composition-api';

export default {
  name: 'tableVue',
  props: {
    config: {
      type: Object,
      defalut: {}
    }
  },
  setup(props, { root, emit }) {
    /*-----------------初始化數值----------------------*/
    const childrenData = reactive({
      haircut: {
        label: '剪髮'
      },
      color: {
        label: '染髮'
      },
      perm: {
        label: '燙髮'
      },
      treatment: {
        label: '護理'
      },
      others: {
        label: '其他'
      }
    });
    const data = reactive({
      tHead: [],
      tableData: []
    });

    watch(
      () => props.config.tableData,
      (value, oldValue) => {
        const result = value.map(item => ({
          ...item, //es6省略符號 相當於 id:item.id
          date: initDate(item.date), //不直接通过item.data = item.data+ 2
          type:
            item.type == 'deposit'
              ? '儲值'
              : item.type == 'withdraw'
              ? '扣款'
              : '開卡'
        }));

        data.tableData = result;
      }
    );

    /*-----------------函數聲明---------------------*/
    const initTableConfig = () => {
      let configData = props.config;

      for (let key in configData) {
        data[key] = configData[key];
      }
    };
    const getRowClassName = ({
      row,
      rowIndex
    }) => {
      console.log(row.detail.length);
      if (row.detail.length == 0) {
        return 'row-expand-cover';
      }
    };
    onBeforeMount(() => {
      initTableConfig();
    });

    return {
      childrenData,
      initTableConfig,
      data,
      getRowClassName
    };
  }
};
</script>

<style lang="scss" scoped>
#table {
  /deep/ td:not(:first-child),
  /deep/th {
    text-align: center;
  }
  /deep/ td:first-child {
    padding-left: 20px;
  }
}
</style>
