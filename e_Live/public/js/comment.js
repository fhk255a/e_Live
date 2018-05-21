window.onload=function () {
    let Event=new Vue();
    // 头部
    Vue.component('menu_top',{
        props:['menu','t'],
        template:
        `
        <ul class="menu row">
            <li class="col-xs-3 col-md-3 " v-for="(x,index) in menu_list" :class="x.t" @click="ChangeNavDao(index)">{{x.menu}}</li>
            <!--<li class="col-xs-3 col-md-3" @click="ChangeNavDao(index)">{{menu2}}</li>-->
            <!--<li class="col-xs-3 col-md-3" @click="ChangeNavDao(index)">{{menu3}}</li>-->
            <!--<li class="col-xs-3 col-md-3" @click="ChangeNavDao(index)">{{menu4}}</li>-->
        </ul>
        `,
        data:function(){
          return{
              menu_list:[
                  {menu:'全部(1368)',t:'action'},
                  {menu:'嗮图(368)',t:null},
                  {menu:'低分(120)',t:null},
                  {menu:'更新',t:null}
              ],
          }
        },
        // 头部样式
        methods:{
            ChangeNavDao:function (index) {
                $('.menu li').eq(index).addClass('action ').siblings().removeClass('action ');
                let owidth = $('.Myorder_main').width();
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
    // 点评
    Vue.component('menu_nav',{
        props:['menu_nav1','menu_nav2','menu_nav3','menu_nav4','menu_nav5','menu_nav6','menu_nav7','menu_nav8','menu_nav9','menu_nav10'],
        template:
        `
        <div class="row  col-xs-12 col-md-12">
            <span>{{menu_nav1}}</span>
            <span>{{menu_nav2}}</span>
            <span>{{menu_nav3}}</span>
            <span>{{menu_nav4}}</span>
            <span>{{menu_nav5}}</span>
            <span>{{menu_nav6}}</span>
            <span>{{menu_nav7}}</span>
            <span>{{menu_nav8}}</span>
            <span>{{menu_nav9}}</span>
            <span class="action2">{{menu_nav10}} </span>
        </div>
        `
    });
    // 评论--更新
    Vue.component('update',{
        props:['imgurl1','name','time','number',
            'title','liulang','biaoqian','number2','pinglun'],
        template:
            `
        <div class="row review_content ">
            <div class="col-xs-2 col-md-2">
                <img class="" :src="imgurl1" alt="">
            </div>
            <div class="col-xs-10 col-md-10 review_content2" style="padding: 0;">
                <div class="col-xs-12 col-md-12">
                    <span class="col-xs-8">{{name}}<i class="iconfont icon-msnui-v"></i></span>
                    <span class="col-xs-4">{{time}}</span>
                </div>
                <div class="col-xs-12 col-md-12">
                    <span>{{number}}
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                    </span>
                </div>
                <p class="col-xs-12 col-md-12">{{title}}</p>
                <p class="col-xs-12 col-md-12">
                    <i class="iconfont icon-biaoqian">
                        {{biaoqian}}
                    </i>
                </p>
                <!--<div class="col-xs-12 col-md-12">-->
                    <!--<img class="col-xs-4" :src="imgurl2" alt="">-->
                    <!--<img class="col-xs-4" :src="imgurl3" alt="">-->
                    <!--<img class="col-xs-4" :src="imgurl4" alt="">-->
                    <!--<img class="col-xs-4" :src="imgurl5" alt="">-->
                <!--</div>-->
                <div class="remarks col-xs-12 col-md-12">
                    <div class="col-xs-6 col-md-6">
                        <span>{{liulang}}</span>
                    </div>
                    <div class="col-xs-3 col-md-3">
                         <span>
                             <i class="iconfont icon-tuijian1" v-on:click="number2+1"></i>{{number2}}
                         </span>
                    </div>
                    <div class="col-xs-3 col-md-3">
                         <span>
                                <i class="iconfont icon-xinxi"></i>{{pinglun}}
                         </span>
                    </div>   
                </div>
        </div>
        `
    });
    // 评论--全部
    Vue.component('review',{
        props:['imgurl1','imgurl2','imgurl3','imgurl4','imgurl5','name','time','number',
        'title','liulang','biaoqian','number2','pinglun'],
        template:
        `
        <div class="row review_content ">
            <div class="col-xs-2 col-md-2">
                <img class="" :src="imgurl1" alt="">
            </div>
            <div class="col-xs-10 col-md-10 review_content2" style="padding: 0;">
                <div class="col-xs-12 col-md-12">
                    <span class="col-xs-8">{{name}}<i class="iconfont icon-msnui-v"></i></span>
                    <span class="col-xs-4">{{time}}</span>
                </div>
                <div class="col-xs-12 col-md-12">
                    <span>{{number}}
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                        <i class="iconfont icon--wujiaoxing" ></i>
                    </span>
                </div>
                <p class="col-xs-12 col-md-12">{{title}}</p>
                <p class="col-xs-12 col-md-12">
                    <i class="iconfont icon-biaoqian">
                        {{biaoqian}}
                    </i>
                </p>
                <div class="col-xs-12 col-md-12">
                    <img class="col-xs-4" :src="imgurl2" alt="">
                    <img class="col-xs-4" :src="imgurl3" alt="">
                    <img class="col-xs-4" :src="imgurl4" alt="">
                    <img class="col-xs-4" :src="imgurl5" alt="">
                </div>
                <div class="remarks col-xs-12 col-md-12">
                    <div class="col-xs-6 col-md-6">
                        <span>{{liulang}}</span>
                    </div>
                    <div class="col-xs-3 col-md-3">
                         <span>
                             <i class="iconfont icon-tuijian1" v-on:click="number2+1"></i>{{number2}}
                         </span>
                    </div>
                    <div class="col-xs-3 col-md-3">
                         <span>
                                <i class="iconfont icon-xinxi"></i>{{pinglun}}
                         </span>
                    </div>   
                </div>
            </div>
        </div>
        `
    });
// 滑动部分
    Vue.component('my_main', {
        template: `
            <div class="Myorder_main" ref="m_main" :style="style1">
                <ul ref="m_main_ul" style="left:0" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch">
                    <li class="order_main">      
                       <!--点评-->
                        <div class="container menu2">
                            <menu_nav v-for="x in menu_nav_list" :menu_nav1="x.menu_nav1" :menu_nav2="x.menu_nav2" :menu_nav3="x.menu_nav3" :menu_nav4="x.menu_nav4"
                             :menu_nav5="x.menu_nav5" :menu_nav6="x.menu_nav6" :menu_nav7="x.menu_nav7" :menu_nav8="x.menu_nav8" :menu_nav9="x.menu_nav9" :menu_nav10="x.menu_nav10" ></menu_nav>
                        </div>
                        <!--评论--全部-->
                        <div class="container">
                            <review v-for="x in review_list" :imgurl1="x.imgurl1" :imgurl2="x.imgurl2" :imgurl3="x.imgurl3" :imgurl4="x.imgurl4" :imgurl5="x.imgurl5"
                            :name="x.name" :time="x.time" :number="x.number" :title="x.title" :liulang="x.liulang" :biaoqian="x.biaoqian" :number2="x.number2" :pinglun="x.pinglun"></review>
                        </div>
                    </li>
                    <li class="order_main">
                       <!--评论--嗮图-->
                        <div class="container">
                            <review v-for="x in review_list" :imgurl1="x.imgurl1" :imgurl2="x.imgurl2" :imgurl3="x.imgurl3" :imgurl4="x.imgurl4" :imgurl5="x.imgurl5"
                            :name="x.name" :time="x.time" :number="x.number" :title="x.title" :liulang="x.liulang" :biaoqian="x.biaoqian" :number2="x.number2" :pinglun="x.pinglun"></review>
                        </div>
                    </li>
                    <li class="order_main">
                       <!--评论--低分-->
                        <div class="container">
                            <review v-for="x in review2_list" :imgurl1="x.imgurl1" :imgurl2="x.imgurl2" :imgurl3="x.imgurl3" :imgurl4="x.imgurl4" :imgurl5="x.imgurl5"
                            :name="x.name" :time="x.time" :number="x.number" :title="x.title" :liulang="x.liulang" :biaoqian="x.biaoqian" :number2="x.number2" :pinglun="x.pinglun"></review>
                        </div>
                    </li>
                    <li class="order_main">
                        <!--评论--更新-->
                        <div class="container">
                            <update v-for="x in update_list" :imgurl1="x.imgurl1" 
                            :name="x.name" :time="x.time" :number="x.number" :title="x.title" :liulang="x.liulang" :biaoqian="x.biaoqian" :number2="x.number2" :pinglun="x.pinglun"></update>
                        </div>
                    </li>
                </ul>
            </div>
        `,
        data:function(){
            return{
                // 点评
                menu_nav_list:[
                    {menu_nav1:'味道好 299',menu_nav2:'回头客 199',menu_nav3:'干净卫生 299',menu_nav4:'上菜快 399',
                        menu_nav5:'肉类好 499',menu_nav6:'分量足 599',menu_nav7:'菜品不错 93',menu_nav8:'下午茶 5',menu_nav9:'肉类 3',menu_nav10:'不推荐 0',}
                ],
                // 评论--全部
                review_list:[
                    {
                        imgurl1:'../../public/images/评论/1.jpg',
                        imgurl2:'../../public/images/评论/5.jpg',
                        imgurl3:'../../public/images/评论/6.jpg',
                        imgurl4:'../../public/images/评论/7.jpg',
                        imgurl5:'../../public/images/评论/8.jpg',
                        name:'鑫鑫宝贝',time:'2018.4.14',number:'打分',
                        title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有华莱士，果断找华莱士，伤心的是找了好久，毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'2',pinglun:'评论',
                    },
                    {
                        imgurl1:'../../public/images/评论/1.1.jpg',
                        imgurl2:'../../public/images/评论/14.jpg',
                        imgurl3:'../../public/images/评论/5.jpg',
                        imgurl4:'../../public/images/评论/15.jpg',
                        imgurl5:'../../public/images/评论/2.jpg',
                        name:'慧慧',time:'2018.4.14',number:'打分',
                        title:'菜品很不错，味道也很棒，一直就挺喜欢华莱士的，这次偶然路过此处，发现有这家店。正好肚子饿了也有合适的美团套餐，就进来尝尝了。这个时段，没什么人，所以不用等太久，就上餐了。店员的服务态度',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'8',pinglun:'评论',
                    },
                    {
                        imgurl1:'../../public/images/评论/1.1.jpg',
                        imgurl2:'../../public/images/评论/10.jpg',
                        imgurl3:'../../public/images/评论/12.jpg',
                        imgurl4:'../../public/images/评论/6.jpg',
                        imgurl5:'../../public/images/评论/15.jpg',
                        name:'慧慧',time:'2018.4.14',number:'打分',
                        title:'菜品很不错，味道也很棒，一直就挺喜欢华莱士的，这次偶然路过此处，发现有这家店。正好肚子饿了也有合适的美团套餐，就进来尝尝了。这个时段，没什么人，所以不用等太久，就上餐了。店员的服务态度',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'8',pinglun:'评论',
                    },
                    {
                        imgurl1:'../../public/images/评论/1.2.jpg',
                        imgurl2:'../../public/images/评论/11.jpg',
                        imgurl3:'../../public/images/评论/12.jpg',
                        imgurl4:'../../public/images/评论/13.jpg',
                        imgurl5:'../../public/images/评论/14.jpg',
                        name:'慧慧',time:'2018.4.14',number:'打分',
                        title:'菜品很不错，味道也很棒，一直就挺喜欢华莱士的，这次偶然路过此处，发现有这家店。正好肚子饿了也有合适的美团套餐，就进来尝尝了。这个时段，没什么人，所以不用等太久，就上餐了。店员的服务态度',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'8',pinglun:'评论',
                    }
                ],
                //评论--嗮图
                review2_list:[
                    {
                        imgurl1:'../../public/images/评论/1.2.jpg',
                        imgurl2:'../../public/images/评论/5.jpg',
                        imgurl3:'../../public/images/评论/11.jpg',
                        imgurl4:'../../public/images/评论/7.jpg',
                        imgurl5:'../../public/images/评论/12.jpg',
                        name:'鑫鑫宝贝',time:'2018.4.14',number:'打分',
                        title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有华莱士，果断找华莱士，伤心的是找了好久，毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'2',pinglun:'评论',
                    },
                    {
                        imgurl1:'../../public/images/评论/1.2.jpg',
                        imgurl2:'../../public/images/评论/13.jpg',
                        imgurl3:'../../public/images/评论/11.jpg',
                        imgurl4:'../../public/images/评论/15.jpg',
                        imgurl5:'../../public/images/评论/12.jpg',
                        name:'鑫鑫宝贝',time:'2018.4.14',number:'打分',
                        title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有华莱士，果断找华莱士，伤心的是找了好久，毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'2',pinglun:'评论',
                    },
                ],
                update_list:[
                    {
                        imgurl1:'../../public/images/评论/1.jpg',
                        name:'鑫鑫宝贝',time:'2018.4.14',number:'打分',
                        title:'几个朋友跑去海珠湖玩，饿得( •̥́ ˍ •̀ू )不行，一搜美团，附近有华莱士，果断找华莱士，伤心的是找了好久，毕竟景点，人好多啊，不过味道棒棒哒，没辜负我，等这么久。。。说好的100字100.积分呢，忽悠人呢(=ﾟДﾟ=)。',
                        biaoqian:'价格实惠，味道赞，性价比高，上菜快，彩品不错',liulang:'浏览999',
                        number2:'2',pinglun:'评论',
                    },
                ],
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
        }
    });
    let comment = new Vue({
        el:'#comment',
        data:{
            // 头部
            menu_list:[
                {menu1:'全部(1368)',menu2:'嗮图(368)',menu3:'低分(120)',menu4:'更新'}
            ],
        }

    });
};
