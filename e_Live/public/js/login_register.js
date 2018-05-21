$(function () {
    //定义一个Vue的登录注册判断
    let login_register = new Vue({
        el: '#login_register',
        data: {
            login_data: {
                username: '',
                password: ''
            },
            register_data: {
                username: '',
                password: ''
            },
            isLogin_more: false,
            isShow: true
        },
        methods: {
            login_click: function () {
                if (this.login_data.username == '' || this.login_data.password == '') {
                    alert('密码或者用户名不能为空！');
                }
                else {
                    let me = this;
                    $.ajax({
                        type: 'post',
                        url: '/api/login',
                        data: me.login_data,
                        success: function (result) {
                            console.log(result.user);
                            if (result.msg.code == 1) {
                                alert(result.msg.msg);
                                window.location.href = 'my.html';
                            }
                            else {
                                alert(result.msg);
                                console.log(result);
                            }
                        }
                    })
                }
            },
            register_click: function () {
                if (this.register_data.username == '' || this.register_data.password == '') {
                    alert('密码或者用户名不能为空！');
                }
                else {
                    let me = this;
                    $.ajax({
                        type: 'post',
                        url: '/api/register',
                        data: me.register_data,
                        success: function (result) {
                            console.log(result);
                            if (result.code == 1) {
                                alert(result.msg);
                                me.isShow = true;
                            }
                            else {
                                alert(result.msg);
                            }
                        }
                    })
                }
            },
            toggle_click: function () {
                this.isShow = !this.isShow;
            },
            show_more: function () {
                this.isLogin_more = !this.isLogin_more;
            },
        }
    });
});