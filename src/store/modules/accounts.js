import {
    ACCOUNTS_SUCCESS,
    ACCOUNTS_ERROR,
    ACCOUNT_GROUPS_SUCCESS,
    ACCOUNT_GROUPS_ERROR,
    CATEGORIES_ERROR,
    CATEGORIES_SUCCESS,
    GENERAL_ERROR,
    ACCOUNT_ADD_SUCCESS,
    ACCOUNT_ADD_ERROR,
    INSTGRAM_AUTH_PROFILE_SUCCESS,
    INSTGRAM_AUTH_PROFILE_VERIFY_SUCCESS,
    INSTGRAM_AUTH_PROFILE_ERROR
} from "../actions/accounts"
import Vue from "vue"
import snackbar from "@/store/modules/snackbar";
import social_medias from "@/store/modules/social_medias";

export const state = {
    hasLoadedOnce: false,
    accountList: [],
    accountGroupRegulated: [],
    categories: [],
    socialUsers: []
}

export const getters = {
    isCategoriesLoaded: state => state.categories === []
};

export const actions = {
    getAccountAll: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/get/all')
                .then((resp) => {
                    commit(ACCOUNTS_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(ACCOUNT_GROUPS_ERROR)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    getAccountGroup: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/get/all/group')
                .then((resp) => {
                    commit(ACCOUNT_GROUPS_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(ACCOUNTS_ERROR)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    getSocialMediaCategories: ({commit}) => {
        return new Promise((resolve, reject) => {
            Vue.api.post('/account/social/categories')
                .then((resp) => {
                    commit(CATEGORIES_SUCCESS, resp.data)
                    resolve(resp.data)
                })
                .catch((e) => {
                    commit(CATEGORIES_ERROR)
                    reject(e)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    getAddAccountLink: ({commit}, req) => {
        return new Promise((resolve) => {
            Vue.api.post('/account/add/get/link', req)
                .then((resp) => {
                    console.log(resp)
                    resolve(resp.data)
                })
                .catch((e) => {
                    let msg = e.response.data.data.message
                    commit(ACCOUNT_ADD_ERROR, msg)
                })
        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    sendProviderCode: ({commit, dispatch, rootGetters}, req) => {
        return new Promise((resolve, reject) => {
            console.log(req.provider)
            console.log(req.code)
            if (!rootGetters["social_medias/isSocialMediaLoaded"]) {
                console.log('getting social medias')
                dispatch('social_medias/getSocialMediaList', null, {root: true}).then(() => {
                    let social_media = social_medias.state.socialMediaList.find(
                        (item) => {
                            return item.name.toLowerCase() === req.provider ? item : null
                        }
                    )
                    console.log(social_media.id)
                    let payload = {social_network_id: social_media.id, code: req.code}
                    Vue.api.post('/account/add/code', payload)
                        .then((resp) => {
                            commit(ACCOUNT_ADD_SUCCESS, resp)
                            resolve(resp.data)
                        })
                        .catch((e) => {
                            let msg = e.response.data.data.message
                            console.log(msg)
                            commit(ACCOUNT_ADD_ERROR, msg)
                            reject(e)
                        })
                })
            } else {
                console.log("sendProviderCode loaded")
                let social_media = social_medias.state.socialMediaList.find(
                    (item) => {
                        return item.name.toLowerCase() === req.provider ? item : null
                    }
                )
                let payload = {social_network_id: social_media.id, code: req.code}
                Vue.api.post('/account/add/code', payload)
                    .then((resp) => {
                        commit(ACCOUNT_ADD_SUCCESS, resp)
                        resolve(resp.data)
                    })
                    .catch((e) => {
                        let msg = e.response.data.data.message
                        console.log(msg)
                        commit(ACCOUNT_ADD_ERROR, msg)
                    })
            }

        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    sendTwitterAuthData: ({commit, dispatch, rootGetters}, req) => {
        return new Promise((resolve) => {
            if (!rootGetters["social_medias/isSocialMediaLoaded"]) {
                console.log('getting social medias')
                dispatch('social_medias/getSocialMediaList', null, {root: true}).then(() => {
                    let social_media = social_medias.state.socialMediaList.find(
                        (item) => {
                            return item.name.toLowerCase() === req.provider ? item : null
                        }
                    )
                    console.log(social_media.id)
                    let payload = {
                        social_network_id: social_media.id,
                        user: req.user,
                        oauth_token: req.oauth_token,
                        oauth_verifier: req.oauth_verifier
                    }

                    Vue.api.post('/account/add/twitterCode', payload)
                        .then((resp) => {
                            resolve(resp.data)
                        })
                        .catch((e) => {
                            let msg = e.response.data.data.message
                            commit(GENERAL_ERROR, msg)
                        })
                })
            } else {
                console.log("sendTwitterCode loaded")
                let social_media = social_medias.state.socialMediaList.find(
                    (item) => {
                        return item.name.toLowerCase() === req.provider ? item : null
                    }
                )
                let payload = {
                    social_network_id: social_media.id,
                    user: req.user,
                    oauth_token: req.oauth_login,
                    oauth_verifier: req.oauth_verifier
                }
                Vue.api.post('/account/add/twitterCode', payload)
                    .then((resp) => {
                        resolve(resp.data)
                    })
                    .catch((e) => {
                        let msg = e.response.data.data.message
                        commit(GENERAL_ERROR, msg)
                    })
            }

        }).catch((e) => {
            console.log(e.response.data.data.message)
        })
    },
    sendInstagramProfile: ({commit}, req) => {
        return new Promise((resolve) => {
            Vue.api.post('oauth/login/instagram', req)
                .then((res) => {
                    commit(INSTGRAM_AUTH_PROFILE_SUCCESS, res)
                    resolve(res)
                })
                .catch((e) => {
                    commit(INSTGRAM_AUTH_PROFILE_ERROR, e.response)
                })
        })
    },
    sendInstagramProfileVerify: ({commit}, req) => {
        return new Promise((resolve) => {
            Vue.api.post('oauth/login/instagram/verify', req)
                .then((res) => {
                    commit(INSTGRAM_AUTH_PROFILE_VERIFY_SUCCESS, res)
                    resolve(res)
                })
                .catch((e) => {
                    commit(INSTGRAM_AUTH_PROFILE_ERROR, e.response)
                })
        })
    }
};
export const mutations = {
    [ACCOUNT_GROUPS_SUCCESS]: (state, res) => {
        if (!res) {
            return
        }
        let accountGroup = res.accountGroups
        let arrayList, myNewArray = []
        let arrayList2 = []
        for (let i = 0; i < accountGroup.length; i++) {
            arrayList = []
            for (let j = 0; j < accountGroup[i].accounts.length; j++) {
                let myNewObj = {}
                myNewObj.social_id = accountGroup[i].social_network[0].id
                myNewObj.social_name = accountGroup[i].social_network[0].name
                myNewObj.social_icon = accountGroup[i].social_network[0].icon
                myNewObj.category = accountGroup[i].accounts[j].category
                myNewObj.account_name = accountGroup[i].accounts[j].name
                myNewObj.name = accountGroup[i].accounts[j].name
                myNewObj.avatar_url = accountGroup[i].accounts[j].avatar_url
                myNewObj.id = accountGroup[i].accounts[j].id
                myNewObj.username = accountGroup[i].accounts[j].username
                myNewObj.account_url = accountGroup[i].accounts[j].account_url
                myNewObj.data = accountGroup[i].accounts[j].data
                myNewArray.push(myNewObj)
                if (!arrayList.includes(accountGroup[i].accounts[j].category)) {
                    arrayList.push(accountGroup[i].accounts[j].category)
                }
            }
            let myObj = {}
            myObj.groups = accountGroup[i].social_network[0]
            myObj.items = arrayList
            arrayList2.push(myObj)
        }
        let groupsRegulated = []
        for (let i = 0; i < arrayList2.length; i++) {
            for (let j = 0; j < arrayList2[i].items.length; j++) {
                var myAccObject = {}
                myAccObject.groupName = arrayList2[i].items[j]
                myAccObject.groupSocial = arrayList2[i].groups
                myAccObject.groupItems = myNewArray.filter((items) => {
                    return items.social_name = arrayList2[i].groups.name && items.category === arrayList2[i].items[j]
                })
                groupsRegulated.push(myAccObject)
            }
        }
        state.accountGroupRegulated = groupsRegulated;
        let mySocialUsersArray = []
        for (let i = 0; i < accountGroup.length; i++) {
            for (let j = 0; j < accountGroup[i].accounts.length; j++) {
                let myNewObj = {}
                myNewObj.social_icon = accountGroup[i].social_network[0].icon
                myNewObj.social_id = accountGroup[i].social_network[0].id
                myNewObj.social_name = accountGroup[i].social_network[0].name
                myNewObj.name = accountGroup[i].accounts[j].name
                myNewObj.id = accountGroup[i].accounts[j].id
                mySocialUsersArray.push(myNewObj)
            }
        }
        state.socialUsers = mySocialUsersArray
    },
    [ACCOUNT_GROUPS_ERROR]: (state, data) => {
        state.accountList = data
        state.accountGroupRegulated = [];
    },
    [ACCOUNTS_SUCCESS]: (state, res) => {
        state.accountList = res.accounts
    },
    [ACCOUNTS_ERROR]: (state) => {
        state.accountList = []
    },
    [CATEGORIES_SUCCESS]: (state, res) => {
        state.categories = res.categories
    },
    [CATEGORIES_ERROR]: (state) => {
        state.socialMediaList = []
    },
    [GENERAL_ERROR]: (state, msg) => {
        snackbar.state.snackbarMessage = msg[Object.keys(msg)[0]][0]
        snackbar.state.snackbarColor = 'error'
        snackbar.state.snackbar = true
    },
    [ACCOUNT_ADD_SUCCESS]: (state, msg) => {
        snackbar.state.snackbarMessage = msg.data.message
        snackbar.state.snackbarColor = 'success'
        snackbar.state.snackbar = true
    },
    [ACCOUNT_ADD_ERROR]: (state, msg) => {
        snackbar.state.snackbarMessage = msg
        snackbar.state.snackbarColor = 'error'
        snackbar.state.snackbar = true
    },

    [INSTGRAM_AUTH_PROFILE_SUCCESS]: (state, payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = 'success'
        snackbar.state.snackbar = true
        state.hasLoadedOnce = true
    },
    [INSTGRAM_AUTH_PROFILE_VERIFY_SUCCESS]: (state, payload) => {
        snackbar.state.snackbarMessage = payload.data.message
        snackbar.state.snackbarColor = 'success'
        snackbar.state.snackbar = true
        state.hasLoadedOnce = true
    },
    [INSTGRAM_AUTH_PROFILE_ERROR]: (state, payload) => {
        snackbar.state.snackbarMessage = payload.data.data.message
        snackbar.state.snackbarColor = 'error'
        snackbar.state.snackbar = true
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
