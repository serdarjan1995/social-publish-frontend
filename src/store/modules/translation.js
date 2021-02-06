import * as mutationTypes from "../mutation-types";
import config from "@/config/index";
import { createI18n } from "@/i18n";
import axios from "axios";
import store from "@/store";
const i18n = createI18n();

export const state = config.locale;
export const getters = {
  locale: state => state.locale
};

export const mutations = {
  [mutationTypes.SET_LOCALE]: (state, payload) => {
    state.locale = payload !== undefined ? payload : "en";
    i18n.loadLanguageAsync(payload);
    axios.defaults.headers.Locale = store.getters.locale
  }
};

export const actions = {
  setLocale: ({ commit }, payload) => {
    commit(mutationTypes.SET_LOCALE, payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
