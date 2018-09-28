const currencyPairMap = require('./currencyPairMap')
const axios = require('axios')

moudule.exports = (function () {
    return {
        getCurrencyPairName(id) {
            return currencyPairMap[id.toString()]
        },
        getTickers() {
            return axios.get('http://poloniex.com/public?command=returnTicker').then(
                response => response.data
            )
        }
    }
})()