let conn = require('../schemas/sql');


exports.get_imgurl=function(type,fun){
    let str = 'SELECT * FROM `img_list` WHERE type='+type+"";
    conn.query(str,function(err, result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};