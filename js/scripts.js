document.addEventListener('DOMContentLoaded', () => {

	new WOW().init({
		mobile: false,
		offset: 200,
		duration: 1000
	});

	window.addEventListener('scroll', () => {
		let header = document.querySelector('.header');

		if (!!header) {
			window.scrollY > 0
				? header.classList.add('sticky')
				: header.classList.remove('sticky');
		};
	});


	// Tabs
	if ($(window).width() < 768) {
		$("[data-tab]").click(function(e){
			e.preventDefault();
			var dest = $( $(this).data('tab') );
			dest.stop().fadeIn(300).siblings().hide(0);
			$(this).addClass('current').siblings().removeClass('current');
		});

		$("[data-tab]:first-child").trigger('click');
		$("[data-tab].preselected").trigger('click');
	}

	// Panel
	let scrollPosition = 0;
	let isVisible = false;
	$('.menu-opener').click(function(e){
		e.preventDefault();

		if (!isVisible) {
			$('body').addClass('overflow');
			scrollPosition = window.scrollY;
			isVisible = true;
		} else{
			$('body').removeClass('overflow');
			$('body').scrollTop(scrollPosition);
			isVisible = false;
		}

		$(this).toggleClass('active');
		$('.header').toggleClass('menu-active');
		$('.panel-nav').toggleClass('visible');
	});

	function setPhoneScale(){
		if ($(window).width() <= 575) {
			let phone = $('.section-video-phone-wrapper');
			let scaleParam = $(window).width() * 56.0764 / phone.width();

			phone.css({ 'transform': `scale(${scaleParam / 100})` });
		}
	}

	$(window).resize(function(e){
		setPhoneScale();
	});
	setPhoneScale();

	// parallax scroll effect
	// addParallaxBg('.first-screen-section .branding-image', 0.5);

	// parallax.js
	// if (document.body.clientWidth >= 992) {
	// 	// Parallax
	// 	document.querySelectorAll('[id*="parallax-viewport"]').forEach(item => {
	// 		let scene = document.getElementById( item.getAttribute('id') );
	// 		let parallaxInstance = new Parallax(scene);
	// 	})
	// }

	// jcf.setOptions('Range', {
	// 	dragHandleCenter: false
	// });

	let pricing = {
		0: {
			count: '500',
			price: '10$'
		},
		1: {
			count: '1 000',
			price: '15$'
		},
		2: {
			count: '2 500',
			price: '25$'
		},
		3: {
			count: '5 000',
			price: '45$'
		},
		4: {
			count: '10 000',
			price: '65$'
		},
		5: {
			count: '15 000',
			price: '95$'
		},
		6: {
			count: '20 000',
			price: '125$'
		},
		7: {
			count: '25 000',
			price: '145$'
		},
		8: {
			count: '500',
			price: '10$'
		}
	}

	$('.pricing-range-field').on('change input', function(e){
		let id = +$(this).val();

		$('.pricing-popover').removeClass('on-1 on-2 on-3 on-4 on-5 on-6 on-7 on-8 on-9')
		.addClass('on-'+(id+1));

		$('.js-pricing-price').text(pricing[id].price);
		$('.js-pricing-count').text(pricing[id].count);
	});

	$('.js-pricing-price').text(pricing[0].price);
	$('.js-pricing-count').text(pricing[0].count);


	jcf.replace( $('.pricing-range-field') );

	$('.program-card .card-opener').click(function(e){
		e.preventDefault();

		$(this).closest('.program-card').addClass('opened').find('.card-hidden-content').slideDown(300);
		$(this).slideUp(300);
	});

	// Accordions
	$('.accordion .ac-header, .accordion .opener').click(function(e){
		e.preventDefault();
		e.stopPropagation();

		$(this).closest('.accordion').toggleClass('opened')
				.find('.ac-content').stop().slideToggle(300);
	});

	// Scroll to anchor
	$(document).on('click', 'a[href^="#"]', function (event) {
		event.preventDefault();

		$('html, body').animate({
			scrollTop: $($.attr(this, 'href')).offset().top-60
		}, 500);
	});
});

function getCoords(elem) {
	var box = elem.getBoundingClientRect();

	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};

}

function addParallaxBg(selector, direction = 1){
	if (!!selector) {
		window.addEventListener('scroll', () => {
			let els = document.querySelectorAll(selector);
			let scrollY = window.scrollY;

			els.forEach(el => {
				let elOffsetTop = getCoords(el).top;

				if (elOffsetTop < scrollY) {
					let difference = scrollY - elOffsetTop;
					var half = (difference / 2) * direction + 'px',
					transform = `translate3d(0, ${half}, 0)`;

					el.style.transform = transform;
				} 
				else {
					el.style.transform = 'translate3d(0,0,0)';
				}
			});
		});
	}
}


// Animate On Scroll (js-aos)
function setItemPosition(item, direction, shift){
	if (direction === 'vertical') {
		item.css({ 'transform': `translateY(${shift}px)` });
	} else if(direction === 'horizontal'){
		item.css({ 'transform': `translateX(${shift}px)` });
	}
}

if ($(window).width() >= 768) {
	$(window).scroll(function(){
		var scrollPosition = window.scrollY;
		var screenCenter = scrollPosition + document.documentElement.clientHeight / 2;

		$('.js-aos').each(function(){
			var isDisposable = $(this).data('disposable') && $(this).hasClass('animated');
			var moveDirection = !!$(this).data('direction') ? $(this).data('direction') : 'vertical';
			var moveSpeed = !!$(this).data('speed') ? $(this).data('speed') * 1 : 0.33;

			if ( !isDisposable ) {
				var elemPos = getCoords(this);

				var offset = $(this).data('offset') * 1;

				if (!offset) {
					offset = -150;
				}

				var scrollDiff = elemPos.top - (screenCenter + offset);
				var moveShift = scrollDiff * moveSpeed;

				if ($(this).data('fix') == true) {
					if (
						(moveShift > 0 && moveSpeed < 0) 
						||
						(moveShift < 0 && moveSpeed > 0)
					) {
						moveShift = 0;
					}
				}

				if(scrollDiff <= 0){
					$(this).addClass('animated');
				}

				setItemPosition($(this), moveDirection, moveShift);
			} else{
				setItemPosition($(this), moveDirection, 0);
			}
		});
	});
}

// Object Fit Polyfill
/*! npm.im/object-fit-images 3.2.4 */
var objectFitImages=function(){"use strict";function t(t,e){return"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='"+t+"' height='"+e+"'%3E%3C/svg%3E"}function e(t){if(t.srcset&&!p&&window.picturefill){var e=window.picturefill._;t[e.ns]&&t[e.ns].evaled||e.fillImg(t,{reselect:!0}),t[e.ns].curSrc||(t[e.ns].supported=!1,e.fillImg(t,{reselect:!0})),t.currentSrc=t[e.ns].curSrc||t.src}}function i(t){for(var e,i=getComputedStyle(t).fontFamily,r={};null!==(e=u.exec(i));)r[e[1]]=e[2];return r}function r(e,i,r){var n=t(i||1,r||0);b.call(e,"src")!==n&&h.call(e,"src",n)}function n(t,e){t.naturalWidth?e(t):setTimeout(n,100,t,e)}function c(t){var c=i(t),o=t[l];if(c["object-fit"]=c["object-fit"]||"fill",!o.img){if("fill"===c["object-fit"])return;if(!o.skipTest&&f&&!c["object-position"])return}if(!o.img){o.img=new Image(t.width,t.height),o.img.srcset=b.call(t,"data-ofi-srcset")||t.srcset,o.img.src=b.call(t,"data-ofi-src")||t.src,h.call(t,"data-ofi-src",t.src),t.srcset&&h.call(t,"data-ofi-srcset",t.srcset),r(t,t.naturalWidth||t.width,t.naturalHeight||t.height),t.srcset&&(t.srcset="");try{s(t)}catch(t){window.console&&console.warn("https://bit.ly/ofi-old-browser")}}e(o.img),t.style.backgroundImage='url("'+(o.img.currentSrc||o.img.src).replace(/"/g,'\\"')+'")',t.style.backgroundPosition=c["object-position"]||"center",t.style.backgroundRepeat="no-repeat",t.style.backgroundOrigin="content-box",/scale-down/.test(c["object-fit"])?n(o.img,function(){o.img.naturalWidth>t.width||o.img.naturalHeight>t.height?t.style.backgroundSize="contain":t.style.backgroundSize="auto"}):t.style.backgroundSize=c["object-fit"].replace("none","auto").replace("fill","100% 100%"),n(o.img,function(e){r(t,e.naturalWidth,e.naturalHeight)})}function s(t){var e={get:function(e){return t[l].img[e?e:"src"]},set:function(e,i){return t[l].img[i?i:"src"]=e,h.call(t,"data-ofi-"+i,e),c(t),e}};Object.defineProperty(t,"src",e),Object.defineProperty(t,"currentSrc",{get:function(){return e.get("currentSrc")}}),Object.defineProperty(t,"srcset",{get:function(){return e.get("srcset")},set:function(t){return e.set(t,"srcset")}})}function o(){function t(t,e){return t[l]&&t[l].img&&("src"===e||"srcset"===e)?t[l].img:t}d||(HTMLImageElement.prototype.getAttribute=function(e){return b.call(t(this,e),e)},HTMLImageElement.prototype.setAttribute=function(e,i){return h.call(t(this,e),e,String(i))})}function a(t,e){var i=!y&&!t;if(e=e||{},t=t||"img",d&&!e.skipTest||!m)return!1;"img"===t?t=document.getElementsByTagName("img"):"string"==typeof t?t=document.querySelectorAll(t):"length"in t||(t=[t]);for(var r=0;r<t.length;r++)t[r][l]=t[r][l]||{skipTest:e.skipTest},c(t[r]);i&&(document.body.addEventListener("load",function(t){"IMG"===t.target.tagName&&a(t.target,{skipTest:e.skipTest})},!0),y=!0,t="img"),e.watchMQ&&window.addEventListener("resize",a.bind(null,t,{skipTest:e.skipTest}))}var l="bfred-it:object-fit-images",u=/(object-fit|object-position)\s*:\s*([-.\w\s%]+)/g,g="undefined"==typeof Image?{style:{"object-position":1}}:new Image,f="object-fit"in g.style,d="object-position"in g.style,m="background-size"in g.style,p="string"==typeof g.currentSrc,b=g.getAttribute,h=g.setAttribute,y=!1;return a.supportsObjectFit=f,a.supportsObjectPosition=d,o(),a}();

objectFitImages('.object-fit-cover');
objectFitImages('.first-screen-section video');


// SVG use polyfill
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return a.svg4everybody=b()}):"object"==typeof module&&module.exports?module.exports=b():a.svg4everybody=b()}(this,function(){function a(a,b,c){if(c){var d=document.createDocumentFragment(),e=!b.hasAttribute("viewBox")&&c.getAttribute("viewBox");e&&b.setAttribute("viewBox",e);for(var f=c.cloneNode(!0);f.childNodes.length;)d.appendChild(f.firstChild);a.appendChild(d)}}function b(b){b.onreadystatechange=function(){if(4===b.readyState){var c=b._cachedDocument;c||(c=b._cachedDocument=document.implementation.createHTMLDocument(""),c.body.innerHTML=b.responseText,b._cachedTarget={}),b._embeds.splice(0).map(function(d){var e=b._cachedTarget[d.id];e||(e=b._cachedTarget[d.id]=c.getElementById(d.id)),a(d.parent,d.svg,e)})}},b.onreadystatechange()}function c(c){function e(){for(var c=0;c<o.length;){var h=o[c],i=h.parentNode,j=d(i),k=h.getAttribute("xlink:href")||h.getAttribute("href");if(!k&&g.attributeName&&(k=h.getAttribute(g.attributeName)),j&&k){if(f)if(!g.validate||g.validate(k,j,h)){i.removeChild(h);var l=k.split("#"),q=l.shift(),r=l.join("#");if(q.length){var s=m[q];s||(s=m[q]=new XMLHttpRequest,s.open("GET",q),s.send(),s._embeds=[]),s._embeds.push({parent:i,svg:j,id:r}),b(s)}else a(i,j,document.getElementById(r))}else++c,++p}else++c}(!o.length||o.length-p>0)&&n(e,67)}var f,g=Object(c),h=/\bTrident\/[567]\b|\bMSIE (?:9|10)\.0\b/,i=/\bAppleWebKit\/(\d+)\b/,j=/\bEdge\/12\.(\d+)\b/,k=/\bEdge\/.(\d+)\b/,l=window.top!==window.self;f="polyfill"in g?g.polyfill:h.test(navigator.userAgent)||(navigator.userAgent.match(j)||[])[1]<10547||(navigator.userAgent.match(i)||[])[1]<537||k.test(navigator.userAgent)&&l;var m={},n=window.requestAnimationFrame||setTimeout,o=document.getElementsByTagName("use"),p=0;f&&e()}function d(a){for(var b=a;"svg"!==b.nodeName.toLowerCase()&&(b=b.parentNode););return b}return c});


svg4everybody();