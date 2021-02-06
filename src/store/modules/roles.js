import Vue from "vue"
import {ROLE_GET_SUCCESS, ROLE_CREATE_SUCCESS, ROLE_UPDATE_SUCCESS, ROLE_GET_ERROR, ROLE_DELETE_ERROR} from "@/store/actions/roles"
import snackbar from "@/store/modules/snackbar"
import {orderBy,isEmpty} from "lodash"

function initialState() {
    return {
        roles: [],
        relationships: {
            'permission': 'name',
        },
        query: {},
        /*Store-Update-Delete*/
        item: {
            id: null,
            title: null,
            permission: [],
        },
        permissionsAll: [],
        errors:[]

    }
}

const getters = {
    data: state => {
        let rows = state.all

        if (state.query.sort) {
            rows = orderBy(state.all, state.query.sort, state.query.order)
        }

        return rows.slice(state.query.offset, state.query.offset + state.query.limit)
    },
    total:         state => state.all.length,
    relationships: state => state.relationships,
    /*Store-Update-Delete*/
    item: state => state.item,
    permissionsAll: state => state.permissionsAll,

}

const actions = {
    getAllData({ commit }){
        return new Promise((resolve, reject) => {
            Vue.api.post('/roles/get/all')
                .then((resp) => {
                    commit(ROLE_GET_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(ROLE_GET_ERROR, e.response.data)
                    reject(e)
                })
        })
    },
    destroyData({ commit, state},req){
        return new Promise((resolve, reject) => {
            Vue.api.post('/roles/delete', req)
                .then((resp) => {
                    commit(ROLE_GET_SUCCESS, state.all.filter((item) => {
                        return item.id !== req.id
                    }))
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(ROLE_DELETE_ERROR, e.response.data)
                    reject(e)
                })
        })
    },
    setQuery({ commit },value){
        commit('setQuery', JSON.parse(JSON.stringify(value)))
    },
    storeData({ commit, state}){
        return new Promise((resolve, reject) => {
            let params = new FormData();
            for (let fieldName in state.item) {
                let fieldValue = state.item[fieldName];
                if (typeof fieldValue !== 'object') {
                    params.set(fieldName, fieldValue);
                } else {
                    if (fieldValue && typeof fieldValue[0] !== 'object') {
                        params.set(fieldName, fieldValue);
                    } else {
                        for (let index in fieldValue) {
                            params.set(fieldName + '[' + index + ']', fieldValue[index]);
                        }
                    }
                }
            }
            if (isEmpty(state.item.permission)) {
                params.delete('permission')
            } else {
                for (let index in state.item.permission) {
                    params.set('permission['+index+']', state.item.permission[index].id)
                }
            }
            Vue.api.post('/roles/create', params)
                .then(() => {
                    commit(ROLE_CREATE_SUCCESS)
                    resolve()
                })
                .catch((e) => {
                    commit(ROLE_GET_ERROR, e.response.data)
                    reject(e)
                })
        })
    },
    updateData({ commit, state }){
        return new Promise((resolve, reject) => {
            let params = new FormData();
            for (let fieldName in state.item) {
                let fieldValue = state.item[fieldName];
                if (typeof fieldValue !== 'object') {
                    params.set(fieldName, fieldValue);
                } else {
                    if (fieldValue && typeof fieldValue[0] !== 'object') {
                        params.set(fieldName, fieldValue);
                    } else {
                        for (let index in fieldValue) {
                            params.set(fieldName + '[' + index + ']', fieldValue[index]);
                        }
                    }
                }
            }
            if (isEmpty(state.item.permission)) {
                params.delete('permission')
            } else {
                for (let index in state.item.permission) {
                    params.set('permission['+index+']', state.item.permission[index].id)
                }
            }
            Vue.api.post('/roles/update', params)
                .then(() => {
                    commit(ROLE_UPDATE_SUCCESS)
                    resolve()
                })
                .catch((e) => {
                    commit(ROLE_GET_ERROR, e.response.data)
                    reject(e)
                })
        })
    },
    getShowData({ commit, state, dispatch }){
        console.log(commit, state, dispatch )
    },
    getPermissionsData({ commit, state, dispatch }){
        console.log(commit, state, dispatch )
    }
}
const mutations = {
    [ROLE_GET_SUCCESS]:(state, payload) => {
        state.all = payload.roles
    },
    [ROLE_CREATE_SUCCESS]:(state) => {
        state.item = { id: null, title: null, permission: []}
        state.permissionsAll = []
    },
    [ROLE_GET_ERROR]:(state, payload) => {
        state.errors = payload
        snackbar.state.snackbarMessage = payload.message
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    setQuery(state, query) {
        state.query = query
    },
}

export default {
    namespaced: true,
    state: initialState,
    getters,
    actions,
    mutations
}