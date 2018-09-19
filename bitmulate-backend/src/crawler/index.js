var request = require("request");

var options = 
{ 
  method: 'GET',
  url: 'https://api.upbit.com/v1/ticker',
  qs: { markets: 'KRW-BTC' } 
}


setInterval( ()=>{
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  })
}, 2*1000)