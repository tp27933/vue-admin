<template>
  <div id="history">
    <el-dialog
      title="歷史紀錄"
      :visible.sync="dialogTableVisible"
      @open="sendRequest()"
    >
      <p>紀錄僅顯示最近20條紀錄</p>
      <TableVue :config="tabs_history" />
    </el-dialog>
  </div>
</template>

<script>
import { PersonalHistory } from '@/api/user.js';
import TableVue from '@c/Table';
import {
  reactive,
  ref
} from '@vue/composition-api';
export default {
  name: 'history',
  components: { TableVue },
  setup(props, { root }) {
    /*-----------------初始化數值----------------------*/

    //( 傳送table請求相關數據 )
    const tabs_history = reactive({
      expand: true,
      tHead: [
        {
          label: '日期',
          name: 'date',
          width: '1'
        },
        {
          label: '類型',
          name: 'type',
          width: '1'
        },
        {
          label: '金額',
          name: 'amount',
          width: '1 '
        }
      ],
      tableData: []
    });
    //( detail選項英轉中 )
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
    const dialogTableVisible = ref(false);

    const sendRequest = (index, row) => {
      //監聽當前會員數據
      let userCardNumber =
        root.$store.state.userData.userForm
          .cardNumber;
      let requestData = {
        cardNumber: userCardNumber
      };
      PersonalHistory(requestData.cardNumber)
        .then(res => {
          let tableData1 = res.data;
          tabs_history.tableData = tableData1;
        })
        .catch(err => {
          console.log(err);
        });
    };

    return {
      tabs_history,
      childrenData,
      sendRequest,
      dialogTableVisible
    };
  }
};
</script>

<style lang="scss">
.row-expand-cover {
  .el-table__expand-icon {
    visibility: hidden !important;
  }
}

#history {
  /deep/ p {
    text-align: left;
    font-size: 10px;
    padding-bottom: 10px;
  }
}
</style>
