//使用express构建web服务器 --
const express = require('express');
const bodyParser = require('body-parser');
/*引入路由模块*/


var app = express();
var server = app.listen(3000);
//使用body-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
//托管静态资源到public目录下
app.use(express.static('public'));
/*使用路由器来管理路由*/

const index=require('./routes/index.js');
//index.js挂载到/index
app.use('/index',index);

const detail=require('./routes/detail.js');

app.use('/detail',detail);