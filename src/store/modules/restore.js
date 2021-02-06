import {RESTORE_SUCCESS, RESTORE_ERROR} from "@/store/actions/restore";
import Vue from "vue"

export const state = {
    snackbar: false,
    success: false,
};

export const getters = {};

export const actions = {
    restoreRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/password/forgot', req)
                .then((resp) => {
                    commit(RESTORE_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log(e.response)
                    commit(RESTORE_ERROR, e)
                    reject(e)
                    console.log(e)
                })
        })
    }
};

export const mutations = {
    [RESTORE_SUCCESS]: (state) => {
        state.snackbar = true
        state.success = true
    },
    [RESTORE_ERROR]: (state) => {
        state.snackbar = true
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