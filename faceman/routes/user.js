const express = require('express');
const pool = require('../pool.js');
//导入连接数据库的模块
//使用路由器
var router = express.Router();
//添加请求方法为post，url为add的路由
//2.用户登录
router.post('/login',(req,res)=>{
  var {uname,upwd} = req.body;
  //查询数据库中是否含有这条记录
  //同时满足用户名为$uname和密码$upwd
  var sql='SELECT * FROM xz_user WHERE uname=? AND upwd=?';
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err) throw err;
    if(result.length>0){
	    res.send('login suc');
	  }else{
	    res.send('uname or upwd error');
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

//导出路由器
module.exports = router;
