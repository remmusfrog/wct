var carouselScroll;
function  carouselLoaded() {
	carouselScroll = new iScroll('carousel', {
		useTransition: true,
		snap: true,
		momentum: false,
		hScrollbar: false
	 });
}
document.addEventListener('DOMContentLoaded', carouselLoaded, false);
function PackageIScroll(opt){
	this.opt = opt;
	this.pullDownEl 	= null;
	this.pullUpEl 		= null;
	this.pullDownOffset = null;
	this.pullUpOffset	= null;
	this.myScroll 		= null;
	this.elId           = null;
	this.sets			= null;
	this.eventName		= opt.eventName;
}
PackageIScroll.prototype.newIScroll = function(){
	this.pullDownEl 	= document.getElementById(this.opt.pullDownEl);
	this.pullUpEl 		= document.getElementById(this.opt.pullUpEl);
	this.pullDownOffset = this.pullDownEl.offsetHeight;
	this.pullUpOffset	= this.pullUpEl.offsetHeight;
	this.elId           = document.getElementById(this.opt.elId);
	var that = this;
	this.myScroll = new iScroll(
			that.elId, {
			useTransition: true,
			topOffset: that.pullDownOffset,
			onRefresh: function () {
				if (that.pullDownEl.className.match('loading')) {
					that.pullDownEl.className = '';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
				} else if (that.pullUpEl.className.match('loading')) {
					that.pullUpEl.className = '';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
				}
			},
			onScrollMove: function () {
				if (this.y > 5 && !that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = 'flip';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Release to refresh...';
					this.minScrollY = 0;
				} else if (this.y < 5 && that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = '';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Pull down to refresh...';
					this.minScrollY = -that.pullDownOffset;
				} else if (this.y < (this.maxScrollY - 5) && !that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = 'flip';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Release to refresh...';
					this.maxScrollY = this.maxScrollY;
				} else if (this.y > (this.maxScrollY + 5) && that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = '';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Pull up to load more...';
					this.maxScrollY = that.pullUpOffset;
				}
			}, 
			onScrollEnd: function () {
				if (that.pullDownEl.className.match('flip')) {
					that.pullDownEl.className = 'loading';
					that.pullDownEl.querySelector('.pullDownLabel').innerHTML = 'Loading...';				
					that.pullDownAction();	// Execute custom function (ajax call?)
				} else if (that.pullUpEl.className.match('flip')) {
					that.pullUpEl.className = 'loading';
					that.pullUpEl.querySelector('.pullUpLabel').innerHTML = 'Loading...';				
					that.pullUpAction();	// Execute custom function (ajax call?)
				}
			}
		}
	);
	setTimeout(function () { that.elId.style.left = '0'; }, 800);
}
PackageIScroll.prototype.pullDownAction = function(){
	var that = this;
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		el = document.getElementById('activities');

		// for (i=0; i<3; i++) {
		// 	li = document.createElement('li');
		// 	var tmpl = '<a href="#"><h3>WIKI</h3><img src="./temp/pic3_150x150.png" alt="avatar" class="avatar"><details open="open"><summary><span class="type">wiki</span><em>created</em><div class="info"><span href="#" class="author">Xu Yanli</span> <span class="time">16 hours ago</span></div></summary><div class="desc">Recyclable organic solar cells: a clean fuel future made possible by trees</div></details><div class="comment-num"><span  class="heat'+ parseInt(Math.random()*10) +' ui-link">'+parseInt(Math.random()*99)+'</span></div></a>';
		// 	li.innerHTML = tmpl;
		// 	el.insertBefore(li, el.childNodes[0]);
		// }

		// $("#activities").listview("refresh");
		that.myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
PackageIScroll.prototype.pullUpAction = function(){
	var that = this;
	setTimeout(function () {	// <-- Simulate network congestion, remove setTimeout from production!
		var el, li, i;
		// el = document.getElementById('activities');

		// for (i=0; i<3; i++) {
		// 	li = document.createElement('li');
		// 	var tmpl = '<a href="#"><h3>WIKI</h3><img src="./temp/pic3_150x150.png" alt="avatar" class="avatar"><details open="open"><summary><span class="type">wiki</span><em>created</em><div class="info"><span  class="author">Xu Yanli</span> <span class="time">16 hours ago</span></div></summary><div class="desc">Recyclable organic solar cells: a clean fuel future made possible by trees</div></details><div class="comment-num"><span  class="heat'+ parseInt(Math.random()*10) +' ui-link">'+ parseInt(Math.random()*99) +'</span></div></a>';
		// 	li.innerHTML = tmpl;
		// 	el.appendChild(li, el.childNodes[0]);
		// }

		// $("#activities").listview("refresh");
		that.myScroll.refresh();		// Remember to refresh when contents are loaded (ie: on ajax completion)
	}, 1000);	// <-- Simulate network congestion, remove setTimeout from production!
}
PackageIScroll.prototype.init = function(){
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
}();

var indexScroll = new PackageIScroll({ // instanceof iScroll
	pullDownEl 	: 'pullDown',
	pullUpEl 	: 'pullUp',
	elId        : 'wrapper',
	eventName	: 'DOMContentLoaded'
});
// indexScroll.init();
document.addEventListener('DOMContentLoaded', function () { setTimeout(function(){indexScroll.newIScroll();}, 200); }, false);
$(function(){
	function toggleNav(e,that){
		// e.preventDefault();
		that.parent().addClass("on").siblings().removeClass("on");
		$("body").scrollTop(0);
		var index = that.parent().index();
		$("#nav-style").removeClass().addClass("ls"+index);
	}
	$("#menu li a").on("tap",function(e){
		toggleNav(e,$(this));
	});	
	$(".page-head h1").on('tap',function(){
		indexScroll.myScroll.scrollTo(0, 10, 200);
	});
});