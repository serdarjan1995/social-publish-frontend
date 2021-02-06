import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import "./sass/main.scss"
import { createI18n } from "./i18n/index"
import ckeditor from 'ckeditor4-vue'
import hchart from "highcharts"
import highchartsVue from "highcharts-vue"
import api from "./utils/api"
import rule from "@/plugins/rule"
const i18n = createI18n(store.state.translation.locale).i18n;
Vue.config.productionTip = false;

const token = localStorage.getItem('access-token')
if (token) { api.setToken(token) }
Vue.prototype.api = api

Vue.use({
  install () {
    Vue.api = api
    Vue.api.$helpers = api
  }
})

export const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  rule,
  ckeditor,
  hchart,
  highchartsVue,
  render: (h) => h(App),
}).$mount("#app");
