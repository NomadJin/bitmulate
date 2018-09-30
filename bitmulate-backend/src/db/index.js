const mongoose = require('mongoose')

const {
    MONGODB_URI: mongodbURI
} = process.env

// MongoDB Configuration
module.exports = (function () {
    mongoose.Promise = global.Promise

    return {
        connect () {
            mongoose.connect(mongodbURI).then( () => {
                console.log('Successfully connected to mongodb')
            }
            ).catch( e => {
                console.error(e)
            })
        }
    }
})()