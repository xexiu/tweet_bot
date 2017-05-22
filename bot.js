/* TWEET BOT made with node.js - simply app
  Author: Sergio M.
  */

//console.log('It works!!')

const Twit = require('twit'),
config = require('./config'),
T = new Twit(config);

const gotData = (err, data, response) => {
  const tweets = data.statuses;

  for(var i = 0; i < tweets.length; i++){
      const tweet = tweets[i];
        console.log(tweet.text)
  }
};

const params = {
  q: 'rainbow',
  count: 3
};

T.get('search/tweets', params, gotData)
