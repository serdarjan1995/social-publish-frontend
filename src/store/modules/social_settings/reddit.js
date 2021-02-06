import {
    UPDATE_REDDITCONFIG_SUCCESS,
    UPDATE_REDDITCONFIG_ERROR,
    GET_REDDITCONFIG_SUCCESS,
    GET_REDDITCONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
    usernamePassword: false,
    button: false,
    RedditAppLogin: '',
};

export const getters = {};

export const actions = {

    getRedditConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_REDDITCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_REDDITCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateRedditConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_REDDITCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_REDDITCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_REDDITCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_REDDITCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_REDDITCONFIG_SUCCESS]: (state, e) => {
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.RedditAppLogin = JSON.parse(e.data.socialnetwork_apikey.extra_settings).redditAppLogin
    },
    [GET_REDDITCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.usernamePassword = JSON.parse(e.data.socialnetwork_apikey.extra_settings).usernamePassword
        state.button = JSON.parse(e.data.socialnetwork_apikey.extra_settings).button
        state.RedditAppLogin = JSON.parse(e.data.socialnetwork_apikey.extra_settings).redditAppLogin
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}