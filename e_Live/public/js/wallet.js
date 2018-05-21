
$(function(){
    new Vue({
        el:"#wellet",
        data:{
            user_info:[],
        },
        methods:{
            deep_rec:function(){
                window.location.href='/user/Recharge.html';
            },
            deep_my:function(){
                window.location.href='/user/my.html';
            },
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