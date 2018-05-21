
window.onload=function () {
    Vue.component('order',{
        props:['imgurl','name','title1','title2','title3','money','number','title4','title5','title6','title7','title8','number2','number3'],
        template:
        `
        <div>
            <div class="row order">
                <ul class="order_top">
                    <li class="col-xs-4 col-md-4 img">
                        <img :src="imgurl"/>
                    </li>
                    <li class="col-xs-6 col-md-6">
                        <p>{{name}}</p>
                        <p>{{title1}}</p>
                        <p>
                        <span>
                            <i class="iconfont icon-quangou">{{title2}}</i>
                        </span>
                            <span>
                            <i class="iconfont icon-quangou">{{title3}}</i>
                        </span>
                        </p>
                    </li>
                    <li class="col-xs-2 col-md-2">￥{{money}}</li>
                </ul>
            </div>
            <div class="row order_algorithm">
                <div class="col-xs-9 col-md-9">{{number}}</div>
                <ul class="col-xs-3 col-md-3">
                    <!--<div v-for="x in list"><button-counter>111</button-counter></div>-->
                    <li v-on:click="number2 --"><i class="iconfont icon-wuuiconsuoxiao"></i></li>
                    <li>{{number2}}</li>
                    <li v-on:click="number2 ++"><i class="iconfont icon-jia-tianchong"></i></li>
                </ul>
            </div>
            <div class="row order_plan">
                <span class="col-xs-9 col-md9">{{title4}}</span>
                <!--<span v-if="number2 == 1" class="col-xs-3 col-md-3">￥15</span>-->
                <span class="col-xs-3 col-md-3">￥{{money * number2}}</span>
            </div>
            <div class="row order_plan2">
                <span class="col-xs-8 col-md8">{{title5}}</span>
                <span class="col-xs-4 col-md-4">{{title6}}</span>
            </div>
            <div class="row order_plan3">
                <span class="col-xs-9 col-md9">{{title7}}</span>
                 <!--<span v-if="number2 == 1" class="col-xs-3 col-md-3">￥15</span>-->
                <span class="col-xs-3 col-md-3">￥{{money * number2}}</span>
            </div>
            <div class="row order_plan4">
                <span class="col-xs-9 col-md9">{{title8}}</span>
                <span class="col-xs-3 col-md-3">{{number3}}</span>
            </div>
            <div class="container navbar-fixed-bottom">
                <div class="row">
                    <div class="col-xs-12 col-md-12 float">￥{{money * number2}}提交订单</div>
                </div>
            </div>
        </div>
        `
    });
    var app = new Vue({
        el:'#myApp',
        data:{
            number2:1,
            commodity_list:[
                { imgurl:'../../public/images/订单/1.jpg',name:'超值豪华担任套餐',title1:'免预约',title2:'随时退',title3:'过期自动退',money:'15',
                number:'数量',number2:'1',title4:'小计',title5:'抵用券',title6:'暂无可用 >',
                title7:'实付金额',title8:'手机号',number3:'157****2726'}
            ],
            // methods:{
            //     reduce:function () {
            //
            //     }
            // }
            methods:{
                subtraction:function () {
                    number2 --;
                    if(number2 == 1){
                        return 15
                    }
                    money * number2

                }
            }
        }
    })

};
