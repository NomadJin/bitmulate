const FB = require('fb')
const { google } = require('googleapis')

function getFacebookProfile(accessToken) {
    return FB.api('me', { fields: ['email'], access_token: accessToken }).then(
        (auth) => ({
            id: auth.id,
            email: auth.email
        })
    )
}

function getGoogleProfile(accessToken) {
    
    const plus = google.plus({
        version: 'v1',
        auth: 'AIzaSyCTDxOIlZXQvYXkM9mwFDOfDtq0dG1DqFo' // specify your API key here
      })

    return new Promise((resolve, reject) => {
        plus.people.get({
          userId: 'me', 
          access_token: accessToken
        }, (err, auth) => {
          if(err) {
              reject(err)
              return
          }
          const {
              id, emails
          } = auth.data

          const profile = {
              id,
              email: emails[0].value
          }
          resolve(profile)
        })
    })
}

exports.getProfile = (provider, accessToken) => {
    const getters = {
        google: getGoogleProfile,
        facebook: getFacebookProfile
    }
    
    return getters[provider](accessToken)
}