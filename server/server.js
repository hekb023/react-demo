const express = require('express');
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/react';
mongoose.connect(DB_URL,{ useNewUrlParser: true });
mongoose.connection.on('open',()=>{
  console.log("mongo connect success")
})

const User = mongoose.model('user', new mongoose.Schema({
  name:{type: String, required: true},
  age:{type: Number, required:true}
}))

// User.create({
//   age: 19
// },function(err,doc){
//   if(!err){
//     console.log(doc)
//   }else{
//     console.log(err)
//   }
// })

const app = express();

app.get('/',(req,res)=>{
  res.send('<h1>hello world!</h1>')
})

app.get('/data',(req,res)=>{
  User.find({},(err,doc)=>{
    res.json(doc)
  })
})

app.listen(9093,()=>{
  console.log('node sever run port 9093')
})