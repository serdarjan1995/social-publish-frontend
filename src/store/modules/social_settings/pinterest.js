import {
    UPDATE_PINTERESTCONFIG_SUCCESS,
    UPDATE_PINTERESTCONFIG_ERROR,
    GET_PINTERESTCONFIG_SUCCESS,
    GET_PINTERESTCONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
    usernamePassword: false,
    button: false,
    pinterestAppLogin: '',
};

export const getters = {};

export const actions = {

    getPinterestConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_PINTERESTCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_PINTERESTCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updatePinterestConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_PINTERESTCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_PINTERESTCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_PINTERESTCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_PINTERESTCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_PINTERESTCONFIG_SUCCESS]: (state, e) => {
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.pinterestAppLogin = JSON.parse(e.data.socialnetwork_apikey.extra_settings).pinterestAppLogin
    },
    [GET_PINTERESTCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.pinterestAppLogin = JSON.parse(e.data.socialnetwork_apikey.extra_settings).pinterestAppLogin
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