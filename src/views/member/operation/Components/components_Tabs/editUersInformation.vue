<template>
  <div id="edit-wrap">
    <el-dialog title="修改資料" :visible.sync="dialogFormVisible" @open="getData()">
      <el-form ref="form" :model="renderData.table" label-width="80px">
        <template v-for="(val, key, index) in renderData.table">
          <el-form-item
            :key="index"
            v-if="DataTransform[key]"
            :label="DataTransform[key].label + ' :'"
          >
            <template v-if="key === 'name' || key === 'phoneNumber'">
              <el-input v-model.trim="renderData.table[key]" placeholder="请输入内容" clearable>
              </el-input>
            </template>
            <template v-else-if="key == 'note'">
              <el-input
                v-model="renderData.table.note"
                type="textarea"
                placeholder="请输入内容"
                maxlength="100"
                show-word-limit
              >
              </el-input>
            </template>
            <template v-else>
              <el-input :placeholder="val" disabled></el-input>
            </template>
          </el-form-item>
        </template>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit">确 定</el-button>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, computed, onBeforeMount } from '@vue/composition-api';
import { UpdataUserData } from '@/api/user.js';
export default {
  name: 'Edit_Tabs',
  setup(props, { root, emit }) {
    /*-----------------初始化數值----------------------*/
    const changeAble = reactive(['name', 'phoneNumber']);
    const dialogFormVisible = ref(false);
    const formLabelWidth = ref('120px');
    const DataTransform = reactive({
      name: {
        label: '姓名'
      },
      gender: {
        label: '性 別'
      },
      phoneNumber: {
        label: '電 話'
      },
      cardNumber: {
        label: '卡 號'
      },
      level: {
        label: '等 級'
      },
      amount: {
        label: '金 額'
      },
      note: {
        label: '備 註'
      }
    });
    // ( 獲取數據容器 )
    const renderData = reactive({
      table: {}
    });
    const data = computed(() => {
      return root.$store.state.userData.userForm;
    });
    /*---------------函數----------------------*/

    const getData = () => {
      console.log(root.$store.state.userData.userForm);
      let data = root.$store.state.userData.userForm;
      for (let key in data) {
        if (DataTransform[key]) {
          root.$set(renderData.table, key, data[key]);
        }
      }
    };

    // ( 提交數據 )
    const submitEdit = () => {
      let sendData = {
        name: renderData.table.name,
        phoneNumber: renderData.table.phoneNumber,
        note: renderData.table.note
      };

      let orginalUserData = root.$store.state.userData.userForm;

      let result = Object.keys(sendData).every(item => {
        return sendData[item] == orginalUserData[item];
      });
      if (result) {
        return;
      } else {
        sendEditRequest(sendData);
      }
    };

    const sendEditRequest = data => {
      root.$store
        .dispatch('userData/UPDATE_USER_DATA', data)
        .then(response => {
          root.$message({
            message: '成功修改 ! ',
            type: 'success'
          });
          dialogFormVisible = false;
        })
        .catch(error => {
          return false;
        });
    };

    return {
      renderData,
      getData,
      changeAble,
      DataTransform,
      submitEdit,
      dialogFormVisible,
      formLabelWidth,
      data
    };
  }
};
</script>
<style lang="scss" scoped></style>
