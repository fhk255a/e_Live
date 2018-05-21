$(function(){
    Vue.component('my-header',{
        props:['h_title','h_title_right','r_xiabiao','xin_ji','xin_ji1','text_num'],
        template:`
             <header>
                <div class="order">
                    <div class="Return" @click="deep_href">
                        <i class="iconfont icon-back"></i>
                    </div>
                    <div class="order_cen">
                        <span :class="r_xiabiao">{{h_title}}</span>
                    </div>
                    <div  class="order_right" @click="release(xin_ji,text_num,xin_ji1)">
                        <span>{{h_title_right}}</span>  
                    </div>
                </div>
             </header>
        `,
        methods:{
            //返回上一页
            deep_href:function(){
                window.location.href = '/user/wallet.html'
            },
        },
    })
    new Vue({
        el:"#Recharge",
        data:{
            user_info:[],
            h_title:'',
            h_title_right:''
        },
        methods:{
            top_up:function () {
                window.location.href = '/user/top-up.html'
            }
        },
        beforeCreate:function(){
            let me = this;
            $.ajax({
                url:'/api/my/get_userInfo',
                type:'get',
                dataType:'json',
                success:function(result){
                    me.user_info = result[0];
                }
            })
        }
    })
})