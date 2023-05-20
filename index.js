const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const customerComment = require('./Data/cutommerComment.json');

app.use(cors());
app.use(express.json()); // Add this line to enable body parsing


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.s1xtzuq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const toysCollection = client.db('toysMarket').collection('toys');

    app.get('/toys', async (req, res) => {
      console.log(req.body);
      let query = {};
      if (req.query?.email) {
          query = { email: req.query.email }
      }
      const result = await toysCollection.find(query).toArray();
      res.send(result);
  })

  app.post('/api/saveData',async (req, res) => {
    const toys = req.body;
    console.log(toys);
    const result = await toysCollection.insertOne(toys);
    res.send(result);
});




   
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


 app.get('/', (req, res)=>{
    res.send('server is running')
 })
 app.get('/customerComment',(req, res)=>{
   res.send(customerComment);
   console.log(customerComment);
 })

 app.listen(port, ()=>{
    console.log(`toy server is running: ${port}`);
 })