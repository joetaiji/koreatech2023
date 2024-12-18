const AC = "active",
    FX = "fixed"
    ALL = "all_nav",
    $wrap = $("#wrap"),
    $header = $(".header"),    
    $schLayer = $(".sch_layer"),
    $footer = $(".footer")	    


/*  페이지 스크롤 progress bar------------------------------------------------------------- */
function progressBarScroll() {   
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop,
        height = document.documentElement.scrollHeight - document.documentElement.clientHeight,
        scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
}

/*  내용생략------------------------------------------------------------------------------ */
function lineOmit(el, height){
    const $text = $(el);
    if(mobile()){
        height = height*.8;
    }
    $text.each(function(){
        if(!$(this).hasClass(AC) && $(this).height() >= height/* && $(this).text().length > size 반응형때문에 글자수 주석 */) {
            $(this).addClass("fog").css("max-height", height);
            $(this).after("<button class='text_more'><span class='sr-only'>내용 전체보기</span><i class='ri-arrow-down-s-line'></i></button>");
        }        
        $(this).next(".text_more").on("click", function(){
            $(this).toggleClass(AC).prev(".text").toggleClass(AC);
            let txt = $(this).hasClass(AC) ? " 내용 줄여보기" : " 내용 전체보기";        
            $(this).find("span").text(txt);
        })
    })
    
}


/*  mobile ------------------------------------------------------------------------------ */
function mobile() {
    return window.innerWidth < 1025 ? 1 : 0 //ipad pro 1024
}

/*  --------------------------------------------------------------------------
*   addClass와 close버튼으로 닫기                  active(this, "active")
*   toggle  
    - toggle시킬 객체가 바로 위 부모인 경우           active(this, "toggle")
    - toggle시킬 객체가 바로 위 부모가 아닌 경우       active(this, "toggle", 1, ".toggle시킬 클래스명")
    - 링크영역외 클릭을 사용하지 않으려면              active(this, "toggle", 0)  
*   accordion                                       active(this, "accordion")
----------------------------------------------------------------------------------------- */


function active(el, toggle, anyClick, target) {
    const $el = $(el)  
    const $elTarget = target ? $el.parents(target) : $el.parent()
    if (toggle == "toggle") { //토글형태
        $elTarget.toggleClass(AC)
        let txt = $elTarget.hasClass(AC) ? " 닫기" : " 열기"
        $el.attr("title", $el.text() + txt)   
    } else if (toggle == "accordion") {       
        anyClick = 0 
        $elTarget.toggleClass(AC).siblings().removeClass(AC)   
        let txt = $elTarget.hasClass(AC) ? "확장됨" : "축소됨"
        $el.attr("title", "" + txt + "").parent().siblings().children("a").attr("title", "축소됨")
    } else { //addClass
        $elTarget.addClass(AC).siblings().removeClass(AC)
        $elTarget.find(".close").on("click", function(e) {
            $elTarget.removeClass(AC)
            $el.attr("title", $el.text() + " 열기")
        })
    }
    //링크영역외 클릭
    if (anyClick) { 
        $("body").on("click", function(e) {   
            if(!$(e.target).hasClass(AC)){  
            $elTarget.removeClass(AC)
            $el.attr("title", $el.text() + " 열기")
            }
        })
    }
    event.stopPropagation()
    event.preventDefault()    
}  

/* --------------------------------------------------------------------------------------
*   클릭한 자신의 활성 비활성
----------------------------------------------------------------------------------------- */
function btnToggle(el){
    $(el).each(function(){
        let varText = !$(this).hasClass(AC) ?  " 비활성" : " 활성"		
        $(this).attr("title", $(this).text() + varText)
        .on("click", function(e){ 			
            varText = $(this).hasClass(AC) ? " 비활성" : " 활성"
            $(this).toggleClass(AC).attr("title", $(this).text() + varText) 
        })
    });
}

/* --------------------------------------------------------------------------------------
*   top 버튼               goTop(el)
----------------------------------------------------------------------------------------- */
function goTop(el) {
    const $el = $(el);
    $(window).on("load scroll", function() {        
        let scrollT = $(window).scrollTop()  
        scrollT > 0 ? $el.addClass(FX) : $el.removeClass(FX)       
        if(!mobile()){
            scrollT > $(".foot_logo").offset().top - $(window).height() ? $el.addClass("stick") : $el.removeClass("stick")
        }
    })
    $el.on("click", function() {
        $("html,body").stop().animate({scrollTop: 0}, 800)
    })
}
/* --------------------------------------------------------------------------------------
*   header 고정            fix(".header", 1) pos값이 있으면 스크롤하자마자 fix
----------------------------------------------------------------------------------------- */
function fix(el, pos) {	    
    const $el = $(el)
    const originTop = parseInt($el.offset().top) 
    $(window).on("scroll", function() {        
        let scrollT = $(window).scrollTop() 
        if(pos){
            scrollT > 0 ? $el.addClass(FX) : $el.removeClass(FX)
        }else{
            $header.hasClass(FX) ? scrollT = $(window).scrollTop() + $header.height() : scrollT = $(window).scrollTop()
            if(!$el.hasClass(FX) && scrollT > originTop){
                $el.addClass(FX)
            }else if ( scrollT <= originTop) {
                $el.removeClass(FX)
            }
        }         
    })         
}

/* --------------------------------------------------------------------------------------
*   아코디언
----------------------------------------------------------------------------------------- */

function accordion(el, firstActive){
	const $el = $(el)
	$el.attr("title", "축소됨")
	.on("click", function(e){ active(this, "accordion")});
    if(firstActive)	$el.parent().eq(0).addClass(AC).find("a").attr("title", "확장됨")
}

   
/*  ---------------------------------------------------------------------------------------
*    gnb
----------------------------------------------------------------------------------------- */
function gnb(el) {
    const   FLM = "fullmenu",            
            $gnb1 = $("#gnb1"),           
            $gnb1Depth1 = $gnb1.find(".depth-1")           

    if (el=="full") { //전체메뉴 
        $gnb1.addClass(FLM)
        $gnb1.on("mouseenter focusin", function () {
            $gnb1Depth1.add('header').addClass(AC)
        }).on("mouseleave", function () {
            $gnb1Depth1.add('header').removeClass(AC)
        })
        $gnb1Depth1.on("mouseenter focusin", function () {
            $(this).addClass("on")
        }).on("mouseleave focusout", function () {
            $(this).removeClass("on")
        })
    } else { //기본gnb
        $gnb1Depth1.on("mouseenter focusin", function() {
            $(this).add('header').addClass(AC).siblings().removeClass(AC)
        }).on("mouseleave focusout", function() {
            $(this).add('header').removeClass(AC)
        })
    }

    //3차뎁스를 갖고있는 상위요소에 클래스부여
    $(".lnb-detail").each(function() {
        $(this).closest("li").addClass("is-depth3")
    })
    //접근성 탭포커스로 메뉴영역을 벗어났을때
    $(".topmenu").find(">li>a").on("click keydown", function(e) {       
        if (e.keyCode == 9 && e.shiftKey) $header.add($gnb1Depth1).removeClass(AC)
    }).next().find("a:last").on("keydown", function(e) {
        if (e.keyCode == 9) $header.add($gnb1Depth1).removeClass(AC)
    })  
    //모바일
    $header.on("click", ".is-depth3>a", function(e) {
        if (mobile()) active(this, "toggle")
    })       
}

/*  ---------------------------------------------------------------------------------------
*    전체메뉴 
----------------------------------------------------------------------------------------- */
function gnb2() {
    $gnb2 = $("#gnb2"),
    $gnb2Depth1 = $gnb2.find(".topmenu_all>li")

    $gnb2.find(".open").on("click", function(){
        $gnb2.add('html, header').addClass(AC)
        if (mobile()) { 
            $header.addClass(ALL)
            $gnb2Depth1.eq(0).addClass(AC)
        }
    })
    $gnb2Depth1.on("click", function(e){
        e.preventDefault()
        $(this).addClass(AC).siblings().removeClass(AC)
    });    
    $gnb2.find(".close").on("click", function(e){
        $(this).parent().removeClass(AC)
        $header.add('html').removeClass(AC)
        if (mobile()) { 
            $header.removeClass(ALL) 
            $gnb2Depth1.removeClass(AC)
        }
        e.preventDefault()
    }) 
    //3차뎁스를 갖고있는 상위요소에 클래스부여
    $(".lnb-detail").each(function() {
        $(this).closest("li").addClass("is-depth3")
    })
}

/*  -------------------------------------------------------------------------------------
*    리스트 열기만				listOpen(".sns .sns_btn") 
*    리스트 열고 닫기			listOpen(".sns .sns_btn", "close_btn") 
----------------------------------------------------------------------------------------- */
function listOpen(el, close){
	const $el = $(el),
          $close = $(close)
    let varText
    
	$el.on("click", function(e){ 
        active(this, "toggle", 0)
        $(this).parent().hasClass(AC) ? varText = " 목록 : 열림" : varText = " 목록 : 닫힘"
        $(this).attr("title", $(this).text() + varText)
    })
    $close.on("click", function(e){
        e.preventDefault();
        $el.trigger("click");
    });

}

/*  -------------------------------------------------------------------------------------
*    tab메뉴에 콘텐츠가 포함된 경우         tabs(this)
*    tab메뉴와 콘텐츠가 분리된 경우         tabs(this, "탭콘텐츠")
----------------------------------------------------------------------------------------- */
function tabs(el, cont) {
	
	/* const $anchorTab = $(".anchor_tab")
	
	$(el).on("click", function(){ 
		//탭메뉴 모바일일때	
		if (mobile() && $(this).parent().hasClass("active")) { 
			active(this, "toggle", 1, ".tabs")
		}
		//페이지내에서 anchor로 이동하는 경우
		if($(this).parents(".tabs").hasClass("anchor_tab")){
			let headH = $header.hasClass("fixed") ? $header.height() : 0 //달라붙는 header가 있을경우
			let tabH = $anchorTab.hasClass("fixed") ? $anchorTab.height() : 0 //달라붙는 tab메뉴가 있을경우
			$("html,body").stop().animate({scrollTop: ($("#"+$(this).data('id')).offset().top - headH - tabH - 46)}, 500) //	46은 .title_h2 margin-top값			
		}
	}).attr("title", "비활성 탭메뉴").parent(".active").children("button, a").attr("title", "선택된 탭메뉴") */
	
	
	if(cont) {    
        $(cont).eq(0).addClass(AC)    
        $(el).on("click", function(e){ 	            
            $(this).attr("title", "선택된 탭메뉴").parent().addClass(AC)
            .siblings().removeClass(AC).find("button, a").attr("title", "비활성 탭메뉴")            
            $("#"+$(this).data('id')).addClass(AC).siblings().removeClass(AC)            
            e.preventDefault()
        }).attr("title", "비활성 탭메뉴").parent(".active").children("button, a").attr("title", "선택된 탭메뉴")
       
	}
    
	
}

/*  ---------------------------------------------------------------------------------------
*   스크롤에 따라 콘텐츠 활성화                            scrollAC(".main .section")
*   스크롤에 따라 콘텐츠 활성화, 콘텐츠 메뉴 활성화    		scrollAC(".tab_cont", ".depth4.scroll")
----------------------------------------------------------------------------------------- */
function scrollAC(cont, contNav) {
    const $cont = $(cont), 
		$contNav = $(contNav)
    let contNavTop, contTop, headH, contNavH, scrollT

    if($cont.length){    
        if (contNav) contNavTop = $contNav.offset().top //탭메뉴 top 
        $(window).on("load scroll", function() {
            headH = $header.height()
            contNavH = $contNav.outerHeight(true)
            //scrollTop
            $header.hasClass(FX) ? scrollT = $(window).scrollTop() + headH : scrollT = $(window).scrollTop()
            //탭메뉴 fixed
			if(!mobile()){
           		contNavTop < scrollT ? $contNav.addClass(FX) : $contNav.removeClass(FX)
			}

            //콘텐츠 및 탭메뉴 Active
            $cont.each(function (i) {
                contTop = $(this)[0].getBoundingClientRect().top +  $(window).height()/2
                //콘텐츠 Active
                if (contTop < $(window).height()) $(this).addClass(AC).siblings().removeClass(AC)
				
                //탭메뉴 Active
                $header.hasClass(FX) ? docT = headH + contNavH : docT = contNavH
                if (contTop <= docT + 10) {
                    $contNav.find("li").eq(i).children().attr('title', '선택된 탭메뉴').parent().addClass(AC)
                    .siblings().children().attr('title', '비활성 탭메뉴').parent().removeClass(AC)
                }
            })         
			
        })
    }
}

/*  -------------------------------------------------------------------------------------
*   왼쪽메뉴 달라붙게                         snb()
	왼쪽메뉴 모바일에서 변형된 형태			  snb(1)
----------------------------------------------------------------------------------------- */
function snb(mob){
    const $subNav = $(".snb");
	$(window).scroll(function() {
		//if($("#content").height() > $subNav.height()){
			let scrollT = Math.floor($(this).scrollTop()),
				gnbHeight = $(".header").height(), //header fixed되면서 전체콘텐츠높이에서 gnb높이값을 빼줘야 함.
				contStart = $("#contents").offset().top - gnbHeight,
				contEnd =  $("#wrap").outerHeight(true)-($(".footer").outerHeight(true) + $subNav.height() + gnbHeight)
			if (contEnd > scrollT ) {
				if(scrollT > contStart){
					if (!mobile()) $subNav.addClass("stick"); //.css({"top":$(".gnb_area").height()} + 10);
					//if (mobile()) $subNav.addClass("stick").css({"top":gnbHeight})
				}else{
					$subNav.removeClass("stick").removeAttr("style")
				}
               
			}else{
				$subNav.css({"top" : contEnd - scrollT})
                console.log(contEnd, scrollT)
			}
		//}		
	})
	// 왼쪽서브메뉴가 모바일로 변경되는 형태    
	if(mob){
		$subNav.find(".depth2>li.active>a").on("click", function(){
			if (mobile()) active(this, "toggle", 1, ".depth2")
		}) 
		$subNav.find(".depth3>li.active>a").on("click", function(){
			if (mobile()) active(this, "toggle", 1, ".depth3")
		})	
	}
}

/*  -------------------------------------------------------------------------------------
*   팝업 또는 레이어 열고 닫기				 layerPopup("버튼")
----------------------------------------------------------------------------------------- */
function layerPopup(el){
	let $clickSpot, $openLayer		
		
	$("body").on("click", el, function (e) {	
		$clickSpot = $(this)
        $openLayer = $("#" + $(this).data('id'))
        $modalPop = $openLayer.find(".modal-popup")
        $openLayer.attr("tabindex", 0).fadeIn(300).focus().addClass("opened-layer")
		e.preventDefault()
        if(Math.ceil($modalPop.height()) % 2 != 0){
            $modalPop.css("height",""+ (Math.ceil($modalPop.height()-1)) +"px");
        } 
		//$("html").addClass("noscroll");
    })	
	$("body").on("click",".opened-layer .layer-close", function (e) {		
        $(this).closest(".opened-layer").removeAttr("tabindex").fadeOut(100).removeClass("opened-layer")
		$clickSpot.focus()
		e.preventDefault()
		//$("html").removeClass("noscroll");  
    })
}

/*  -------------------------------------------------------------------------------------
* 첨부파일
----------------------------------------------------------------------------------------- */
function fileLoad(fileBox) {
    let $fileBox = $(fileBox);
    $.each($fileBox, function(idx){
        var $this = $fileBox.eq(idx),
            $btnUpload = $this.find('[type="file"]'),
            $label = $this.find('.file-label');
        
        $btnUpload.on('change', function() {
            var $target = $(this),
                fileName = $target.val(),
                $fileText = $target.siblings('.file-name');
            $fileText.val(fileName);
        })        
        $btnUpload.on('focusin focusout', function(e) {
            e.type == 'focusin' ?
            $label.addClass('file-focus') : $label.removeClass('file-focus');
        })    
    })
}	

/*  -------------------------------------------------------------------------------------
* 팝업 - 하루동안 열지 않기
----------------------------------------------------------------------------------------- */

//get 쿠키
function getCookie(name)
{
    var nameOfCookie = name + "=";
    var x = 0;
    while ( x <= document.cookie.length )
    {
        var y = ( x + nameOfCookie.length );
        if ( document.cookie.substring(x,y) == nameOfCookie )
        {
            if( (endOfCookie = document.cookie.indexOf(";", y)) == -1 )
                endOfCookie = document.cookie.length;
            return unescape(document.cookie.substring(y, endOfCookie)); 
        }
        x = document.cookie.indexOf( " ", x ) + 1;
        if ( x == 0 )
            break;
    }
    return "";		
}

// 레이어 팝업 열기
function openLayer(arg)
{
    var pop = document.getElementById(arg);
    pop.style.display = "block";
}
// 레이어 팝업 닫기
function closeLayer(arg)
{
    var pop = document.getElementById(arg);
    pop.style.display = "none";
}
// set 쿠키
function setCookie( name, value, expiredays ){	
    var todayDate = new Date() ;  
    todayDate.setDate(todayDate.getDate() + expiredays) ;
    document.cookie = name + "=" + escape( value ) + "; path=/" + "; expires=" + todayDate.toGMTString() + ";";		
}
function check_close(id, arg){	
    if (document.getElementById(id).checked) {
        setCookie(arg, "done", 7);
    }else{
        setCookie(arg, "f", 7);
    }
}

$(function(){
	//내용 많은 테이블
	$(".responsive").each(function(){
		$(this).before("<p class='horizontal_scroll mobile'><span class='txt'>좌, 우로 이동하여 더 많은 내용을 볼수 있습니다.</span></p>");
	})  

	// web accessibility
	$("[class*='ri-'], .icon").attr("aria-hidden", "true")
	$("a[target='_blank']").attr("title", "새창으로 열림")

	$('table').each(function(){
		//var tableTitle = $(this).prev().text();
		var thArrayStr = "";
		$(this).find('th').each(function(i){
			thArrayStr += ", " + $(this).text();
		});
		$(this).find("caption").html( thArrayStr.substring(2) + '에 관한 정보를 나타낸 표입니다.' );
		/* $(this).find("table caption").html('<strong>' + tableTitle + '</strong>' + '<span>' + thArrayStr.substring(2) + '에 관한 정보' + '</span>' ); */
	});

    //모바일 원본이미지 스크롤    
    $('img.view').each(function(){
        $(this).wrap("<div class='scroll_wrap'></div>");
    })

    /*모바일에서 원본이미지를 레이어로 띄우는 방식    
    $("img.view").each(function(){
		$(this).before("<p class='view_txt mobile'><i class='xi-image-o'></i><span class='txt'>이미지를 클릭하면 원본이미지를 보실 수 있습니다.</span></p>");
	}) 
    $('img.view').on("click", function(){  
        if( mobile() && !$(this).hasClass(AC)){
            $(this).addClass(AC).wrap("<div class='view_dimm'></div>");
            $('.view_dimm').append("<button type='button' class='view_close'><i class='xi-close'></i><span class='sr-only'>이미지 크게보기 레이어 닫기</span></button>");
        }       
    })
    $("body").on("click", ".view_close", function(){
        $(this).siblings(".view").removeClass(AC).unwrap()
        $(this).remove()
    })
    */

})



/*  페이지내 이동 ------------------------------------------------------------------------------ */
/* function anchor(el, headFixed, tabFixed) {
	$(el).on("click", function(e) {    		  
		const headH = headFixed ? $header.height() : 0//달라붙는 header가 있을경우
		const tabH = tabFixed ? $anchorTab.height() : 0//달라붙는 tab메뉴가 있을경우		
		$("html,body").stop().animate({scrollTop: ($(this.hash).offset().top - headH - tabH)}, 500)
		e.preventDefault()
    })
} */
/* 
// 탭갯수를 구해 클래스 부여(반응형)
function tabNum(el){
	$(el).each(function () {
		$(this).parent().addClass("num" + tabLi.length + "")
	})
}*/

/* 
function clickAC(el){
    $(el).on("click", function() {
		$(this).addClass(AC).siblings().removeClass(AC)
	});
    
} */

/* function emptyWidth(){
	$("strong.title").each(function(){
	  var titleWidth = $(this).width();
	  $(this).siblings(".empty").css("width", titleWidth);
	});
  }
$(window).load(function(){
	   var snbActive = $(".snb>li.active");
	   snbActive.prev().addClass("prev");
	   snbActive.next().addClass("next");
	   if($(".snb .depth3 li.active").offset() != undefined){
		   var snbDepthActive = $(".snb .depth3 li.active").offset().left;
		   $(".snb .depth3").scrollLeft(snbDepthActive);
	   }
  
	emptyWidth(); 
}); */



