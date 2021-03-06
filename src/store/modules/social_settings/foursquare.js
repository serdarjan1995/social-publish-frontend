import {
    UPDATE_FOURSQUARECONFIG_SUCCESS,
    UPDATE_FOURSQUARECONFIG_ERROR,
    GET_FOURSQUARECONFIG_SUCCESS,
    GET_FOURSQUARECONFIG_ERROR
} from "@/store/actions/social_settings";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    apiKey: '',
    apiSecret: '',
};

export const getters = {};

export const actions = {

    getFoursquareConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('social/apikey/get', req)
                .then((resp) => {
                    if (resp.data.socialnetwork_apikey) {
                        commit(GET_FOURSQUARECONFIG_SUCCESS, resp)
                    }
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_FOURSQUARECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
    updateFoursquareConfig: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.post('social/apikey/set', req)
                .then((resp) => {
                    commit(UPDATE_FOURSQUARECONFIG_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_FOURSQUARECONFIG_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_FOURSQUARECONFIG_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Updated Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [UPDATE_FOURSQUARECONFIG_ERROR]: (e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_FOURSQUARECONFIG_SUCCESS]: (state, e) => {
        state.snackbar = true
        state.apiKey = e.data.socialnetwork_apikey.api_key
        state.apiSecret = e.data.socialnetwork_apikey.api_secret
    },
    [GET_FOURSQUARECONFIG_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
        state.snackbar = true
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