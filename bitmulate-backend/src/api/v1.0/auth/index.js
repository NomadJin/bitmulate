const Router = require('koa-router')

const auth = new Router()
const authCtrl = require('./auth.ctrl')

auth.get('/', (ctx) => {
    ctx.body = 'hi auth'
})

auth.post('/register/local', authCtrl.localRegister)
auth.post('/login/local', authCtrl.locaLogin)

module.exports = auth
