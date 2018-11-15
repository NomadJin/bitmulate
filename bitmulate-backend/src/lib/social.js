const FB = require('fb')
const google = require('googleapis')

const plus = google.plus('v1')

exports.getFacebookProfile = (accessToken) {
    return FB.api('me', { fields: ['email'], access_token: accessToken }).then(
        (auth) => ({
            id: auth.id,
            email: auth.email
        })
    )
}