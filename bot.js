/* TWEET BOT made with node.js - simply app
  Author: Sergio M.
  */

//console.log('It works!!')

const Twit = require('twit'),
config = require('./config'),
T = new Twit(config);

/* ---------------------------------------*/
// Twitter get method
const getData = (err, data, response) => {
  const tweets = data.statuses;

  for(var i = 0; i < tweets.length; i++){
      const tweet = tweets[i];
        console.log(tweet.text)
  }
};

const getParams = {
  q: 'rainbow',
  count: 3
};

T.get('search/tweets', getParams, getData)
/* ---------------------------------------*/
// Twitter post method
const tweeted = (err, data, response) => {
  if(err){
    console.log('whoops. something whent wrong!')
  } else {
    console.log('all went ok' + data);
  }
};

const tweet = {
  status: '#nodejs tweet bot simply app'
};

T.post('statuses/update', tweet, tweeted);
/* ---------------------------------------*/
