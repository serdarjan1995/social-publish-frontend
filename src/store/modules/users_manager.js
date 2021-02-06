import { USER_ERROR, USER_SUCCESS } from '../actions/users_manager'
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

    getRoles: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('roles/get/all',req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    userCreate: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('users', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    getUsers: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.get('users', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    updateUser: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('update/user', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log(e.response)
                    reject(e)
                })
        })
    },

    userStatus: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('status/user', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log(e.response)
                    reject(e)
                })
        })
    },

    userVerified: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('verified/user', req)
                .then((resp) => {
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log(e.response)
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
