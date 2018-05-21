// 加载模块
let express = require('express');
//加载总数据库结构模块
let sql = require('../schemas/sql');
//用户个人详细数据
let userinfo_sql = require('../models/user_info');
//用户列表的数据
let user_sql = require('../models/user_list');
//坐标数据表
let address_sql = require('../models/address');
let router = express.Router();

router.use(function (req,res,next) {
    if(req.user.isLogin)
    {
        //一些早期的用户可能没有录入系统 这里进行一次判断确保都录入了
        let user_id = req.user.id;
        userinfo_sql.find_userinfo(user_id,function (result) {
            if(result.length<1)
            {
                userinfo_sql.add_userinfo(user_id,function(data){});
                next();
            }
            else{
                next();
            }
        })

    }
    else{
        res.render('login_register');
    }
});
//底部
//我的
router.get('/my.html',function(req,res){
    res.render('main/my',{});
});



//烁佳新加的
// 我的订单
router.use(function(req,res,next){
    req.comment={
        name:'',
        id:0,
        img:'',
    };
    next();
});

//设置cookies
// 评价页面
router.post('/evaluate.dp',function(req,res){
    req.cookies.set('comment', JSON.stringify(
        {
            name: new Buffer(req.body.name).toString('base64'),
            id: new Buffer(req.body.id).toString('base64'),
            isRead: true
        }
    ));
    res.end();
});
router.get('/evaluate.html', function (req, res) {
    res.render('userinfo/evaluate');
});

//订单页
router.get('/bot_order.html', function (req, res) {
    res.render('userinfo/bot_order');
});
//订单页=>订单列表
router.get('/MyOrder.html', function (req, res) {
    res.render('userinfo/MyOrder');
});





//我的=>钱包
router.get('/wallet.html',function(req,res){
    res.render('userinfo/wallet');
})
//我的=>钱包=>余额
router.get('/Recharge.html',function (req,res) {
    res.render('userinfo/Recharge');
});
//我的=>钱包=>余额=>充值
router.get('/top-up.html', function (req, res) {
    res.render('userinfo/top-up');
});
//我的=>个人信息
router.get('/PersonalInformation.html', function (req, res) {
    res.render('userinfo/PersonalInformation');
});
//我的=>个人信息=>昵称
router.get('/revise.html', function (req, res) {
    res.render('userinfo/revise');
});
//我的=>个人信息=>收货地址
router.get('/address.html', function (req, res) {
    res.render('userinfo/address');
});
//我的=>个人信息=>收货地址=>新建收货地址
router.get('/new_address.html', function (req, res) {
    res.render('userinfo/new_address');
});










//把整个router返回出去
module.exports = router;