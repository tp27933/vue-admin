<template>
  <div id="signup-wrap">
    <el-form
      :rules="rules"
      :model="ruleForm"
      ref="ruleForm"
      label-width="100px"
      id="allform floatL"
      enctype="multipart/form-dat"
    >
      <!-- profile upload大頭貼上傳 -->
      <div class="upload floatL">
        <el-upload
          action="https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/"
          ref="upload"
          list-type="picture-card"
          :before-upload="beforeAvatarUpload"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :class="{ hide: hideUpload }"
          :on-change="pictureOnchange"
          class="upload_container avatar-uploader"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </div>
      <!-- form 表格 -->
      <div class="form floatL ">
        <template v-for="(item, index) in labelData">
          <el-form-item :label="item.label" :prop="item.lableProp" :key="index">
            <template v-if="item.lableProp === 'gender'">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="女"></el-radio>
                <el-radio label="男"></el-radio>
              </el-radio-group>
            </template>

            <template v-else-if="item.lableProp === 'level'">
              <el-select v-model="ruleForm.level" placeholder="请选择會員卡等級">
                <el-option label="銀卡 " value="sliver"></el-option>
                <el-option label="黃金" value="gold"></el-option>
                <el-option label="vip" value="vip"></el-option>
              </el-select>
            </template>

            <template v-else-if="item.lableProp === 'note'">
              <el-input type="textarea" v-model="ruleForm.note"></el-input>
            </template>

            <template v-else-if="item.lableProp === 'name'">
              <el-input type="text" v-model="ruleForm.name"></el-input>
            </template>
            <el-input v-else v-model.number="ruleForm[item.lableProp]"></el-input>
          </el-form-item>
        </template>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">
            立即创建
          </el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </div>
    </el-form>
    <!-- zoom-in  大頭貼放大圖 -->
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import { Signup } from '@/api/user.js';

import { reactive, ref, refs } from '@vue/composition-api';
export default {
  name: 'signup',
  setup(props, { root, refs }) {
    /*-----------------初始化數值----------------------*/

    //( 表單label數據 )
    const labelData = reactive([
      {
        label: '姓名',
        lableProp: 'name'
      },
      {
        label: '性別',
        lableProp: 'gender'
      },
      {
        label: '卡號',
        lableProp: 'cardNumber'
      },
      {
        label: '電話',
        lableProp: 'phoneNumber'
      },
      {
        label: '卡別',
        lableProp: 'level'
      },
      {
        label: '儲值金',
        lableProp: 'amount'
      },
      {
        label: '備註',
        lableProp: 'note'
      }
    ]);

    const hideUpload = ref(false);
    // ( 上傳縮略圖 )
    const dialogImageUrl = ref('');
    const dialogVisible = ref(false);
    // ( 表單數據容器 )
    const ruleForm = reactive({
      name: '',
      gender: '',
      phoneNumber: '',
      cardNumber: '',
      level: '',
      amount: '',
      note: '',
      type: 'signup',
      path: ''
    });

    const rules = reactive({
      name: [
        {
          required: true,
          message: '请输入名字',
          trigger: 'blur'
        }
      ],
      gender: [
        {
          required: true,
          message: '请选择性別',
          trigger: 'change'
        }
      ],
      phoneNumber: [
        {
          required: true,
          message: '電話號碼不能为空'
        },
        {
          type: 'number',
          message: '號碼必须为数字值'
        }
      ],
      cardNumber: [
        {
          required: true,
          message: '卡號不能为空'
        },
        {
          type: 'number',
          message: '卡號必须为数字值'
        }
      ],
      level: [
        {
          required: true,
          message: '请选择活會員卡級別',
          trigger: 'change'
        }
      ],
      amount: [
        { required: true, message: '请輸入金額' },
        {
          type: 'number',
          message: '金額必须为数字值'
        }
      ]
    });

    const beforeAvatarUpload = file => {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    };

    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          signup();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    const signup = () => {
      const fileArray = refs.upload.uploadFiles;
      // 实例化大頭貼对象
      const pic = new FormData();
      // 实例化FormData对象
      var formData = new FormData(); // Currently empty
      // 遍历圖片，将所有文件存入fd中
      fileArray.map(element => {
        pic.append('avatar', element.raw);
      });
      //獲取用戶登入資訊
      let requestData = {
        name: ruleForm.name,
        gender: ruleForm.gender,
        phoneNumber: ruleForm.phoneNumber,
        cardNumber: ruleForm.cardNumber,
        level: ruleForm.level,
        amount: ruleForm.amount,
        note: ruleForm.note,
        type: ruleForm.type
      };
      // 遍历表單數據，将所有文件存入fd中
      for (var key in ruleForm) {
        formData.append(key, ruleForm[key]);
      }

      Signup(requestData, pic)
        .then(response => {
          root.$message({
            message: '註冊成功',
            type: 'success'
          });
          // root.$router.push({
          //   name: 'Operation',
          // })
        })
        .catch(error => {
          root.$message({
            message: '出現錯誤,請稍後再嘗試',
            type: 'fail'
          });
        });
    };

    const resetForm = formName => {
      refs[formName].resetFields();
    };

    const handleRemove = (file, fileList) => {
      hideUpload.value = false;
    };
    const handlePictureCardPreview = file => {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
    };

    const pictureOnchange = (file, fileList) => {
      hideUpload.value = true;
    };

    return {
      labelData,
      submitForm,
      resetForm,
      pictureOnchange,
      hideUpload,
      handleRemove,
      handlePictureCardPreview,
      ruleForm,
      rules,
      Signup,
      dialogVisible,
      dialogImageUrl,
      beforeAvatarUpload
    };
  }
};
</script>
<style lang="scss">
#signup-wrap {
  position: relative;
}
.upload {
  width: 30%;
  height: 400 px;
}
.upload_container {
  width: 60%;
  margin: 50px auto;
}
.form {
  width: 60%;
}

.el-upload--picture-card {
  .el-icon-plus {
    line-height: 300px !important;
  }
}

.hide .el-upload--picture-card {
  display: none;
}

.el-upload--picture-card {
  width: 100%;
  height: 300px;
}
.el-upload-list--picture-card {
  .el-upload-list__item {
    width: 100% !important;
    height: 300px !important;
  }
}
.el-table .warning-row {
  background: oldlace;
}
.el-table .success-row {
  background: #f0f9eb;
}

.avatar-uploader {
  /deep/.el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
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
