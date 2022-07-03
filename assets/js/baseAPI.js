// 注意：每次调用$.get()或$.post()或$.ajax()的时候
// 会先调用ajaxPerfilter这个函数
// 在这个函数中，可以拿到我们给Ajax配置的对象
$.ajaxPrefilter(function(option){
    option.url = 'http://www.liulongbin.top:3007' + option.url
    console.log(option.url)
})