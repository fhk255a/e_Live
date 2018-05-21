$(function(){
    Vue.component('my-header',{
        props:['h_title','h_title_right','r_xiabiao','xin_ji','xin_ji1','text_num','id'],
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
                <div v-if="show" class="tx_menban">
                    <span>{{tx_menban}}</span>
                </div>
             </header>
        `,
        data:function(){
            return {
                tx_menban:'',
                show :false
            }
        },
        methods:{
            //返回上一页
            deep_href:function(){
                window.location.href = '/MyOrder.html'
            },
            release:function(text,len,text2){
                console.log(this.text_num)
                if(text!=null){
                    //将评价信息拼接成字符串
                    let str = '';
                    str += this.h_title+'~&';
                    str += this.xin_ji+'~&';
                    str += this.xin_ji1+'~&';
                    str += this.text_num;
                    if(len.length>14){
                        $.ajax({
                            type:'post',
                            url:'/list/evaluate.tj',
                            data:{str:str,id:this.id},
                            success:function (result) {
                                if(result){
                                    alert('发布成功')
                                    window.location.href = '/MyOrder.html';
                                }
                            }
                        })
                    }else{
                        this.show=true;
                        this.tx_menban = '您的评论还为满15个字'
                        this.setout();
                    }
                }else{
                    this.show=true;
                    this.tx_menban = '您还未选择星级'
                    this.setout();
                }
            },
            setout:function(){
                let othis = this;
                setTimeout(function(){
                    othis.show=false;
                },500)
            }
        },
    })




    new Vue({
        el: "#app",
        data: {
            id:'',
            h_title: '',
            h_right: '',
            // 评论等级
            e_list:[
                {text:'差',img:'../../public/images/cate_img/level1.jpg'},
                {text:'一般',img:'../../public/images/cate_img/level2.jpg'},
                {text:'还不错',img:'../../public/images/cate_img/level3.jpg'},
                {text:'很满意',img:'../../public/images/cate_img/level4.jpg'},
                {text:'强烈推荐',img:'../../public/images/cate_img/level5.jpg'},
            ],
            // 评价内容选项 active是选中时候显示的样式
            e_level:[
                {text:'服务差',active:false},
                {text:'设施陈旧',active:false},
                {text:'服务一般',active:false},
                {text:'环境一般',active:false},
                {text:'价格高',active:false}
                ],
            //点击的是哪个评论等级选项
            isActive:-1,
            // 星级
            xinji:null,
            xinji_1:[],
            // 匿名评价是否点中
            isActive2:false,
            // 发表评论最少字数量
            textNum:15,
            //保存用户输入的评价
            text_main:'',
            //判断客户是否以点击评价等级，从而判断是否显示评价内容选项
            level_text_show:false,
        },
        beforeCreate:function(){
            let me = this;
            me.info_msg = {};
            $.ajax({
                url:'list/evaluate',
                data:{},
                type:'post',
                success:function (data) {
                    me.h_title = data.name;
                    me.id = data.id;
                }
            })
        },
        methods:{
            // 评价等级
            change_level:function(index,text){
                this.level_text_show=true;
                this.isActive = index;
                this.xinji = text;
                console.log(this.xinji)
                if(index>1){
                    this.e_level=[
                        {text:'服务好',active:false},
                        {text:'设施新',active:false},
                        {text:'服务很好',active:false},
                        {text:'环境很好',active:false},
                        {text:'价格实惠',active:false}
                    ]
                }else{
                    this.e_level= [
                        {text:'服务差',active:false},
                        {text:'设施陈旧',active:false},
                        {text:'服务一般',active:false},
                        {text:'环境一般',active:false},
                        {text:'价格高',active:false}
                    ]
                }
            },
            changeBack:function(index){
                this.e_level[index].active = !this.e_level[index].active;
                this.xinji_1.push(this.e_level[index].text)
            },
            changeVal:function(num){
                this.textNum = num-this.text_main.length;
            },
            checkcolor:function(){
                this.isActive2 = !this.isActive2;
            }
        }
    })
})