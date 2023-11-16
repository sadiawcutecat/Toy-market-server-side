const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;
const customerComment = require('./Data/cutommerComment.json');

app.use(cors());
app.use(express.json()); // Add this line to enable body parsing


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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
      console.log(result);
      res.send(result);
  })

  app.post('/api/toys',async (req, res) => {
    const toys = req.body;
    console.log(toys);
    const result = await toysCollection.insertOne(toys);
    res.send(result);
});

app.get('/api/allToys', async(req, res) =>{
  console.log(req.body);
  const result = await toysCollection.find({}).toArray();
  console.log(result);
  res.send(result);
})

// app.get('/api/myToys', async(req, res) =>{
//   const { email } = req.query;
//   console.log(email);
//   const result = await toysCollection.find({}).toArray();
//   console.log(result);
//   res.send(result);
// })

app.get('/api/myToys', async (req, res) => {
  try {
    const em = req.params.email;
    console.log(em);
  
    const result = await toysCollection.findOne({ email: em });
    console.log(result);
  
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.put('/api/myToys/:id', async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const updateToys = req.body;
  console.log(updateToys);
  const updateDoc = {
      $set: {
          status: updateToys.status
      },
  };
  const result = await toysCollection.updateOne(filter, updateDoc);
  res.send(result);
})

app.delete('/api/myToys/:id', async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) }
  const result = await toysCollection.deleteOne(query);
  res.send(result);
})




   
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
  //  console.log(customerComment);
 })

 app.listen(port, ()=>{
    console.log(`toy server is running: ${port}`);
 })