import Vue from "vue"
import {NOTIFICATION_SUCCESS,
    NOTIFICATION_ERROR} from "@/store/actions/notifications";
import snackbar from "@/store/modules/snackbar";

export const state = {
    success: false,
    verifySuccess: false,
    verifyErrorMsg: '',
};

export const getters = {};


export const actions = {
    getNotifications: () => {
        return new Promise((resolve, reject) => {
            Vue.api.get('get/notifications')
                .then((resp) => {
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },
    readNotification: () => {
        return new Promise((resolve, reject) => {
            Vue.api.get('read/notification')
                .then((resp) => {
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    getNotificationCount: () => {
        return new Promise((resolve, reject) => {
            Vue.api.get('get/notification/count')
                .then((resp) => {
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },
    //
    // sendMessage: (request) => {
    //     return new Promise((resolve, reject) => {
    //         Vue.api.post('/create/notification', request)
    //             .then((resp) => {
    //                 resolve(resp.data)
    //                 console.log("resp", resp)
    //             })
    //             .catch((e) => {
    //                 reject(e)
    //                 console.log("e: ", e)
    //             })
    //     }).catch((e) => {
    //         console.log(e.response.data.data.message)
    //     })
    // },


    sendMessage: ({commit},req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('create/notification',req)
                .then((resp) => {
                    commit(NOTIFICATION_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(NOTIFICATION_ERROR,e.response.data)
                    reject(e)
                })
        })
    },

};

export const mutations = {
    [NOTIFICATION_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [NOTIFICATION_ERROR]: (data) => {
        snackbar.state.snackbarMessage = data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
