import {
    UPDATE_VIKONTAKTECONFIG_SUCCESS,
    UPDATE_VIKONTAKTECONFIG_ERROR,
    GET_VIKONTAKTECONFIG_SUCCESS,
    GET_VIKONTAKTECONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
};

export const getters = {};

export const actions = {
    getVikontakteConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_VIKONTAKTECONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_VIKONTAKTECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },

    updateVikontakteConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_VIKONTAKTECONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_VIKONTAKTECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_VIKONTAKTECONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_VIKONTAKTECONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_VIKONTAKTECONFIG_SUCCESS]: (state, e) => {
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
    },
    [GET_VIKONTAKTECONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}