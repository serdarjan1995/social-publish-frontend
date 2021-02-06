import Vue from "vue"
import {PERMISSION_DELETE_SUCCESS, PERMISSION_DELETE_ERROR, PERMISSION_GET_SUCCESS, PERMISSION_GET_ERROR, PERMISSION_CREATE_SUCCESS, PERMISSION_CREATE_ERROR, PERMISSION_UPDATE_SUCCESS, PERMISSION_UPDATE_ERROR} from "@/store/actions/permissions";
import snackbar from "@/store/modules/snackbar";
export const state = {
    hasLoadedOnce: false,
    permissionList: [],
    current_page: 1,
    last_page: 1
}

export const getters = {
    isPermissionListLoaded: state => state.permissionList === []
};

export const actions = {
    getPermissionList: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/permissions/get/all?page='+request)
                .then((resp) => {
                    commit(PERMISSION_GET_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(PERMISSION_GET_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    createPermission: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/permissions/create', request)
                .then((resp) => {
                    commit(PERMISSION_CREATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(PERMISSION_CREATE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    updatePermission: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/permissions/update', request)
                .then((resp) => {
                    commit(PERMISSION_UPDATE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(PERMISSION_UPDATE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    deletePermission: ({commit}, request) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/permissions/delete', request)
                .then((resp) => {
                    commit(PERMISSION_DELETE_SUCCESS, [request, resp])
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(PERMISSION_DELETE_ERROR, e.response.data)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    }
};

export const mutations = {
    [PERMISSION_GET_SUCCESS]: (state, res) => {
        state.permissionList = res.permissions.data
        state.current_page = res.permissions.current_page
        state.last_page = res.permissions.last_page
        state.hasLoadedOnce = true
    },
    [PERMISSION_GET_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [PERMISSION_DELETE_SUCCESS]: (state, res) => {
        state.permissionList = state.permissionList.filter((items) => {
            return items.id != res[0].id
        })
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [PERMISSION_DELETE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [PERMISSION_UPDATE_SUCCESS]: (state, res) => {
        let myVar = state.permissionList.filter((items) => {
            if(items.id === res[0].id){
                return res[1].data.items;
            }
            else
                return items
        })
        state.permissionList = myVar
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [PERMISSION_UPDATE_ERROR]: (state, res) => {
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res.data.message[Object.keys(res.data.message)[0]][0]
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [PERMISSION_CREATE_SUCCESS]: (state, res) => {
        state.permissionList.push(res[1].data.items)
        state.hasLoadedOnce = true
        snackbar.state.snackbarMessage = res[1].data.message
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [PERMISSION_CREATE_ERROR]: (state, res) => {
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
