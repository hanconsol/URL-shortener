require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Url = require('./models/url.model.js');
const validate = require('./utils/validate.js');
const parseUrl = require('url');

const { error } = require('console');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' });
});
app.get('/api/shorturl/:shorturl', async (req, res) => {
  try {
    const shorturl = req.params.shorturl;
    console.log("short url = ", shorturl);
    const url = await Url.findOne({ short_url: shorturl });
    if (url) {
      console.log("Found Shorty!");
      res.redirect(url.url);
      process.exit;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });

  };
})


// add post
app.post('/api/shorturl', async (req, res) => {
  // console.log(req.body);
  const original_url = req.body.url;
  const q = parseUrl.parse(original_url, true);
  const hostname = q.hostname;
  // validate @ utils/validate.js
  // console.log(q);
  const valid = await validate(hostname, original_url);
  console.log(valid);
  if (valid) {
    try {

      const url = await Url.create(req.body);
      const short_url = url.short_url;

      //  console.log("url = ", url, "req.body =", req.body);
      res.json({ original_url: url.url, short_url: short_url });

    }

    catch (error) {
      res.json({ error: "Content not posted" })
    }
  } else {
    res.json({ error: "invalid url" });
  }

});
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database is connected!");
    app.listen(port, function () {
      console.log(`Listening on port ${port}`)
    });
  })
  .catch((err) => console.log("Error: Database not connected"));

