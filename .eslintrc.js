module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  rules: {
    quotes: [1, 'single'],
    'comma-dangle': 0,
    'handle-callback-err': 0,
    'prettier/prettier': 'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 關閉語句強制分號結尾規則
    semi: [0],
    // 關閉字串強制單引號或雙引號規則
    // 關閉在函數括號前禁用空格規則
    'space-before-function-paren': 0,
    // 關閉main.js中引入公用文件但未立即引用時出現 '變數名 is defind but never used' 的錯誤提示
    'no-unused-vars': 'off', // 作用於 js 代碼，關閉"'xxx' is defined but never used"提示
    'vue/no-unused-vars': 'off', // 作用於 vue 模板，關閉"'xxx' is defined but never used"提示
    'no-undef': 'off', // 關閉"'xxx' is not defined"提示
    'space-before-function-paren': 0,
  },
}
