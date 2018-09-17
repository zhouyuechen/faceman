const express=require("express");
const router=express.Router();
const pool=require("../pool");
///details
/* router.get("/",(req,res)=>{
  //按lid查询商品信息和规格列表
  var lid=req.query.lid, obj={product:{},specs:[],pics:[]};
  (async function(){
    //1. 按lid查询商品信息——异步
    var sql="SELECT * FROM xz_laptop where lid=?";
    await new Promise(function(open){
      pool.query(sql,[lid],(err,result)=>{
        if(err) console.log(err);
        obj.product=result[0];
        open();
      })
    })
    //2. 按lid查询规格列表——异步
    var sql=`select lid, spec from xz_laptop 
    where family_id=(
      select family_id from xz_laptop where lid=?)`;
    await new Promise(function(open){
      pool.query(sql,[lid],(err,result)=>{
        if(err) console.log(err);
        obj.specs=result;
        open(); 
      })
    })
    //3. 按lid查询图片列表——异步
    var sql=`select * from xz_laptop_pic where laptop_id=?`;
    await new Promise(function(open){
      pool.query(sql,[lid],(err,result)=>{
        if(err) console.log(err);
        obj.pics=result;
        open(); 
      })
    })
    res.send(obj);//4. 返回结果
    //测试: http://localhost:3000/details?lid=5
  })()
});
 */

router.get("/search",(req,res)=>{/* 搜索关键词查找  需要输入查询字符串tips= &pNum=*/
var data={
	pageCount:0,
	pNum:0,
	picture:[]
	
};
	var tips=req.query.tips;
	var pNum=req.query.pNum;
	var tipsArr=tips.split(" ");
	tipsArr.forEach( (elem,i,tipsArr)=>tipsArr[i]=` tips like '%${elem}%' ` );
	var where=`WHERE ${tipsArr.join(" and ")}`;

	var sql=`SELECT * FROM fm_picture  `;
	sql+=where;
	//sql+=`LIMIT ${pNum*3},3`;//页码与每页数量都可以改var limit=`LIMIT ${pNum*9},每页数量`;
	
	
	pool.query(sql,[],(err,result)=>{
		
		if (err){ console.log( err);}
		data.pNum=pNum;
		data.picture=result.slice(pNum*7,pNum*7+7);
		data.pageCount=Math.ceil(result.length/7);
		res.send(data);
	} );
	
	
	
	
	
});
router.get("/simi",(req,res)=>{/* 搜索关键词查找  需要输入查询字符串tips= &pNum=*/
var data={
	
	picture:[]
	
};
	

	var sql=`SELECT * FROM fm_picture limit ?,8 `;
	
	//sql+=`LIMIT ${pNum*3},3`;//页码与每页数量都可以改var limit=`LIMIT ${pNum*9},每页数量`;
	
	var start=Math.floor(Math.random()*2);
	pool.query(sql,[start],(err,result)=>{
		
		if (err){ console.log( err);}
		
		data.picture=result;
		
		res.send(data);
	} );
	
	
	
	
	
});






module.exports=router;