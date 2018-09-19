const autobahn = require('autobahn')
const wsuri = 'wss://api.poloniex.com'
const connection = new autobahn.Connection({
  url: wsuri,
  realm: 'realm1',
  initial_retry_delay: 0.25,
  retry_delay_growth: 0.25
})

connection.onopen = (session) => {
  console.log('connected')
  const marketEvent = (args, kwargs) => {
    console.log('marketEvent', args)
  }
  const tickerEvent = (args, kwargs) => {
    console.log('ticker:', args)
  }

  session.subscribe('BTC_ETH', marketEvent)
  session.subscribe('ticker', tickerEvent)
}

connection.onclose = () => {
  console.log('websocket connection is closed')
}

connection.open();