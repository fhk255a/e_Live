window.onload = function () {
    $(window).scroll(function () {
        if(window.scrollY>30){
            $('.minheader').css({'background':'rgba(63,224,207,.2)'})
        }
        if(window.scrollY>38){
            $('.minheader').css({'background':'rgba(63,224,207,.5)'})
        }
        if(window.scrollY>46){
            $('.minheader').css({'background':'rgba(63,224,207,.8)'})
        }
        if(window.scrollY>54){
            $('.minheader').css({'background':'rgba(63,224,207,1)'})
        }
    });
    Vue.component('personal',{
        props:['images','title'],
        template:`<a href="#" class="col-xs-4">
                <i :class="images"></i>
                <span>{{title}}</span>
            </a>`,
    });
    Vue.component('qianbaonei',{
        props:['images','title'],
        template:`<a href="/user/wallet.html">
                <i :class="images"></i>
                <span>{{title}}</span>
            </a>`,
    });
    Vue.component('fooderqianbaonei',{
        props:['x','index'],
        template:`<nav class="fooder">
                      <a :href="x.href" :class="{foodercolor:index==4}" v-for="(x,index) in fooder_list" >
                          <i :class="x.images"></i>
                          <span v-html="x.title"></span>
                      </a>
                  </nav>
`,
        data:function(){
            return{
                fooder_list:[
                    {href:'/bot_home.html',images:'iconfont icon-shouye',title:'首页'} ,
                    {href:'/near.html',images:'iconfont icon-fujinjihuo',title:'附近'} ,
                    {href:'/bot_find.html',images:'iconfont icon-faxian',title:'发现'} ,
                    {href:'/user/bot_order.html',images:'iconfont icon-weibiaoti-',title:'订单'} ,
                    {href:'/user/my.html',images:'iconfont icon-wode',title:'我的'} ,
                ],
            }
        },
    });
    let app = new Vue({
        el:"#myApp",
        data:{
            admin_style:'btn',
            user_info:[],
            personal_list:[
                {images:'iconfont icon-shoucang2 shoucan',title:'收藏'} ,
                {images:'iconfont icon-iconfonticonfontxinxi pingjia',title:'评价'} ,
                {images:'iconfont icon-shizhong-fill zuji',title:'足迹'} ,
            ],
            qianbaonei_list:[
                {images:'iconfont icon-qianbao orange',title:'我的钱包'} ,
                {images:'iconfont icon-hongbao orange',title:'红包/卡劵'} ,
                {images:'iconfont icon-yinxingqia1 orange',title:'银行卡'} ,
                {images:'iconfont icon-balance orange',title:'余额'} ,
                {images:'iconfont icon-xinyongqiahuankuan orange',title:'信用卡还款'} ,
                {images:'iconfont icon-qr-code orange',title:'银联二维码'} ,
            ],
            fuwu_list:[
                {images:'iconfont icon-huiyuanzhongxin orange',title:'会员中心'} ,
                {images:'iconfont icon-chongzhi orange',title:'手机充值'} ,
                {images:'iconfont icon-kefu1 cyan',title:'客服中心'} ,
                {images:'iconfont icon-mian-dizhi cyan',title:'好友去哪'} ,
                {images:'iconfont icon-shoujiqia cyan',title:'免流用美团'} ,
                {images:'iconfont icon-fapiaosel cyan',title:'发票助手'} ,
                {images:'iconfont icon-lianjie-tianchong cyan',title:'我要合作'} ,
                {images:'iconfont icon-meituan cyan',title:'关于美团'} ,
            ],
        },
        methods:{},
        beforeCreate:function(){
            let me = this;
            $.ajax({
                url:'/api/my/get_userInfo',
                type:'get',
                dataType:'json',
                success:function(result){
                    me.user_info = result[0];
                    switch(me.user_info.admin)
                    {
                        case 0:
                            me.admin_style = 'admin_btn text-danger';
                            break;
                        case 1:
                            me.admin_style = 'admin_btn text-info';
                            break;
                        case 66:
                            me.admin_style = 'admin_btn text-success';
                            break;
                        case 99:
                            me.admin_style = 'admin_btn text-warning';
                            break;
                    }
                }
            })
        }
    });
};