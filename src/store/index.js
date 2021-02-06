import Vue from "vue"
import Vuex from "vuex"
import sidebar from "@/store/modules/sidebar"
import header from "@/store/modules/header"
import footer from "@/store/modules/footer"
import translation from "@/store/modules/translation"
import theme from "@/store/modules/theme"
import auth from "@/store/modules/auth"
import rules from "@/store/modules/rules"
import user from "@/store/modules/user"
import snackbar from "@/store/modules/snackbar"
import social_medias from "@/store/modules/social_medias"
import resetPassword from "@/store/modules/resetpassword"
import restore from "@/store/modules/restore"
import signup from "@/store/modules/signup"
import general_settings from "@/store/modules/general_settings"
import posts from "@/store/modules/posts"
import roles from "@/store/modules/roles"
import permissions from "@/store/modules/permissions"
import accounts from "@/store/modules/accounts"
import users_manager from "@/store/modules/users_manager"
import proxy_manager from "@/store/modules/proxy_manager"
import text_templates from "@/store/modules/text_templates"
import payments from "@/store/modules/payments"
import social_settings from "@/store/modules/social_settings"
import watermark from "@/store/modules/watermark"
import facebook_accounts from "@/store/modules/facebook_accounts"
import linkedin_accounts from "@/store/modules/linkedin_accounts"
import notifications from "@/store/modules/notifications"
import direct_message from "@/store/modules/direct_message"
import general_storage from "@/store/modules/general_storage"

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    navigations: {
      namespaced: true,
      modules: {
        header,
        sidebar,
        footer
      },
    },
    scheme: {
      namespaced: true,
      modules: {
        theme,
      },
    },
    translation,
    auth,
    rules,
    user,
    snackbar,
    social_medias,
    text_templates,
    resetPassword,
    restore,
    roles,
    permissions,
    signup,
    ...general_settings,
    posts,
    accounts,
    users_manager,
    proxy_manager,
    payments,
    ...social_settings,
    watermark,
    facebook_accounts,
    linkedin_accounts,
    notifications,
    direct_message,
    general_storage
  }
});
