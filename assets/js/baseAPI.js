// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPerfilter这个函数
// 在这个函数中，可以拿到我们给Ajax配置的对象
$.ajaxPrefilter(function(option){
    // 在真正发起Ajax请求之前，统一拼接请求的根路径
    option.url = 'http://www.liulongbin.top:3007' + option.url
    // console.log(option.url)

    // 统一为有权限的接口，设置header请求头
    if (option.url.indexOf('/my/') !== -1){
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    option.complete = function(res){
        // console.log('执行力complete回调')
        // console.log(res)
        // 在complete回调函数中使用res.reponseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！"){
            // 1.强制清空token
            // 2.强制跳转到登陆页面
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})