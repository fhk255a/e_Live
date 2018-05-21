let conn = require('../schemas/sql');


exports.updata=function(str,fun){
    conn.query(str,function(err, result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
exports.get_limit_data=function(index,fun){
    let str = 'SELECT * FROM `hotel` WHERE 1 limit '+index+',10;';
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};

//获取全部酒店
exports.getdata=function(fun){
    let str = 'SELECT * FROM `hotel` WHERE 1 ';
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};