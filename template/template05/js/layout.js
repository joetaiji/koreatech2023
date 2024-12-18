/*-------------------------------------------------
title       : 레이아웃
Author      : JYC
Create date : 2023-11-29
-------------------------------------------------*/

$(function () {

    //모바일에서 sns 열고 닫기
    const snsOpen = ".sns_open",
          snsClose = ".sns_close",
          $snsOpen = $(snsOpen)

    listOpen(snsOpen, snsClose); 

    $snsOpen.on("click", function() {	
        if(mobile()) { //모바일에서
            if($("#header").hasClass(AC)) { //퀵서비스 펼쳐져있을때 
                $quickOpen.trigger("click"); //sns버튼을 누를경우 html/header active 제거
            }
            $("html").toggleClass(FX)
        }
    });    
    

    gnb("full"); //gnb메뉴

    sitemap(); //전체메뉴
});
