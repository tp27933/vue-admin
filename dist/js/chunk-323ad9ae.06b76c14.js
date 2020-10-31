(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["chunk-323ad9ae"],{

/***/ "2aa4":
/*!********************************************************************!*\
  !*** ./src/views/member/signup/index.vue?vue&type=script&lang=js& ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/cache-loader/dist/cjs.js??ref--12-0!../../../../node_modules/thread-loader/dist/cjs.js!../../../../node_modules/babel-loader/lib!../../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=script&lang=js& */ "45e7");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_cache_loader_dist_cjs_js_ref_12_0_node_modules_thread_loader_dist_cjs_js_node_modules_babel_loader_lib_index_js_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "35bb":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1ba3292c-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/member/signup/index.vue?vue&type=template&id=268a7667& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"signup-wrap"}},[_c('el-form',{ref:"ruleForm",attrs:{"rules":_vm.rules,"model":_vm.ruleForm,"label-width":"100px","id":"allform floatL","enctype":"multipart/form-dat"}},[_c('div',{staticClass:"upload floatL"},[_c('el-upload',{ref:"upload",staticClass:"upload_container avatar-uploader",class:{ hide: _vm.hideUpload },attrs:{"action":"https://www.mocky.io/v2/5185415ba171ea3a00704eed/posts/","list-type":"picture-card","before-upload":_vm.beforeAvatarUpload,"on-preview":_vm.handlePictureCardPreview,"on-remove":_vm.handleRemove,"on-change":_vm.pictureOnchange}},[_c('i',{staticClass:"el-icon-plus"})])],1),_c('div',{staticClass:"form floatL "},[_vm._l((_vm.labelData),function(item,index){return [_c('el-form-item',{key:index,attrs:{"label":item.label,"prop":item.lableProp}},[(item.lableProp === 'gender')?[_c('el-radio-group',{model:{value:(_vm.ruleForm.gender),callback:function ($$v) {_vm.$set(_vm.ruleForm, "gender", $$v)},expression:"ruleForm.gender"}},[_c('el-radio',{attrs:{"label":"女"}}),_c('el-radio',{attrs:{"label":"男"}})],1)]:(item.lableProp === 'level')?[_c('el-select',{attrs:{"placeholder":"请选择會員卡等級"},model:{value:(_vm.ruleForm.level),callback:function ($$v) {_vm.$set(_vm.ruleForm, "level", $$v)},expression:"ruleForm.level"}},[_c('el-option',{attrs:{"label":"銀卡 ","value":"sliver"}}),_c('el-option',{attrs:{"label":"黃金","value":"gold"}}),_c('el-option',{attrs:{"label":"vip","value":"vip"}})],1)]:(item.lableProp === 'note')?[_c('el-input',{attrs:{"type":"textarea"},model:{value:(_vm.ruleForm.note),callback:function ($$v) {_vm.$set(_vm.ruleForm, "note", $$v)},expression:"ruleForm.note"}})]:(item.lableProp === 'name')?[_c('el-input',{attrs:{"type":"text"},model:{value:(_vm.ruleForm.name),callback:function ($$v) {_vm.$set(_vm.ruleForm, "name", $$v)},expression:"ruleForm.name"}})]:_c('el-input',{model:{value:(_vm.ruleForm[item.lableProp]),callback:function ($$v) {_vm.$set(_vm.ruleForm, item.lableProp, _vm._n($$v))},expression:"ruleForm[item.lableProp]"}})],2)]}),_c('el-form-item',[_c('el-button',{attrs:{"type":"primary"},on:{"click":function($event){return _vm.submitForm('ruleForm')}}},[_vm._v(" 立即创建 ")]),_c('el-button',{on:{"click":function($event){return _vm.resetForm('ruleForm')}}},[_vm._v("重置")])],1)],2)]),_c('el-dialog',{attrs:{"visible":_vm.dialogVisible},on:{"update:visible":function($event){_vm.dialogVisible=$event}}},[_c('img',{attrs:{"width":"100%","src":_vm.dialogImageUrl,"alt":""}})])],1)}
var staticRenderFns = []



/***/ }),

/***/ "45e7":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/member/signup/index.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.array.map */ "d81d");
/* harmony import */ var core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_array_map__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.function.name */ "b0c0");
/* harmony import */ var core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_function_name__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _api_user_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/api/user.js */ "c24f");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @vue/composition-api */ "e4fd");
/* harmony import */ var _vue_composition_api__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__);


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'signup',
  setup: function setup(props, _ref) {
    var root = _ref.root,
        refs = _ref.refs;

    /*-----------------初始化數值----------------------*/
    //( 表單label數據 )
    var labelData = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["reactive"])([{
      label: '姓名',
      lableProp: 'name'
    }, {
      label: '性別',
      lableProp: 'gender'
    }, {
      label: '卡號',
      lableProp: 'cardNumber'
    }, {
      label: '電話',
      lableProp: 'phoneNumber'
    }, {
      label: '卡別',
      lableProp: 'level'
    }, {
      label: '儲值金',
      lableProp: 'amount'
    }, {
      label: '備註',
      lableProp: 'note'
    }]);
    var hideUpload = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false); // ( 上傳縮略圖 )

    var dialogImageUrl = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])('');
    var dialogVisible = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["ref"])(false); // ( 表單數據容器 )

    var ruleForm = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["reactive"])({
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
    var rules = Object(_vue_composition_api__WEBPACK_IMPORTED_MODULE_3__["reactive"])({
      name: [{
        required: true,
        message: '请输入名字',
        trigger: 'blur'
      }],
      gender: [{
        required: true,
        message: '请选择性別',
        trigger: 'change'
      }],
      phoneNumber: [{
        required: true,
        message: '電話號碼不能为空'
      }, {
        type: 'number',
        message: '號碼必须为数字值'
      }],
      cardNumber: [{
        required: true,
        message: '卡號不能为空'
      }, {
        type: 'number',
        message: '卡號必须为数字值'
      }],
      level: [{
        required: true,
        message: '请选择活會員卡級別',
        trigger: 'change'
      }],
      amount: [{
        required: true,
        message: '请輸入金額'
      }, {
        type: 'number',
        message: '金額必须为数字值'
      }]
    });

    var beforeAvatarUpload = function beforeAvatarUpload(file) {
      var isJPG = file.type === 'image/jpeg';
      var isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        root.$message.error('上传头像图片只能是 JPG 格式!');
      }

      if (!isLt2M) {
        root.$message.error('上传头像图片大小不能超过 2MB!');
      }

      return isJPG && isLt2M;
    };

    var submitForm = function submitForm(formName) {
      refs[formName].validate(function (valid) {
        if (valid) {
          signup();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    };

    var signup = function signup() {
      var fileArray = refs.upload.uploadFiles; // 实例化大頭貼对象

      var pic = new FormData(); // 实例化FormData对象

      var formData = new FormData(); // Currently empty
      // 遍历圖片，将所有文件存入fd中

      fileArray.map(function (element) {
        pic.append('avatar', element.raw);
      }); //獲取用戶登入資訊

      var requestData = {
        name: ruleForm.name,
        gender: ruleForm.gender,
        phoneNumber: ruleForm.phoneNumber,
        cardNumber: ruleForm.cardNumber,
        level: ruleForm.level,
        amount: ruleForm.amount,
        note: ruleForm.note,
        type: ruleForm.type
      }; // 遍历表單數據，将所有文件存入fd中

      for (var key in ruleForm) {
        formData.append(key, ruleForm[key]);
      }

      Object(_api_user_js__WEBPACK_IMPORTED_MODULE_2__["Signup"])(requestData, pic).then(function (response) {
        root.$message({
          message: '註冊成功',
          type: 'success'
        }); // root.$router.push({
        //   name: 'Operation',
        // })
      }).catch(function (error) {
        root.$message({
          message: '出現錯誤,請稍後再嘗試',
          type: 'fail'
        });
      });
    };

    var resetForm = function resetForm(formName) {
      refs[formName].resetFields();
    };

    var handleRemove = function handleRemove(file, fileList) {
      hideUpload.value = false;
    };

    var handlePictureCardPreview = function handlePictureCardPreview(file) {
      dialogImageUrl.value = file.url;
      dialogVisible.value = true;
    };

    var pictureOnchange = function pictureOnchange(file, fileList) {
      hideUpload.value = true;
    };

    return {
      labelData: labelData,
      submitForm: submitForm,
      resetForm: resetForm,
      pictureOnchange: pictureOnchange,
      hideUpload: hideUpload,
      handleRemove: handleRemove,
      handlePictureCardPreview: handlePictureCardPreview,
      ruleForm: ruleForm,
      rules: rules,
      Signup: _api_user_js__WEBPACK_IMPORTED_MODULE_2__["Signup"],
      dialogVisible: dialogVisible,
      dialogImageUrl: dialogImageUrl,
      beforeAvatarUpload: beforeAvatarUpload
    };
  }
});

/***/ }),

/***/ "980b":
/*!*****************************************************************************!*\
  !*** ./src/views/member/signup/index.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../../node_modules/postcss-loader/src??ref--8-oneOf-1-2!../../../../node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!../../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=style&index=0&lang=scss& */ "ca0f");
/* harmony import */ var _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b007":
/*!*******************************************!*\
  !*** ./src/views/member/signup/index.vue ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=268a7667& */ "fa02");
/* harmony import */ var _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js& */ "2aa4");
/* empty/unused harmony star reexport *//* harmony import */ var _index_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.vue?vue&type=style&index=0&lang=scss& */ "980b");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "2877");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _index_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__["render"],
  _index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "ca0f":
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--8-oneOf-1-2!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-3!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/views/member/signup/index.vue?vue&type=style&index=0&lang=scss& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "fa02":
/*!**************************************************************************!*\
  !*** ./src/views/member/signup/index.vue?vue&type=template&id=268a7667& ***!
  \**************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1ba3292c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"1ba3292c-vue-loader-template"}!../../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../node_modules/cache-loader/dist/cjs.js??ref--0-0!../../../../node_modules/vue-loader/lib??vue-loader-options!./index.vue?vue&type=template&id=268a7667& */ "35bb");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1ba3292c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_cache_loader_dist_cjs_js_cacheDirectory_node_modules_cache_vue_loader_cacheIdentifier_1ba3292c_vue_loader_template_node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_template_id_268a7667___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);