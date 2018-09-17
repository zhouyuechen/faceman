//引入项目所需的包
const express = require('express');
const user = require('./routes/user.js');
const picture = require('./routes/picture.js');
const bodyParser = require('body-parser');

//1.使用express构建web服务器
var app = express();
app.listen(3015);

//2.托管静态资源
app.use(express.static('./static'));


//配置body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));

//3.使用路由器管理所有用户模块下的路由
// 挂载到user下   /user/add
app.use('/user',user);
app.use('/picture',picture);