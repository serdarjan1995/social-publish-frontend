import {UPDATE_OAUTH_SUCCESS, UPDATE_OAUTH_ERROR} from "@/store/actions/general_settings";
import Vue from "vue"

export const state = {
    snackbar: false,
};

export const getters = {};

export const actions = {

    updateOAuthLogin: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('LINK TO BE PROVIDED', req)
                .then((resp) => {
                    commit(UPDATE_OAUTH_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_OAUTH_ERROR, e)
                    reject(e)
                })
        })
    }
};

export const mutations = {
    [UPDATE_OAUTH_SUCCESS]: (state) => {
        state.snackbar = true
    },
    [UPDATE_OAUTH_ERROR]: (state) => {
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