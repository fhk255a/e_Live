window.onload = function () {
    let app = new Vue({
        el: "#myApp",
        data: {
            user_info: {},
            update_isShow: false,
            birthday_isShow: false,
            birthday_val: '',
            telphone_isShow: false,
        },
        beforeCreate: function () {
            let me = this;
            $.ajax({
                url: '/api/my/get_userInfo',
                type: 'get',
                dataType: 'json',
                success: function (result) {
                    me.user_info = result[0];
                }
            })
        },
        methods: {
            togglebir_click: function () {
                this.update_isShow = true;
                this.birthday_isShow = true;
            },
            toggletel_click: function () {
                this.update_isShow = true;
                this.telphone_isShow = true;
            },
            birthday_click: function () {
                let str = "UPDATE `userinfo` SET `birthday`='" + this.user_info.birthday + "'  WHERE `id` = " + this.user_info.id;
                this.update_ajax(str);
            },
            telphone_click: function () {
                let str = "UPDATE `userinfo` SET `telphone`='" + this.user_info.telphone + "'  WHERE `id` = " + this.user_info.id;
                this.update_ajax(str);
            },
            update_ajax: function (str) {
                let me = this;
                $.ajax({
                    url: '/api/my/set_userInfo',
                    type: 'post',
                    data: {
                        str: str
                    },
                    dataType: 'json',
                    success: function (result) {
                        alert(result.msg);
                        if (result.code == 1) {
                            me.update_isShow = false;
                            me.birthday_isShow = false;
                            me.telphone_isShow = false;
                        }
                    }
                })
            },
            out_login_click:function(){
                $.ajax({
                    type:'post',
                    data:{},
                    url:'/api/login_out',
                    success:function(result){
                        alert(result.msg);
                        if(result.code==1)
                        {
                            window.location.reload();
                        }
                    }
                })
            }
        }

    });
    $('.Informationheader a').last().css({'border-bottom': 'none'});

    $('.Personalheader i').click(function () {
        window.location.href = '/user/my.html'
    })
};