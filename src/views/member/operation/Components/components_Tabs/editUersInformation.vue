<template>
  <div id="edit-wrap">
    <el-dialog title="修改資料" :visible.sync="dialogFormVisible" @open="getData()">
      <el-form ref="renderData.table" :model="renderData.table" label-width="80px" :rules="rules">
        <template v-for="(val, key, index) in renderData.table">
          <el-form-item
            :key="index"
            v-if="DataTransform[key]"
            :label="DataTransform[key].label + ' :'"
            :prop="key"
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
                maxlength="60"
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
        <el-button type="primary" @click="submitEdit('renderData.table')" :disabled="disabled"
          >确 定</el-button
        >
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, computed, onBeforeMount, watch } from '@vue/composition-api';
import { UpdataUserData } from '@/api/user.js';
export default {
  name: 'Edit_Tabs',
  setup(props, { root, emit, refs }) {
    /*-----------------初始化數值----------------------*/
    const changeAble = reactive(['name', 'phoneNumber']);
    const dialogFormVisible = ref(false);
    const disabled = ref(true);
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

    const validatePhone = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入內容'));
      } else {
        if (isNaN(value)) {
          callback(new Error('請輸入數字'));
        }
        callback();
      }
    };

    const rules = reactive({
      name: [
        { required: true, message: '請輸入姓名', trigger: 'blur' },
        { min: 2, max: 5, message: '長度只能2-5字', trigger: 'blur' }
      ],
      phoneNumber: [{ required: true, validator: validatePhone, trigger: 'blur' }]
    });
    /*---------------函數----------------------*/
    const data = computed(() => {
      return root.$store.state.userData.userForm;
    });
    const formData = computed({
      get: () => {
        let orginalUserData = root.$store.state.userData.userForm;
        let result = Object.keys(renderData.table).every(item => {
          return renderData.table[item] == orginalUserData[item];
        });
        disabled.value = result;
        console.log(result);
      }
    });
    watch(formData, (newValue, oldValue) => {
      return formData;
    });

    const getData = () => {
      let data = root.$store.state.userData.userForm;
      for (let key in data) {
        if (DataTransform[key]) {
          root.$set(renderData.table, key, data[key]);
        }
      }
    };

    // ( 提交數據 )
    const submitEdit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          let sendData = {
            name: renderData.table.name,
            phoneNumber: renderData.table.phoneNumber,
            note: renderData.table.note
          };
          sendEditRequest(sendData);
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    const sendEditRequest = data => {
      root.$store
        .dispatch('userData/UPDATE_USER_DATA', data)
        .then(response => {
          root.$message({
            message: '成功修改 ! ',
            type: 'success'
          });
          dialogFormVisible.value = false;
        })
        .catch(error => {
          return false;
        });
    };

    return {
      disabled,
      rules,
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
