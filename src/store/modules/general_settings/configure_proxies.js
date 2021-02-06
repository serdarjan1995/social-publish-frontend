import { UPDATE_CONFIGUREPROXIES_SUCCESS , UPDATE_CONFIGUREPROXIES_ERROR } from "@/store/actions/general_settings";
import Vue from "vue"

export const state = {
    snackbar: false,
};

export const getters = {};

export const actions = {

    updateConfigureProxies: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('LINK TO BE PROVIDED', req)
                .then((resp) => {
                    commit(UPDATE_CONFIGUREPROXIES_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_CONFIGUREPROXIES_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_CONFIGUREPROXIES_SUCCESS]: (state) => {
        state.snackbar = true
    },
    [UPDATE_CONFIGUREPROXIES_ERROR]: (state) => {
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