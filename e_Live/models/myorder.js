let conn = require('../schemas/sql');
// 我的订单
exports.allList = function (fun) {
    let sql = "SELECT * FROM `myorder` where 1";
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result);
    })
}
exports.fukuan_list = function (fun) {
    let sql = "SELECT * FROM `myorder` where state=2";
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result);
    })
}
exports.shiyong_list = function (fun) {
    let sql = "SELECT * FROM `myorder` where state=4";
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result);
    })
}
exports.pinjia_list = function (fun) {
    let sql = "SELECT * FROM `myorder` where state=1";
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result);
    })
}
exports.tuikuang_list = function (fun) {
    let sql = "SELECT * FROM `myorder` where state=5";
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        fun(result);
    })
}
// 评价发布，添加评价
exports.addEvaluate = function (body,fun) {
    let sql = 'insert into `evaluate`(`id`,`evalute`) values(null,"'+body.str+'")';
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err)
            return;
        }
        console.log('添加成功')
        fun(true)
    })
}
//修改商品状态，评价变为已消费
exports.updateState = function (id) {
    let sql = "update `myorder` set `state`=3 where id="+id+"";
    console.log(sql);
    conn.query(sql,function (err,result) {
        if(err){
            console.log(err);
            return;
        }
        console.log('修改成功');
    })
}