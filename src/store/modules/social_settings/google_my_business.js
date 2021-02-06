import {
    UPDATE_GOOGLEMYBUSINESSCONFIG_SUCCESS,
    UPDATE_GOOGLEMYBUSINESSCONFIG_ERROR,
    GET_GOOGLEMYBUSINESSCONFIG_SUCCESS,
    GET_GOOGLEMYBUSINESSCONFIG_ERROR
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

    getGoogleConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_GOOGLEMYBUSINESSCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_GOOGLEMYBUSINESSCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateFBConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_GOOGLEMYBUSINESSCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_GOOGLEMYBUSINESSCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_GOOGLEMYBUSINESSCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_GOOGLEMYBUSINESSCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_GOOGLEMYBUSINESSCONFIG_SUCCESS]: (state, e) => {
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.googleAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).googleAppKey
    },
    [GET_GOOGLEMYBUSINESSCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
        state.googleAppKey = JSON.parse(e.data.socialnetwork_apikey.extra_settings).googleAppKey
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