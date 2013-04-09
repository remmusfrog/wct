var carouselScroll, myScroll,
	pullDownEl, pullDownOffset,
	pullUpEl, pullUpOffset,
	generatedCount = 0;

function  carouselLoaded() {
	carouselScroll = new iScroll('carousel', {
		useTransition: true,
		snap: true,
		momentum: false,
		hScrollbar: false
	 });
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', carouselLoaded, false);

function pullDownAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('activities');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			var tmpl = '<h3>WIKI</h3><img src="./temp/pic3_150x150.png" alt="avatar" class="avatar"><details open="open"><summary><span class="type">wiki</span><em>created</em><div class="info"><a href="#" class="author">Xu Yanli</a> <span class="time">16 hours ago</span></div></summary><div class="desc">Recyclable organic solar cells: a clean fuel future made possible by trees</div></details><div class="comment-num"><a href="#" class="heat'+ parseInt(Math.random()*10) +' ui-link">'+parseInt(Math.random()*99)+'</a></div>';
			li.innerHTML = tmpl;
			el.insertBefore(li, el.childNodes[0]);
		}
		$("#activities").listview("refresh");
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function pullUpAction () {
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('activities');

		for (i=0; i<3; i++) {
			li = document.createElement('li');
			var tmpl = '<h3>WIKI</h3><img src="./temp/pic3_150x150.png" alt="avatar" class="avatar"><details open="open"><summary><span class="type">wiki</span><em>created</em><div class="info"><a href="#" class="author">Xu Yanli</a> <span class="time">16 hours ago</span></div></summary><div class="desc">Recyclable organic solar cells: a clean fuel future made possible by trees</div></details><div class="comment-num"><a href="#" class="heat'+ parseInt(Math.random()*10) +' ui-link">'+ parseInt(Math.random()*99) +'</a></div>';
			li.innerHTML = tmpl;
			el.appendChild(li, el.childNodes[0]);
		}
		$("#activities").listview("refresh");
		myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}

function loaded() {
	pullDownEl = document.getElementById('pullDown');
	pullDownOffset = pullDownEl.offsetHeight;
	pullUpEl = document.getElementById('pullUp');	
	pullUpOffset = pullUpEl.offsetHeight;
	
	myScroll = new iScroll('wrapper', {
		useTransition: true,
		topOffset: pullDownOffset,
		onRefresh: function () {
			if (pullDownEl.className.match('loading')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
			} else if (pullUpEl.className.match('loading')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
			}
		},
		onScrollMove: function () {
			if (this.y > 5 && !pullDownEl.className.match('flip')) {
				pullDownEl.className = 'flip';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
				this.minScrollY = 0;
			} else if (this.y < 5 && pullDownEl.className.match('flip')) {
				pullDownEl.className = '';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				this.minScrollY = -pullDownOffset;
			} else if (this.y < (this.maxScrollY - 5) && !pullUpEl.className.match('flip')) {
				pullUpEl.className = 'flip';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
				this.maxScrollY = this.maxScrollY;
			} else if (this.y > (this.maxScrollY + 5) && pullUpEl.className.match('flip')) {
				pullUpEl.className = '';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				this.maxScrollY = pullUpOffset;
			}
		},
		onScrollEnd: function () {
			if (pullDownEl.className.match('flip')) {
				pullDownEl.className = 'loading';
				pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
				pullDownAction();	// Execute custom function (ajax call?)
			} else if (pullUpEl.className.match('flip')) {
				pullUpEl.className = 'loading';
				pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
				pullUpAction();	// Execute custom function (ajax call?)
			}
		}
	});
	
	setTimeout(function () { document.getElementById('wrapper').style.left = '0'; }, 800);
}

document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
document.addEventListener('DOMContentLoaded', function () { setTimeout(loaded, 200); }, false);

$(function(){
function toggleNav(e,that){
	// e.preventDefault();
	that.parent().addClass("on").siblings().removeClass("on");
	$("body").scrollTop(0);
	var index = that.parent().index();
	$("#nav-style").removeClass().addClass("ls"+index);
}
$("#menu li a").on("touchstart",function(e){
	toggleNav(e,$(this));
});	

});
