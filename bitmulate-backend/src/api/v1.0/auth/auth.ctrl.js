const Joi = require('joi')

exports.localRegister = async (ctx) => {
    
    const schema = {
        displayName: Joi.string().regex(/^[a-zA-Z0-9ㄱ-힣]{3,10}$/),
        email: Joi.string().email().required(),
        password: Joi.string().string().min(6).max(30)
    }
    
    ctx.body = {
        success: true
    }
}