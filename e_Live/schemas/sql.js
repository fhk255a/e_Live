// 加载数据库模块
let sql = require('mysql');

//配置数据库
let conn = sql.createConnection({
    host: "localhost", 			// 服务器地址
    user: "root", 				// 登录名
    password: "root", 		    // 登录密码
    port: "3306", 				// 服务器端口
    database: "e_life" 		// 连接的 e生活 数据库名
});

//进行连接
conn.connect(function (err) {
    if(err){
        console.log('数据库连接失败：'+err);
        return;
    }
    console.log('数据库连接！');
});

//把整个router返回出去
module.exports = conn;