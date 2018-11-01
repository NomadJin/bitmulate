const Router = require('koa-router')

const auth = new Router()
const authCtrl = require('./auth.ctrl')

auth.get('/', (ctx) => {
    ctx.body = 'hi auth'
})

auth.get('/check-email/:email', authCtrl.checkEmail)
auth.post('/register/local', authCtrl.localRegister)
auth.post('/login/local', authCtrl.locaLogin)
auth.get('/check', authCtrl.check)

module.exports = auth
