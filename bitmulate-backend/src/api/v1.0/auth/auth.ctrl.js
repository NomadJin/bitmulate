const Joi = require('joi')
const User = require('../../../db/models/User')

exports.checkEmail = async (ctx) => {
    const { email } = ctx.params
    
    if(!email) {
        ctx.status = 400
        return
    }

    try {
        const account = await User.findByEmail(email)
        ctx.body = {
            exists: !!account
        }
    } catch (e) {
        ctx.throw(e, 500)
    }
}

exports.checkDisplayName = async (ctx) => {
    const { displayName } = ctx.params
    
    try {
        const account = await User.findByDisplayName(displayName)
        ctx.body = {
            exists: !!account
        }
    } catch (e) {
        ctx.throw(e, 500)
    }
}

exports.localRegister = async (ctx) => {
    
    const { body } = ctx.request

    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,10}$/),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    })
    
    const result = Joi.validate(body, schema)

    //Schema Error
    if(result.error) {
        ctx.status = 400
        return
    }

    const { displayName, email, password } = body

    try {
        //check displayName, email existancy
        const exists = await User.findExistancy({
            displayName,
            email
        })

        if(exists) {
            ctx.status = 409
            const key = exists.email === email ? 'email' : 'displayName'
            ctx.body = {
               key
            }
            return
        }
        //creates user account
        const user = await User.localRegister({
            displayName, email, password
        })

        ctx.body = {
            displayName,
            _id: user._id,
            metaInfo: user.metaInfo
        }
        const accessToken = await user.generateToken()
        
        //configuration accessToken to httpOnly cookie
        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        //console.log(accessToken)

    } catch (e) {
        ctx.throw(e, 500)
    }
}

exports.locaLogin = async (ctx) => {
    
    const { body } = ctx.request

    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,10}$/),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30)
    })

    const result = Joi.validate(body, schema)

    if(result.error) {
        ctx.status = 400
        return
    }

    const { email, password } = body

    try {
        //find user
        const user = await User.findByEmail(email)
        if(!user) {
            //user does not exit
            ctx.status = 403
            return
        }

        const validated = user.validatePassword(password)
        if(!validated) {
            //wrong password
            ctx.status = 403
            return
        }

        const accessToken = await user.generateToken()

        ctx.cookies.set('access_token', accessToken, { 
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

        const { displayName, _id, metaInfo } = user
        
        ctx.body = {
            displayName,
            _id,
            metaInfo
        }

    } catch (e) {
        ctx.throw(e, 500)
    }
}

exports.check = (ctx) => {

    const { user } = ctx.request

    if(!user) {
        ctx.stauts = 403
        return
    }

    ctx.body = {
        user
    }
}