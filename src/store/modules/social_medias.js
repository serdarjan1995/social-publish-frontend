import {MEDIAS_ERROR, MEDIAS_SUCCESS} from "../actions/social_medias"
import Vue from "vue"

export const state = {
    hasLoadedOnce: false,
    socialMediaList: []
}

export const getters = {
    isSocialMediaLoaded: state => state.socialMediaList === []
};

export const actions = {
    getSocialMediaList: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/social/getAll')
                .then((resp) => {
                    commit(MEDIAS_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(MEDIAS_ERROR)
                    reject(e)
                })
            }).catch((e) => {
                console.log(e.response.data.data.message)
            })
    }
};

export const mutations = {
    [MEDIAS_SUCCESS]: (state, res) => {
        state.socialMediaList = res.list
        state.hasLoadedOnce = true
    },
    [MEDIAS_ERROR]: (state) => {
        state.socialMediaList = []
        state.hasLoadedOnce = true
    }
};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};
