import './index2.less';

for(var i=0;i<5;i++){
	$('.wrapper').append(`<li class="colorred">final-${i}</li>`)
}

var lis = document.querySelectorAll('.wrapper li:nth-child(even)');
$(lis).css('color','yellow');

$.ajax({
	url:'/baiduNews',
	type:'get',
	data:{},
	dataType:'json',
	success: (res) => {
		console.log(res)
		var news = res.data.LocalNews.tophit;
		news.forEach((cur,index) => {
			$('body').append(`<li class="newlist">${cur.m_title}</li>`)
		})
	},
	error: () => {
		console.log('网络超时...')
	}
})

$.ajax({
	url:'/baiduAni',
	type:'post',
	data:{},
	dataType:'json',
	success: function(res){
		console.log(res)
		$('body').append('<br><div>界限......<hr/><br></div>').append(res.data.data)
	},
	error: function(){
		console.log('错误')
	}
})

$.getJSON('/movie',(res) => {
	console.log(res.subjects)
	var arrs = res.subjects;
	arrs.forEach((cur) => {
		$('.wrapper').append(`<div class="movie"><li class="left"><img src="${cur.cover}" width="115" height="161"><div>${cur.title}</div></li></div>`)
	})
})
