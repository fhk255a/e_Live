let conn = require('../schemas/sql');

exports.getaddress = function (fun) {
    conn.query('SELECT * FROM `address` WHERE 1', function (err, result) {
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
exports.getadd_where=function(str,fun){
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};