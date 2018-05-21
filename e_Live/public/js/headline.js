window.onload=function () {
    Vue.component('cont',{
        props:['imgurl','title'],
        template:
        `<div>
            <img class="col-xs-12 col-md-12" :src="imgurl" alt="">
            <p class="col-xs-12 col-md-12">{{title}}</p>
         </div>
        `
    });
    // 更多
    Vue.component('moreread',{
        props:['title','name','imgurl2'],
        template:
        `
        <div class="container" style="padding: 0;border-bottom: 1px solid #cccccc">
        <ul class="more2 col-xs-12">
            <li class="col-xs-8 col-md-8">
                <p>{{title}}</p>
                <p>{{name}}</p>
            </li>
            <li><img class="col-xs-4 col-md-4" :src="imgurl2" alt=""></li>
        </ul>
    </div>
        `
    });
    // 底部
    Vue.component('fort',{
        props:['name1','name2','name3'],
        template:
        `
    <div class="navbar-fixed-bottom fort_bottom">
        <ul class="fort_bottom1">
            <li class="col-xs-6"><input type="text" placeholder="评价一下"></li>
            <li class="col-xs-2 col-md-2">
                <p class="iconfont icon-fenxiang1"></p>
                <p>{{name1}}</p>
            </li>
            <li class="col-xs-2 col-md-2">
                <p class="iconfont icon-xinxi1"></p>
                <p>{{name2}}</p>
            </li>
            <li class="col-xs-2 col-md-2">
                <p class="iconfont icon-shoucang3"></p>
                <p>{{name3}}</p>
            </li>
        </ul>
    </div>
        `
    });
    var head =new Vue({
        el:'#heading',
        data:{
            cont_list:[
                {imgurl:'../../public/images/头条/1.jpg',title:'这是一套72平的小户型二居室，整体风格为现代简约风，户型和各个空间的布局也非常的不错。电视背景墙，贴上创意十足的壁纸，简单而又好看。'},
                {imgurl:'../../public/images/头条/2.jpg',title:'厨房的推拉门直接改成了玻璃门，可以用来代替入户的穿衣镜，也让玄关走道看起来更加的宽敞一些。'},
                {imgurl:'../../public/images/头条/3.jpg',title:'走过玄关之后就到了餐厅区域，靠着角落摆放长方形的餐桌，满足一家人的使用。餐厅边上的墙面做了嵌入式的收纳设计，把冰箱也藏在了这里'},
                {imgurl:'../../public/images/头条/4.jpg',title:'餐厅和客厅直接没有做隔断，整个空间连在一起，也没有做吊顶，看起来就格外的宽敞、明亮。'},
                {imgurl:'../../public/images/头条/5.jpg',title:'电视背景墙虽然只是铺贴了壁纸，但是这款电视背景墙选择的非常的好看，不同颜色几何图形构造出一个有创意的背景墙。'},
                {imgurl:'../../public/images/头条/6.jpg',title:'沙发背景墙的设计更加的简约，刷上乳胶漆后，搭配射灯和挂画，和浅色系的布艺沙发搭配起来，更有简约风的感觉。'},
                {imgurl:'../../public/images/头条/7.jpg',title:'主卧室的背景色选择了更加温馨的米色，搭配浅蓝色的床品和窗帘，把温馨和小清新完美的结合了起来，让人感觉非常舒适。'},
                {imgurl:'../../public/images/头条/8.jpg',title:'次卧是做了榻榻米组合衣柜的设计，再摆放一张书桌、一个格调的梯子收纳，对于小户型来说，这样设计非常的实用。'},
            ],
            moreread_list:[
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/10.jpg'},
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/11.jpg'},
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/12.jpg'},
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/13.jpg'},
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/15.jpg'},
                {title:'56平分现代小窝，一点都不觉得比豪宅差！',name:'腾讯新闻',imgurl2:'../../public/images/头条/16.jpg'},
            ],
            fort_list:[
                {name1:'分享',name2:'信息',name3:'收藏'}
            ]
        }

    })
};