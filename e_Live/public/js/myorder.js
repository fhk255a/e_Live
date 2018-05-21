$(function(){
    let Event = new Vue();

    //顶部
    Vue.component('my-header',{
        props:['h_title','h_title_right','r_xiabiao'],
        template:`
             <header>
                <div class="order">
                    <div class="Return" @click="aaa">
                        <i class="iconfont icon-back"></i>
                    </div>
                    <div class="order_cen">
                        <span :class="r_xiabiao">{{h_title}}</span>
                    </div>
                    <div  class="order_right">
                        <span v-if="show == true">{{h_title_right}}</span>
                    </div>
                   
                </div>
               <my-nav></my-nav>
             </header>
             
        `,
        data:function(){
            return {
                show: false,
            }
        },
        methods:{
            aaa:function () {
                window.location.href = '/user/bot_order.html';
            }
        },
        mounted:function(){
            let that = this;
            Event.$on('indexShow',function(data){
                that.show = data;
            })

        }
    })
    Vue.component('my-nav',{
        template:`
            <nav class="h_nav">
                <ul>
                    <li v-for="(x,index) in h_nav" :class="x.classStyle" @click = "setActive(index)" >
                        <span>{{x.text}}</span>
                    </li>
                </ul>
            </nav>
        `,
        data:function(){
            return {
                h_nav:[
                     {text:'全部',classStyle:'active'},
                     {text:'待付款',classStyle:null},
                     {text:'待使用',classStyle:null},
                     {text:'待评价',classStyle:null},
                     {text:'退款/售后',classStyle:null},
                ],
                i_index:0,
                show:''
            }
        },
        methods:{
            setActive:function(index){
                if(this.i_index!=index){
                    $('.Myorder_main ul').css({'top':0})
                }
                for(let i=0;i<this.h_nav.length;i++){
                    this.h_nav[i].classStyle = null;
                    }
                    this.h_nav[index].classStyle = 'active';
                if(index == '3'){
                    this.show = true;
                    Event.$emit('indexShow',this.show);
                }else{
                    this.show = false;
                    Event.$emit('indexShow',this.show);
                }
                this.changeLeft(index);

            },
            changeLeft:function(index){
                this.i_index = index;
                $('.Myorder_main ul').animate({'left': -this.i_index*$('.Myorder_main').width()+'px'},300);
                Event.$emit('i_index1',this.i_index);
            },

        },
        mounted:function(){
            let that = this;
            Event.$on('i_index2',function(data){
                that.i_index = data;
                that.setActive(data);
            })
        }
    })
    // 商品内容表
    Vue.component('my_main',{
        template:`
            <div class="Myorder_main" ref="m_main" :style="style1">
                <ul ref="m_main_ul" style="left:0" @touchstart="startTouch" @touchmove="moveTouch" @touchend="endTouch">
                    <li class="order_main">      
                        <my_main_box v-if="all_list != ''" :data_list="all_list"></my_main_box>
                        <is-null v-else ></is-null>
                    </li>
                    <li class="order_main">
                        <my_main_box v-if="fukuan_list != ''" :data_list="fukuan_list"></my_main_box>
                        <is-null v-else ></is-null>
                    </li>
                    <li class="order_main">
                        <my_main_box v-if="shiyong_list != ''" :data_list="shiyong_list"></my_main_box>
                        <is-null v-else ></is-null>
                    </li>
                    <li class="order_main">
                        <my_main_box v-if="pinjia_list != ''" :data_list="pinjia_list"></my_main_box>
                        <is-null v-else ></is-null>
                    </li>
                    <li class="order_main">
                        <my_main_box v-if="tuikuang_list != ''" :data_list="tuikuang_list"></my_main_box>
                        <is-null v-else ></is-null>
                    </li>
                </ul>
            </div>
        `,
        data:function(){
            return {
                all_list:'',
                // all_list:[
                //     {
                //         img:'../../public/images/myOreder/img1.jpg',
                //         name:'景湾公寓',
                //         state:'待评价',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'待付款',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'已消费',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'退款成功',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'已消费',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'退款成功',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'已消费',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/cate_img/order1.png',
                //         name:'景湾公寓',
                //         state:'退款成功',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //
                // ],

                fukuan_list:'',
                shiyong_list:'',
                // shiyong_list:[
                //     {
                //         img:'../../public/images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'待使用',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../../public/images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'待使用',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     }
                // ],
                pinjia_list:'',
                // pinjia_list:[
                //     {
                //         img:'../images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'待评价',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'待评价',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     }
                // ],
                tuikuang_list:'',
                // tuikuang_list:[
                //     {
                //         img:'../images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'退款成功',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     },
                //     {
                //         img:'../images/myOreder/order1.png',
                //         name:'景湾公寓',
                //         state:'退款成功',
                //         type:'1间，豪华套房',
                //         time:'2017-10-21 至 22',
                //         total:'108.00',
                //     }
                // ],
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
                direction:null
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
            },
            JSajax:function (index) {
                let othis = this;
                $.ajax({
                    type:"GET",
                    url:"/list/MyOrder"+index+"",
                    success:function (result) {
                        console.log(result)
                        switch (index){
                            case 0:
                                othis.all_list = result;
                                break;
                            case 1:
                                othis.fukuan_list = result;
                                break;
                            case 2:
                                othis.shiyong_list = result;
                                break;
                            case 3:
                                othis.pinjia_list = result;
                                break;
                            case 4:
                                othis.tuikuang_list = result;
                                break;
                        }
                    },
                    error:function (err) {
                        console.log(err)
                    }
                });

            },
        },
        beforeCreate:function(){
            let that = this;
            Event.$on('i_index1',function(data){
                that.i_index = data;
                that.endX = -data*parseInt(that.$refs.m_main.offsetWidth);
                that.JSajax(data);
            });
            $.ajax({
                type:"GET",
                url:"/list/MyOrder.html",
                success:function (result) {
                    console.log(result);
                    that.all_list=result;
                }
            })



        }
    });

    // 商品内容组件
    Vue.component('my_main_box',{
        props:['data_list'],
        template:`
            <div>
                <div class="o_main_box" v-for="(x,index) in data_list">
                    <div class="o_main_box_img">
                        <img :src="x.img"/>
                    </div>
                    <div class="o_main_box_text">
                        <div class="o_main_box_text_1">
                            <h1>{{x.name}}</h1>
                            <span>{{x.state|new_statc}}</span>
                        </div>
                        <p>{{x.type}}</p>
                        <p>使用时间：{{x.time}}</p>
                        <p>总价：￥{{x.total}}</p>
                        <div class="o_main_box_btn text-center">
                            <div class="o_main_box_btn1" v-if="stateif(x.state)"  @click="deep_href(x.state,x)">
                                <span>{{x.state|new_statc2}}</span>
                            </div> 
                        </div>
                    </div>
                           
                </div>
            </div>
            
        `,
        methods:{
            stateif: function(index){
                if(index==3){
                    return false;
                }else{
                    return true
                }
            },
            deep_href : function(state,data){
                console.log(data.name);

                if(state==1){
                    $.ajax({
                        type:'post',
                        url:'/evaluate.dp',
                        data:{id:data.id,name:data.name},
                        success:function (result) {
                            console.log('成功');
                            window.location.href = '/evaluate.html';
                        }
                    })
                }

            }
        },
        filters: {
            new_statc: function (value) {
                if(value==1){
                    return '待评价'
                }else if(value==2){
                    return '待付款'
                }else if(value==3){
                    return '已消费'
                }else if(value==4){
                    return '待使用'
                }else{
                    return '退款成功'
                }
            },
            new_statc2: function (value) {
                if(value==1){
                    return '评价'
                }else if(value==2){
                    return '去付款'
                }else if(value==4){
                    return '去使用'
                }else{
                    return '退款详情'
                }
            }
        },
    });


    //如何列表没有东西
    Vue.component('isNull',{
        template:`
            <div class="null">
                <img src="../../public/images/myOreder/login2.png" />
                <p>您还没有相关订单</p>
                <span>去下一单试试吧</span>
                <div class="null_btn" @click="deep_href">
                    <span>随便逛逛</span>
                </div>
            </div>
        `,
        methods:{
            deep_href : function(   ){
                window.location.href='Cate.html';
            }
        }
    })
    new Vue({
        el:"#app2",
        data:{
            h_title:'我的订单',
            right_xiabiao:'right_xiabiao',
            h_right:'奖励规则'
        }
    })
});

