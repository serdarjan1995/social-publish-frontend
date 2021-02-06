import { GET_FILES_ERROR, GET_FILES_SUCCESS, USER_ERROR, USER_SUCCESS, PAYMENT_SUCCESS, PAYMENT_ERROR} from '../actions/payments'
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    profile: {},
    files: [],
    paymentAll: [],
    authPaymentAll: [],
    offChartState: false,
    offChartData: [],
}

export const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => state.profile === {},
    getUserFiles: state => state.files,
    getPaymentAll: state => state.paymentAll,
};
export const config = {
    headers: { 'content-type': 'multipart/form-data' }
}
export const actions = {

    allGetPayments: ({commit, state}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('all/get/payment', req, config)
                .then((resp) => {
                    state.paymentAll = resp
                    console.log("Resp :", resp)
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    getPayments: ({commit, state}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('get/payment', req, config)
                .then((resp) => {
                    state.authPaymentAll = resp
                    console.log("Resp :", resp)
                    commit(USER_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    createPayment: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/create/payment', request)
                .then((resp) => {
                    commit(PAYMENT_SUCCESS, resp)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(PAYMENT_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },

};

export const mutations = {
    [USER_SUCCESS]: (state, resp) => {
        Vue.set(state, 'profile', resp.user)
    },
    [USER_ERROR]: (state) => {
        Vue.set(state, 'profile', {})
    },
    [USER_SUCCESS]: (state, user) => {
        Vue.set(state, 'profile', user)
    },
    [USER_ERROR]: (state, data) => {
        Vue.set(state, 'profile', {})
        console.log(data.data)
    },
    [PAYMENT_SUCCESS]: (state, data) => {
        snackbar.state.snackbarMessage = data.data.create
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [PAYMENT_ERROR]: (state, data) => {
        snackbar.state.snackbarMessage = data.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [GET_FILES_SUCCESS]: (state, resp) => {
        console.log(resp)
        Vue.set(state, 'files', resp.files)
    },
    [GET_FILES_ERROR]: (state) => {
        Vue.set(state, 'files', [])
    },
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
