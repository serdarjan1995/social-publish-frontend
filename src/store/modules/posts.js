import Vue from "vue"
import {POST_DELETE_SUCCESS,
    POST_DELETE_ERROR,
    POST_GET_SUCCESS,
    POST_GET_ERROR,
    POST_CREATE_SUCCESS,
    POST_CREATE_ERROR,
    POST_UPDATE_SUCCESS,
    POST_UPDATE_ERROR,
    POST_GET_URL_INFO_ERROR} from "@/store/actions/posts";
import snackbar from "@/store/modules/snackbar";
export const state = {
    hasLoadedOnce: false,
    postList: []
}

export const getters = {
    isPostListLoaded: state => state.postList === []
};

export const actions = {
    getPostList: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/post/getAll')
                .then((resp) => {
                    commit(POST_GET_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(POST_GET_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    getLinkInfo: ({commit},request) => {
        return new Promise((resolve) => {
            Vue.api.post('/post/get/link_info',request)
                .then((resp) => {
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(POST_GET_URL_INFO_ERROR, e.response.data)
                })
        })
    },
    createPost: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/post/create', request)
                .then((resp) => {
                    commit(POST_CREATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(POST_UPDATE_ERROR, e.response.data.data.message)
                    reject(e)
                })
        }).catch((e) => {
            commit(POST_UPDATE_ERROR, e.response.data.data.message)
            console.log(e.response.data.data.message)
        })
    },
    updatePost: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/post/update', request)
                .then((resp) => {
                    commit(POST_UPDATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(POST_UPDATE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    deletePost: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/post/delete', request)
                .then((resp) => {
                    commit(POST_DELETE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(POST_DELETE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    }
};

export const mutations = {
    [POST_GET_SUCCESS]: (state, res) => {
        state.postList = res.calendar
        state.hasLoadedOnce = true
    },
    [POST_GET_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [POST_DELETE_SUCCESS]: (state, res) => {
        state.postList = state.postList.filter((items) => {
            return items.id !== res[0].id
        })
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [POST_DELETE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [POST_UPDATE_SUCCESS]: (state, res) => {
        state.postList = state.postList.filter((items) => {
            if(items.id === res[0].id){
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
    [POST_UPDATE_ERROR]: (state, res) => {
        console.log("error message", res)
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [POST_CREATE_SUCCESS]: (state, res) => {
        state.postList.unshift(res[0])
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [POST_CREATE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [POST_GET_URL_INFO_ERROR]: (state, payload) => {
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
