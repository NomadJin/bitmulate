require('dotenv').config();

// load env var
const {
    PORT: port,
    MONGODB_URI: mongodbURI
} = process.env

const Koa = require('koa');
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const api = require('./api')
const db = require('./db')

db.connect()
const app = new Koa()
app.use(bodyParser())

const router = new Router()
router.use('/api', api.routes())

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(port, () => {
    console.log(`heurm server is listening to port ${port}`)
})