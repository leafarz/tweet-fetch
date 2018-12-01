const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const tweet = require('./routes/api/tweet');

// middlewares
const app = express();
app.use(bodyParser.json());

// ==================================================
// routes
app.use('/api/tweet', tweet);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  })
}

const port = process.env.PORT || 5000;
app.listen(port, _ => { console.log(`Server started on port ${port}`); });