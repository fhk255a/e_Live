//首页模块

let express = require('express');
let sql = require('../schemas/sql');
let address_sql = require('../models/address');
let router = express.Router();
router.post('/isLogin_code',function(req,res){
    let msg = {
        code:0,
        msg:'没有登录',
    };
    if(req.user.isLogin)
    {
        msg.code = 1;
        msg.msg = '登陆了';
        res.json(msg);
        return;
    }
    else{
        res.json(msg);
        return;
    }
});


//登录页
router.get('/login_register.html', function (req, res) {
    res.render('login_register');
});



router.post('/get_address', function (req, res, next) {
    req.cookies.set('address', JSON.stringify(
        {
            add_p: new Buffer(req.body.list[0].add_name).toString('base64'),
            add_m: new Buffer(req.body.list[1].add_name).toString('base64'),
            add_d: new Buffer(req.body.list[2].add_name).toString('base64'),
            isRead: true
        }
    ));
    res.json(req.address);
    return;
});
//首页
router.get('/', function (req, res) {
    if (req.address.isRead) {
        address_sql.getaddress(function (add) {
            res.render('main/bot_home', {address: req.address, add: add});
        });
    }
    else {
        address_sql.getaddress(function (add) {
            res.render('index', {address: req.address, add: add});
        });
    }
});
router.post('/set_address', function (req, res) {
    // console.log(req.body);
});

//------------------------------------底部菜单的跳转-----------------------------------------
//首页
router.get('/bot_home.html', function (req, res) {
    if (req.address.isRead) {
        address_sql.getaddress(function (add) {
            res.render('main/bot_home', {address: req.address, add: add});
        });
    }
});
//发现
router.get('/bot_find.html', function (req, res) {
    res.render('main/bot_find');
});

//------------------------------------首页的跳转-----------------------------------------
//发现=>头条
router.get('/headline.html', function (req, res) {
    res.render('list/headline');
});
//酒店页
router.get('/hotel_page.html', function (req, res) {
    res.render('list/hotel_page');
});
//美食页
router.get('/Cate.html', function (req, res) {
    res.render('list/Cate',{address:req.address});
});

//机票/火车票
router.get('/ticket_page.html', function (req, res) {
    res.render('list/ticket_page')
});

//电影页
router.get('/movie_page.html',function(req,res){
    res.render('list/movie_page');
});

//KTV页
router.get('/ktv_page.html', function (req, res) {

    res.render('list/ktv_page',{address:res.address})
});

// 洗脚/按摩
router.get('/foot_page.html', function (req, res) {
    res.render('list/foot_page');
});

//搜索页面
router.get('/search_page.html', function (req, res) {
    res.render('search_page');
});

router.get('/food_page/:p',function(req,res){
    res.render('list/food_page',{address:req.address,type:req.params.p});
});


//附近
router.get('/near.html',function(req,res){
    res.render('main/near');
})





//商品详情
router.get('/comment.html', function (req, res) {
    res.render('list/comment');
});
router.get('/order.html', function (req, res) {
    res.render('list/order');
});




//把整个router返回出去
module.exports = router;