//引入项目所需的包
const express = require('express');
const user = require('./routes/user.js');
const picture = require('./routes/picture.js');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
//1.使用express构建web服务器
var app = express();
app.listen(3015);

//2.托管静态资源
app.use(express.static(__dirname+'/static'));


//配置body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());//配置cookieParser
app.use(session({//配置cookieParser
  secret: 'zhou app', //secret的值建议使用随机字符串
  cookie: {maxAge: 60 * 1000 * 30}, // 过期时间（毫秒）
  resave:false,
  saveUninitialized:true
}));
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
  else
      next();
});



//3.使用路由器管理所有用户模块下的路由
// 挂载到user下   /user/add
app.use('/user',user);
app.use('/picture',picture);