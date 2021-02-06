import { AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT, LOGOUT_ERROR, AUTH_REFRESH_SUCCESS } from "../actions/auth"
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";
import router from "@/router";

export const state = {
    token: localStorage.getItem('access-token') || '',
    hasLoadedOnce: false,
}

export const getters = {
    isLoggedIn: state => !!state.token,
};

export const actions = {
    authRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/login', req)
                .then((resp) => {
                    commit(AUTH_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(AUTH_ERROR, e.response)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
            else{
                Vue.api.clearCreds('Cannot receive response from server','error')
            }
        })
    },
    authRefreshTokenRequest: ({commit}) => {
        if (!state.token) {
            return new Promise((resolve, reject) => {
                commit(AUTH_LOGOUT)
                reject()
            })
        }
        return new Promise((resolve, reject) => {
            Vue.api.post('token/refresh')
                .then((resp) => {
                    commit(AUTH_REFRESH_SUCCESS, resp)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(AUTH_ERROR,e.response)
                    reject(e)
                })
        }).catch((e) => {
            if (e.response){
                commit(LOGOUT_ERROR,e.response)
                console.log(e.response.data.data.message)
            }
            else{
                commit(LOGOUT_ERROR,null)
            }
        })
    },
    authLogoutRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/logout')
                .then((resp) => {
                    commit(AUTH_LOGOUT,resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(LOGOUT_ERROR,e.response)
                    reject(e)
                })
        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
            else{
                commit(LOGOUT_ERROR,null)
            }
        })
    }
};

export const mutations = {
    [AUTH_SUCCESS]: (state, payload) => {
        localStorage.setItem('access-token', payload.data.token.access_token)
        Vue.api.setToken(payload.data.token.access_token)
        state.token = payload.data.token.access_token
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [AUTH_REFRESH_SUCCESS]: (state, payload) => {
        localStorage.setItem('access-token', payload.data.token.access_token)
        Vue.api.setToken(payload.data.token.access_token)
        state.token = payload.data.token.access_token
    },
    [AUTH_ERROR]: (state,payload) => {
        if(!payload){
            return
        }
        let response = payload.data
        state.hasLoadedOnce = true
        Vue.api.clearCreds(response.data.message,'error')
    },
    [LOGOUT_ERROR]: (state,payload) => {
        state.hasLoadedOnce = true
        if (!payload){
            Vue.api.clearCreds('Oops',"error")
        }
        else{
            Vue.api.clearCreds(payload.data.data.message,"success")
        }
        router.push({ name: 'auth/LoginPage' });
    },
    [AUTH_LOGOUT]: (state,payload) => {
        Vue.api.clearCreds(payload.data.message,"success")
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
