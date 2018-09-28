const poloniex = require('../lib/poloniex')

poloniex.getTickers().then(
  data => {
    console.log(data)
  }
)