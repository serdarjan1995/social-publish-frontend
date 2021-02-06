import {
    UPDATE_WHATSAPPCONFIG_SUCCESS,
    UPDATE_WHATSAPPCONFIG_ERROR,
    GET_WHATSAPPCONFIG_SUCCESS,
    GET_WHATSAPPCONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    snackbar: false,
    apiKey: '',
    apiSecret: '',
};

export const getters = {};

export const actions = {
    getWhatsappConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_WHATSAPPCONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_WHATSAPPCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateWhatsappConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_WHATSAPPCONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_WHATSAPPCONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_WHATSAPPCONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_WHATSAPPCONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_WHATSAPPCONFIG_SUCCESS]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
    },
    [GET_WHATSAPPCONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
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