const mysql = require('mysql');
//方法二，连接池
var pool = mysql.createPool({
    host: '127.0.0.1', //本地主机 还有叫localhost
   
    user: 'root',
    password: '',
    database: 'fm',
    connectionLimit: 15 //连接池的限制数量
});
//导出
module.exports=pool;