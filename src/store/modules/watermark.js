import {
    SAVE_WATERMARK_SUCCESS,
    SAVE_WATERMARK_ERROR,
    GET_WATERMARK_SUCCESS,
    GET_WATERMARK_ERROR
} from "@/store/actions/watermark";
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";

export const state = {
    imageLink: null,
    watermarkList: null,
};

export const actions = {

    getWatermarks: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('watermark/getAll')
                .then((resp) => {
                    commit(GET_WATERMARK_SUCCESS, resp.data)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(GET_WATERMARK_ERROR, e)
                    reject(e)
                })
        })
    },

    saveWatermark: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('watermark/add', req)
                .then((resp) => {
                    Vue.api.post('watermark/getAll')
                        .then((res) => {
                            commit(GET_WATERMARK_SUCCESS, res.data)
                            resolve(res)
                        })
                        .catch((e) => {
                            commit(GET_WATERMARK_ERROR, e)
                            reject(e)
                        })

                    commit(SAVE_WATERMARK_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(SAVE_WATERMARK_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [GET_WATERMARK_SUCCESS]: (state, resp) => {
        state.watermarkList = resp.watermarks;
    },
    [GET_WATERMARK_ERROR]: () => {
        snackbar.state.snackbarMessage = "Couldn't load Watermarks"
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
    [SAVE_WATERMARK_SUCCESS]: () => {
        snackbar.state.snackbarMessage = "Saved Successfully"
        snackbar.state.snackbarColor = "success"
        snackbar.state.snackbar = true
    },
    [SAVE_WATERMARK_ERROR]: (state, e) => {
        snackbar.state.snackbarMessage = e
        snackbar.state.snackbarColor = "error"
        snackbar.state.snackbar = true
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
}