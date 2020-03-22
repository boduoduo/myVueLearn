import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:3000'
axios.defaults.timeout = 3000

export default {
    mb_get: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.get(path, {
                params: data
            })
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },

    mb_post: function (path = '', data = {}) {
        return new Promise((resolve, reject) => {
            axios.post(path, data)
                .then(function (response) {
                    resolve(response.data)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    },
}