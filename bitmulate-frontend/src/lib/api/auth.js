import axios from 'axios'

export const checkEmail = (email) => axios.get('/api/v1.0/auth/exists/email/' + email)
export const checkDisplayName = (displayName) => axios.get('/api/v1.0/auth/exists/display-name/' + displayName)
