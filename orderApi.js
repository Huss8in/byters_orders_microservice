const express = require('express')

const addOrder = (async (request, response) => {
    const {orderID,prodId,qunt,price,prodName} = request.body
    totl = price * qunt;

    mongoClient.connect(url, function(err, db) {
        if (err) throw err;

        var dbo = db.db("OrderService");
        var data = { id: orderID , productId: prodId ,productName: prodName,
          status: 'CREATED' , quantity: qunt , total: totl };

        dbo.collection("orderInfo").insertOne(data, function(err, res) {
          if (err) throw err;
          console.log("Order Inserted Successfully!");
          db.close();
        });

      });
    });

      const cancelOrder = async (request, response) => { //in case of cancellation

        const {orderID,prodId,qunt,price,prodName} = request.body
        totl = price * qunt;

        mongoClient.connect(url, function(err, db) {
            if (err) throw err;

            var dbo = db.db("OrderService");
            var data = { id: orderID , productId: prodId ,productName: prodName,status: 'CANCELLED' ,
             quantity: qunt , total: totl };

            dbo.collection("orderInfo").FindAndModify(data, function(err, res) {
              if (err) throw err;

              console.log("Order Cancelled Successfully!");
              db.close();
            });
          });
        }
