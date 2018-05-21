$(function () {

    Vue.filter('seeNum',function(num){
        if(num>10000){
            return Math.floor(num/10000)+'.'+Math.floor(num%10000/1000)+'万';
        }
        return num;
    });
    Vue.filter('follow_author',function (type) {
        if(type){
            return '查看主页';
        }
        return '+ 关注'
    });
    Vue.component('bot-find-template1', {
        props: ['find'],
        template: `
             <div class="mgl_bar_recommend" ref="mgl_bar_recommend" @click="changeBack">
                 <div class="mgl_bar_recommend_tit" >
                     {{find.tit}}
                 </div>
                 <div class="mgl_bar_recommend_img">
                     <div v-for="x in find.pic">
                         <img :src="x" alt="">
                     </div>
                 </div>
                 <div class="mgl_bar_recommend_rep">
                     {{find.author}}
                     <span class="look_people">× {{find.num | seeNum}}</span>
                 </div>
             </div>
        `,
        methods:{
            changeBack:function () {
                window.location.href = '/headline.html'
            },
        },
    });
    Vue.component('bot-find-template2',{
        props: ['find'],
        template:`
            <div class="mgl_bar_find_rec" @click="checkEvent">
                    <div class="mgl_bar_find_rec_con">
                        <div class="mgl_bar_find_rec_tit">
                            <span>
                                {{find.tit}}
                            </span>
                        </div>
                        <div class="mgl_bar_find_rec_author">
                            {{find.author}}
                            <span class="look_people">× {{find.num | seeNum}}</span>
                        </div>
                    </div>
                    <div class="mgl_bar_find_rec_img">
                        <img :src="find.pic[1]" alt="">
                    </div>
                </div>
        `,
        methods:{
            checkEvent:function () {
                window.location.href = '/headline.html'
            }
        }
    })
    Vue.component('bot-find-template3',{
        props: ['find'],
        template:`
            <div class="mgl_bar_recommend" @click="checkEvent">
                    <div class="mgl_bar_author">
                        <div class="mgl_bar_author_img">
                            <img :src="find.author_user" alt="">
                        </div>
                        <div class="mgl_bar_author_name">{{find.author}}</div>
                        <div class="mgl_bar_author_fol">{{find.type | follow_author}}</div>
                    </div>
                    <div class="mgl_bar_recommend_tit">
                        {{find.tit}}
                    </div>
                    <div class="mgl_bar_recommend_img">
                        <div v-for="x in find.pic">
                            <img :src="x" alt="">
                        </div>
                    </div>
                    <div class="mgl_bar_recommend_rep">
                        <span class="look_people">× {{find.num | seeNum}}</span>
                    </div>
                </div>
        `,
        methods:{
            checkEvent:function () {
                window.location.href = '/headline.html'
            }
        },
    })
    Vue.component('fooderqianbaonei',{
        props:['x','index'],
        template:`<nav class="fooder">
                      <a :href="x.href" :class="{foodercolor:index==2}" v-for="(x,index) in fooder_list" >
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


    // Vue.config.delimiters=['${','}'];
    let app = new Vue({
        el:'#bot_find_app',
        data:{
            hai:true,
            find_list:[
                {
                    tit:'世界上最贵的水果，吃过3种以上的都是土豪啊11！！',
                    pic:['../../public/images/find_page/find1-1.png','../../public/images/find_page/find1-2.png','../../public/images/find_page/find1-3.png'],
                    author:'全球美食',
                    author_user:'../../public/images/hone_page/361game.jpg',
                    num: 2085500,
                    type: true,
                },
                {
                    tit:'世界上最贵的水果，吃过3种以上的都是土豪啊22！！',
                    pic:['../../public/images/find_page/find1-1.png','../../public/images/find_page/find1-2.png','../../public/images/find_page/find1-3.png'],
                    author:'全球美食',
                    author_user:'../../public/images/hone_page/361game.jpg',
                    num: 2084900,
                    type: false,
                },
                {
                    tit:'广州美食一条街，让你的味蕾得到充分的满足！',
                    pic:['../../public/images/find_page/find1-1.png','../../public/images/find_page/find1-2.png','../../public/images/find_page/find1-3.png'],
                    author:'广州吃喝玩乐',
                    author_user:'../../public/images/hone_page/361game.jpg',
                    num: 3108,
                    type: false,
                },
                {
                    tit:'广州美食一条街，让你的味蕾得到充分的满足！',
                    pic:['../../public/images/find_page/find1-1.png','../../public/images/find_page/find1-2.png','../../public/images/find_page/find1-3.png'],
                    author:'吃喝玩乐IN广州',
                    author_user:'../../public/images/hone_page/361game.jpg',
                    num: 13108,
                    type: true,
                },
                {
                    tit:'广州美食一条街，让你的味蕾得到充分的满足！',
                    pic:['../../public/images/find_page/find1-1.png','../../public/images/find_page/find1-2.png','../../public/images/find_page/find1-3.png'],
                    author:'广州吃喝玩乐蒲',
                    author_user:'../../public/images/hone_page/361game.jpg',
                    num: 3108,
                    type: false,
                },
            ],


        },
        methods:{

        },
        computed:{

        },
        filters:{

        },

    });


    let lengthA = 0;
    for(let i = 0;i<$('.find_check_li').length;i++){
        lengthA += $('.find_check_li').eq(i).width()+60;
    }
    $('.find_check ul').css({width:lengthA});


    let changeLiHeight = $('.find_check_content_li').eq(0).height();
    $('.find_check_content').css({height:changeLiHeight});

    $('.find_check_li').click(function () {

        let a = 0;
        for(let i=0; i<$(this).index(); i++){
            a += $('.find_check_li').eq(i).width()+60;
        }
        a = a-$(window).width()/2;

        if(a>0){
            if(a>lengthA-$(window).width()){a=lengthA-$(window).width()};
            $('.find_check').animate({left:-a+'px'});
        }else{
            $('.find_check').animate({left:0});
        }
        $(this).find('a').addClass('bot_solid').parent().siblings().find('a').removeClass('bot_solid');

        //  标签内容进行偏移
        let Margin_left = $('.find_check_content_li').width();
        $('.find_check_content ul').animate({left:-Margin_left*$(this).index()+'px'});

        changeLiHeight = $('.find_check_content_li').eq($(this).index()).height();

        $('.find_check_content').css({height:changeLiHeight});

    });






});