$(function () {
    // 计算时间戳,倒计时

    // VUE
    Vue.component('heard',{
        template:`
        <header id="cate_header">
            <div class="c_head">
                <div class="c_h_left">
                    <p>
                        <span class="iconfont icon-back" @click="deep_href"></span>
                    </p>
                </div>
                <div class="c_h_center">
                    <div class="h_search">
                        <span class="iconfont icon-search"></span>
                        <span>输入商家名、品类或商圈</span>
                    </div>
                </div>
                <div class="c_h_right">
                    <p>
                        <span class="iconfont icon-dingwei"></span>
                    </p>
                </div>
            </div>
        </header>`,
        methods:{
            //跳转网页
            deep_href : function(){
                window.history.go(-1)
            }
        },
    });
    new Vue({
        el:"#cate_page",
        data:{
            x_time : $.now(),
            e_time : '1526078142133',
        },
        methods:{
            guolu:function(val){
                if(val>=0&&val<10){
                    val = '0'+val;
                }
                return val
            },
            c_time:function(time1,time2){
                let timeArr = {
                    year:'',
                    month:'',
                    day:'',
                    hour:'',
                    minute:'',
                    second:''
                };
                let runTime = null;
                runTime = parseInt((time2-time1) / 1000);
                timeArr.year = this.guolu(Math.floor(runTime / 86400 / 365));
                runTime = runTime % (86400 * 365);
                timeArr.month = this.guolu(Math.floor(runTime / 86400 / 30));
                runTime = runTime % (86400 * 30);
                timeArr.day = this.guolu(Math.floor(runTime / 86400));
                runTime = runTime % 86400;
                timeArr.hour = this.guolu(Math.floor(runTime / 3600));
                runTime = runTime % 3600;
                timeArr.minute = this.guolu(Math.floor(runTime / 60));
                runTime = runTime % 60;
                timeArr.second = this.guolu(runTime);
                return timeArr;
            },
            changeTime:function(){
                let s_time = '';
                clearInterval(s_time);
                let date = $.now();
                let end = '1529078142133';
                if((end-date)>0){
                    let time = this.c_time(date,end);
                    $('.hour').text(time.hour);
                    $('.min').text(time.minute);
                    $('.sec').text(time.second);
                    let othis = this;
                    s_time = setInterval(function(){
                        othis   .changeTime()
                    },1000)
                }else{
                    $('.hour').text('00');
                    $('.min').text('00');
                    $('.sec').text('00');
                }
            }

        },
        mounted:function(){
            this.changeTime();
        }

    })


});