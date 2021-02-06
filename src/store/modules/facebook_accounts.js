import {
    RESPONSE_FACEBOOK_SUCCESS,
    RESPONSE_FACEBOOK_ERROR
} from "../actions/facebook_accounts"
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {

}

export const getters = {

};

export const actions = {
    getFacebookPages: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/get/facebook/pages',req)
                .then((resp) => {
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESPONSE_FACEBOOK_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
    addFacebookPages: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/add/facebook/pages', req)
                .then((resp) => {
                    commit(RESPONSE_FACEBOOK_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESPONSE_FACEBOOK_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
    getFacebookGroups: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/get/facebook/groups',req)
                .then((resp) => {
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESPONSE_FACEBOOK_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
    addFacebookGroups: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/add/facebook/groups', req)
                .then((resp) => {
                    commit(RESPONSE_FACEBOOK_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESPONSE_FACEBOOK_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
};

export const mutations = {
    [RESPONSE_FACEBOOK_SUCCESS]: (state, payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [RESPONSE_FACEBOOK_ERROR]: (state, payload) => {
        let msg = payload.data.message
        if(typeof(msg) === 'object' ){
            snackbar.state.snackbarMessage = msg[Object.keys(msg)[0]][0]
        }
        else{
            snackbar.state.snackbarMessage = msg
        }
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
