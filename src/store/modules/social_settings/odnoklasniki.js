import {
    UPDATE_ODNOKLASNIKICONFIG_SUCCESS,
    UPDATE_ODNOKLASNIKICONFIG_ERROR,
    GET_ODNOKLASNIKICONFIG_SUCCESS,
    GET_ODNOKLASNIKICONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
    okAppKey: '',
};

export const getters = {};

export const actions = {
    getOdnoklasnikiConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_ODNOKLASNIKICONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_ODNOKLASNIKICONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateOdnoklasnikiConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_ODNOKLASNIKICONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_ODNOKLASNIKICONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_ODNOKLASNIKICONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_ODNOKLASNIKICONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_ODNOKLASNIKICONFIG_SUCCESS]: (state, e) => {
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.okAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).okAppKey
    },
    [GET_ODNOKLASNIKICONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.okAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).okAppKey
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}