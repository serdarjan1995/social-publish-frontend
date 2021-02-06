import { UPDATE_FILEMANAGER_SUCCESS, UPDATE_FILEMANAGER_ERROR} from "@/store/actions/general_settings";
import Vue from "vue"

export const state = {
    snackbar: false,
};

export const getters = {};

export const actions = {

    updateFileManager: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('LINK TO BE PROVIDED', req)
                .then((resp) => {
                    commit(UPDATE_FILEMANAGER_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_FILEMANAGER_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_FILEMANAGER_SUCCESS]: (state) => {
        state.snackbar = true
    },
    [UPDATE_FILEMANAGER_ERROR]: (state) => {
        state.snackbar = true
    },

};

export default
{
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}