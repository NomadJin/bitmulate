require('dotenv').config();

const poloniex = require('../lib/poloniex')
const db = require('../db')
const ExchangeRate = require('../db/model/ExchangeRate')

db.connect()

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers()
  const keys = Object.keys(tickers)
  const promises = keys.map(
    key => {
      const ticker = tickers[key]
      const data = Object.assign({name: key}, ticker)
      const exchangeRate = new ExchangeRate(data)
      return exchangeRate.save()
    }
  )
  
  console.log(promises.length)
  try {
    await Promise.all(promises)
  } catch (e) {
    console.error(e)
  }

  console.log('succeed!')
}

registerInitialExchangeRate()