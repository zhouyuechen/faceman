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

router.get('/', (req, res) => { //
	var body = req.query;
	var lid =body.lid;
var obj={
	product:{},
	specs:[],
	pics:[]

};

(async function(){
	var sql = 'SELECT * FROM xz_laptop WHERE lid=?';
	await new Promise (function(open){ 
		pool.query(sql, [lid], (err, result) => {
		//?表示占位
		if (err) {
			throw err;
		}
		obj.product=result[0];
		open();
	});
 })
 var sql2 = 'SELECT lid,spec FROM xz_laptop WHERE family_id=(SELECT family_id FROM xz_laptop WHERE lid=?)';
 await new Promise (function(open){ 
 pool.query(sql2, [lid], (err, result) => {
 	//?表示占位
 	if (err) {
 		throw err;
 	}
 	obj.specs=result;
 	open();
 });})
 
 var sql3 = 'SELECT  pic FROM xz_laptop WHERE lid=?';
 await new Promise (function(open){ 
 pool.query(sql3, [lid], (err, result) => {
 //?表示占位
 if (err) {
 	throw err;
 }
 obj.pics=result;
 open();
 });})
 
 res.send(obj);
 })()
 
 
 
});











module.exports = router;