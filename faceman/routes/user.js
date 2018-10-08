const express = require('express');
const pool = require('../pool.js');
//导入连接数据库的模块
//使用路由器
var router = express.Router();
//添加请求方法为post，url为add的路由
//.判断用户是否登录
router.get('/login',function(req,res){
  if(req.session.user){
    var user=req.session.user;
    res.send(user);
   }else{
    res.send('0');
   }
  
  });
router.post('/login',(req,res)=>{//2.用户登录
  var {uname,upwd} = req.body;
  //查询数据库中是否含有这条记录
  //同时满足用户名为$uname和密码$upwd
  var sql='SELECT count(uid) AS BB,uid FROM fm_user WHERE uname=? AND upwd=?';
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    console.log(result);
    if(result[0]['BB']==1){
      /* 登录成功就把用户信息加入session */
      var user={
        uname,
        uid:result[0]['uid']
       }
       req.session.user=user;
       req.session.sign=true;
       console.log(req.session);
	    res.send("1");
	  }else{
	    res.send("0");
	  }
  });
});

router.post('/register',(req,res)=>{//.用户注册
  var {uname,upwd,uphone,uemail} = req.body;
  //查询数据库中是否含有这条记录
  //同时满足用户名为$uname和密码$upwd
  var sql='SELECT count(uid) AS BB FROM fm_user WHERE uname=?';
  pool.query(sql,[uname],(err,result)=>{
    if(err) throw err;
    
    if(result[0]['BB']==0){
      var sql2='INSERT INTO fm_user VALUES (null,?,?,?,?,null,null,null)';
      pool.query(sql2,[uname,upwd,uphone,uemail],(err,result)=>{
        if(err) throw err;
     
      if(result.affectedRows>0)
      res.send("1");else res.send("0");
    });
	  }else{
	    res.send("0");
	  }
  });
});
//6.用户列表
router.get('/list', (req,res)=>{
  var obj = req.query;
  //console.log(obj);
  var $page = obj.page; //页码
  var $size = obj.size; //每页大小
  //把客户端所传递的数据转为整型
  $page = parseInt($page);
  $size = parseInt($size);
  //如果为空，设置一个默认值
  if(!$page){
    $page = 1; //页码为空，默认第一页
  }
  if(!$size){
    $size = 5; //分页大小为空，默认大小为2
  }
  //计算分页查询的开始
  var $begin = ($page-1)*$size;
  var sql = 'SELECT * FROM xz_user LIMIT ?,?';
  pool.query(sql,[$begin,$size],(err,result)=>{
      //console.log(result);
    if(err) throw err;
    setTimeout(function(){
      res.send(result);
    },5000)
  });
});
//用户登出
router.get('/logout', function(req, res) {
  if(req.session.user){
    req.session.user = null;
    res.end();
  }
  
  else
  {res.send("0")}
 });
 //查询信息
 router.get('/person_info', function(req, res) {
   var $uid=req.session.user.uid;
  var sql='SELECT * FROM fm_user WHERE uid=?';
  pool.query(sql,[$uid],(err,result)=>{
    if(err) throw err;
    console.log(result);
    res.send(result[0]);
  
	  }
  );


 });
 /* 查询原密码是否正确 */
 router.post('/last_upwd', function(req, res) {
   var last_upwd=req.body.upwd;
  var $uid=req.session.user.uid;
 var sql='SELECT count(uname) as cc FROM fm_user WHERE uid=? and upwd=?';
 pool.query(sql,[$uid,last_upwd],(err,result)=>{
   if(err) throw err;
   
   if(result[0]["cc"]==0)
   res.send("0");else res.send("1")

   
 
   }
 );


});


 /* 修改信息 */
 router.post('/person_upinfo',(req,res)=>{
  var {uphone,uemail,user_name,gender} = req.body;
  
  console.log([uphone,uemail,user_name,gender]);
  var sql=`UPDATE  fm_user  SET phone=?,email=?,user_name=?,gender=? WHERE uid=${req.session.user.uid}` ;
  pool.query(sql,[uphone,uemail,user_name,gender],(err,result)=>{
    if(err) throw err;
    
    if(result.affectedRows==1){
      res.send("1");
    }else res.send("0");
	  
  });
});

/* 修改密码 */

 router.post('/new_upwd',(req,res)=>{//.
  var upwd = req.body.upwd;
  
 
  var sql=`UPDATE  fm_user  SET upwd=? WHERE uid=${req.session.user.uid}` ;
  pool.query(sql,[upwd],(err,result)=>{
    if(err) throw err;
    
    if(result.affectedRows==1){
      req.session.user = null;
      res.send("1");
    }else res.send("0");
	  
  });
});
//导出路由器
module.exports = router;
