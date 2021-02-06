import {
    GET_FILES_ERROR, GET_FILES_SUCCESS, USER_FILE_DELETE, USER_PROFILE_COVER_UPDATE,
    USER_ERROR, USER_SUCCESS, USER_IMAGE_SUCCESS, USER_PROFILE_UPDATE, USER_PROFILE_ERROR, USER_PASSWORD_UPDATE_SUCCESS, USER_PASSWORD_UPDATE_ERROR,
    GET_FILES_END_ITEM, GET_FILE_HISTORY} from '../actions/user'
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    profile: {
        name: '',
        surname: '',
        default_lang: '',
        email: '',
        phone_number: '',
        profile_image: ''
    },
    files: [],
    fileHistory: [],
    selectionImage: ['name']
}

export const getters = {
    getProfile: state => state.profile,
    isProfileLoaded: state => state.profile === {},
    isFilesLoaded: state => state.files === [],
    getUserFiles: state => state.files,
};
export const config = {
    headers: { 'content-type': 'multipart/form-data' }
}
export const actions = {
    getUserProfileRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('profile')
                .then((resp) => {
                    commit(USER_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(USER_ERROR, e.response)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        });
    },
    getFilesRequest: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.get('get/files')
                .then((resp) => {
                    commit(GET_FILES_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_FILES_ERROR, e.response)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        });
    },
    getEndFiles: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.get('get/end/file')
                .then((resp) => {
                    commit(GET_FILES_END_ITEM, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_FILES_ERROR, e.response)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        });
    },
    getAuth: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('profile',req)
                .then((resp) => {
                    commit(USER_SUCCESS, req)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    getFileHistory: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('get/file/history',req)
                .then((resp) => {
                    console.log("history", resp)
                    commit(GET_FILE_HISTORY, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log("history catch", e)
                    reject(e)
                })
        })
    },

    userDeleteImage: ({commit},req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('user/delete/image',req)
                .then((resp) => {
                    console.log("change", resp)
                    commit(USER_FILE_DELETE, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log("change catch", e)
                    reject(e)
                })
        })
    },

    authUpdateProfile: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/update/profile', req)
                .then((resp) => {
                    resolve(resp)
                    commit(USER_PROFILE_UPDATE)
                })
                .catch((e) => {
                    reject(e)
                    console.log("e result", e)
                    commit(USER_PROFILE_ERROR, e.response.data)
                })
        })
    },
    authUpdatePassword: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('auth/update/password', req)
                .then((resp) => {
                    console.log("respon", resp)
                    commit(USER_PASSWORD_UPDATE_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    console.log("e first", e)
                    commit(USER_PASSWORD_UPDATE_ERROR, e)
                    reject(e)
                })
        })
    },


    updateImage: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('update/image/user', req)
                .then((resp) => {
                    commit(USER_PROFILE_COVER_UPDATE, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },

    fileUpload: ({commit},req) => {
        console.log("request",req)
        return new Promise((resolve, reject) => {
            Vue.api.post('upload/file', req, config)
                .then((resp) => {
                    commit(USER_IMAGE_SUCCESS)
                    resolve(resp)
                })
                .catch((e) => {
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [USER_SUCCESS]: (state, resp) => {
        Vue.set(state, 'profile', resp.profile)
    },
    [USER_ERROR]: (state) => {
        Vue.set(state, 'profile', {})
    },
    [GET_FILES_SUCCESS]: (state, resp) => {
        Vue.set(state, 'files', resp.files)
    },
    [GET_FILES_ERROR]: (state) => {
        Vue.set(state, 'files', [])
    },
    [GET_FILES_END_ITEM]: () => {
        //
    },
    [USER_PROFILE_UPDATE]: () => {
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [USER_PROFILE_COVER_UPDATE]: (resp) => {
        console.log("image updated", resp)
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [USER_PASSWORD_UPDATE_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [USER_PASSWORD_UPDATE_ERROR]: (resp) => {
        console.log("resp error", resp)
        snackbar.state.snackbarMessage = "eror"
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [USER_IMAGE_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
        //Vue.set(state, 'files', resp)
    },
    [GET_FILE_HISTORY]: (state, resp) => {
        Vue.set(state, 'fileHistory', resp.data.history)
    },
    [USER_FILE_DELETE]: () => {
        snackbar.state.snackbarMessage = "OK"
        snackbar.state.snackbarColor = "success"
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
