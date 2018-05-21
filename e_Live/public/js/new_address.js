window.onload = function () {
    let app=new Vue({
        el:"#myApp",
        data:{
            item:{
                name:'',
                phone:null,
                pmd:'',
                address:'',
                isDefault:false,
            },
        },
        methods:{
            submit_click:function(){
                let me = this;
                for(i in this.item)
                {
                    if(this.item[i]=='')
                    {
                        alert('内容不能为空~');
                        return;
                    }
                }
                $.ajax({
                    type:'post',
                    data:me.item,
                    url:'/api/my/set_address',
                    success:function(result){
                        console.log(result);
                    }
                })

            }
        }
    });
    $('.form').last().css({'border-bottom':'none'});
    $('.addressheader i').click(function () {
        window.location.href = '/user/address.html'
    })
    //点击保存页也是跳到/address.html
};