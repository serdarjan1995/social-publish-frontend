import {SIGNUP_ERROR, SIGNUP_SUCCESS} from "@/store/actions/signup";
import {VERIFY_ERROR, VERIFY_SUCCESS} from "@/store/actions/verify";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    success: false,
    verifySuccess: false,
    verifyErrorMsg: '',
};

export const getters = {};


export const actions = {
    signUpRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/register', req)
                .then((resp) => {
                    commit(SIGNUP_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(SIGNUP_ERROR, e)
                    reject(e)
                })
        })
    },

    //TODO
    resendVerification: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('auth/email/resend', req)
                .then((resp) => {
                    commit(SIGNUP_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(SIGNUP_ERROR, e)
                    reject(e)
                })
        })
    },

    verify: ({commit}, req) => {
        return new Promise((resolve, reject) => {

            Vue.api.get('auth/email/verify/'+req.id+'?expires='+ req.expires +'&hash='+ req.hash +'&signature=' + req.signature)
                .then((resp) => {
                    console.log("success")
                    commit(VERIFY_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(VERIFY_ERROR, e)
                    reject(e)
                })
        })
    },


};

export const mutations = {
    [SIGNUP_SUCCESS]: (state) => {
        state.success = true
    },
    [SIGNUP_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e.response.data.data.message.email[0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [VERIFY_SUCCESS]: (state) => {
        state.verifySuccess = true
    },
    [VERIFY_ERROR]: (state, e) => {
        state.verifySuccess = false
        state.verifyErrorMsg = e.response.data.data.message
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}