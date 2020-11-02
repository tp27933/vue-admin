<template>
  <div class="histroy_wrap">
    <!---------- 表格開始---------- -->
    <TableVue :config="table_data">
      <el-date-picker
        v-model="date"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        value-format="yyyy-MM-dd"
      >
      </el-date-picker>
      <el-button
        icon="el-icon-search"
        circle
        :disabled="disableSeachBtn"
        @click="searchUsers"
      ></el-button>
    </TableVue>
    <!-- 底部分頁 -->
    <div class="block">
      <el-pagination
        background
        @size-change="handSizeChange"
        @current-change="handCurrentChange"
        :current-page.sync="pages.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pages.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import TableVue from '@c/Table';
import { ref, reactive, onMounted } from '@vue/composition-api';
import { UsersHistory } from '@/api/user.js';
import { initDate } from '@/utils/init_data';

export default {
  name: 'history',
  components: { TableVue },
  setup(props, { root }) {
    /*-----------------初始化數值----------------------*/
    const date = ref('');
    const disableSeachBtn = ref(false);
    //( 分頁 數據)
    const pages = reactive({
      total: 0,
      pagesize: 10,
      currentPage: 1
    });
    //( 從後端得到 全部數據)
    const totalTable_data = reactive({
      item: []
    });
    // ( table組件數據 )
    const table_data = reactive({
      expand: true,
      tHead: [
        {
          label: '日期',
          name: 'date',
          width: '3'
        },
        {
          label: '姓名',
          name: 'name',
          width: '1'
        },
        {
          label: '類型',
          name: 'type',
          width: '1 '
        },
        {
          label: '金額',
          name: 'amount',
          width: '2 '
        }
      ],
      tableData: []
    });

    /*-----------------函數聲明---------------------*/
    // ( 後臺數據英轉中 )
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

    // ( 切換頁數，手動分割數據 )
    const handCurrentChange = val => {
      pages.currentPage = val;
      getList(val, pages.pagesize);
    };
    // ( 切換顯示總數量，手動分割數據 )
    const handSizeChange = val => {
      pages.pagesize = val;
      getList(pages.currentPage, val);
      pages.currentPage = 1;
    };
    // ( 搜索請求 )
    const searchUsers = () => {
      let data = {
        start: date.value[0],
        end: date.value[1]
      };
      getAllUserInfo(data);
    };
    // ( 請求全部數據 )
    const getAllUserInfo = data => {
      let sendData = data || null;
      console.log(sendData);
      UsersHistory(sendData)
        .then(response => {
          totalTable_data.item = response.data;
          pages.total = totalTable_data.item.length;
          getList(pages.currentPage, pages.pagesize);
        })
        .catch(err => {
          console.log(err);
        });
    };
    onMounted(() => {
      getAllUserInfo();
    });
    // ( 手動分割總數據 )
    const getList = (current, pageSize) => {
      let data = totalTable_data.item.slice((current - 1) * pageSize, current * pageSize);
      table_data.tableData = data;
    };
    // ( 判斷row是否有展開 )
    const getRowClassName = ({ row, rowIndex }) => {
      if (row.detail == 0) {
        return 'row-expand-cover';
      }
    };

    return {
      totalTable_data,
      handSizeChange,
      handCurrentChange,
      pages,
      table_data,
      getRowClassName,
      childrenData,
      date,
      searchUsers,
      disableSeachBtn
    };
  }
};
</script>
<style lang="scss" scoped>
.row-expand-cover {
  .el-table__expand-icon {
    visibility: hidden !important;
  }
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
