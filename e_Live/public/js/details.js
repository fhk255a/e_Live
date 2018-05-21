window.onload=function () {
    // alert(111)
    <!--查看更多-->
    Vue.component('prompt',{
        props:['title','content'],
        template:
            `<ul class="gengduo col-xs-10 col-md-10">
                   {{title}}
                    <li class="col-xs-12 col-md-12">{{content}}</li>
            </ul>`,
    });
    // 主食
    Vue.component('food',{
        props:['name','number','money'],
        template:
        `<ul>
             <li class="col-xs-10 col-md-10">{{name}}
                  <span>{{number}}</span>
                  </li>
                  <p class="col-xs-2 col-md-2">{{money}}</p>
         </ul>`
    });
    // 评论
    Vue.component('comment',{
        props:['name','time','title','imgurl1','imgurl2','imgurl3','imgurl4','imgurl5'],
        template:
            `    <ul class="col-xs-12 col-md-12 nav7">
                    <li class="col-xs-2 col-md-2">
                        <img :src="imgurl1" alt="">
                    </li>
                    <li class="col-xs-10 col-md-10" style="padding: 0;">
                                <span class="col-xs-3 col-md-3">{{name}}
                                     <i class="iconfont icon-msnui-v " style="color: #ff9c00;"></i>
                                </span>
                        <span class="col-xs-9 col-md-9" style="color: #666">{{time}}</span>
                        <p class="col-xs-12" style="padding:0 0 0 .10rem;">
                            <i class=" iconfont icon--wujiaoxing"></i>
                            <i class=" iconfont icon--wujiaoxing"></i>
                            <i class=" iconfont icon--wujiaoxing"></i>
                            <i class=" iconfont icon--wujiaoxing"></i>
                            <i class=" iconfont icon--wujiaoxing"></i>
                        </p>
                        <p class="col-xs-12">{{title}}</p>
                        <p class="col-xs-12">
                            <img class="col-xs-4" :src="imgurl2" alt="">
                        
                            <img class="col-xs-4" :src="imgurl3" alt="">
                            <img class="col-xs-4" :src="imgurl4" alt="">
                            <img class="col-xs-4" :src="imgurl5" alt="">
                            <img class="col-xs-4" :src="imgurl2" alt="">
                        </p>
                    </li>
    </ul>`,
    });
    // 推荐
    Vue.component('recommend',{
        props:['imgurl2','name','c_name','address','money','k_money','old_money','number'],
        template:`
        <div class="nav8" >
            <div class="nav8_recommend col-xs-12 col-md-12 " style="padding: 0 0 .10rem 0;">
                <img class="col-xs-4 col-md-5" :src="imgurl2" alt="">
                <div class="col-xs-8 col-md-7">
                    <p>{{name}}</p>
                    <ul class="col-xs-12 col-md-12">
                        <li class="col-xs-6 col-md-6">{{c_name}}</li>
                        <li class="col-xs-6 col-md-6">{{address}}</li>
                    </ul>
                    <ul class="col-xs-12 col-md-12 nav8_recommend2">
                        <li class="col-xs-6 col-md-6">
                            <span>{{money}}</span>
                            <span>{{k_money}}</span>
                            <s>{{old_money}}</s>
                        </li>
                        <li class="col-xs-6 col-md-6">{{number}}</li>
                    </ul>
                </div>
            </div>
        </div>
        `
    });

    // 导航
    Vue.component('navigation',{
       props:['p','i'],
       template:
       `
        <div>
            <i class="iconfont icon-sanjiaoxing-up"></i>
            <div class=" top_navigation">
                <p v-for="x in navigation_list" ><i :class="x.i"></i>{{x.p}}</p>
            </div>
        </div>
       
       `,
        data:function () {
            return{
                navigation_list:[
                    {p:'首页',i:'iconfont icon-shouye2'},
                    {p:'搜索',i:'iconfont icon-yysousuo1'},
                    {p:'我的订单',i:'iconfont icon-dindan'},
                    {p:'我的收藏',i:'iconfont icon-shoucang3'},
                    {p:'报错',i:'iconfont icon-baocuo'}
                ]
            }
        },
        methods:{
           daohang:function () {
               // this.off=false
           }
        }
    });
    var details = new Vue({
        el:'#myDetails',
        data:{
            showBox:false,
            show:true,
            prompt_list:[
                {title:'有效期：',content:'2016.10.13至2018.6.9'},
                {title:'不可用日期：',content:'易生活2018.12.23不可用'},
                {title:'使用时间',content:'易生活24小时可用'},
            ],
            // 主食
            food_list:[
                {name:'香辣鸡腿堡',number:'(1份)',money:'￥11'},
                {name:'大薯条',number:'(1份)',money:'￥7.5'},
                {name:'中杯可乐',number:'(1份)',money:'￥6'}
            ],
            // 评论
            comment_list:[
                {
                    imgurl1:'../../public/images/商品详情/1.jpg',
                    imgurl2:'../../public/images/商品详情/2.jpg',
                    imgurl3:'../../public/images/商品详情/13.jpg',
                    imgurl4:'../../public/images/商品详情/4.jpg',
                    imgurl5:'../../public/images/商品详情/5.jpg',
                    name:'hhf',time:'2018.3.18',title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有易生活，果断找易生活，伤心的是找了好久，' +
                    '毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                },
                {
                    imgurl1:'../../public/images/商品详情/1.2.jpg',
                    imgurl2:'../../public/images/商品详情/12.jpg',
                    imgurl3:'../../public/images/商品详情/3.jpg',
                    imgurl4:'../../public/images/商品详情/4.jpg',
                    imgurl5:'../../public/images/商品详情/15.jpg',
                    name:'hhf',time:'2018.3.18',title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有易生活，果断找易生活，伤心的是找了好久，' +
                    '毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                }
            ],
            // 商品详情
            recommend_list:[
                {
                    imgurl2:'../../public/images/商品详情/6.jpg',name:'汉堡+鸡米花+中杯可乐1分',c_name:'易生活',
                    address:'员村4.7km',money:'￥17.8',k_money:'7.5折',old_money:'￥24.0',number:'已售88888'
                },
                {
                    imgurl2:'../../public/images/商品详情/8.jpg',name:'汉堡+鸡米花+中杯可乐1分',c_name:'易生活',
                    address:'员村4.7km',money:'￥17.8',k_money:'7.5折',old_money:'￥24.0',number:'已售88888'
                }
            ],
            // 查看更多
            main: [
                {title:'无需预约，消费高峰时可能需要等位'},
            ]
        },
        // 查看更多的方法
        methods:{
            loadMore:function () {
                this.main=[
                    {title:'每张美团券建议1人使用'},
                    {title:'店内无包间'},
                    {title:'堂食外带均可，可免费打包'},
                    {title:'团购用户不可同时享受商家其他优惠'},
                    {title:'酒水饮料等问题，请致电商家咨询，以商家反馈为准'},
                    {title:'提供免费WiFi'},
                    {title:'免费提供20个停车位'}
                ];
                this.show=false;
            },
        },

    })
};