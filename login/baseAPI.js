//注意：每次调用 $.get() $.post()  $.ajax()时
//都会事先先调用 ajaxPrefilter 这个函数
//在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
})