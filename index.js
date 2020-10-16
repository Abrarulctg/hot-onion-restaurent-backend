const express = require('express');
const cors = require ('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express();

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.DB_PATH;

let client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


//Get all Food data
app.get('/foods', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("onlineFood").collection("foods");
        collection.find().toArray((err, documents) => {
            if (err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents);
            }
        });
        //client.close();
      });
});





//Get ID Wise Food data
app.get('/foods/:id', (req, res) =>{
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const scholarshipId = Number(req.params.id)

    client.connect(err => {
        const collection = client.db("onlineFood").collection("foods");
        collection.find({id:scholarshipId}).toArray((err, documents) => {
            if (err){
                console.log(err);
                res.status(500).send({message:err})
            }
            else{
                res.send(documents[0]);
            }
        });
        //client.close();
      });
});


//Post Order Data to Database
app.post('/placeOrder', (req, res) => {
    const scholarship = req.body;
    
    client.connect(err => {
        const collection = client.db("onlineFood").collection("orders");
        collection.insertOne(scholarship, (err, result) => {
            if (err){
                res.status(500).send({message:err})
            }
            else{
                res.send(result.ops[0]);
            }
        });
        //client.close();
      });
});




// //Post Order
// app.post('/placeOrder', (req, res) => {
//     const product = req.body;
    
//     client.connect(err => {
//         const collection = client.db("onlineFood").collection("orders");
//         collection.insert(product, (err, result) => {
//             if (err){
//                 res.status(500).send({message:err})
//             }
//             else{
//                 res.send(result.ops[0]);
//             }
//         });
//         //client.close();
//       });
// });

const port = process.env.PORT || 4200;
app.listen(port, () => console.log('Listening to port 4100'))
