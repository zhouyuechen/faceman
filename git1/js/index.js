console.log('fxxk');
/* const http=require('http'); */
const express=require('express');
const mysql=require('mysql');
const port =5050;//端口号 1~65535 1024以下的别用
var app=express();//这是请求处理函数，app对象
app.listen(port, () => {//监听端口
    console.log('Server listening on ',port);
});

app.use(express.static('./static'));
app.get('/',(req,res)=>{
	res.send('yoyo qiekenao');
});