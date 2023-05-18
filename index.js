const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const customerComment = require('./Data/cutommerComment.json');

app.use(cors());

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