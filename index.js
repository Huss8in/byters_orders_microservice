require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require("cors");
const port = 4000;
const app = express();
app.use(cors({
  origin: '*'
}));
app.use(express.json());
//mongo connection
const { mongoClient } = require('./mongo');
const BodyParser = require("body-parser");

const { query } = require('express');


app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));


//orderApi
const { addOrder } = require('./orderApi'); //link

//db connection
const ordId = require("mongodb").ObjectId; //get id from DB

//Port
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//routes
//localHost
// app.get('/', async (req, res) => {

//   res.json({ mssg: "welcome to localhost 4000 " })

//   const db = await mongoClient();
//   return res.send(data);
// });
//all
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
//addOrder
app.post('/addOrder', addOrder);


// //PROCESSING
// app.patch('/ifPay/:orderId', async (req, res) => {
//   const db = await mongoClient();
//   if (!db) res.status(500).send("No db connection");

//   var x = Number(req.params.orderId)
//   console.log(x);
//   const result = await db.collection('orderInfo').findOne({ "Order_id": x });

//   const updateShipmentStatus = {
//     CREATED: 'PROCESSING',
//     PROCESSING: 'PROCESSING',
//     FULFILLED: 'PROCESSING',
//   }[result.status];

//   const results = await db.collection('orderInfo').updateOne({ "Order_id": x },
//     { $set: { "status": 'PROCESSING' } });
//   return res.status(200).send(results);
// });


// //FULFILLED
// app.patch('/ifDone/:orderId', async (req, res) => {
//   const db = await mongoClient();
//   if (!db) res.status(500).send("No db connection");

//   var x = Number(req.params.orderId)
//   console.log(x);
//   const result = await db.collection('orderInfo').findOne({ "Order_id": x });

//   const updateShipmentStatus = {
//     CREATED: 'FULFILLED',
//     PROCESSING: 'FULFILLED',
//     FULFILLED: 'FULFILLED',
//   }[result.status];

//   const results = await db.collection('orderInfo').updateOne({ "Order_id": x },
//     { $set: { "status": 'FULFILLED' } });
//   return res.status(200).send(results);
// });


//cancelOrder
app.patch('/cancelOrder/:orderId', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");

  var x = Number(req.params.orderId)
  console.log(x);
  const result = await db.collection('orderInfo').findOne({ "Order_id": x });

  const updateShipmentStatus = {
    CREATED: 'CANCELED',
    PROCESSING: 'CANCELED',
    FULFILLED: 'CANCELED',
  }[result.status];

  const results = await db.collection('orderInfo').updateOne({ "Order_id": x },
    { $set: { "status": 'CANCELED' } });
  return res.status(200).send(results);
});
////////////////////////////////////////////////////////////////////////////////////////////
//  app.get('/', async (req,res) => {
//    const db = await mongoClient();
//    if (!db) res.status(500).send('Systems Unavailable');

//    const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
//    await db.collection('weather').insertOne(data);

//    return res.send(data);
//  });

////////////////////////////////////////////////////////////////////////////////////////////