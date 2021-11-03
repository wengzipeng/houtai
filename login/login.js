$(function () {
    //点击 注册账号 的链接
    $("#link-reg").on("click", function () {
        $(".reg-box").show();
        $(".login-box").hide();
    })
    //点击 登录 的链接
    $("#link-login").on("click", function () {
        $(".login-box").show();
        $(".reg-box").hide();
    })
    //从layui中获取form对象
    //将layui的form属性赋给form（重要）
    var form = layui.form
    var layer = layui.layer
    //注意：layui上的属性不能直接使用，必须通过上面赋值的形式才能使用



    //通过form.verify()函数自定义校验规则
    //注：通过 lay-verify属性调用，多个校验规则则用 | 隔开
    form.verify({
        //自定义了一个叫做pass的校验规则
        pass: [
            //校验规则  错误提示
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repass: function (value) {
            //通过形参拿到的是确认密码框中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于的判断
            //如果判断失败，则return一个提示消息即可
            var pwd = $(".reg-box [name=password]")
                .val()
            if (pwd != value) {
                return "两次密码不一致"
            }

        }
    })
    //监听注册表单的提交事件
    $("#form-reg").on("submit", function (e) {
        //当表单提交时，页面会自动跳转，此时需要阻止表单的默认行为
        //阻止表单的默认提交行为
        e.preventDefault();
        //发起ajax的post请求
        $.post("/api/reguser", { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() },
            function (res) {
                if (res.status !== 0) {
                    // return console.log(res.message)
                    return layer.msg(res.message)
                }
                //注意：layui上的属性不能直接使用，必须通过上面赋值的形式才能使用
                // var layer = layui.layer
                // 等同于console.log("注册成功")
                layer.msg("注册成功，请登录")
                //要跳转登录页面，可以模拟点击行为，点击登录
                $("#link-login").click()
            })
    })
    $("#form-login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: "POST",
            url: "/api/login",
            //快速获取表单中的数据 
            //serialize() 以查询字符串方式输出
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("登录失败！")
                }
                layer.msg("登录成功")
                //将登录成功得到的 token 字符串，保存到
                //本地内存 localStorage 中
                //以 /my 开头的请求路径，需要在请求头中携带
                //Authorization 身份认证字段，才能正常访问成功
                localStorage.setItem("token", res.token)
                //跳转到后台页面
                location.href = "/index.html"
            }
        })
    })

})