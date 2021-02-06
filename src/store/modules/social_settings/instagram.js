import {
    UPDATE_INSTAGRAMCONFIG_SUCCESS,
    UPDATE_INSTAGRAMCONFIG_ERROR,
    GET_INSTAGRAMCONFIG_SUCCESS,
    GET_INSTAGRAMCONFIG_ERROR,
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
    usernamePassword: false,
    button: false,
    getSecurityCode: '',
    ffmpegPath: '',
    ffprobePath: '',
    appVersion: ''
};

export const getters = {};

export const actions = {

    getInstagramConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_INSTAGRAMCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_INSTAGRAMCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },

    updateInstaConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_INSTAGRAMCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_INSTAGRAMCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_INSTAGRAMCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true    },
    [UPDATE_INSTAGRAMCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_INSTAGRAMCONFIG_SUCCESS]: (state, e) => {
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.getSecurityCode = JSON.parse(e.data.socialnetwork_apikey.extra_settings).getSecurityCode
        state.ffmpegPath = JSON.parse(e.data.socialnetwork_apikey.extra_settings).ffmpegPath
        state.ffprobePath = JSON.parse(e.data.socialnetwork_apikey.extra_settings).ffprobePath
        state.appVersion = JSON.parse(e.data.socialnetwork_apikey.extra_settings).app_version


    },
    [GET_INSTAGRAMCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.getSecurityCode = JSON.parse(e.data.socialnetwork_apikey.extra_settings).getSecurityCode
        state.ffmpegPath = JSON.parse(e.data.socialnetwork_apikey.extra_settings).ffmpegPath
        state.ffprobePath = JSON.parse(e.data.socialnetwork_apikey.extra_settings).ffprobePath
        state.appVersion = JSON.parse(e.data.socialnetwork_apikey.extra_settings).app_version
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