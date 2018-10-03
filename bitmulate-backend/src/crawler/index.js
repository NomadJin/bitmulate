require('dotenv').config();

const poloniex = require('../lib/poloniex')
const db = require('../db')
const ExchangeRate = require('../db/model/ExchangeRate')
const socket = require('./socket')
const { parseJSON } = require('../lib/common')

db.connect()
socket.connect()

const messageHandler = {
  1002: async (data) => {
    if(!data) return
    const converted = poloniex.convertToTickerObject(data)
    const { name, ...rest } = converted
    
    try {
      const updated = await ExchangeRate.updateTicker(name, rest)
      console.log(updated)
    } catch (e) {
      console.error(e)
    }
  }
}
socket.handleMessage = (message) => {
  const parsed = parseJSON(message)
  if(!parsed) {
    return null
  }
  
  const [type, meta, data] = parsed
  if(messageHandler[type]) {
    messageHandler[type](data)
  }
}

async function registerInitialExchangeRate() {
  const tickers = await poloniex.getTickers()

  // removes all the data from the collection (only for temporary use)
  await ExchangeRate.drop()
  console.log('dropped exchangerate collection!')
  const keys = Object.keys(tickers)
  
  const promises = keys.map(
    key => {
      const ticker = tickers[key]
      const data = Object.assign({name: key}, ticker)
      const exchangeRate = new ExchangeRate(data)
      return exchangeRate.save()
    }
  )
  
  //console.log(promises.length)
  try {
    await Promise.all(promises)
  } catch (e) {
    console.error(e)
  }

  console.log('succeed!')
}

registerInitialExchangeRate()