import {DIRECT_MESSAGE_SUCCESS, DIRECT_MESSAGE_ERROR,DIRECT_MESSAGES_SHOW_SUCCESS,DIRECT_MESSAGES_SHOW_ERROR,DIRECT_MESSAGES_SEND_SUCCESS,DIRECT_MESSAGES_SEND_ERROR} from '../actions/direct_message'
import Vue from "vue"
import snackbar from "@/store/modules/snackbar"

export const state = {
    chat_users:[],
    chat_errors:{},
    chat_messages:{},
    chat_message_errors:{},
}

export const getters = {};

export const actions = {
    DirectMessageRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('direct/message/inbox')
                .then((resp) => {
                    commit(DIRECT_MESSAGE_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(DIRECT_MESSAGE_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
    ShowDirectMessageRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('direct/message/show', req)
                .then((resp) => {
                    commit(DIRECT_MESSAGES_SHOW_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(DIRECT_MESSAGES_SHOW_ERROR, e.response.data)
                    reject(e)
                })

        }).catch((e) => {
            if (e.response){
                console.log(e.response.data.data.message)
            }
        })
    },
    SendDirectMessageRequest: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('direct/message/send', req)
                .then((resp) => {
                    commit(DIRECT_MESSAGES_SEND_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(DIRECT_MESSAGES_SEND_ERROR, e.response.data)
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
    [DIRECT_MESSAGE_SUCCESS]: (state, payload) => {
        state.chat_users = payload.chat_users
    },
    [DIRECT_MESSAGE_ERROR]: (state, payload) => {
        state.chat_errors = payload.data
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [DIRECT_MESSAGES_SHOW_SUCCESS]: (state, payload) => {
        state.chat_messages = payload.messages
    },
    [DIRECT_MESSAGES_SHOW_ERROR]: (state, payload) => {
        state.chat_message_errors = payload.data.data
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [DIRECT_MESSAGES_SEND_SUCCESS]: (state,payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [DIRECT_MESSAGES_SEND_ERROR]: (state,payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
