<template>
  <div id="deposit">
    <el-dialog title="金額操作" :visible.sync="dialogFormVisible" @close="resetFields('dynamicValidateForm')">
      <el-form
        :model="dynamicValidateForm"
        ref="dynamicValidateForm"
        label-width="120px"
        class="demo-dynamic"
      >
        <el-form-item label="操作">
          <el-radio-group
            v-model="dynamicValidateForm.type"
            placeholder="請選擇操作方式"
            size="medium"
            @change="toggleMenu"
          >
            <el-radio label="deposit">儲值</el-radio>
            <el-radio label="withdraw">扣款</el-radio>
          </el-radio-group>
        </el-form-item>
        <!----------------切換至--------------------->

        <div class="deposit" v-if="option === 'deposit'">
          <el-form-item
            label="金額"
            prop="depositAmount"
            :rules="[
              { required: true, message: '年龄不能为空' },
              { type: 'number', message: '年龄必须为数字值' }
            ]"
          >
            <el-input
              v-model.number="dynamicValidateForm.depositAmount"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <h2 class="fixbug">總金額 :{{ depositTotal }}</h2>
        </div>

        <!----------------切換至扣款--------------------->
        <div class="withdraw" v-else>
          <el-form-item
            v-for="(domain, index) in dynamicValidateForm.domains"
            label="金額"
            :key="domain.key"
            :prop="'domains.' + index + '.value'"
            :rules="{
              required: true,
              message: '域名不能为空',
              trigger: 'blur'
            }"
          >
            <el-form-item
              :prop="'domains.' + index + '.amount'"
              :rules="[
                { required: true, message: '请输入金額', trigger: 'blur' },
                {
                  type: 'number',
                  message: '请输入數字類型',
                  trigger: ['blur', 'change']
                }
              ]"
              class="floatL"
            >
              <el-input v-model.number="dynamicValidateForm.domains[index].amount"></el-input>
            </el-form-item>

            <el-select
              v-model="dynamicValidateForm.domains[index].value"
              placeholder="請選擇消費類型"
              class="floatL"
              popper-class="typeOptions"
              :popper-append-to-body="false"
            >
              <el-option
                v-for="item in typeSelect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>

            <el-button @click="addDomain">新增項目</el-button>
            <el-button @click.prevent="removeDomain(domain)">删除</el-button>

            <h2>總金額 :{{ withdrawTotal }}</h2>
          </el-form-item>
        </div>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit('dynamicValidateForm')">
          确 定
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { Deposit, Withdraw } from '@/api/user.js';

import { reactive, ref, computed } from '@vue/composition-api';
export default {
  name: 'deposit',
  setup(prop, { root, refs }) {
    /*-----------------初始化數值----------------------*/
    const option = ref('deposit');
    const dialogFormVisible = ref(false);
    const formLabelWidth = '120px';
    const typeSelect = reactive([
      {
        label: '剪髮',
        value: 'haircut'
      },
      {
        label: '染髮',
        value: 'color'
      },
      {
        label: '燙髮',
        value: 'perm'
      },
      {
        label: '護理',
        value: 'treatment'
      },
      {
        label: '其他',
        value: 'others'
      }
    ]);
    const dynamicValidateForm = reactive({
      domains: [
        {
          value: '',
          amount: ''
        }
      ],
      depositAmount: '',
      type: 'deposit'
    });

    //-----------------監聽數值----------------------//
    // ( 儲值總額 )
    const depositTotal = computed(() => {
      if (isNaN(dynamicValidateForm.depositAmount)) {
        return +0;
      } else {
        return dynamicValidateForm.depositAmount;
      }
    });
    // ( 扣款總額 )
    const withdrawTotal = computed(() => {
      return dynamicValidateForm.domains.reduce((pre, cur) => {
        if (isNaN(cur.amount)) {
          return pre;
        } else {
          return pre + cur.amount;
        }
      }, 0);
    });

    /*-----------------函數聲明----------------------*/

    // ( 切換操作類型 )
    const toggleMenu = () => {
      //切換顯示框
      option.value = dynamicValidateForm.type;
      //重置表單
      refs['dynamicValidateForm'].resetFields();
      //將扣款表單的新增項目重置
      dynamicValidateForm.domains.splice(1, dynamicValidateForm.domains.length - 1);
    };

    // ( 上傳表單 )
    const submit = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          dynamicValidateForm.type === 'deposit' ? deposit() : widthdraw();
          dialogFormVisible.value = false;
        } else {
          root.$message.error('信箱不能為空');
        }
      });
    };
    // ( 儲值操作 )
    const deposit = () => {
      let user = root.$store.state.userData.userForm;
      let requestData = {
        name: user.name,
        cardNumber: user.cardNumber,
        amount: dynamicValidateForm.depositAmount,
        type: dynamicValidateForm.type
      };

      Deposit(requestData)
        .then(response => {
          root.$store.commit('userData/RENDER_USER', response.data);
          root.$message({
            message: '成功操作',
            type: 'success'
          });
        })
        .catch(err => {
          console.log(err);
          root.$message({
            message: '出現問題,請稍後在試',
            type: 'error'
          });
        });
    };
    // ( 扣款操作 )

    const widthdraw = () => {
      let user = root.$store.state.userData.userForm;
      let requestData = {
        name: user.name,
        cardNumber: user.cardNumber,
        type: dynamicValidateForm.type,
        detail: dynamicValidateForm.domains
      };

      Withdraw(requestData)
        .then(response => {
          root.$store.commit('userData/RENDER_USER', response.data);
          root.$message({
            message: '操作成功',
            type: 'success'
          });
        })
        .catch(error => {
          root.$message({
            message: error,
            type: 'error'
          });
        });
    };

    const removeDomain = item => {
     
      var index = dynamicValidateForm.domains.indexOf(item);
      if (index !== -1 && dynamicValidateForm.domains.length!==1) {
         console.log(dynamicValidateForm.domains.length);
        dynamicValidateForm.domains.splice(index, 1);
      }
    };
    // ( 新增扣款項目 )
    const addDomain = () => {
      dynamicValidateForm.domains.push({
        value: '',
        key: Date.now(),
        amount: ''
      });
    };

    const resetFields = () => {
        refs['dynamicValidateForm'].resetFields();
    };
    return {
      resetFields,
      typeSelect,
      deposit,
      widthdraw,
      submit,
      option,
      toggleMenu,
      depositTotal,
      withdrawTotal,
      removeDomain,
      dynamicValidateForm,
      addDomain,
      dialogFormVisible,
      formLabelWidth
    };
  }
};
</script>

<style lang="scss" scoped>
.el-form-item__error {
  top: 60%;
}

</style>
