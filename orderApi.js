const url="mongodb+srv://Byters:AmmarY2020@cluster0.aicfa.mongodb.net/?retryWrites=true&w=majority"
var mongoClient = require('mongodb').MongoClient;
const axios = require('axios');
const req = require('express/lib/request');
var r= 11

const addOrder = async (request, response) => {
  const { orderID, prodId, qunt, price, prodName } = request.body
  totl = price * qunt;
  mongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbo = db.db("OrderService");
   
    var data = {
      orderID:r, prodId: request.body.prodId, qunt: 1,
     prodName: request.body.prodName, 
      status: 'CREATED',
    };
    newOrder = dbo.collection("orderDB").insertOne(data, function (err, res) {
      if (err) throw err;
      console.log("Order Inserted Successfully!");
      r=r+1
      db.close();
      return(response.send({data}))
    });

    });
        console.log("Payment Link created successfully!");
    //response.send(session.url);

}

module.exports = {
  addOrder
  //,cancelOrder
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////CANCEL_ORDER

  // const cancelOrder = async (request, response) => { //in case of cancellation

  //       const {orderID,prodId,qunt,price,prodName} = request.body
  //       totl = price * qunt;
  //       mongoClient.connect(url, function(err, db) {
  //           if (err) throw err;

  //           var dbo = db.db("OrderService");
  //           var data = { id: orderID , productId: prodId ,productName: prodName,status: 'CANCELLED' ,
  //            quantity: qunt , total: totl };

  //           dbo.collection("orderInfo").FindAndModify(data, function(err, res) {
  //             if (err) throw err;

  //             console.log("Order Cancelled Successfully!");
  //             db.close();
  //           });
  //         });
  //       }
// const url = "mongodb+srv://Byters:AmmarY2020@cluster0.aicfa.mongodb.net/?retryWrites=true&w=majority"
// var mongoClient = require('mongodb').MongoClient;
// //const axios = require('axios');


// let newOrder;

// const addOrder = async (request, response) => {
//   const { orderID, prodId, qunt, price, prodName } = request.body
//   totl = price * qunt;
//   mongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("OrderService");
//     var data = {
//       id: orderID, productId: prodId, productName: prodName, prodName: 'CREATED',
//       quantity: qunt, total: totl
//     };
//     newOrder = dbo.collection("orderInfo").insertOne(data, function (err, res) {
//       if (err) throw err;
//       console.log("Order Inserted Successfully!");
//       db.close();
//       //res.send("hi")
//     });

//     // await axios.post("http://localhost:3000/order", {
//     //   email: newOrder.email
//     // })

//   });
//   console.log("Payment Link created successfully!");
//   //response.send(session.url);
// }

// ///////////////////////////////////////////////
// //response.send(session.url);

// ///////////////////////////////////////////////CANCEL_ORDER

// const cancelOrder = async (request, response) => { //in case of cancellation

//   const { orderID, prodId, qunt, price, prodName } = request.body
//   totl = price * qunt;

//   mongoClient.connect(url, function (err, db) {
//     if (err) throw err;

//     var dbo = db.db("OrderService");
    
//     var data = {
//       id: 11, productId: 31, productName: prodName, status: 'CANCELLED',
//       quantity: qunt
//     };

//     dbo.collection("orderInfo").FindAndModify(data, function (err, res) {
//       if (err) throw err;

//       console.log("Order Cancelled Successfully!");
//       db.close();
//     });
//   });
// }

//module.exports = {
  //addOrder
 //, cancelOrder
//}
