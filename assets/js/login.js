$(function(){
    // 点击注册账号的链接
    $('#link_reg').on('click', function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击登录链接
    $('#link_login').on('click', function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
})

// 从layui中获取form对象
 var form = layui.form
//  通过form.verify()函数自定义校验规则
form.verify ({
    // 自定义一个叫做pwd的校验规则
    pwd: [
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
      ],

    repwd: function(value){
    //通过形参拿到的是确认密码框中的内容
    // 还需要拿到密码框中的内容
    // 进行一次等于的判断
    // 如果判断失败，则return一个提示消息即可
    var pwd = $('.reg-box [name=password]').val()
    if (pwd != value){
        return '两次密码不一致！'
    }
    }
})

// 监听注册表单的提交事件
var layer = layui.layer

$('#form-reg').on('submit', function(e){
    e.preventDefault()
    var data = {
    username: $('#form-reg [name=username]').val(),
     password: $('#form-reg [name=password]').val()
    }
    $.post('/api/reguser', data, function(res){
        if(res.status !== 0){
            return layer.msg(res.message)
        } 
        layer.msg('注册成功！')
        // 模拟人的点击行为
        $('#link_login').click()
    })
})

$('#form-login').submit(function(e){
    e.preventDefault()
    $.ajax({
        url: '/api/login',
        method: 'POST',
        // 快速获取表单元素
        data: $(this).serialize(),
        success: function(res){
            if(res.status !== 0){
                return layer.msg('登录失败！')
            } 
            layer.msg('登陆成功！')
            // console.log(res.token)
            // 将登陆成功的token字符串，保存到localstorage中
            localStorage.setItem('token', res.token)
            // 跳转到后台主页
            location.href = '/index.html'
        }
    })
})