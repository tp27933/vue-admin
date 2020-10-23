<template>
  <div id="login">
    <div class="login_wrap">
      <ul class="menu-tab">
        <!---表單切換面板-->
        <li
          v-for="(item, index) in menuTab"
          :key="item.id"
          @click="toggleMenu(item, index)"
          :class="{ current: selected == index }"
        >
          {{ item.txt }}
        </li>
      </ul>

      <!---表單 start-->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login_form"
        size="medium"
      >
        <el-form-item
          prop="uesername"
          class="item_form"
        >
          <label>郵箱</label>
          <el-input
            type="text"
            v-model="ruleForm.uesername"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="paw"
          class="item_form"
          minlength="6"
          maxlength="20"
        >
          <label>密碼</label>
          <el-input
            type="text"
            v-model="ruleForm.paw"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="paws"
          class="item_form"
          v-if="model === 'register'"
          minlength="6"
          maxlength="20"
        >
          <label>重複密碼</label>
          <el-input
            type="text"
            v-model="ruleForm.paws"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item
          prop="code"
          class="item_form"
        >
          <label>驗證碼</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input
                v-model="ruleForm.code"
                minlength="6"
                maxlength="20"
              ></el-input>
            </el-col>

            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="outSms()"
                :disabled="codeButtonSatus.satus"
              >
                {{ codeButtonSatus.text }}
              </el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!---送出按鈕-->
        <el-form-item>
          <el-button
            type="danger"
            class="margin_top block"
            @click="submitForm('loginForm')"
            :disabled="loginButtonSatus"
          >
            {{ model == 'login' ? '登入' : '註冊' }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
//引入攔截請求
import { getSms, register, Login } from '@/api/login'
//vue3.0 composition-api
import { reactive, ref, onMounted } from '@vue/composition-api'
//引入封裝過後的函數
import {
  stripscript,
  validateEmail,
  validatePass,
  validateCo,
} from '@/utils/validate'

export default {
  name: 'login',

  setup (props, context) {
    //驗證用戶名
    let validateUersname = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('請輸入用戶  '))
      } else if (validateEmail(value)) {
        callback(new Error('用戶格式有誤'))
      } else {
        callback()
      }
    }
    //驗證密碼
    let validatePassword = (rule, value, callback) => {
      ruleForm.paw = stripscript(value)
      value = ruleForm.paw

      if (value === '') {
        callback(new Error('請輸入密碼'))
      } else if (validatePass(value)) {
        callback(new Error('密碼為6至20數字和字母'))
      } else {
        callback()
      }
    }

    //驗證重複密碼
    var validatePasswords = (rule, value, callback) => {
      ruleForm.paws = stripscript(value)
      value = ruleForm.paws
      if (model / value === 'login') {
        callback()
      }
      if (value === '') {
        callback(new Error('請輸入密碼'))
      } else if (value != ruleForm.paw) {
        callback(new Error('密碼不一致'))
      } else {
        callback()
      }
    }
    //驗證表單
    var validatecode = (rule, value, callback) => {
      if (value === '') {
        return callback(new Error('請輸入驗證碼'))
      } else if (validateCo(value)) {
        return callback(new Error('驗證碼格式有誤'))
      } else {
        callback()
      }
    }
    //---------------====數據聲明------------------------------//

    const menuTab = reactive([
      { txt: '登入', type: 'login' },
      { txt: '註冊', type: 'register' },
    ])

    //模塊值
    const model = ref('login')
    const selected = ref('0')
    const timer = ref(null)
    const codeButtonSatus = reactive({
      satus: false,
      text: '獲取驗證碼',
    })
    const loginButtonSatus = ref(true)

    //表單數據
    const ruleForm = reactive({
      uesername: '',
      paw: '',
      paws: '',
      code: '',
    })

    const rules = reactive({
      uesername: [{ validator: validateUersname, trigger: 'blur' }],
      paw: [{ validator: validatePassword, trigger: 'blur' }],
      paws: [{ validator: validatePasswords, trigger: 'blur' }],
      code: [{ validator: validatecode, trigger: 'blur' }],
    })

    //--------------------函數聲明------------------------------//

    //切換功能
    const toggleMenu = (item, index) => {
      selected.value = index
      model.value = item.type
      //this.$refs[formName].resetFields();
      context.refs['loginForm'].resetFields()
      clearCountDown()
    }

    //
    const outSms = () => {
      if (ruleForm.uesername == '') {
        context.root.$message.error('信箱不能為空')
        clearCountDown()
        return false
      }
      if (validateEmail(ruleForm.uesername)) {
        context.root.$message.error('信箱格式有誤，請重新輸入')
        clearCountDown()
        return false
      }

      //信箱輸入正確後才發送axious請求
      let responseData = {
        username: ruleForm.uesername,
        module: model.value,
      }
      codeButtonSatus.satus = true
      codeButtonSatus.text = '發送中'
      getSms(responseData)
        .then((response) => {
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })
          console.log(response)

          loginButtonSatus.value = false
          countDown(5)
        })
        .catch((error) => {
          console.log(error)
        })
    }
    //送出請求
    const submitForm = (formName) => {
      console.log(formName)
      context.refs[formName].validate((valid) => {
        /*注意!!使用v-show 重複輸入密碼的輸入框沒有消失，
        在登入時會因為重複密碼沒有輸入到而讓vaild返回false，所以必須用v-if!!!!*/
        if (valid) {
          model.value === 'login' ? loginOut() : registerOut()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    //倒數計時
    const countDown = (number) => {
      var time = number
      //計時再次發送驗證碼時間
      timer.value = setInterval(() => {
        time--
        if (time === 0) {
          clearInterval(timer.value)
          codeButtonSatus.satus = false
          codeButtonSatus.text = '再次發送'
        } else {
          codeButtonSatus.text = `倒數計時${time}秒`
        }
      }, 1000)
    }
    //登入請求
    const loginOut = () => {
      //獲取用戶登入資訊
      let requestData = {
        username: ruleForm.uesername,
        password: ruleForm.paw,
        code: ruleForm.code,
      }
      Login(requestData)
        .then((response) => {
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })

          context.root.$router.push({
            name: 'Home',
          })
        })
        .catch((error) => {
          return false
        })
    }
    //註冊請求
    const registerOut = () => {
      //獲取用戶註冊訊息
      let reguestData = {
        username: ruleForm.uesername,
        password: ruleForm.paw,
        code: ruleForm.code,
        module: 'register',
      }

      register(reguestData)
        .then((response) => {
          let data = response.data
          context.root.$message({
            message: data.message,
            type: 'success',
          })
          //註冊完後頁面自動跳轉到登入頁面
          toggleMenu(menuTab[0])
          clearCountDown()
        })
        .catch((error) => { })
    }
    //清除倒數計時
    const clearCountDown = () => {
      codeButtonSatus.satus = false
      codeButtonSatus.text = '獲取驗證碼'
      clearInterval(timer.value)
    }

    //生命週期
    onMounted(() => { })
    return {
      menuTab,
      model,
      selected,
      ruleForm,
      timer,
      codeButtonSatus,
      loginButtonSatus,
      countDown,
      rules,
      toggleMenu,
      clearCountDown,
      submitForm,
      outSms,
      Login,
    }
  },
}
</script>
<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login_wrap {
  width: 330px;
  margin: auto;
}
.menu-tab {
  text-align: center;
  li {
    display: inline-block;
    width: 88px;
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #ffff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current {
  background-color: rgba(0, 0, 0, 0.1);
}

//表單 :start

.login_form {
  margin-top: 29px;
  label {
    display: block;
    margin-bottom: 3px;
    font-size: 14px;
    color: #ffff;
  }
}
.item_form {
  margin-bottom: 13px;
}
.block {
  width: 100%;
  display: block;
}
.margin_top {
  margin-top: 25px;
}
</style>
