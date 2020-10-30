<template>
  <div id="user-wrap">
    <el-row>
      <el-col :span="22">
        <SearchVue
          :config="data.search_data.config"
          :content="data.search_data.content"
          ref="searchValue"
        />
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="SearchUser">查询</el-button>
      </el-col>
    </el-row>

    <!------ profile 頭像 ------>
    <el-row style="height: 70%;" :gutter="20">
      <el-col
        :span="10"
        class="
            profile
            floatL"
      >
        <img :src="imageUrl" alt="" />
        <!------ Tabs 切換欄 ------>

        <TabBar />
      </el-col>
      <!------ Form 表格 ------>
      <el-col :span="14">
        <ul>
          <li
            v-for="(val, key, index) in data.formData"
            :key="index"
            class="operation_form clearFix"
          >
            <label> {{ data.DataTransform[key].label }}</label>
            <p>
              <span>{{ val }}</span>
            </p>
          </li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Search, GETPROFILE } from '@/api/user.js';
import TabBar from './Components/Tabs.vue';
import SearchVue from '@c/Search';

//vue3.0 composition-api
import { reactive, ref, computed, watch } from '@vue/composition-api';
export default {
  name: 'operation',
  components: { TabBar, SearchVue },
  setup(prop, { root, refs }) {
    /*-----------------初始化數值----------------------*/
    const searchValue = ref('');
    // ( 新上傳頭貼地址 )
    const imageUrl = ref('https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png');
    const data = reactive({
      inputValue: {},
      // ( search模塊config )
      search_data: {
        config: {
          model: '',
          size: '',
          labelWidth: ''
        },
        content: [
          {
            type: 'Input',
            label: '搜索',
            prop: 'search',
            placeholder: '請輸入姓名...'
          }
        ]
      },
      // ( 表單數據 )
      formData: {
        name: '',
        gender: '',
        phoneNumber: '',
        cardNumber: '',
        level: '',
        amount: '',
        note: ''
      },
      // ( 表單數據英轉中 )
      DataTransform: {
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
      }
    });
    // ( 監聽Vuex的userForm,將後臺英文數據轉中文 )
    const vuexData = computed({
      get: () => {
        for (let key in root.$store.state.userData.userForm) {
          console.log('changing');
          if (data.DataTransform[key]) {
            root.$set(data.formData, key, root.$store.state.userData.userForm[key]);
          }
        }
        return root.$store.state.userData.userForm;
      }
    });
    watch(vuexData, (newValue, oldValue) => {
      return newValue;
    });
    /*-----------------函數聲明---------------------*/

    const SearchUser = () => {
      const value = refs.searchValue.valueInput;

      if (value == '') {
        root.$message.error('請輸入關鍵字');
      }
      searchValue.value = value;
      checkUser(value);
    };

    const checkUser = value => {
      Search(value).then(SearchResponse => {
        if (SearchResponse.data === '') {
          root.$message.error('查無此用戶，請再次輸入');
          return;
        }

        GETPROFILE(value).then(response => {
          // ( 後台數據用戶沒有頭像時默認圖片地址 )
          if (response.data.byteLength === 0) {
            SearchResponse.data.pic =
              'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
          } else {
            // ( 後台數據用戶有頭像時轉義 )
            let img =
              'data:image/png;base64,' +
              btoa(
                new Uint8Array(response.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ''
                )
              );
            imageUrl.value = img;

            for (let key in SearchResponse.data) {
              if (data.DataTransform[key]) {
                root.$set(data.formData, key, SearchResponse.data[key]);
              }
            }
            root.$store.commit('userData/RENDER_USER', SearchResponse.data);
            root.$store.commit('userData/SET_TABS_DISABLED', false);
          }
        });
      });
    };
    return {
      vuexData,
      searchValue,
      SearchUser,
      data,
      imageUrl
    };
  }
};
</script>
<style lang="scss" scoped>
li {
  width: 100%;
  padding: 4px;
  margin-top: 10px;
  p {
    width: 50%;
    background-color: #ecf8ff;
    line-height: 30px;
    float: left;
    border-radius: 10px;
    span {
      display: inline-block;
      height: 30px;
    }
  }
}

.operation_form label {
  float: left;
  width: 100px;
}
#user-wrap {
  text-align: center;
}
.ces-search {
  text-align: right;
}
.profile {
  height: 100%;
}
.profile::after {
  content: '';
  vertical-align: middle;
  height: 100%;
  display: inline-block;
  width: 0;
  overflow: hidden;
}
.profile > img {
  object-fit: fill;
  width: 200px;
  vertical-align: middle;
  border: 1px solid #f7f7f7;
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
