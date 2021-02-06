import Vue from "vue"
import {RULE_GET_SUCCESS, RULE_GET_ERROR } from "@/store/actions/rules";
import snackbar from "@/store/modules/snackbar";
export const state = {
    hasLoadedOnce: false,
    user_rules: []
}

export const getters ={}

export const actions = {
    getRule: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/rules/check')
                .then((resp) => {
                    commit(RULE_GET_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(RULE_GET_ERROR, e.response.data)
                    reject(e)
                })
        })
    }
};

export const mutations = {
    [RULE_GET_SUCCESS]: (state, payload) => {
        localStorage.setItem('user_permissions', JSON.stringify(payload.rules))
        state.hasLoadedOnce = true
    },
    [RULE_GET_ERROR]: (state, payload) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
