const express = require('express');
//使用路由功能,你已经是个路由器了嗯
var app = express();
const bodyParser = require('body-parser');
var router = express.Router();
app.use(bodyParser.urlencoded({
	extended: false
})); //不使用querystring这种方式
const mysql = require('mysql');
const pool = require('../pool.js');
//导入 连接池模块const express = require('express');
router.get('/', (req, res) => { //首页加载的商品
	var body = req.query;


	var sql = 'SELECT * FROM xz_index_product WHERE seq_recommended !=0 order by seq_recommended';
	pool.query(sql, [], (err, result) => {
		//?表示占位
		if (err) {
			throw err;
		}
		res.send(result);
	});

});
/* router.post('/upd', (req, res) => { //用户修改
    var body =req.body;
		var $uid=body.uid;
		var $email=body.email;
		var $phone=body.phone;
		var $gender=body.gender;
		var $user_name=body.user_name;
		if(!$uid){
			res.send({code:401,msg:'uid require'});
			
		}
		var sql=`UPDATE xz_user SET user_name=?,gender=?,email=?,phone=? WHERE uid=?`;
		pool.query(sql,[$user_name,$gender,$email,$phone,$uid],(err,
        result, fields) => {
        //?表示占位
        if (err) {
        
        }
        if(result.affectedRows>0){
					res.send({code:200,msg:'update success'});
				}else {res.send({code:301,msg:'no such uid'});}
        });
}); */











module.exports = router;
