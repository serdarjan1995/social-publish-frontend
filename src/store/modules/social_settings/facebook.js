import {
    UPDATE_FBCONFIG_SUCCESS,
    UPDATE_FBCONFIG_ERROR,
    GET_FBCONFIG_SUCCESS,
    GET_FBCONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    socialNetWorkID: '',
    apiKey: '',
    apiSecret: '',
    apiCallbackURL: '',
    appVersion: '',
    profile: false,
    profilePermissions: '',
    groupsPermissions: '',
    pagesPermissions: '',
};

export const getters = {};

export const actions = {

    getFBConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_FBCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_FBCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },

    updateFBConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_FBCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_FBCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_FBCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_FBCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_FBCONFIG_SUCCESS]: (state, e) => {
        state.apiCallbackURL = e.data.socialnetwork_apikey.api_callback_url
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.appVersion = JSON.parse(e.data.socialnetwork_apikey.extra_settings).app_version
        state.profile = JSON.parse(e.data.socialnetwork_apikey.extra_settings).profile
        state.profilePermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).profile_permission
        state.groupsPermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).groups_permission
        state.pagesPermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).pages_permission
    },
    [GET_FBCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiCallbackURL = e.data.socialnetwork_apikey.api_callback_url
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.appVersion = e.data.socialnetwork_apikey.extra_settings
        state.appVersion = JSON.parse(e.data.socialnetwork_apikey.extra_settings).app_version
        state.profile = JSON.parse(e.data.socialnetwork_apikey.extra_settings).profile
        state.profilePermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).profile_permission
        state.groupsPermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).groups_permission
        state.pagesPermissions = JSON.parse(e.data.socialnetwork_apikey.extra_settings).pages_permission
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}