<template>
  <div id="edit-wrap">
    <el-dialog
      title="修改資料"
      :visible.sync="dialogFormVisible"
      @open="getData()"
    >
      <tbody>
        <tr
          v-for="(val,
          key,
          index) in renderData.table"
          :key="index"
        >
          <td v-if="DataTransform[key]">
            {{ DataTransform[key].label }}
          </td>
          <td
            v-if="
              key === 'name' ||
                key === 'phoneNumber'
            "
          >
            <el-input
              v-model="renderData.table[key]"
              placeholder="请输入内容"
              clearable
            >
            </el-input>
          </td>
          <td v-else-if="key == 'note'">
            <el-input
              v-model="renderData.table.note"
              type="textarea"
              placeholder="请输入内容"
              maxlength="100"
              show-word-limit
            >
            </el-input>
          </td>
          <td v-else>{{ val }}</td>
        </tr>
      </tbody>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="dialogFormVisible = false"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitEdit"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  computed,
  onBeforeMount
} from '@vue/composition-api';
import { UpdataUserData } from '@/api/user.js';
export default {
  name: 'Edit_Tabs',
  setup(props, { root, emit }) {
    /*-----------------初始化數值----------------------*/
    const changeAble = reactive([
      'name',
      'phoneNumber'
    ]);
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
      console.log(
        root.$store.state.userData.userForm
      );
      let data =
        root.$store.state.userData.userForm;
      for (let key in data) {
        if (DataTransform[key]) {
          root.$set(
            renderData.table,
            key,
            data[key]
          );
        }
      }
    };

    // ( 提交數據 )
    const submitEdit = () => {
      // dialogFormVisible.value = false
      console.log(renderData.table);
      let sendData = {
        name: renderData.table.name,
        phoneNumber: renderData.table.phoneNumber,
        note: renderData.table.note
      };
      UpdataUserData(data).then(response => {});
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
<style lang="scss" scoped>
tbody {
  width: 100%;
  box-shadow: 3px 3px 12px #ebebeb;
}
#edit-wrap {
  td,
  tr {
    border: 1px solid #ebebeb;
    border-collapse: separate;
  }
  td {
    input,
    textarea {
      background-color: #f4f6f8;
    }
    textarea.el-textarea__inner {
      resize: none !important;
    }
  }
}

td {
  width: 405px;
  height: 25px;
  padding: 10px;
}

.el-avatar {
  width: 200px;
  height: 200px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
