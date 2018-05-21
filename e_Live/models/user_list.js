//加密 模块
let crypto = require('crypto');
//加密 password -> 需要加密的字符串
function md5(password){
    return crypto.createHash('md5').update(JSON.stringify(password)).digest('hex');
};
//解密 其实说白了就是用传进来的password去加密操作再进行判断而已
function crack(password){
    return crypto.createHash('md5').update(JSON.stringify(password), 'utf8').digest("hex");
};
// let s = md5('13213123');
// console.log(s == crack('13213123'));


//加载数据库方法
// 传过来的是sql中定义的conn
let conn = require('../schemas/sql');


//把时间戳转为标准格式
//c_time 时间戳
function toStandardTime(c_time) {
    return c_time.getFullYear() + '-' + (c_time.getMonth() + 1) + '-' + p(c_time.getDate()) + ' ' + p(c_time.getHours()) + ':' + p(c_time.getMinutes());
    //不足两位数前面加0
    function p(s) {
        return s < 10 ? '0' + s : s;
    }
}

exports.findUser = function (username, fun) {
    let sqlStr = 'SELECT * FROM `userdata` WHERE username="' + username + '"';
    conn.query(sqlStr, function (err, result) {
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
exports.addUser = function(username,password,fun){
    let c_time = new Date();
    c_time = toStandardTime(c_time);
    let sqlStr = ' INSERT INTO `userdata`( `username`, `password`, `c_time`) VALUES ("'+username+'","'+md5(password)+'","'+c_time+'") ';
    conn.query(sqlStr, function (err, result) {
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};
exports.findUserId = function(user_id,fun){
    let sqlStr = ' SELECT * FROM `userdata` WHERE `id`='+user_id;
    conn.query(sqlStr, function (err, result) {
        if (err) {
            console.log('获取数据失败' + err);
            return;
        }
        fun(result);
    })
};