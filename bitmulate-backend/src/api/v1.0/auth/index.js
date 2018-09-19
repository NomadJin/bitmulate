const Router = require('koa-router')
const auth = new Router()

auth.get('/', (ctx) => {
    ctx.body = 'hi auth'
})

module.exports = auth
