const express = require('express');
const axios = require('axios');
const cors = require("cors");
const app = express();
const port = 65533;
 
app.use(cors());
app.use(express.json());

const { mongoClient } = require('./mongo');

//orderApi File
const { orderApi } = require('./orderApi'); //link
////////

const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

//db connection
const ordId = require("mongodb").ObjectId; //get id from DB

//Port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

 //routes
 app.get('/', async (req,res) => {

  //res.json({mssg:"welcome to api "})
   const db = await mongoClient();

   if (!db) res.status(500).send('Systems Unavailable');
 
   const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
   await db.collection('weather').insertOne(data);
 
   return res.send(data);
    });

    app.get('/addOrder',async (req,res) => {
      res.json({mssg:"welcome to api "})
    });