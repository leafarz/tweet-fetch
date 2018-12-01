const express = require('express');
const router = express.Router();

var Twitter = require('twitter');
const config = require('./../../config.js');

// twitter
var client = new Twitter({
  consumer_key: config.API.consumerKey,
  consumer_secret: config.API.consumerSecret,
  access_token_key: config.API.accessToken,
  access_token_secret: config.API.accessTokenSecret
});

// @route   Get api/tweet
// @desc    Get tweet of user with count
// @access  Public
router.get('/', (req, res) => {
  let _params = {
    screen_name: req.query.user || 'node',
    count: req.query.count || 0
  }

  client.get('statuses/user_timeline', _params, (error, tweets, response) => {
    if(!error)
    {
      res.json(tweets);
    }
    else
    {
      console.log('error', error);
    }
  });
});

module.exports = router;