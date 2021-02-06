import {
    RESPONSE_LINKEDIN_SUCCESS,
    RESPONSE_LINKEDIN_ERROR
} from "../actions/linkedin_accounts"
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {

}

export const getters = {

};

export const actions = {
    getLinkedinPages: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('account/get/linkedin/company',req)
                .then((resp) => {
                    resolve(resp)

                })
                .catch((e) => {
                    commit(RESPONSE_LINKEDIN_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },

    addLinkedinPages: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/add/linkedin/pages', req)
                .then((resp) => {
                    commit(RESPONSE_LINKEDIN_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(RESPONSE_LINKEDIN_ERROR, e.response.data)
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
    [RESPONSE_LINKEDIN_SUCCESS]: (state, payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [RESPONSE_LINKEDIN_ERROR]: (state, payload) => {
        let msg = payload.data.message
        if(typeof(msg) === 'object' ){
            snackbar.state.snackbarMessage = msg[Object.keys(msg)[0]][0]
            snackbar.state.snackbarColor = "error"
            snackbar.state.snackbar = true
        }
        else{
            snackbar.state.snackbarMessage = msg
            snackbar.state.snackbarColor = "error"
            snackbar.state.snackbar = true
        }
    },

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
