import Vue from "vue"
import {TEXT_DELETE_SUCCESS, TEXT_DELETE_ERROR, TEXT_GET_SUCCESS, TEXT_GET_ERROR, TEXT_CREATE_SUCCESS, TEXT_CREATE_ERROR, TEXT_UPDATE_SUCCESS, TEXT_UPDATE_ERROR} from "@/store/actions/text_templates";
import snackbar from "@/store/modules/snackbar";
export const state = {
    hasLoadedOnce: false,
    textList: []
}

export const getters = {
    isTextListLoaded: state => state.textList === []
};

export const actions = {
    getTextList: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/text/notes')
                .then((resp) => {
                    commit(TEXT_GET_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(TEXT_GET_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    createText: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/text/notes/create', request)
                .then((resp) => {
                    commit(TEXT_CREATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(TEXT_CREATE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    updateText: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/text/notes/update', request)
                .then((resp) => {
                    commit(TEXT_UPDATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(TEXT_UPDATE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    deleteText: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/text/notes/delete', request)
                .then((resp) => {
                    commit(TEXT_DELETE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(TEXT_DELETE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    }
};

export const mutations = {
    [TEXT_GET_SUCCESS]: (state, res) => {
        state.textList = res.notes
        state.hasLoadedOnce = true
    },
    [TEXT_GET_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [TEXT_DELETE_SUCCESS]: (state, res) => {
        state.textList = state.textList.filter((items) => {
           return items.id != res[0].id
        })
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [TEXT_DELETE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [TEXT_UPDATE_SUCCESS]: (state, res) => {
        state.textList = state.textList.filter((items) => {
            if(items.id == res[0].id){
                return res;
            }
            else
                return items
        })
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [TEXT_UPDATE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [TEXT_CREATE_SUCCESS]: (state, res) => {
        state.textList.unshift(res[0])
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [TEXT_CREATE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
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
