const API = {
  consumerKey: process.env.API_CONSUMER_KEY || 'YOUR_CONSUMER_KEY_HERE',
  consumerSecret: process.env.API_CONSUMER_SECRET || 'YOUR_CONSUMER_SECRET_HERE',
  accessToken: process.env.API_ACCESS_TOKEN || '',
  accessTokenSecret: process.env.API_TOKEN_SECRET || '',
};

module.exports = {
  API: API
};