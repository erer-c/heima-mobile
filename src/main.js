import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/register-vant'
import 'normalize.css'
import './styles/index.less'
import 'amfe-flexible'// 配置rem适配-动态设置基准值
import './utils/validation'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
