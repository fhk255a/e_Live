//加载数据库方法
// 传过来的是sql中定义的conn
let conn = require('../schemas/sql');
let user_sql = require('./user_list');

//通过注册后的id 及时的插入到用户详情表格中
exports.add_userinfo=function(user_id,fun){
    user_sql.findUserId(user_id,function(user_data){
        let str = 'INSERT INTO `userinfo`(`id`, `username`, `name`, `head_img`, `sex`, `orders`,`admin`) VALUES ("'+user_data[0].id+'","'+user_data[0].username+'","'+user_data[0].username+'","../../public/images/my/head.png",1,0,"'+user_data[0].admin+'")';
        conn.query(str,function(err, result) {
            if (err) {
                console.log('获取数据失败' + err);
                return;
            }
            fun(result);
        })
    })
};

//通过user_id来获取该用户的信息
exports.find_userinfo = function(user_id,fun){
    let str = 'SELECT * FROM `userinfo` WHERE `id`='+user_id;
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        switch(result[0].admin)
        {
            case 0:
                result[0].adminType = '普通用户';
                break;
            case 1:
                result[0].adminType = '普通会员';
                break;
            case 66:
                result[0].adminType = '管理员';
                break;
            case 99:
                result[0].adminType = '超级管理员';
                break;
        }
        fun(result);
    })
};

//修改指定用户的某些信息
//取决于传过来的str
exports.update_userinfo = function(str,fun){
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};

//获取当前用户的收货地址
exports.get_user_address = function(user_Id,fun){
    let str = 'SELECT * FROM `userinfo` WHERE `id`='+user_Id;
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
//添加当前用户的收货地址
exports.add_user_address = function(str,fun){
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
//修改用户的余额
exports.updata_user_balance = function(str,fun){
    conn.query(str,function(err,result){
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};