//加载数据库方法
// 传过来的是sql中定义的conn
let conn = require('../schemas/sql');
let user_sql = require('user_list');

exports.add_userinfo=function(user_id,fun){
    user_sql.findUser()
    conn.query(str,function(err, result) {
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
}