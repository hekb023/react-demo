const express = require('express');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express();

const models = require("./moudel.js");
const Chat = models.getModel("chat");
// Chat.deleteMany({},()=>{})

// work with express（同express配合）
const server = require('http').Server(app);
const io = require('socket.io')(server);

// io全局的请求，socket当前的请求
io.on('connection',function(socket){
  socket.on('sendmsg',function(data){
    const {from, to, msg} = data;
    const chatid = [from,to].sort().join('_');
    Chat.create({chatid,from,to,content:msg}, function(err,doc){
      io.emit('recvmsg',Object.assign({}, doc._doc))
    })
    // io.emit('recvmsg',data);
  })
})

const userRouter = require('./user')

app.use(cookieParser());
app.use(bodyParser.json())

app.use('/user',userRouter);

server.listen(9093,()=>{
  console.log('node sever run port 9093')
})