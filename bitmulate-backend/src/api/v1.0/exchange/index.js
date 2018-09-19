const Router = require('koa-router')
const exchange = new Router()

exchange.get('/', (ctx) => {
    ctx.body = 'hi exchange'
})

module.exports = exchange
