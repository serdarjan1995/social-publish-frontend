import { UPDATE_OTHERS_SUCCESS, UPDATE_OTHERS_ERROR} from "@/store/actions/general_settings";
import Vue from "vue"

export const state = {
    snackbar: false,
};

export const getters = {};

export const actions = {

    updateOthers: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('LINK TO BE PROVIDED', req)
                .then((resp) => {
                    commit(UPDATE_OTHERS_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_OTHERS_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_OTHERS_SUCCESS]: (state) => {
        state.snackbar = true
    },
    [UPDATE_OTHERS_ERROR]: (state) => {
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