
     <template>
  <div id="tab-wrap">
    <el-tabs
      tab-position="bottom"
      style="height: 200px;"
      v-model="activeName"
      @tab-click="handleClick"
    >
      <el-tab-pane
        v-for="(item,index) in tabs_Text "
        :key="index"
        :label="item.label"
        :name="item.name"
        :disabled="disableSwitch"
      ></el-tab-pane>
    </el-tabs>
    <Edit ref='txt' />
    <Deposit ref='switchD' />
    <History ref='switchH' />
  </div>

</template>

<script>

import { reactive, ref, computed } from '@vue/composition-api'
import Edit from './components_Tabs/editUersInformation.vue'
import Deposit from './components_Tabs/deposit.vue'
import History from './components_Tabs/history.vue'
export default {
  name: "tabs",
  components: { Edit, Deposit, History },

  setup (props, { root, refs }) {

    /*-----------------初始化數值----------------------*/

    //( 當前點擊tab )
    const activeName = ref('first')

    const tabs_Text = reactive([
      {
        label: "用户管理",
        name: "user"
      },
      {
        label: "修改資料",
        name: "edit"
      },
      {
        label: "儲值/扣款",
        name: "depoit"
      },
      {
        label: "消費紀錄",
        name: "history"
      },
    ])
    // ( 監聽是否搜尋用戶後tab欄才能點擊)
    const disableSwitch = computed(() => {
      return root.$store.state.userData.tabsDisable
    })


    /*--------------------------聲明函數-----------------------------*/
    const handleClick = (tab, event) => {
      // ( 如果沒有搜索`,點擊欄位不做任何動作 )
      if (disableSwitch === true) {
        disable.value = true;
        return
      }
      switch (tab.name) {
        case 'edit':
          refs.txt.dialogFormVisible = true;
          break;
        case 'depoit':
          refs.switchD.dialogFormVisible = true;
          break;
        case 'history':
          refs.switchH.dialogTableVisible = true;
          break;
        default:
          break;
      }
    }


    return {
      tabs_Text,
      disableSwitch,
      activeName,
      handleClick,
    }
  },


}

</script>

<style lang="scss" scoped>
.tabs {
  .el-tabs__item {
    color: #ffff !important;
  }
  #tab-user {
    background: #409eff;
  }
}
</style>