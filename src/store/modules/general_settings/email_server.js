import { UPDATE_EMAISERVERLSETTINGS_SUCCESS,UPDATE_EMAILSERVERSETTINGS_ERROR} from "@/store/actions/general_settings";
import Vue from "vue"

export const state = {
    snackbar: false,
};

export const getters = {};

export const actions = {

    updateEmailServerSettings: ({commit}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req)
            Vue.api.post('LINK TO BE PROVIDED', req)
                .then((resp) => {
                    commit(UPDATE_EMAISERVERLSETTINGS_SUCCESS, resp)
                    resolve(resp)
                })
                .catch((e) => {
                    commit(UPDATE_EMAILSERVERSETTINGS_ERROR, e)
                    reject(e)
                })
        })
    },
};

export const mutations = {
    [UPDATE_EMAISERVERLSETTINGS_SUCCESS]: (state) => {
        state.snackbar = true
    },
    [UPDATE_EMAILSERVERSETTINGS_ERROR]: (state) => {
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