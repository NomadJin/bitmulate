const Router = require('koa-router')
const auth = require('./auth')
const exchange = require('./exchange')

const api = new Router()

api.use('/auth', auth.routes())
api.use('/exchange', exchange.routes())

module.exports = api
