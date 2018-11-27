const Joi = require('joi')
const User = require('../../../db/models/User')
const { optionsPerCurrency } = require('../../../lib/variables')
const { getProfile } = require('../../../lib/social')

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
    
    if(!displayName) {
        ctx.status = 400
        return
    }
    
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
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).max(30),
        initialMoney: Joi.object({
            currency: Joi.string().allow('KRW', 'USD', 'BTC').required(),
            index: Joi.number().min(0).max(2).required()
        }).required()
    })
    
    const result = Joi.validate(body, schema)

    //Schema Error
    if(result.error) {
        ctx.status = 400
        ctx.body = result.error
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

        const { currency, index } = body.initialMoney

        const value = optionsPerCurrency[currency].initialValue * Math.pow(10, index)
        const initial = {
            currency,
            value
        }

        //creates user account
        const user = await User.localRegister({
            displayName, email, password, initial
        })

        ctx.body = {
            displayName,
            _id: user._id
            //metaInfo: user.metaInfo
        }

        const accessToken = await user.generateToken()
        
        //configuration accessToken to httpOnly cookie
        ctx.cookies.set('access_token', accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })

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
            _id,
            displayName
            //metaInfo
        }

    } catch (e) {
        ctx.throw(e, 500)
    }
}

exports.socialLogin = async (ctx) => {
    const schema = Joi.object().keys({
        accessToken: Joi.string().required()
    })

    const result = Joi.validate(ctx.request.body, schema)

    if(result.error) {
        ctx.status = 400
        return
    }

    const { provider } = ctx.params
    const { accessToken } = ctx.request.body

    // get social info
    let profile = null
    try {
        profile = await getProfile(provider, accessToken)
    } catch (e) {
        ctx.status = 403
        return
    }

    if(!profile) {
        ctx.status = 403
        return
    }

    const {
        id, email   
    } = profile
    console.log("profile : ", profile)

    // check account existancy
    let user = null
    try {
        user = await User.findSocialId({provider, id})
    } catch (e) {
        ctx.throw(e, 500)
    }
    console.log("user : ", user)

    if(user) {
        // set user status
        try {
          const btmToken = await user.generateToken()
          ctx.cookies.set('access_token', btmToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
          })
        } catch (e) {
          ctx.throw(e, 500)
        }     
        const { _id, displayName } = user
        ctx.body = {
          displayName,
          _id
        }     
        return
    }

    if(!user && profile.email) {
        let duplicated = null
        try {
            duplicated = await User.findByEmail(email)
        } catch (e) {
            ctx.throw(e, 500)
        }
        console.log("duplicated : ", duplicated)
        // if there is a duplicated email, merges the user account
        if(duplicated) {
            duplicated.social[provider] = {
                id,
                accessToken
            }
            try {
                await duplicated.save()
            } catch (e) {
                ctx.throw(e, 500)
            }
            try {
                const bmtToken = await duplicated.generateToken()
                ctx.cookies.set('access_token', bmtToken, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24 * 7
                })
            } catch (e) {
                ctx.throw(e, 500)
            }
            const { _id, displayName } = duplicated
            ctx.body = {
                displayName,
                _id
            }
            console.log(ctx.body)
        }
    }

    // !exists -> 204 
    if(!user) {
        ctx.status = 204;
    }

}

exports.socialRegister = async (ctx) => {
    
    const { body } = ctx.request
    const { provider } = ctx.params
    
    // check schema
    const schema = Joi.object({
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,12}$/).required(),
        accessToken: Joi.string().required(), 
        initialMoney: Joi.object({
            currency: Joi.string().allow('KRW', 'USD', 'BTC').required(),
            index: Joi.number().min(0).max(2).required()
        }).required()
    })

    const result = Joi.validate(body, schema)

    if(result.error) {
        ctx.status = 400
        ctx.body = result.error
        return
    }

    const {
        displayName,
        accessToken,
        initialMoney
    } = body

    // get social info
    let profile = null
    try {
        profile = await getProfile(provider, accessToken)
    } catch (e) {
        ctx.status = 403
        return
    }
    if(!profile) {
        ctx.status = 403
        return
    }
    // check email (+1 time)
    const {
        email,
        id: socialId
    } = profile

    if(profile.email) {
        try {
            const exists = await User.findByEmail(profile.email)
            if(exists) {
                ctx.body = {
                    key: 'email'
                }
                ctx.status = 409
                return
            }
        } catch (e) {
            ctx.throw(e, 500)
        }
    }
        // exists: 409
    // check displayName existancy
    try {
        const exists = await User.findByDisplayName(displayName)
        if(exists) {
            ctx.body = {
                key: 'displayName'
            }
            ctx.status = 409
        }
    } catch (e) {
        ctx.throw(e, 500)
    }
        // exists: 409
    // initialMoney setting
    const { currency, index } = initialMoney
    const value = optionsPerCurrency[currency].initialValue * Math.pow(10, index)
    const initial = {
        currency,
        value
    }
    // create user account
    let user = null
    try {
        user = await User.socialRegister({
            displayName,
            email,
            provider,
            accessToken,
            socialId,
            initial
        })
    } catch (e) {
        ctx.throw(e, 500)
    }

    ctx.body = {
        displayName,
        _id: user._id
    }
    // generate accessToken
    try {
        const bmtToken = await user.generateToken()
        ctx.cookies.set('accessToken', bmtToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7
        })
    } catch (e) {
        ctx.throw(e, 500)
    }
    // set cookie


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

exports.logout = (ctx) => {
    ctx.cookies.set('access_token', null, {
        maxAge: 0,
        httpOnly: true
    })
    ctx.status = 204
}