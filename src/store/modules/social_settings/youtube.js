import {
    UPDATE_YOUTUBECONFIG_SUCCESS,
    UPDATE_YOUTUBECONFIG_ERROR,
    GET_YOUTUBECONFIG_SUCCESS,
    GET_YOUTUBECONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {

    apiKey: '',
    apiSecret: '',
    googleAppKey: '',
};

export const getters = {};

export const actions = {

    getYoutubeConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_YOUTUBECONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_YOUTUBECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateYoutubeConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_YOUTUBECONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_YOUTUBECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_YOUTUBECONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated successfully"
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [UPDATE_YOUTUBECONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_YOUTUBECONFIG_SUCCESS]: (state, e) => {
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.googleAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).googleAppKey
    },
    [GET_YOUTUBECONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.googleAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).googleAppID
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