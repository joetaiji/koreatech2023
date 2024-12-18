/*-------------------------------------------------
title       : 레이아웃
Author      : JYC
Create date : 2023-11-29
-------------------------------------------------*/

// 비주얼
var visual = new Swiper(".visual .img", 
{
		autoplay                : 
		{
				delay               : 5000,
				disableOnInteraction: false,
		},
		wrapperClass            : "list",
		slideClass              : "item",
		effect                  : "fade",
		loop                    : true,
		loopAdditionalSlides    : 1,            // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정
		navigation              : 
		{
				nextEl              : ".visual .next",
				prevEl              : ".visual .prev",
		},
		pagination              : 
		{
				el                  : ".visual .pager",
				clickable: true,
				renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
				//type                : "fraction",
		},
		/* on: 
		{			
				slideChange: function () 
				{
						$('.visual .pager').removeClass('active');
						setTimeout(function() { $('.visual .pager').addClass('active'); }, 1);
				},
				
		} */
});
// 비주얼 재생 정지
$('.visual').find('.play, .stop').on('click', function () {
	$(this).removeClass('active');
	$(this).siblings('.play, .stop').addClass('active');

	if ($(this).hasClass('stop') == true) {			
			visual.autoplay.stop();	
			$('.visual .pager').removeClass('active');
	} else {				
			visual.autoplay.start();
			$('.visual .pager').addClass('active');
	}
	return false;
});
if($('.visual .pager span').length == 1){ $(".control").hide(); }


//공지사항 탭
tabs(".notice .tab_nav button", ".notice .tab_cont")

/* 우측 퀵서비스 관련 */
const quickOpen = ".quick_open",
			quickClose = ".quick_close",
			$quickOpen = $(quickOpen);

listOpen(quickOpen, quickClose); //우측 퀵서비스 바로가기

tabs(".departs_tabs .tab_nav button", ".departs_tabs .tab_cont") //우측 퀵서비스 바로가기 펼쳐졌을때 대학/대학원 탭

$(window).on("load scroll", function() { 
	if(mobile()){ 
		$(window).scrollTop() > 0 ? $quickOpen.addClass(FX) : $quickOpen.removeClass(FX)  //모바일에서 스크롤시 퀵서비스 오픈 버튼 고정
	}
});

$quickOpen.on("click", function() {	
	if(mobile()) $("#header").add("html").toggleClass(AC) //모바일에서 퀵서비스 오픈 버튼클릭시 html과 header active
});


$(".next_sec_btn").on("click", function(e) {
	$("html,body").stop().animate({scrollTop: $(".service_news").offset().top }, 300)
	e.preventDefault();
})

const webzine = new Swiper(".calendar .swiper",  {
	slidesPerView: 2,	
	spaceBetween: 10,
	scrollbar: {
		el: ".swiper-scrollbar",
		dragSize: "100%"
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		type: 'bullets'
	},
	breakpoints: {
		1024: {
			slidesPerView: 4,			
			spaceBetween: 30
		}		
	}
});