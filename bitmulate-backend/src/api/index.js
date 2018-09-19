const Router = require('koa-router')
const version = {
    '1.0': require('./v1.0')
} 

const api = new Router()

api.use('/v1.0', version['1.0'].routes())

module.exports = api
