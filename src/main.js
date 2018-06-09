// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible'

import axios from 'axios'
Vue.prototype.$axios = axios;

import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(MintUi)

import Header from './components/public/header'
import Footer from './components/public/footer'
import Content from './components/public/content'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false


Vue.component("my-header", Header)
Vue.component("my-footer", Footer)
Vue.component("my-content", Content)

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})