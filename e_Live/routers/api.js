//加载模块
let express = require('express');
let router = express.Router();

//调用api的模块
var request = require('request');
//加载数据库方法
//用户列表的数据
let user_sql = require('../models/user_list');
//坐标数据表
let address_sql = require('../models/address');
//图片数据表
let img_sql = require('../models/imgsql');
//用户个人详细数据
let userinfo_sql = require('../models/user_info');


//定义一个中间件 用于反馈给客户端的数据
router.use(function (req, res, next) {
    req.warn_msg = {
        code: 0,
        msg: '',
        isAdmin: false
    };
    req.ticket_msg = {};
    if (req.cookies.get('ticket_add')) {
        req.ticket_msg = JSON.parse(req.cookies.get('ticket_add'));
        req.ticket_msg.start_add = new Buffer(req.ticket_msg.start_add, 'base64').toString();
        req.ticket_msg.end_add = new Buffer(req.ticket_msg.end_add, 'base64').toString();
        req.ticket_msg.date = new Buffer(req.ticket_msg.date, 'base64').toString();
    }
    next();
});
//加密 模块
let crypto = require('crypto');

//加密 password -> 需要加密的字符串
function md5(password) {
    return crypto.createHash('md5').update(JSON.stringify(password)).digest('hex');
};

//解密 其实说白了就是用传进来的password去加密操作再进行判断而已
function crack(password) {
    return crypto.createHash('md5').update(JSON.stringify(password), 'utf8').digest("hex");
};
//获取地址
router.post('/getadd_/:p', function (req, res) {
    let add = req.params.p;
    switch (add) {
        case 'p': {
            let str = 'SELECT `pro_id`,`' + add + '` FROM `address` WHERE 1';
            address_sql.getadd_where(str, function (result) {
                res.json(result);
                return;
            });
            break;
        }
        case 'm': {
            let add_id = req.body.p_id || 19;
            let str = 'SELECT * FROM `address` WHERE pro_id = "' + add_id + '"';
            address_sql.getadd_where(str, function (result) {
                result = result[0].m.replace(/\"|\[|]/g, "").split(',');
                res.json(result);
                return;
            })
            break;
        }
        case 'd': {
            let p_id = req.body.p_id || 19;
            let m_id = req.body.m_id || 0;
            let str = 'SELECT * FROM `address` WHERE pro_id = "' + p_id + '"';
            address_sql.getadd_where(str, function (result) {
                // result = result[0].d.split('[]').replace(/\"|\[|]/g,"").split(',');
                // result = result[m_id].m.replace(/\"|\[|]/g,"").split(',');
                result = result[0].d.split('[]').toString();
                result = result.split('[]')[0].toString().split('],')[m_id].replace(/\"|\[|]/g, "").split(',');
                res.json(result);
                return;
            });
            break;
        }
    }
});

//获取当前时间的正确格式
function toStandardTime(c_time) {
    return c_time.getFullYear() + '-' + (c_time.getMonth() + 1) + '-' + p(c_time.getDate()) + ' ' + p(c_time.getHours()) + ':' + p(c_time.getMinutes());

    //不足两位数前面加0
    function p(s) {
        return s < 10 ? '0' + s : s;
    }
}

//设置坐标
router.post('/set_address', function (req, res) {
    function p(s) {
        return s < 10 ? '0' + s : s;
    }

    req.cookies.set('ticket_add', JSON.stringify(
        {
            start_add: new Buffer(req.body.start_add).toString('base64'),
            end_add: new Buffer(req.body.end_add).toString('base64'),
            date: new Buffer(req.body.date).toString('base64'),
        }
    ));
    res.json({data: req.address, ticket: req.ticket_msg});
});
//获取电影信息
router.post('/get_move_list/:type', function (req, res) {
    switch (req.params.type) {
        case 'hot': {
            request('http://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=365&', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    body = JSON.parse(body)
                    //处理。。。。。
                    res.json(body);
                    return;
                }
                ;
            })
            break;
        }
    }
//正在热映电影
//     request(' https://api-m.mtime.cn/Showtime/LocationMovies.api?locationId=365&', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             body = JSON.parse(body)
//             //处理。。。。。
//             res.json(body);
//             return;
//         };
//     })
});
//根据电影的id来获取电影详细内容
router.post('/get_move_info/:move_id', function (req, res) {
    request('https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId=' + req.params.move_id, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body)
            //处理。。。。。
            res.json(body);
            return;
        }
        ;
    })
});
//获取坐标
router.post('/get_address', function (req, res) {
    let time = new Date();
    time = toStandardTime(time);
    if (req.body.img_type != undefined) {
        let food_type = '美食';
        let food_index = req.body.food_type;
        switch (food_index) {
            case '0': {
                food_type = '辣';
                break;
            }
            case '1': {
                food_type = '小吃';
                break;
            }
            case '2': {
                food_type = '美食';
                break
            }
            case '3': {
                food_type = '快餐';
                break
            }
            case '4': {
                food_type = '香';
                break;
            }
            case '5': {
                food_type = '火锅'
                break;
            }
            case '6': {
                food_type = '甜'
                break;
            }
            case '7': {
                food_type = '甜点'
                break;
            }
        }
        let img_list = [];
        img_sql.get_imgurl(req.body.img_type, function (img) {
            for (var i = 0; i < img.length; i++) {
                img_list.push(img[i].img)
            }
            res.json({data: req.address, time: time, ticket: req.ticket_msg, img: img_list, food_type: food_type});
            return;
        })
    }
    // })
    else {
        res.json({data: req.address, time: time, ticket: req.ticket_msg});
        return;
    }

});

function split_arr_add(str) {
    str = str.split('[]');
    return str;
}

//登录验证
/* 判断用户名与密码是否正确 */
router.post('/login', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    user_sql.findUser(username, function (result) {
        if (result.length >= 1) {
            if (result[0].password == crack(password)) {
                req.warn_msg.code = 1;
                req.warn_msg.msg = '登录成功~';
                req.warn_msg.isAdmin = (result[0].admin == 99 || result[0].admin==66) ? true : false;
                req.cookies.set('user', JSON.stringify(
                    {
                        username: new Buffer(username).toString('base64'),
                        password: new Buffer(password),
                        id: result[0].id,
                        admin_tpye:result[0].admin,
                        isLogin: true,
                    }
                ));
                res.json({msg: req.warn_msg, user: req.user});
                return;
            }
            else {
                req.warn_msg.code = 2;
                req.warn_msg.msg = '登录失败，用户名或者密码错误~';
                res.json(req.warn_msg);
                return;
            }
        }
        else {
            req.warn_msg.code = 2;
            req.warn_msg.msg = "登录失败，用户名或者密码错误~";
            res.json(req.warn_msg);
            return;
        }
    });
});
//注册验证
/* 判断是否有存在该用户 */
router.post('/register', function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    user_sql.findUser(username, function (result) {
        if (result.length == 0) {
            user_sql.addUser(username, password, function (data) {
                userinfo_sql.add_userinfo(data.insertId, function () {
                    req.warn_msg.code = 1;
                    req.warn_msg.msg = "注册成功~";
                    res.json(req.warn_msg);
                    return;
                });
            });
        }
        else {
            req.warn_msg.code = 2;
            req.warn_msg.msg = "注册失败，该用户已经存在~";
            res.json(req.warn_msg);
            return;
        }
    });
});
//退出
router.post('/login_out',function(req,res){
    req.cookies.set('user', null);
    req.warn_msg.msg='退出成功~';
    req.warn_msg.code = 1;
    res.json(req.warn_msg);
});

//获取酒店info
/* 获取酒店info信息 */


//获取用户的信息
router.get('/my/get_userInfo', function (req, res) {
    let user_id = req.user.id;
    userinfo_sql.find_userinfo(user_id, function (result) {
        result[0].sex = (result[0].sex == 1) ? '男' : '女';
        res.json(result);
        return;
    })
});
//修改用户的信息
router.post('/my/set_userInfo', function (req, res) {
    userinfo_sql.update_userinfo(req.body.str, function (result) {
        req.warn_msg.msg = '修改成功~';
        req.warn_msg.code = 1;
        res.json(req.warn_msg);
        return;
    })
});
//获取用户的收货地址
router.get('/my/set_address', function (req, res) {
    let user_id = req.user.id;
    userinfo_sql.get_user_address(user_id, function (result) {
        //把整个address进行切割 以数组的形式传出去 切割特定值*^*
        let add = result[0].address.split('*^*');
        //删除最后的空元素
        add.pop();
        let newAdd_list =[];
        //定义一个空数组 用来保存字符串转为json的全部值
        for(i in add)
        {
            newAdd_list.push(JSON.parse(add[i]));
        }
        res.json(newAdd_list);
        return;
    })
});
//修改用户的收货地址
router.post('/my/set_address', function (req, res) {
    let add = req.body;
    userinfo_sql.get_user_address(req.user.id, function (old_add) {
        let str = 'UPDATE `userinfo` SET `address`=\'' + old_add[0].address + '{\"name\":"' + add.name + '",\"phone\":"' + add.phone + '",\"pmd\":"' + add.pmd + '",\"address\":"' + add.address + '"}*^*\' where `id` = ' + req.user.id;
        userinfo_sql.add_user_address(str, function (new_add) {
            req.warn_msg.code=1;
            req.warn_msg.msg='添加成功~';
            res.json(req.warn_msg);
        })
    })
});
//用户充值
router.post('/my/change_balance',function(req,res){
    if(req.user.admin_tpye ==66 || req.user.admin_tpye == 99)
    {
        userinfo_sql.find_userinfo(req.user.id,function(user_info){
            let balance = Number(user_info[0].balance) + Number(req.body.price);
            let str = 'UPDATE `userinfo` SET `balance`="'+balance+'" WHERE `id` ='+req.user.id;
            userinfo_sql.updata_user_balance(str,function(data){
                req.warn_msg.code=1;
                req.warn_msg.msg='充值成功，当前余额：'+balance;
                res.json(req.warn_msg);
            })
        })
    }else{
        req.warn_msg.code=0;
        req.warn_msg.msg='充值失败，请联系管理员~';
        res.json(req.warn_msg);
    }

});

let hotel_sql = require('../models/hotel_info');
router.get('/hotel_info/:p', function (req, res) {
    let index = req.params.p || 0;
    //总页数
    let result = {
        data: [],
        length: 0
    };
    hotel_sql.get_limit_data(index, function (data) {
        hotel_sql.getdata(function (count) {
            result.data = data;
            result.length = Math.ceil(count.length / 10);
            res.json(result);
            return;
        });
    })
});
//搜索附近的银行
/*
* 获取附近指定的银行
* */
router.get('/bank_info/:p', function (req, res) {
    let index = req.params.p || 0;
    //总页数
    let result = {
        data: [],
        length: 0
    };
    hotel_sql.get_limit_data(index, function (data) {
        hotel_sql.getdata(function (count) {
            result.data = data;
            result.length = Math.ceil(count.length / 10);
            res.json(result);
            return;
        });
    })
});


//把整个router返回出去
module.exports = router;