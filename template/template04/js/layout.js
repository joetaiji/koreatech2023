/*-------------------------------------------------
title       : 레이아웃
Author      : JYC
Create date : 2023-11-29
-------------------------------------------------*/

$(function () {

    //모바일에서 sns 열기
    const snsOpen = ".sns_open",
          snsClose = ".sns_close",
          $snsOpen = $(snsOpen)

    listOpen(snsOpen, snsClose);

    $snsOpen.on("click", function(){ $("#header").add("html").toggleClass(AC); });
    
    $("#gnb2 .open, #gnb2 .close").on("click", function(){ $snsOpen.trigger("click"); });
    

    gnb("full"); //gnb메뉴

    sitemap(); //전체메뉴
    
});
