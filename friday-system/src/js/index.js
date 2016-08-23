'use strict';
$('.fri-list').on('mouseenter', '.fri-item', function(event) {
	event.preventDefault();
	$(this).addClass('active');
});
$('.fri-list').on('mouseleave', '.fri-item', function(event) {
	event.preventDefault();
	$(this).removeClass('active');
});
$('.fri-list').on('click', '.fri-item', function(event) {
	event.preventDefault();
	$('.fri-dialog').show().addClass('in');
	$('.modal-backdrop').show().addClass('in');
	$('.carousel').carousel({
	  //interval: 2000
	})
	$('.carousel-control.left').on('click', function(event) {
		event.preventDefault();
		$('.carousel').carousel('prev')
	});
	$('.carousel-control.right').on('click', function(event) {
		event.preventDefault();
		$('.carousel').carousel('next')
	});
	$('.carousel-indicators').on('click', 'li', function(event) {
		event.preventDefault();
		$('.carousel').carousel($(this).index());
	});
});
$('.fri-dialog').on('click', function(event) {
	event.preventDefault();
	$('.fri-dialog').removeClass('in');
	$('.modal-backdrop').removeClass('in');
	setTimeout(function(){
		$('.fri-dialog').hide();
		$('.modal-backdrop').hide();
	},150)
});
$('.modal-dialog').on('click', function(event) {
	event.preventDefault();
	event.stopPropagation();
});
$('.fri-sidebar').on('click', 'dd', function(event) {
	event.preventDefault();
	$(this).addClass('active')
		.siblings('dd').removeClass('active');
	$('.fri-list').find('.fri-item').remove();
	$('.fri-list')
	.append('<li class="fri-item in in200">'
            +    '<div class="content">'
            +        '<img src="../images/480x640.jpg" alt=""/>'
            +        '<p class="name">协议一键生成</p>'
            +        '<p class="desc">通过填写协议DSL,一键生成协议文件与回调代码</p>'
            +    '</div>'
            +'</li>'
            +'<li class="fri-item in">'
            +    '<div class="content">'
            +        '<img src="../images/480x640.jpg" alt=""/>'
            +        '<p class="name">协议一键生成</p>'
            +        '<p class="desc">通过填写协议DSL,一键生成协议文件与回调代码</p>'
            +    '</div>'
            +'</li>'
            +'<li class="fri-item in in100">'
            +    '<div class="content">'
            +        '<img src="../images/480x640.jpg" alt=""/>'
            +        '<p class="name">协议一键生成</p>'
            +        '<p class="desc">通过填写协议DSL,一键生成协议文件与回调代码</p>'
            +    '</div>'
            +'</li>'
            +'<li class="fri-item in in150">'
            +    '<div class="content">'
            +        '<img src="../images/480x640.jpg" alt=""/>'
            +        '<p class="name">协议一键生成</p>'
            +        '<p class="desc">通过填写协议DSL,一键生成协议文件与回调代码</p>'
            +    '</div>'
            +'</li>')
});