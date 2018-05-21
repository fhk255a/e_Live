//----------------------------加载模块---------------------------------------------
//加载express框架模块
let express = require('express');

//加载模板处理模块
let ejs = require('ejs');

//定义一个app应用 // 类似Node.Js http.creatServer()
//它包含了所有express的内容
let app = express();

//加载body-parser  用来方便处理'post'进来的数据
let bodyParser = require('body-parser');

//加载cookie模块 保留用户id
let Cookies = require('cookies');

//加载session模块保存用户数据
let session = require('express-session');

//加载数据库 数据库结构
let sql = require('./schemas/sql');

//加载用户列表数据库
let user_sql = require('./models/user_list');

//加载用户详情数据库
let userinfo_sql = require('./models/user_info');


//-------------------------------配置---------------------------------------------
//配置静态文件css/JS/IMG
//当用户访问url下的/public，返回对应的__dirname+'/public';
app.use('/public', express.static(__dirname + '/public'));
//运行跨域
app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    next();
});

//设置cookies
//只要访问 都会走这个中间件
app.use(function (req, res, next) {
    req.address =
        {
            add_p: '广东省',
            add_m: '广州市',
            add_d: '海珠区',
            isRead: false
        };
    req.user = {
        username:'',
        password:'',
        id:0,
        admin_tpye:0,
        isLogin:false
    };
    res.setHeader("Access-Control-Allow-Origin", "*");
    // req.css=[];
    req.cookies = new Cookies(req, res);
    //解析登录用户的cookies信息
    if (req.cookies.get('address')) {
        req.address = JSON.parse(req.cookies.get('address'));
        req.address.add_p = new Buffer(req.address.add_p, 'base64').toString();
        req.address.add_m = new Buffer(req.address.add_m, 'base64').toString();
        req.address.add_d = new Buffer(req.address.add_d, 'base64').toString();
    }
    if (req.cookies.get('user')) {
        req.user = JSON.parse(req.cookies.get('user'));
        req.user.username = new Buffer(req.user.username, 'base64').toString();
        req.user.password = new Buffer(req.user.password, 'base64').toString();
        req.user.id = req.user.id;
        req.user.admin_tpye = req.user.admin_tpye;
        req.user.isLogin  = true;
    }

//   更新 用户表跟详细信息表的数据
    if(req.user.isLogin)
    {
        let user_id = req.user.id ;
        user_sql.findUserId(user_id,function (user_list) {
            let str = 'UPDATE `userinfo` SET `admin`="'+user_list[0].admin+'" WHERE `id` = '+user_id;
            userinfo_sql.update_userinfo(str,function(result){
            //    更新成功~
            });
        })
    }
    next();

});




//bodyParser设置
//使得req有了个属性 req.body
app.use(bodyParser.urlencoded({extended: true}));

//配置应用模板
//定义当前应用所使用的模板引擎
//第一个argment：模板引擎的名称，也是模板文件的后缀
//第二个argment：用于处理模板内容的方法
app.engine('html', ejs.renderFile);

//设置模板文件存放的目录
//第一个argment 必须是views
//第二个argment 是模板存放的目录
app.set('views', './views');

//注册所使用的模板引擎
// 第一个argment 必须是view engine
// 第二个argment 要跟app.engine()的第一个argment一致
app.set('view engine', 'html');


//swig有缓存机制 方便修改模板而不需要重启app应用
// swig.setDefaults({cache:false});

/*
* ----------------------根据不同功能划分不同模块---------------------------------
* */
//如果是/开头  就是显示页面 即客户页面
app.use('/', require('./routers/main'));
//如果是/admin开头 就是管理员用户界面  他直接去了模块admin了
app.use('/admin', require('./routers/admin'));
//如果是/api开头 就是ajax获取数据页面
//如果是api开头的路径 直接给api的路由文件js去处理
app.use('/api', require('./routers/api'));
//如果是/list 就是商品列表
app.use('/list', require('./routers/shop_list'));
//如果是/user开头，就是去用户的相应页面
app.use('/user', require('./routers/user'));

//---------------------------启用服务器-----------------------------------------
app.listen(8888, function () {
    console.log('服务已经开启！地址为8888');
});