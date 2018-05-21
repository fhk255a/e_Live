$(function () {
    // 导航栏
    let Event = new Vue();
    Vue.component('navdao',{
        props:['x','index'],
        template:`
            <nav class="navdao">
                 <a href="#" v-html="x.title" :class="x.classStyle" @click="ChangeNavDao(index)" v-for="(x,index) in navdao_list"></a>
            </nav>
              `,
        data:function(){
            return {
                navdao_list:[
                    {title:'享美食',classStyle:'redborder'},
                    {title:'惠生活',classStyle:null},
                    {title:'爱玩乐',classStyle:null},
                    {title:'住酒店',classStyle:null},
                    {title:'全部',classStyle:null},
                ],
            }
        },
        methods:{
            ChangeNavDao:function (index) {
                $('.navdao a').eq(index).addClass('redborder').siblings().removeClass('redborder');
               let owidth = $('.Myorder_main').width()
                $('.Myorder_main ul').animate({'left':-index*owidth},300);
                Event.$emit('i_index1',index);
            }
        },
        mounted:function () {
            let othis = this;
            Event.$on('i_index2',function(data){
                othis.ChangeNavDao(data);
            })
        }
    });
    // 选择类型
    Vue.component('choice',{
        props:['x','index'],
        template:`
                <div class="choice container">
                    <a :class="{redbackground:isActive==index}" href="#"  v-for="(x, index) in choice_list"  v-html="x.title" @click="tt(index)" ></a>
                 </div> 
                `,
        data:function () {
            return{
                choice_list:[
                    {title:'热门'},
                    {title:'甜点饮品'},
                    {title:'小吃快餐'},
                    {title:'火锅烧烤'},
                    {title:'川湘菜'},
                    {title:'日韩料理'},
                    {title:'外卖'},
                    {title:'自助餐'},
                ],
                isActive:0
            }
        },
        // template:`<a href="#" v-for="(x,index) in choice_list" @click="tt(index)">123</a>`,
        methods:{
            tt:function (index) {
                this.isActive = index;
            }
        },
        mounted:function(){
            Event.$on('i_index1',function (data) {
                if(data==2){
                    this.choice_list=[
                        {title:'热门'},
                        {title:'美发'},
                        {title:'运动健身'},
                        {title:'美甲'},
                        {title:'足疗按摩'},
                        {title:'景点'},
                        {title:'KTV'},
                        {title:'电影院'},
                    ]
                }
            })
        }
    });
    <!--商品列表-->
    Vue.component('wrapper',{
        props:['images1','title1','title2','title3','title4','title5','title6','images2','title7'],
        template:`<div>
                <div class="poi-item-wrapper" v-for="x in wrapper_list">
                    <div class="poi-info-wrapper">
                         <div class="image-wrapper">
                             <div class="imgbox">
                                 <img :src="x.images1">
                             </div>
                         </div>
                         <div class="poi-info">
                             <div class="poi-name" @click="cha">{{x.title1}}</div>
                                 <div class="price-wrapper">
                                    <span class="stars">
                                        <i class="glyphicon glyphicon-star"></i>
                                        <i class="glyphicon glyphicon-star"></i>
                                        <i class="glyphicon glyphicon-star"></i>
                                        <i class="glyphicon glyphicon-star"></i>
                                        <i class="glyphicon glyphicon-star"></i>
                                    </span>
                                    <span class="price">{{x.title2}}</span>
                                    <div class="location">
                                        <span class="classifications">{{x.title3}}</span>
                                        <span class="qg">|</span>
                                        <span class="area">{{x.title4}}</span>
                                        <span class="distance">{{x.title5}}</span>
                    
                                     </div>
                                 </div>
                                <div class="cate-wrapper">
                                     <span class="catename">{{x.title6}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="deal-info-wrapper">
                            <div class="preferential" v-for="y in x.min_list">
                                <img class="icon" :src="y.images2">
                                <span class="content">{{y.title7}}</span>
                             </div>
                        </div>
                    </div>
                <div style="width: 100%;height: .13rem;"></div>
                </div>
        </div>`,
        data:function(){
            return{
                <!--商品列表-->
                wrapper_list:[
                    {
                        images1:'../../public/images/near/2.jpg',
                        title1:'粮山功夫(赤岗店)',
                        title2:'￥15/人',
                        title3:'奶茶/果汁',
                        title4:'海珠区',
                        title5:'227m',
                        title6:'24人消费',
                        min_list:[
                            {
                                images2:'../../public/images/near/hui.png',
                                title7:'团体有优惠，买三送一'
                            },
                            {
                                images2:'../../public/images/near/juan.png',
                                title7:'优惠券有优惠，第二杯半价'
                            }
                                ]
                    },
                    {
                        images1:'../../public/images/near/2.jpg',
                        title1:'盖饭帮主',
                        title2:'￥15/人',
                        title3:'中餐',
                        title4:'海珠区',
                        title5:'200m',
                        title6:'240人消费',
                        min_list:[
                            {
                                images2:'../../public/images/near/hui.png',
                                title7:'团体有优惠，买三送一'
                            },
                        ]
                    },

                ],
            }
        },
        methods:{
            ChangeChoice:function () {
                this.addClass('redbackground').siblings().removeClass('redbackground');
            },
            cha:function () {
                console.log(this.images1);
            }
        }
    });
    // 分类列表
    Vue.component('my_main',{
        // props:['style1','choice_list','wrapper_list'],
        template:`
            <div class="Myorder_main" ref="m_main" :style="style1">
                <ul ref="m_main_ul" style="left:0" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch">
                    <li class="order_main">      
                        <choice></choice>
             <!--商品列表-->
                         <wrapper></wrapper>
                        
                        
                    </li>
                    <li class="order_main">
                        <choice></choice>
             <!--商品列表-->
                         <wrapper></wrapper>
                      
                    </li>
                    <li class="order_main">
                        <choice></choice>
             <!--商品列表-->
                         <wrapper></wrapper>
                        
                    </li>
                    <li class="order_main">
                       <choice></choice>
             <!--商品列表-->
                         <wrapper></wrapper>
                      
                    </li>
                    <li class="order_main">
    
             <!--商品列表-->
                         <wrapper></wrapper>
                        
                    </li>
                </ul>
            </div>
        `,
        data:function () {
            return{
                startX: 0,
                startY: 0,
                moveX: 0,
                moveY: 0,
                endX: 0,
                endY: 0,
                distance:0,
                distance2:0,
                i_index: 0,
                style1:'height:'+$(window).height()+'px;',
                direction:null,

                // 选择类型

                hui_list:[
                    {title:'全部',classStyle:'redbackground'},
                    {title:'鲜花',classStyle:null},
                    {title:'超市生鲜',classStyle:null},
                    {title:'口腔服务',classStyle:null},
                    {title:'证件快印',classStyle:null},
                    {title:'宠物服务',classStyle:null},
                    {title:'眼镜店',classStyle:null},
                    {title:'家政服务',classStyle:null},
                ],
                play_list:[
                    {title:'热门',classStyle:'redbackground'},
                    {title:'美发',classStyle:null},
                    {title:'运动健身',classStyle:null},
                    {title:'美甲',classStyle:null},
                    {title:'足疗按摩',classStyle:null},
                    {title:'景点',classStyle:null},
                    {title:'KTV',classStyle:null},
                    {title:'电影院',classStyle:null},
                ],
                hotel_list:[
                    {title:'热门',classStyle:'redbackground'},
                    {title:'商务出行',classStyle:null},
                    {title:'公寓民宿',classStyle:null},
                    {title:'情侣专享',classStyle:null},
                    {title:'品牌连锁',classStyle:null},
                ],
                favourable_list:[
                    {images1:'../../public/images/near/2.jpg',title1:'粮山功夫1(赤岗店)',title2:'￥15/人',title3:'奶茶/果汁',title4:'海珠区',title5:'227m',title6:'24人消费',images2:'../../images/near/tuan.png',title7:'团体有优惠，买三送一'},
                    {images1:'../../public/images/near/2.jpg',title1:'粮山功夫1(赤岗店)',title2:'￥15/人',title3:'奶茶/果汁',title4:'海珠区',title5:'227m',title6:'24人消费',images2:'../../images/near/tuan.png',title7:'团体有优惠，买三送一'},
                ],
            }
        },
        methods:{
            // 手指按下
            startTouch:function(ev){
                ev = ev || event;
                // ev.preventDefault();
                if(ev.changedTouches.length == 1){
                    this.startX = ev.changedTouches[0].clientX;
                    this.startY = ev.changedTouches[0].clientY;
                }
            },
            moveTouch:function(ev){
                ev = ev || event;
                // ev.preventDefault();
                if(ev.changedTouches.length == 1){
                    this.moveX = ev.changedTouches[0].clientX;
                    this.moveY = ev.changedTouches[0].clientY;
                    if(this.direction == null){
                        if(Math.abs(this.moveX-this.startX)>Math.abs(this.moveY-this.startY)){
                            this.direction = 1;
                        }else{
                            this.direction = 2;
                        }
                    }
                    if(this.direction == 1){
                        this.distance = this.moveX-this.startX;
                        let left = parseInt(this.$refs.m_main.offsetWidth);
                        if(this.distance < 0 || this.distance == 0){
                            this.$refs.m_main_ul.style.left = this.endX+this.distance+'px';
                            if(this.endX+this.distance < -left*4){
                                this.$refs.m_main_ul.style.left = -left*4+'px';
                            }
                        } else if(this.distance > 0 || this.distance == 0){
                            this.$refs.m_main_ul.style.left = this.endX+this.distance+'px';
                            if(this.endX+this.distance > 0){
                                this.$refs.m_main_ul.style.left = 0;
                            }
                        }
                        $('.Myorder_main ul').css({'top':0})
                    }else{
                        this.distance2 = this.moveY-this.startY;
                        if(this.distance2 < 0){
                            if($('.order_main').eq(this.i_index).height()<this.$refs.m_main.offsetHeight){
                                this.$refs.m_main_ul.style.top = 0;
                                this.distance2 = 0;
                                this.endY = 0;
                            }else{
                                let new_h = $('.order_main').eq(this.i_index).height()-this.$refs.m_main.offsetHeight+300;
                                this.$refs.m_main_ul.style.top = this.endY+this.distance2+'px';
                                if(Math.abs(this.endY+this.distance2) > new_h){
                                    this.$refs.m_main_ul.style.top = -new_h+'px';
                                    this.distance2 = 0;
                                    this.endY = -new_h;
                                }
                            }
                        }else{
                            this.$refs.m_main_ul.style.top = this.endY+this.distance2+'px';
                            if(this.endY+this.distance2 > 0){
                                this.$refs.m_main_ul.style.top = 0;
                                this.distance2 = 0;
                                this.endY = 0;
                            }
                        }
                    }

                }
            },
            endTouch:function(ev){
                ev = ev || event;
                // ev.preventDefault();
                if(this.distance<0 && (-this.distance)>parseInt(this.$refs.m_main.offsetWidth)/2){
                    if(this.i_index<4){
                        this.i_index += 1;
                    }
                }else if(this.distance>0 && this.distance>parseInt(this.$refs.m_main.offsetWidth)/2){
                    if(this.i_index>0){
                        this.i_index -= 1;
                    }
                }
                this.endY = this.endY+this.distance2;
                this.distance = 0;
                this.distance2 = 0;
                this.direction = null;
                Event.$emit('i_index2',this.i_index);
            }
        },
        mounted:function(){
            let that = this;
            Event.$on('i_index1',function(data){
                that.i_index = data;
                that.endX = -data*parseInt(that.$refs.m_main.offsetWidth);
            })
        },
    });
    // 底部
    Vue.component('fooderqianbaonei',{
        props:['x','index'],
        template:`<nav class="fooder">
                      <a :href="x.href" :class="{foodercolor:index==1}" v-for="(x,index) in fooder_list" >
                          <i :class="x.images"></i>
                          <span v-html="x.title"></span>
                      </a>
                  </nav>
`,
        data:function(){
            return{
                fooder_list:[
                    {href:'bot_home.html',images:'iconfont icon-shouye',title:'首页'} ,
                    {href:'near.html',images:'iconfont icon-fujinjihuo',title:'附近'} ,
                    {href:'bot_find.html',images:'iconfont icon-faxian',title:'发现'} ,
                    {href:'user/bot_order.html',images:'iconfont icon-weibiaoti-',title:'订单'} ,
                    {href:'user/my.html',images:'iconfont icon-wode',title:'我的'} ,
                ],
            }
        },
    });
    let app = new Vue({
        el:"#myApp",
        data:{
        },
    });
});