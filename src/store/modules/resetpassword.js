import {RESETPASSWORD_SUCCESS, RESETPASSWORD_ERROR} from "@/store/actions/resetpassword";
import Vue from "vue"

export const state = {
    snackbar: false,
    success: false,
    errorMsg: '',
    fail: false,
};

export const getters = {};

export const actions = {
    resetPasswordRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/password/reset', req)
                .then((resp) => {
                    commit(RESETPASSWORD_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESETPASSWORD_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [RESETPASSWORD_SUCCESS]: (state) => {
        state.snackbar = true
        state.success = true
    },
    [RESETPASSWORD_ERROR]: (state, e) => {
        state.snackbar = true
        state.errorMsg = e.response.data.data.message
        state.fail = true
    },
};

export default
{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}