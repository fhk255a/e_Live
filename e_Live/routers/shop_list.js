//加载模块
let express = require('express');
let router = express.Router();
//请求数据模块
var request = require('request');
//加载酒店数据库
let hotel_sql = require('../models/hotel_info');
let address_sql = require('../models/address');

let myorder_sql = require('../models/myorder');

//电影内容
router.get('/movie_info/:move_id',function(req,res){
    request('https://ticket-api-m.mtime.cn/movie/detail.api?locationId=365&movieId='+req.params.move_id, function (error, response, body) {
        request('https://ticket-api-m.mtime.cn/movie/hotComment.api?movieId='+req.params.move_id,function(error,response,rep){
            request('http://api-m.mtime.cn/PageSubArea/HotPlayMovies.api?locationId=365', function (error, response, more) {
                if (!error && response.statusCode == 200) {
                    rep = JSON.parse(rep);
                    body = JSON.parse(body);
                    more = JSON.parse(more);
                    let data = body.data.basic;
                    let office = body.data.boxOffice;
                    let live = body.data.live;
                    let related = body.data.related;
                    let result = {
                        data:data,
                        office:office,
                        live:live,
                        related:related,
                        msg:rep.data,
                        more:more.movies,
                    };
                    // 处理。。。。。

                    res.render('list/movie_info',{result:result});
                };
            })
        })
    })
});


//酒店列表

router.get('/hotel_info.html', function (req, res) {
    hotel_sql.get_limit_data('0', function (result) {
        // let arr = ["北京市", "天津市", "上海市", "重庆市", "河北省", "山西省", "内蒙古", "辽宁省", "吉林省", "黑龙江省", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省", "河南省", "湖北省", "湖南省", "广东省", "广西", "海南省", "四川省", "贵州省", "云南省", "西藏", "陕西省", "甘肃省", "青海省", "宁夏", "新疆", "香港", "澳门", "台湾省"];
        // for(var i = 0;i<arr.length;i++)
        // {
        address_sql.getaddress(function (fun) {
            //         console.log(fun);
        })

        res.render('list/hotel_info', {result: result});
    });
});
//银行列表
router.get('/bank_info.html', function (req, res) {
    address_sql.getaddress(function(address){
        res.render('list/bank_info',{address:address});
    });

});

router.get('/ticket_info.html', function (req, res) {
    address_sql.getaddress(function(address){
        res.render('list/ticket_info.html',{address:address});
    });

});



    router.get('/details.html', function (req, res) {
    res.render('list/details');
});


//烁佳
//我的订单
router.get('/MyOrder.html',function (req,res) {
    myorder_sql.allList(function (allList) {
        res.json(allList)
        // res.render('list/MyOrder');
    })
});
router.get('/MyOrder:p',function (req,res) {
    // console.log(req.params.p);
    let index = req.params.p;
    if(index==0){
        myorder_sql.allList(function (allList) {
            res.json(allList)
            return;
        });
    }else if(index==1){
        myorder_sql.fukuan_list(function (allList) {
            res.json(allList)
            return;
        });
    }else if(index==2){
        myorder_sql.shiyong_list(function (allList) {
            console.log(allList)
            res.json(allList)
            return;
        });
    }else if(index==3){
        myorder_sql.pinjia_list(function (allList) {
            res.json(allList)
            return;
        });
    }else if(index==4){
        myorder_sql.tuikuang_list(function (allList) {
            res.json(allList)
            return;
        });
    }
    // myorder_sql.pinjia_list(function (allList) {
    //       res.json(allList)
    //  });
});
//评价发布,将信息存进数据库表

router.post('/evaluate',function (req,res){
    if (req.cookies.get('comment')) {
        req.comment = JSON.parse(req.cookies.get('comment'));
        req.comment.name = new Buffer(req.comment.name, 'base64').toString();
        req.comment.id = new Buffer(req.comment.id, 'base64').toString();
    }
    res.json(req.comment);
});
router.post('/evaluate.tj',function (req,res){
    myorder_sql.addEvaluate(req.body,function (data) {
        if(data){
            myorder_sql.updateState(req.body.id);
            res.json(true);
        }else{
            res.json(false);
        }
    })
});





//把整个router返回出去
module.exports = router;