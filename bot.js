/* TWEET BOT made with node.js - simply app
 Author: Sergio M.
 */

console.log('It works!!');

const Twit = require('twit'),
    config = require('./config'),
    T = new Twit(config),
    fs = require('fs'),
    FormData = require('form-data');

/* ---------------------------------------*/
// Twitter get method
const getData = (err, data, response) => {
    const tweets = data.statuses;

    for (var i = 0; i < tweets.length; i++) {
        const tweet = tweets[i];
        console.log(tweet.text)
    }
};

const getParams = {
    q: 'rainbow',
    count: 3
};

// T.get('search/tweets', getParams, getData);

/* ---------------------------------------*/
// Twitter post method

const tweetIt = (txt) => {
    const r = Math.floor(Math.random() * 100);
    const tweeted = (err, data, response) => {
        if (err) {
            console.log('whoops. something whent wrong!')
        } else {
            console.log('all went ok' + data);
        }
    };
    
    const defaultTxt = 'Here is a rondom number: ' + r + ' #nodejs tweet bot simply app';
    const tweet = {
        status: txt ? txt : defaultTxt
    };

    T.post('statuses/update', tweet, tweeted);
};
// Call post method every 10s
//setInterval(tweetIt, 10000);

/* ---------------------------------------*/
// Twitter Stream Method

// Setting up a user stream
const stream = T.stream('user');
// Anytime someone follows me

//stream.on('follow', followed);

function followed(eventMsg) {
    console.log('Follow Event');
    
    const name = eventMsg.source.name;
    const screenName = eventMsg.source.screen_name;
    const reply = '@' + screenName + ' thanks for following me, legend!!';
    
    tweetIt(reply);
}

/* ---------------------------------------*/
// Tweet images with processing
// 1. Download processing from here: https://processing.org/download/
// 2. Install processing command line: http://www.dsfcode.com/using-processing-via-the-command-line/

const cmdProcessing = 'processing-java --sketch=`pwd`/rainbow --run';
const exec = require('child_process').exec;

exec(cmdProcessing, tweetImg);

function processing(){
    console.log('Finish Processing');
    const fileName = 'rainbow/output.png';
    const params = {
        enconding: 'base64'
    };
    const b64 = FormData(fs.readFileSync(fileName, params));
    console.log('Filename is:' + fileName);
    
    T.post('media/upload',{ media_data: b64 }, uploaded);
}

function uploaded(err, data, response) {
    // This is where I will tweet the image after successfully uploads..
    console.log('Starting uploading media...');
    const id = data.media_id_string;
    console.log(dadata.media_id_stringta);
    const tweet = {
        status: '#nodejs bot, processing and uploading img!!',
        media_ids: [id]
    };

    //T.post('statuses/update', tweet, done);
}

function done(err, data, response) {
    if (err) {
        console.log('whoops.. media file could not be posted!|')
    } else {
        console.log('Media file is posted. :)' + data);
    }
}

function tweetImg() {
    processing();
}

// processing-java --sketch=`pwd`/rainbow --run     ------- to run processing-java and create the image (output.png)