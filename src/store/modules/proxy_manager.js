import { USER_ERROR, USER_SUCCESS } from '../actions/proxy_manager'
//import { AUTH_LOGOUT } from '../actions/auth'
import Vue from "vue"

export const state = {
    profile: {}
}

export const getters = {
    getProfile: state => !!state.profile,
    isProfileLoaded: state => !!state.profile.name
};

export const actions = {

    getProxy: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.get('proxy',req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    proxyCreate: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('proxy', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    proxyUpdate: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('proxy/update', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    proxyStatusChange: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('proxy/statuschange', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

};

export const mutations = {
    [USER_SUCCESS]: (state, user) => {
        Vue.set(state, 'profile', user)
    },
    [USER_ERROR]: (state, data) => {
        Vue.set(state, 'profile', {})
        console.log(data.data)
    },
//    [AUTH_LOGOUT]: (state) => {
//        state.profile = {}
//    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
