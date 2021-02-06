import store from '@/store'
import axios from 'axios'
import {state} from "@/store/modules/auth";
import snackbar from "@/store/modules/snackbar";

axios.defaults.baseURL = process.env.VUE_APP_URL
axios.defaults.headers = { Accept: 'application/json' }
axios.defaults.headers = { Locale : store.getters.locale}

let subscribers = []
let isRefreshing = false

function onAccessTokenFetched (accessToken) {
  subscribers.map(callback => callback(accessToken));
}

function addSubscriber (callback) {
  subscribers.push(callback)
}

axios.interceptors.response.use(function (response) {
  return response;

}, error => {
  const { config, response: { status } } = error
  const originalRequest = config

  if (status === 401 && error.response.data.token_expired === true &&
      originalRequest.url !== '/auth/login' && originalRequest.url !== '/logout') {
    if (!isRefreshing){
      isRefreshing = true
      store.dispatch("auth/authRefreshTokenRequest")
          .then((resp) => {
            if(!resp){
              return
            }
            let access_token = resp.token.access_token
            isRefreshing = false
            if (access_token) {
              axios.defaults.headers.common = { 'Authorization': `Bearer ${access_token}` }
            }
            else if (!access_token || access_token==='')  {
              delete axios.defaults.headers.common
            }
            onAccessTokenFetched(access_token)
          }).catch((e) => {
        console.log(e)
      })
    }

    return new Promise((resolve) => {
      addSubscriber(accessToken => {
        // replace the expired token and retry
        originalRequest.headers.Authorization = 'Bearer ' + accessToken
        resolve(axios(originalRequest))
      })
    })
  }

  return Promise.reject(error)
})

export default {
  get (url, request) {
    return axios.get(url, request)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },
  post (url, request) {
    return axios.post(url, request)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },
  patch (url, request) {
    if (request instanceof FormData) {
      request.append('_method', 'PATCH')
    } else {
      request._method = 'PATCH'
    }
    return axios.post(url, request)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },
  delete (url, request) {
    return axios.delete(url, request)
        .then((response) => Promise.resolve(response.data))
        .catch((error) => Promise.reject(error))
  },
  setToken (token) {
    if (token) {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
    }
    else if (!token || token==='')  {
      delete axios.defaults.headers.common
    }
  },
  clearCreds(respMessage,color) {
    localStorage.removeItem('access-token')
    localStorage.removeItem('user_permissions')
    state.token = ''
    state.refresh_token = ''
    delete axios.defaults.headers.common
    snackbar.state.snackbarMessage = respMessage
    snackbar.state.snackbarColor = color
    snackbar.state.snackbar = true
    snackbar.state.snackbarTimeout = 4000
  }
}
