const req = require.context('./', true, /^(?!index).*.js$/)

export default req.keys()