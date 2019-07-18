var CorpusBot = require('twit')


var Bot = new CorpusBot({
    consumer_key: process.env.BOT_CONSUMER_KEY,
    consumer_secret: process.env.BOT_CONSUMER_SECRET,
    access_token: process.env.BOT_ACCESS_TOKEN,
    access_token_secret: process.env.BOT_ACCESS_TOKEN_SECRET
   });

   var retweet = function() {
    var params = {
        q: 'corpus -christi',  // REQUIRED
        result_type: 'recent',
        lang: 'en'
    }
    Bot.get('search/tweets', params, function(err, data) {
      // if there no errors
        if (!err) {
          // grab ID of tweet to retweet
            var retweetId = data.statuses[0].id_str;
            // Tell TWITTER to retweet
            Bot.post('statuses/retweet/:id', {
                id: retweetId
            }, function(err, response) {
                if (response) {
                    console.log('Retweeted!!!');
                }
                // if there was an error while tweeting
                if (err) {
                    console.log('Something went wrong while RETWEETING... Duplication maybe...');
                }
            });
        }
        // if unable to Search a tweet
        else {
          console.log(err);
        }
    });
}

// grab & retweet as soon as program is running...
retweet();
// retweet in every 15 minutes
setInterval(retweet, 9000000);
  

