const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const customerComment = require('./Data/cutommerComment.json');

 app.get('/', (req, res)=>{
    res.send('server is running')
 })

 app.listen(port, ()=>{
    console.log(`toy server is running: ${port}`);
 })