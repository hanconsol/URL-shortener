require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Url = require('./models/url.model.js');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(express.json());

app.use(express.urlencoded({extended: false}));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// add post
app.post('/api/shorturl', async (req, res) => {
 try{
    const url = await Url.create(req.body);
    res.json(url);
 }
 catch(error) {
     res.json({error: "Content not posted"})
 }
})

  mongoose.connect(process.env.MONGO_URI) 
  .then(() => {
    console.log("Database is connected!");
  app.listen(port, function() {
     console.log(`Listening on port ${port}`)
    });
  })
  .catch((err) => console.log("Error: Database not connected"));

