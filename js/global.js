

// 화면 확대 축소
var zoomRate = 10;
var curRate = 100;
var minRate = 100;
var maxRate = 200;

function zoomInOut(value) {
	if (((value == "plus")&&(curRate >= maxRate))||((value == "minus") && (curRate <= minRate))) {
	    return;
	} 
	if (value == "plus") {
		curRate = parseInt(curRate) + parseInt(zoomRate);
	} else if (value == "minus") {
		curRate = parseInt(curRate) - parseInt(zoomRate);
	} else {
		curRate = 100;
	}
	document.body.style.zoom = curRate + '%';	
	try
	{
		var obj = document.getElementById('flash_visual').getElementsByTagName('object')[0];

		if (curRate==100)
		{
			obj.style.display	= 'block';
		}
		else
		{
			obj.style.display	= 'none';
		}
	}
	catch (e)
	{ console.log(""); 
	}
}

// 프린트
function printAreaAction(){
	//window.onbeforeprint = beforePrint;
	//window.onafterprint  = afterPrint;
	window.print();
}
// 프린트할 내용
var initBody;
function beforePrint(){
//	initBody = document.body.innerHTML;
	document.body.innerHTML = contents.innerHTML;
	
}
function afterPrint(){
//	document.body.innerHTML = initBody;
	window.location.reload();
}


// 즐겨찾기
function bookmarkSite(title, url){
	try{
		window.external.AddFavorite(url, title);
	}catch (e) {
		alert("Ctrl+D 키를 눌러서 북마크를 추가할 수 있습니다.");
	}
}

//서브메뉴 보기
var sMenu_launch = "";
function detailSubMenu(name)
{
	try{
		submenu = document.getElementById(name).style;
		if(sMenu_launch != submenu)
		{
			if(sMenu_launch != "")
			{
				sMenu_launch.display = "none";
			}
			submenu.display = "block";
			sMenu_launch = submenu;
			$(".question > a").addClass('open');
			$(".question > a").removeClass('close');
		}
		else
		{
			submenu.display = "none";
			$(".question > a").addClass('close');
			$(".question > a").removeClass('open');
			sMenu_launch = "";
		}
	}catch (e) { console.log(""); }
}

// 팝업창 openWin(파일경로, 타겟, 넓이, 높이, 스크롤바여부, );
function openWin (url, target, width, height, scrollbars, pos, resize)
{   
	var uri		= url.replace(/(&amp;)/gi, "&");
	var xy_pos	= "";
	
	if (pos)
	{
		xy_pos  = ",left=" + (Math.round(screen.width/2) - Math.round(width/2));
		xy_pos += ",top="  + (Math.round(screen.height/3) - Math.round(height/3));
	}

	var remote	= window.open(uri, target, "width=" + width
				+ ",height=" + height 
				+ ",scrollbars=" + scrollbars 
				+ ",resizable=" + resize
				+ xy_pos
				+ ",toolbar=no,location=no"
				+ ",directories=no,menubar=no,status=yes");
	
	remote.focus();
	return remote;
}


/* Initialize Top Menu */
function initTopMenu(select1, select2)
{
	var focus	= false;
	var root	= document.getElementById('head_menu');
	var delay	= 3000;
	var menu	= new Array();
	var item	= new Array();

	var src2menu	= new Array();
	var src2item	= new Array();

	var getSrc	= function (src)
	{
		var file	= src.split('/');
		var name	= file[(file.length-1)].split('.');
			name	= src.replace(file[(file.length-1)], name[0] + '_on.' + name[1]);

		return {on:name, off:src};
	};

	for (var i=0; i<root.childNodes.length; i++)
	{
		if (root.childNodes[i].nodeName!='LI') { continue; }

		for (var j=0; j<root.childNodes[i].childNodes.length; j++)
		{
			if (root.childNodes[i].childNodes[j].nodeType!=1) { continue; }
			if (root.childNodes[i].childNodes[j].nodeName=='A')
			{
				menu.push(root.childNodes[i].childNodes[j]);
				src2menu.push(getSrc(root.childNodes[i].childNodes[j].getElementsByTagName('img')[0].src));

				var sub_menu	= root.childNodes[i].getElementsByTagName('ul')[0];
				var src_item	= new Array();

				if (sub_menu)
				{
					sub_menu.style.display	= 'block';
					var offset	= 0;

					for (var k in sub_menu.childNodes)
					{
						if (sub_menu.childNodes[k].nodeName=='LI')
						{
							offset	+= 	parseInt(sub_menu.childNodes[k].offsetWidth, 10);
							src_item.push(getSrc(sub_menu.childNodes[k].getElementsByTagName('img')[0].src));
						}
					}
					
					sub_menu.style.width	= offset + "px";
					sub_menu.style.display	= "none";

					for (var l in sub_menu.childNodes)
					{
						if (typeof(sub_menu.childNodes[l])=='object' && sub_menu.childNodes[l].nodeType==3 && sub_menu.childNodes[l].nodeName=='#text')
						{
							sub_menu.removeChild(sub_menu.childNodes[l]);
						}
					}

					item.push(sub_menu);
				}
				else
				{
					item.push('');
				}

				src2item.push(src_item);
			}
		}
	}				

	var getIndex	= function (obj, self)
	{
		for (var i in obj) { if (obj[i]==self) { return i; } }
	}
	
	for (var i in menu)
	{
		menu[i].onfocus	= menu[i].onmouseover = function ()
		{
			root.className	= 'head-menu';
			focus	= true;

			var index	= getIndex(menu, this);
			this.getElementsByTagName('img')[0].setAttribute('src', src2menu[index].on);
			this.className	= 'on';

			for (var i in item)
			{
				if (item[i].nodeName!='UL') { continue; }

				if (i==index)
				{
					root.className	= 'head-menu-on';
					item[i].style.display	= 'block';
				}
				else
				{
					item[i].style.display	= 'none';
				}
			}
		};
	}

	for (var i in item)
	{
		if (item[i].nodeName!='UL') { continue; }

		var item_a	= item[i].getElementsByTagName('a');

		for (var j in item_a)
		{
			item_a[j].i	= i;

			item_a[j].onmouseover	= item_a[j].onfocus	= function ()
			{
				root.className	= 'head-menu-on';
				focus	= true;


				var j	= this.i;

				if (item[j].nodeName=='UL')
				{
					for (var k in item[j].childNodes)
					{
						if (!item[j].childNodes[k]) { continue; }
						if (item[j].childNodes[k].nodeName!='LI') { continue; }
						
						if (item[j].childNodes[k]==this.parentNode)
						{
							menu[j].getElementsByTagName('img')[0].setAttribute('src', src2menu[j].on);
							menu[j].className	= 'on';
							item[j].childNodes[k].getElementsByTagName('img')[0].setAttribute('src', src2item[j][k].on);
						}
						else
						{
							item[j].childNodes[k].getElementsByTagName('img')[0].setAttribute('src', src2item[j][k].off);
						}
					}
				}
			};
		}
	}


	// selected
	var selected	= function ()
	{
		var s1	= parseInt((select1-1), 10);
		var s2	= parseInt((select2-1), 10);

		for (var i in menu)
		{
			if (i==s1)
			{
				root.className	= 'head-menu-on';
				menu[i].getElementsByTagName('img')[0].setAttribute('src', src2menu[i].on);
				menu[i].className	= 'on';
				
				focus	= true;

				if (item[i])
				{
					item[i].style.display	= 'block';

					for (var j in item[i].childNodes)
					{
						if (!item[i].childNodes[j]) { continue; }
						if (item[i].childNodes[j].nodeName!='LI') { continue; }

						if (j==s2)
						{
							item[i].childNodes[j].getElementsByTagName('img')[0].setAttribute('src', src2item[i][j].on);
						}
						else
						{
							item[i].childNodes[j].getElementsByTagName('img')[0].setAttribute('src', src2item[i][j].off);
						}
					}
				}
			}
			else
			{
				menu[i].getElementsByTagName('img')[0].setAttribute('src', src2menu[i].off);
				menu[i].className	= '';
			}
		}
	};

	selected();

	var a = root.getElementsByTagName("a");
	
	for (var i in a)
	{
		a[i].onmouseout	= a[i].onblur	= function ()
		{
			for (var i in menu)
			{
				menu[i].getElementsByTagName('img')[0].setAttribute('src', src2menu[i].off);
				menu[i].className	= '';

				if (item[i])
				{
					for (var j in item[i].childNodes)
					{
						if (!item[i].childNodes[j]) {continue;} 
						if (item[i].childNodes[j].nodeName=='LI')
						{
							item[i].childNodes[j].getElementsByTagName('img')[0].setAttribute('src', src2item[i][j].off);
						}
					}
				}
				
			}
			
			focus	= false;

			setTimeout(function()
			{
				if (focus==false)
				{
					for (var i in item)
					{
						if (item[i].nodeName!='UL') { continue; }
						item[i].style.display	= 'none';
					}

					root.className	= 'head-menu';

					selected();
				}
			}
			, delay);
		}
	}
}

// 1차메뉴 활성화
function initNavigation(seq) {		
	var nav = document.getElementById("head_menu");
	var allB = nav.querySelectorAll("#head_menu > li > a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,2) == seq){
			allB.item(k).className = "active";
			return false;
		}
	}
}

// 1차메뉴 select 활성화
function init1DepthComboMenu(seq) {
	var nav = document.getElementById("head_menu_depth1");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,2) == seq){
			var id = '#'+allB.item(k).parentNode.id;
			var obj = $(id).clone();
			$(id).after(obj);
			allB.item(k).parentNode.className = "active";
			return false;
		}
	}
}

// 2차메뉴 select 활성화
function init2DepthComboMenu(seq) {
	var nav = document.getElementById("head_menu_depth2");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,4) == seq){
			var id = '#'+allB.item(k).parentNode.id;
			var obj = $(id).clone();
			$(id).after(obj);
			allB.item(k).parentNode.className = "active";
			return false;
		}
	}
}

// 3차메뉴 select 활성화
function init3DepthComboMenu(seq) {
	var nav = document.getElementById("head_menu_depth3");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,6) == seq){
			var id = '#'+allB.item(k).parentNode.id;
			var obj = $(id).clone();
			$(id).after(obj);
			allB.item(k).parentNode.className = "active";
			return false;
		}
	}
}

// 4차메뉴 select 활성화
function init4DepthComboMenu(seq) {
	var nav = document.getElementById("head_menu_depth4");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,8) == seq){
			var id = '#'+allB.item(k).parentNode.id;
			var obj = $(id).clone();
			$(id).after(obj);
			allB.item(k).parentNode.className = "active";
			return false;
		}
	}
}

// 5차메뉴 select 활성화
function init5DepthComboMenu(seq) {
	var nav = document.getElementById("head_menu_depth5");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,10) == seq){
			var id = '#'+allB.item(k).parentNode.id;
			var obj = $(id).clone();
			$(id).after(obj);
			allB.item(k).parentNode.className = "active";
			return false;
		}
	}
}

// 모바일 1차메뉴 활성화
function initNavigationMbl(seq) {		
	var nav = document.getElementById("head_menu_all");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,2) == seq){
			allB.item(k).className = "active";
			$("div.submenu"+seq).attr("style","display:block");
			return false;
		}
	}
}

// 메뉴 네비게이션
function initNavigation2(seq, seq2) {		
	var nav = document.getElementById("head_menu");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allA = nav.getElementsByTagName("a");
	for(var k = 0; k < allA.length; k++) {
		allA.item(k).onmouseover = allA.item(k).onfocus = function () {
			nav.isOver = true;
		}
		allA.item(k).onmouseout = allA.item(k).onblur = function () {
			nav.isOver = false;
			setTimeout(function () {
				if (nav.isOver == false) {
					if (nav.menu[seq]) {
						nav.menu[seq].onmouseover();
					} else if(nav.current) {
						menuImg = nav.current.childNodes.item(0);
						menuImg.src = menuImg.src.replace("_on.png", ".png");
						if (nav.current.submenu) {
							nav.current.submenu.style.display = "none";
						}
						nav.current = null;
					}
				}
			}, 3000);
		}
	}
	
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-12,4) == seq2){
			allB.item(k).className = "active";
		}
	}

	for (var i = 0; i < navLen; i++) {
		var navItem = nav.childNodes.item(i);
		if (navItem.tagName != "LI") {
			continue;
		}
		var navAnchor = navItem.getElementsByTagName("a").item(0);
		navAnchor.submenu = navItem.getElementsByTagName("ul").item(0);
	
		navAnchor.onmouseover = navAnchor.onfocus = function () {
			if (nav.current) {
				menuImg = nav.current.childNodes.item(0);
				menuImg.src = menuImg.src.replace("_on.gif", ".gif");
				if (nav.current.submenu) {
					nav.current.submenu.style.display = "none";
				}
				nav.current = null;
			}
			if (nav.current != this) {
				menuImg = this.childNodes.item(0);
				menuImg.src = menuImg.src.replace(".gif", "_on.gif");
				if (this.submenu) {
					this.submenu.style.display = "block";
				}
				nav.current = this;
			}
			nav.isOver = true;
		}
		nav.menuseq++;
		nav.menu[nav.menuseq] = navAnchor;
	}
	if (nav.menu[seq]) {
		nav.menu[seq].onmouseover();
	}
}

//대메뉴 active
function init1DepthComboMenu2(seq) {
	var nav = document.getElementById("head_menu_all");
	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(seq == '07'){
			allB.item(0).parentNode.className = allB.item(0).parentNode.className +" active";
			return false;
		}else if(str.substr(str.length-10,2) == seq){
			allB.item(k).parentNode.className = allB.item(k).parentNode.className +" active";
			return false;
		}
	}
}

function init2DepthComboMenu2(seq) {
	$('#gnb2 .submenu > ul > li > a').each(function(i){
	 	var str = this.href;
	 	if(str.substr(str.length-10,4) == seq){
			this.parentNode.className = this.parentNode.className +" active ";
			return false;
		}
    });
}

function init3DepthComboMenu2(seq) {
	$('#gnb2 .submenu > ul > li > div > ul > li > a').each(function(i){
	 	var str = this.href;
	 	if(str.substr(str.length-10,6) == seq){
			this.parentNode.className = this.parentNode.className +" active";
			return false;
		}
    });
}


/* Initialize Left Menu - li */
function initLeftMenuLI(select1, select2)
{	
	var nav = document.getElementById("left_menu_top");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allB = nav.getElementsByTagName("li");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k).id + "";
		if(str.substr(str.length-10,6) == select2){
			allB.item(k).className += " active";
			try{ allB.item(k).childNodes.item(0).childNodes.item(0).src = allB.item(k).childNodes.item(0).childNodes.item(0).src.replace(".gif", "_on.gif"); }catch (e) { console.log(""); }
		}
	}
	
	var allAA = nav.getElementsByTagName("ul");
	for(var k = 0; k < allAA.length; k++) {
		var str = allAA.item(k).className + "";
		if(str.substr(2,4) == select1){
			allAA.item(k).style.display = "block";
		}
	}

	var allA = nav.getElementsByTagName("li");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k).id + "";
		if(str.substr(str.length-10,4) == select1){
			allA.item(k).className += " active";
			try{ allB.item(k).childNodes.item(0).childNodes.item(0).src = allB.item(k).childNodes.item(0).childNodes.item(0).src.replace(".gif", "_on.gif"); }catch (e) { console.log(""); }
			return;
		}
	}
}

/* Initialize Left Menu - a */
function initLeftMenu(select1, select2)
{	
	var nav = document.getElementById("left_menu_top");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;

	var allAA = nav.getElementsByTagName("ul");
	for(var k = 0; k < allAA.length; k++) {
		var str = allAA.item(k).className + "";
		if(str.substr(0,4) == select1){
			allAA.item(k).style.display = "block";
		}
	}

	var allB = nav.getElementsByTagName("a");
	for(var k = 0; k < allB.length; k++) {
		var str = allB.item(k) + "";
		if(str.substr(str.length-10,6) == select2){
			allB.item(k).className = "active";
		}
	}

	var allA = nav.getElementsByTagName("a");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k) + "";
		if(str.substr(str.length-10,4) == select1){
			allA.item(k).className = "active";
			return;
		}
	}
}

/* 3Depth Left Menu */
function init3DepthMenu(select1)
{	
	var nav = document.getElementById("depth3_menu_div");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allA = nav.getElementsByTagName("li");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k).id + "";
		if(str.substr(str.length-10,6) == select1){
			allA.item(k).className = "active";
			return;
		}
	}
}

/* 4Depth Left Menu 
function init4DepthMenu(select1)
{	
	var nav = document.getElementById("depth4_menu_div");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allA = nav.getElementsByTagName("li");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k).id + "";
		if(str.substr(str.length-10,8) == select1){
			allA.item(k).className = "active";
			allA.item(k).getElementsByTagName("a").item(0).setAttribute("title","선택됨");
			return;
		}
	}
}
*/

/* 4Depth Left Menu */
function init4DepthMenu(select1)
{	
	var nav = document.getElementById("depth4_menu_ul");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allA = nav.getElementsByTagName("li");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k).id + "";
		if(str.substr(str.length-10,8) == select1){
			allA.item(k).className = "active";
			return;
		}
	}
	
}

/* 5Depth Left Menu */
function init5DepthMenu(select1)
{	
	var nav = document.getElementById("depth5_menu_div");
	nav.menu = new Array();
	nav.current = null;
	nav.menuseq = 0;
	var navLen = nav.childNodes.length;
	var menuImg;
	
	var allA = nav.getElementsByTagName("li");
	for(var k = 0; k < allA.length; k++) {
		var str = allA.item(k).id + "";
		if(str.substr(str.length-10,10) == select1){
			allA.item(k).className = "active";
			allA.item(k).getElementsByTagName("a").item(0).setAttribute("title","선택됨");
			return;
		}
	}
}

// 이미지 오버
function initImgOver(as_ID) {
	var rollNav = document.getElementById(as_ID);	
	var rollLan = rollNav.childNodes.length;	
	var rollItem;	
	var rollAnchor;
	var rollImg;	
	
	for (var i=0; i < rollLan; i++) {
		rollItem = rollNav.childNodes.item(i);
		if (rollItem.tagName != "LI") {
			continue;
		}
		rollAnchor = rollItem.getElementsByTagName("a").item(0);
		if (rollAnchor.className != "over") {		
			rollAnchor.onmouseover = rollAnchor.onfocus = function () {
				if (rollNav.current) {
					rollImg = rollNav.current.childNodes.item(0);
					rollImg.src = rollImg.src.replace("_on.gif", ".gif");
					rollNav.current = null;				
				}
				if ((rollNav.current == null) || (rollNav.current != this)) {
					rollImg = this.childNodes.item(0);
					rollImg.src = rollImg.src.replace(".gif", "_on.gif");
					rollNav.current = this;
				}
				rollNav.isOver = true;			
			}
			rollAnchor.onmouseout = rollAnchor.onblur = function () {
				if (rollNav.current) {
					rollImg = rollNav.current.childNodes.item(0);
					rollImg.src = rollImg.src.replace("_on.gif", ".gif");
					rollNav.current = null;				
				}
			}
		}
	}	
}

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

// iframe 세로풀
function frameResize(obj){
	var obj_document = obj.contentWindow.document;
	if(obj_document.height){
		obj.style.height = obj_document.height+"px";
	}else{
		obj.style.height = obj_document.body.scrollHeight+"px";
	}
}

// 메인 최근게시물 탭
function initBoardArticle (container_id)
{
	var container	= document.getElementById(container_id);
	var h3			= container.getElementsByTagName("h3");

	for (var i=0; i<h3.length; i++)
	{
		if (h3.item(i).id=="article_setting")
		{
			h3.item(i).id			= "js_" + h3.item(i).id;

			var set	= h3.item(i).getElementsByTagName("a").item(0);
				set.container	= h3;
				set.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
				set.targetElement.style.position	= "absolute";
				set.targetElement.style.display		= "none";
				set.targetElement.style.padding	= "0";
				set.onclick	= function ()
				{
					this.targetElement.style.display	= "block";
					return false;
				}

				continue;
		}

		h3.item(i).className	= "js_" + h3.item(i).className;
		h3.item(i).id			= "js_" + h3.item(i).id;

		var article	= h3.item(i).getElementsByTagName("a").item(0);
			article.container		= h3;
			article.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
			article.targetElement.style.display	= "none";
			article.onclick	= article.onfocus	= function ()
			{
				var current	= this.container.current;

				if (current!=this)
				{
					if (current)
					{
						current.targetElement.style.display	= "none";
						current.className	= "";
					}

					this.targetElement.style.display	= "block";
					this.className	= "menu_on";
					this.container.current	= this;
				}
				return false;

			};
			
			article.className	= "";

			if (!article.container.first) { article.container.first	= article;}
	}
	
	h3.first.onclick();
}

// 메인 최근게시물 탭
function initBoardArticle_onoff (container_id)
{
	var container	= document.getElementById(container_id);
	var h3			= container.getElementsByTagName("h4");

	for (var i=0; i<h3.length; i++)
	{
		if (h3.item(i).id=="article_setting")
		{
			h3.item(i).id			= "js_" + h3.item(i).id;

			var set	= h3.item(i).getElementsByTagName("a").item(0);
				set.container	= h3;
				set.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
				set.targetElement.style.position	= "absolute";
				set.targetElement.style.display		= "none";
				set.targetElement.style.padding	= "0";
				set.onclick	= function ()
				{
					this.targetElement.style.display	= "block";
					return false;
				}

				continue;
		}

		h3.item(i).className	= "js_" + h3.item(i).className;
		h3.item(i).id			= "js_" + h3.item(i).id;

		var article	= h3.item(i).getElementsByTagName("a").item(0);
		article.container		= h3;
		article.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
		article.targetElement.style.display	= "none";
		article.onclick	= article.onfocus	= function ()
		{
			var current	= this.container.current;
			if (current!=this)
			{
				if (current)
				{
					current.targetElement.style.display	= "none";
					current.className	= "";
					//current.getElementsByTagName("img").item(0).src = (current.getElementsByTagName("img").item(0).src).replace("_on.gif", ".gif");
				}

				this.targetElement.style.display	= "block";
				this.className	= "active";
				this.container.current	= this;
				//this.getElementsByTagName("img").item(0).src = (this.getElementsByTagName("img").item(0).src).replace(".gif", "_on.gif");
			}
			return false;

		};
		
		article.className	= "";

		if (!article.container.first) { article.container.first	= article;}
	}
	
	h3.first.onclick();
}

// 메인 최근게시물 탭
function initBoardArticle_over (container_id)
{
	var container	= document.getElementById(container_id);
	var h3			= container.getElementsByTagName("h3");

	for (var i=0; i<h3.length; i++)
	{
		if (h3.item(i).id=="article_setting")
		{
			h3.item(i).id			= "js_" + h3.item(i).id;

			var set	= h3.item(i).getElementsByTagName("a").item(0);
				set.container	= h3;
				set.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
				set.targetElement.style.position	= "absolute";
				set.targetElement.style.display		= "none";
				set.targetElement.style.padding	= "0";
				set.onmouseover	= function ()
				{
					this.targetElement.style.display	= "block";
					return false;
				}

				continue;
		}

		h3.item(i).className	= "js_" + h3.item(i).className;
		h3.item(i).id			= "js_" + h3.item(i).id;

		var article	= h3.item(i).getElementsByTagName("a").item(0);
			article.container		= h3;
			article.targetElement	= document.getElementById(h3.item(i).getElementsByTagName("a").item(0).href.split("#")[1]);
			article.targetElement.style.display	= "none";
			article.onmouseover	= article.onfocus	= function ()
			{
				var current	= this.container.current;

				if (current!=this)
				{
					if (current)
					{
						current.targetElement.style.display	= "none";
						current.className	= "";
					}

					this.targetElement.style.display	= "block";
					this.className	= "menu_on";
					this.container.current	= this;
				}
				return false;

			};
			
			article.className	= "";

			if (!article.container.first) { article.container.first	= article;}
	}
	
	h3.first.onmouseover();
}

// 입력창 글자제한
function insertMax(arg, id, obj, spanID, val) {
	if(arg.value.length > obj){
		document.getElementById(id).value = val.substr(0,obj);
	}
    document.getElementById(spanID).innerHTML = arg.value.length;
}

function copyURI(arg) {
	if(arg == "") {
		alert("복사될 URL 주소가 없습니다.");
		return;
	}
	var IE = (window.clipboardData) ? true : false;
	if(IE) {
		window.clipboardData.setData("Text", arg);
		alert("URL 주소가 복사되었습니다.");
	} else {
		prompt("현재페이지의 URL 주소입니다.\nCtrl+C를 눌러 클립보드에 복사하세요.", arg);
	}
}

function fncScrap(arg, arg2){
	var returnURL = "";
	if(confirm("마이페이지 > 나의 스크랩에 저장되었습니다.\n지금 확인하시겠습니까?")){
		returnURL = encodeURIComponent("http://www.gwangju.go.kr/ease/menu.es?S=a1&M=120500000000");
	}
	location.href = arg + encodeURIComponent(arg2) + "&returnURL=" + returnURL;
}

function fncScrapDelete(arg){
	if(confirm("스크랩 목록을 삭제 하시겠습니까?")){
		location.href = arg;
	}
}

function urlMove(arg){
	var str = document.getElementById(arg).value;
	if(str == "" | str == "#"){
		alert("선택된 항목이 없습니다.");
		return false;
	}else{
		return true;
	}
}

/**
* 게시판 SNS 공통 펑션
* @param site_nm : 사이트명
* @param title : 글제목
* @param url : 링크
* @return
*/
function snsApi(sns)
{
	var fm = document.snsForm;
	fm.url.value = document.location.href;
	fm.target = "_blank";
	fm.action = "/api/sns.es?sns="+sns;
	fm.submit();
}
function twitter(site_nm, title, url){
	var str = site_nm + " | " + title + " " + url;
	var sitelink = "http://twitter.com/home?status=" + encodeURIComponent(str);
	window.open(sitelink);
}
function me2day(site_nm, title, url){
	var str = site_nm + " | " + title + " " + url;
	var sitelink = "http://me2day.net/posts/new?new_post[body]=" + encodeURIComponent(str);
	window.open(sitelink);
}
function facebook(site_nm, title, url){
	var str = site_nm + " | " + title;
	var sitelink = "http://facebook.com/sharer.php?u=" + encodeURIComponent(url) + "&t=" + encodeURIComponent(str);
	window.open(sitelink);
}


var xhr = null;
function getXMLHttpRequest() {
    if (window.ActiveXObject) {
        try {
            return new ActiveXObject("Msxml2.XMLHTTP");//IE 상위 버젼
        } catch (e1) {
            try {
                return new ActiveXObject("Microsoft.XMLHTTP");//IE 하위 버젼
            } catch (e2) {
                return null;
            }
        }
    } else if (window.XMLHttpRequest) {
        return new XMLHttpRequest();//IE 이외의 브라우저(FireFox 등)
    } else {
        return null;
    }
}// XMLHttpRequest 객체 얻기
 
function requestHello(e,URL) {
	var ex_obj = document.getElementById("message");
    if(!e) e = window.Event;
    //param = f.name.value;
    //URL = URL + "?name=" + encodeURIComponent(param);//한글 처리
    xhr = getXMLHttpRequest();//XMLHttpRequest 객체 얻기
    xhr.onreadystatechange = responseHello;//콜백 함수  등록
    xhr.open("GET", URL, true);//연결
    xhr.send(null);//전송
}// 서버에 요청
 
function responseHello() {
    if (xhr.readyState == 4) {//완료
        if (xhr.status == 200) {//오류없이 OK
            var str = xhr.responseText;//서버에서 보낸 내용 받기
            document.getElementById("message").innerHTML = str;//보여주기 
        } else {
            alert("Fail : " + xhr.status);
        }
    }
}// 응답

function displayTab(coId,num,curr) {
	for(var i=0;i<=num;i++){
		var obj = document.getElementById(coId+i);
		if(obj){ obj.style.display = "none"; }
	}
	var obj = document.getElementById(coId+curr);
	if(obj){ obj.style.display = "block"; }
}

//IE 인지를 반환(IE 라면 true 아니면 false)
function is_IE() {
	if (navigator.appName.charAt(0) == "M")
		return true ;
	else
		return false ;
}



var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
// 확인 버튼 선택시 상세목록 조회
function emailSubmit(){
	if(document.emailInsForm.email.value == ""){
		alert("이메일 주소가 정확하지 않습니다.");
		document.emailInsForm.email.focus();
	}else if( !regExp.test(document.emailInsForm.email.value) ){
		alert("올바른 이메일 형식이 아닙니다.");
		document.emailInsForm.email.focus();
	}else{
		if(confirm("뉴스레터를 신청하시겠습니까?")){
			$.post("/mail.es",
			{
				act : "insMailer",
				email : document.emailInsForm.email.value
			},
			function(data,status){
				$("#emailMessage").html(data);
			});
		}
	}
}

//코멘트 글자수 최대수 제한
function insertContentsMax(spanID, max, formNm) {
	if(formNm.value.length > max){
		alert("제한 글자수 "+max+"자를 초과하였습니다.");
		formNm.value = formNm.value.substr(0,max);
	}
	document.getElementById(spanID).innerHTML = formNm.value.length;
	/*
	var word = formNm.value.replace(/(^\s*)|(\s*$)/g,"");
	if(word.length > max){
		formNm.value = formNm.value.substr(0,max);
	}
	document.getElementById(spanID).innerHTML = word.length;
	*/
}

//글자 폰트 사이즈만 조절 하는 함수
defsize = 0.83;
var fSize=14;
//window.onload = onInit;

function onInit(){
    var font = getCookieValue("font");
    var fontSize = getCookieValue("fontSize");
    if(font != ""){
        scaleFontType(font);
    }
    if(fontSize != ""){
        fontSize = Number(fontSize) - fSize;
        scaleFont(fontSize);
    }
}

///////////////////////////////////////////////////////////////////////
function getCookieValue(cookieName){
    var cookieValue = null;
    if(document.cookie.length > 0){
        var offset = document.cookie.indexOf(cookieName +"=");
        if(offset != -1) {
            offset += cookieName.length;
            end = document.cookie.indexOf(";", offset);
            if (end == -1)    end = document.cookie.length;
            cookieValue = unescape(document.cookie.substring(offset+1, end));
        }
    }
        
    if(cookieValue == null)
        return "";
        
    return cookieValue;
}

var expireDate = new Date();
function setCookieValue(cookieName,cookieValue){
    expireDate.setMonth(expireDate.getMonth()+6);    
    document.cookie = cookieName + "=" + escape(cookieValue) + "; expires=" + expireDate.toGMTString();    
}


function scaleFont(n){
    fSize = fSize + n;
    if(fSize < 10)return;
    var valueCheck = document.getElementById("wrap");
    if(valueCheck !=null){
     var objTXT = document.getElementById("wrap")
     var objTd = document.getElementById("wrap").getElementsByTagName( "td" );// <td>, <TD>의 내용을 모두 읽어옴
     var objDiv = document.getElementById("wrap").getElementsByTagName( "div" );
     var objSpan = document.getElementById("wrap").getElementsByTagName( "span" );
     var objA = document.getElementById("wrap").getElementsByTagName( "a" );
     var objs = document.getElementById("wrap").getElementsByTagName( "p" );
     var objli = document.getElementById("wrap").getElementsByTagName( "li" );
     objTXT.style.fontSize = fSize + "px";
     for( i=0; i < objDiv.length; i++ )    objDiv[i].style.fontSize = fSize + "px";
     for( i=0; i < objTd.length; i++ )    objTd[i].style.fontSize = fSize + "px";
     for( i=0; i < objSpan.length; i++ )    objSpan[i].style.fontSize = fSize + "px";
     for( i=0; i < objA.length; i++ )    objA[i].style.fontSize = fSize + "px";
     for( i=0; i < objs.length; i++ )    objs[i].style.fontSize = fSize + "px";
     for( i=0; i < objli.length; i++ )    objli[i].style.fontSize = fSize + "px";
     setCookieValue("fontSize",fSize);
    }
}

function scaleFontType(str){
    var valueCheck = document.getElementById("wrap");
    if(valueCheck !=null){
     var objTd = document.getElementById("wrap").getElementsByTagName( "td" );// <td>, <TD>의 내용을 모두 읽어옴
     var objDiv = document.getElementById("wrap").getElementsByTagName( "div" );
     var objSpan = document.getElementById("wrap").getElementsByTagName( "span" );
     var objA = document.getElementById("wrap").getElementsByTagName( "a" );
     var objs = document.getElementById("wrap").getElementsByTagName( "p" );
     var objli = document.getElementById("wrap").getElementsByTagName( "li" );
     for( i=0; i < objDiv.length; i++ )    objDiv[i].style.fontFamily = str;
     for( i=0; i < objTd.length; i++ )    objTd[i].style.fontFamily = str;
     for( i=0; i < objSpan.length; i++ )    objSpan[i].style.fontFamily = str;
     for( i=0; i < objA.length; i++ )    objA[i].style.fontFamily = str;
     for( i=0; i < objs.length; i++ )    objs[i].style.fontFamily = str;
     for( i=0; i < objli.length; i++ )    objli[i].style.fontFamily = str;
     setCookieValue("font",str);
     }  
}

var nowZoom = 100;
function zoomIn() {
	try{
		if(/Firefox/.test(navigator.userAgent)) {
			alert("이 브라우저에서는 기능을 지원하지 않습니다. \nCtrl키 + 마우스 휠을 이용하여 확대 축소하실수 있습니다.");
		} else {
			nowZoom = nowZoom - 10;
			if(nowZoom <= 70) nowZoom = 70;
			zooms();
		}
	}catch (e) {
		alert("이 브라우저에서는 기능을 지원하지 않습니다.");
	}
}

function zoomOut() {
	try{
		if(/Firefox/.test(navigator.userAgent)) {
			alert("이 브라우저에서는 기능을 지원하지 않습니다. \nCtrl키 + 마우스 휠을 이용하여 확대 축소하실수 있습니다.");
		} else {
			nowZoom = nowZoom + 20;
			if(nowZoom >= 500) nowZoom = 500;
			zooms();
		}
	}catch (e) {
		alert("이 브라우저에서는 기능을 지원하지 않습니다.");
	}
}

function zoomReset(){
	nowZoom = 100; 
	zooms();
}

function zooms(){
	try{
		document.body.style.zoom = nowZoom + '%';
		if(nowZoom==70){
			alert ("30%축소 되었습니다. 더 이상 축소할 수 없습니다.");
		}

		if(nowZoom==500){
			alert ("500%확대 되었습니다. 더 이상 확대할 수 없습니다.");
		}
	}catch (e) {
		alert("이 브라우저에서는 기능을 지원하지 않습니다.");
	}
	
}

// 
var lastPoint = "";
function goPoint02(point) {
	if(document.getElementById(point).style.display != "none"){
		document.getElementById(point).style.display = "none";
	} else {
		try	{
		document.getElementById(lastPoint).style.display = "none";
			} catch(e) { console.log(""); }
		document.getElementById(point).style.display = "block";
			lastPoint = point;			
		}
}

// 클릭시 arg 슬라이딩
function slideToggleView(arg){
	$(arg).slideToggle("fast");
}



//Tab Content
function initTabMenu(tabContainerID) {
	var tabContainer = document.getElementById(tabContainerID);
	var tabAnchor = tabContainer.getElementsByTagName("a");
	var i = 0;

	for(i=0; i<tabAnchor.length; i++) {
		if (tabAnchor.item(i).className == "tab")
			thismenu = tabAnchor.item(i);
		else
			continue;

		thismenu.container = tabContainer;
		thismenu.targetEl = document.getElementById(tabAnchor.item(i).href.split("#")[1]);
		thismenu.targetEl.style.display = "none";
		thismenu.imgEl = thismenu.getElementsByTagName("img").item(0);
		if (thismenu.imgEl) {
			thismenu.onfocus = function () {
				//this.onfocus();
			}
		}
		thismenu.onclick = tabMenuOver;
		
		if (!thismenu.container.first)
			thismenu.container.first = thismenu;
	}
	tabContainer.first.onclick();
}
function tabMenuOver() {
	currentmenu = this.container.current;
	if (currentmenu != this) {
		if (currentmenu) {
			currentmenu.targetEl.style.display = "none";
			if (currentmenu.imgEl) {
				currentmenu.imgEl.src = currentmenu.imgEl.src.replace("_on.gif", ".gif");
				currentmenu.className = currentmenu.className.replace(" selectd", "");
			} else {
				currentmenu.className = currentmenu.className.replace(" selectd", "");
			}
		}

		this.targetEl.style.display = "block";
		if (this.imgEl) {
			this.imgEl.src = this.imgEl.src.replace(".gif", "_on.gif");
			this.className += " selectd";
		} else {
			this.className += " selectd";
		}
		this.container.current = this;
	}
	return false;
}


//BMI 체크 프로그램
function bmiCheck(){
	document.getElementById("bmi01").innerHTML = "-";
	document.getElementById("bmi02").innerHTML = "-";

	var result01 = "";
	var result02 = "";
	var ja = 2;
	result02 = document.getElementById("bmiWeight").value / (document.getElementById("bmiHeight").value/100 * document.getElementById("bmiHeight").value/100);
	result02 = result02.toFixed(1);
	if(result02 < 18.5){ result01 = "저체중";
	}else if(result02 >= 18.5 && result02 <= 22.9){ result01 = "정상체중";
	}else if(result02 >= 23 && result02 <= 24.9){ result01 = "과체중";
	}else if(result02 >= 25 && result02 <= 29.9){ result01 = "비만 I";
	}else if(result02 >= 30 && result02 <= 39.9){ result01 = "비만 II";
	}else if(result02 >= 40){ result01 = "심각한 비만 III";
	}
	
	document.getElementById("bmi01").innerHTML = result01;
	document.getElementById("bmi02").innerHTML = result02;
	
	//게시판 레이어창
	function boardPopLayer(divId, url){
		document.getElementById(divId).style.display = "block";
		$.post(url,
		function(data,status){
			$("#"+divId).html(data);
		});
	}
}

// 메일선택시
function fnc_mailChange(arg, arg2){
	var sel_f = document.getElementById(arg2);
	if(arg == ""){
		sel_f.readOnly = false;
		sel_f.focus();
		sel_f.display = "block";
	}else{
		sel_f.readOnly = true;
		sel_f.display = "none";
	}
	sel_f.value = arg;
}

function findeepSearch2(type){
	if(type == "main"){
		if($("#search").val().trim().length >= 2){
			$("#searchForm").submit();
		}else{
			alert("검색어를 2글자 이상 입력하세요.");
			$("#search").val($("#search").val().trim());
			event.preventDefault();
		}
	}else if(type == "menu"){
		if($("#search2").val().trim().length >= 2){
			$("#searchForm2").submit();
		}else{
			alert("검색어를 2글자 이상 입력하세요.");
			$("#search2").val($("#search2").val().trim());
			event.preventDefault();
		}
	}
}
function findeepSearch3(type){
	if(type == "main"){
		if($("#search").val().trim().length >= 2){
			$("#searchForm").submit();
		}else{
			alert("검색어를 2글자 이상 입력하세요.");
			$("#search").val($("#search").val().trim());
			event.preventDefault();
		}
	}else if(type == "menu"){
		if($("#search3").val().trim().length >= 2){
			$("#searchForm3").submit();
		}else{
			alert("검색어를 2글자 이상 입력하세요.");
			$("#search3").val($("#search3").val().trim());
			event.preventDefault();
		}
	}
}
function XssCheck(str){
	str = str.replace("\<", "&lt;"); 
	str = str.replace("\>", "&gt;"); 
	str = str.replace("\"", "&quot;");
	str = str.replace("\#", "&#35;");
	str = str.replace(/\\/gi,"");
	str = str.replace(/\./gi,"");
	str = str.replace(new RegExp("alert","gi"), "");
	str = str.replace(new RegExp("prompt","gi"), "");
	str = str.replace(new RegExp("onmouseover","gi"), "");
	str = str.replace(new RegExp("onmouse","gi"), "");
	str = str.replace(new RegExp("script","gi"), "");
	str = str.replace(new RegExp("cookie","gi"), "");
	str = str.replace(new RegExp("document","gi"), "");
	str = str.replace(new RegExp("\[\\r\\n\]","gi"), "");
	
	return str;
}

//title 변경 
function toggleTitle(id){
	if($(id).hasClass("active") === true) {
		$(id).attr("title","닫힘");
	}else{
		$(id).attr("title","열림");
	}
}

$(document).on("keydown", function(e) {
	if(e.keyCode == "9") { // tab키
		if(!e.shiftKey) { //+ shift키
			//탭
			if($(".btn-sitemap a").is(":focus")) {
				$("#gnb1").removeClass("active");
				$("#head_menu li").removeClass("active");
			}
		}
	}
});

/* 조직도 - 부서선택시 */
function fncMoveOrgList(org_cd){
	location.href= "/organization.es?mid=a10406020000&org_cd="+org_cd
}

//미리보기 시 클릭 막기
$(function(){
	let local_href = window.location.href;
	if(local_href.indexOf("Preview.es") > -1){
		$("html").css("pointer-events", "none");
		$("ul.faq > li.group").addClass('active');
	}
})




/*  -------------------------------------------------------------------------------------
*    JYC
----------------------------------------------------------------------------------------- */

const AC = "active",
    FX = "fixed",
    ALL = "all_nav"    
		
/*  mobile ------------------------------------------------------------------------------ */
function mobile() {
	return window.innerWidth < 1025 ? 1 : 0 //ipad pro 1024
}		

/*  ---------------------------------------------------------------------------------------
*    gnb
----------------------------------------------------------------------------------------- */
function gnb(el) {
	const   FLM = "fullmenu",   
					$header = $("header"),
					$gnb1 = $("#gnb1"),           
					$gnb1Depth1 = $gnb1.find(".depth-1")           

	if (el=="full") { //전체메뉴로 열리는 형태
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
function sitemap() {
	const	$header = $("header"),	
				$gnb2 = $("#gnb2"),
				$gnb2Depth1 = $gnb2.find(".topmenu_all>li>a")

	$gnb2.find(".open").on("click", function(){
			$gnb2.add('html, header').addClass(AC)
			if (mobile()) { 
					$header.addClass(ALL)
					$gnb2Depth1.eq(0).addClass(AC)
			}
	})
	$gnb2Depth1.on("click", function(e){
		if (mobile()) { 
			$(".topmenu_all").addClass(AC);
			$(this).parent().addClass(AC).siblings().removeClass(AC)			
			e.preventDefault()
		}
	})
	$gnb2.find(".close").on("click", function(e){
		$(".topmenu_all").removeClass(AC);
			$(this).parent().removeClass(AC)
			$header.add('html').removeClass(AC)
			if (mobile()) { 
					$header.removeClass(ALL) 
					$gnb2Depth1.parent().removeClass(AC)
			}
			e.preventDefault()
	}) 
	//3차뎁스를 갖고있는 상위요소에 클래스부여
	$(".lnb-detail").each(function() {
			$(this).closest("li").addClass("is-depth3")
	})
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
			/* let txt = $elTarget.hasClass(AC) ? " 닫기" : " 열기"
			$el.attr("title", $el.text() + txt)  */  
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


/*  -------------------------------------------------------------------------------------
*    리스트 열고 닫기			listOpen("리스트열기버튼", "리스트 닫기 버튼", "활성화 타겟") 
----------------------------------------------------------------------------------------- */
function listOpen(el, close, target){
	const $el = $(el),
        $close = $(close),
				$elTarget = target ? $el.parents(target) : $el.parent()
    let varText
    
	$el.on("click", function(e){ 
        active(this, "toggle", 0, target)
        $elTarget.hasClass(AC) ? varText = " 목록 : 열림" : varText = " 목록 : 닫힘"
        $(this).attr("title", $(this).text() + varText)
    })
    $close.on("click", function(e){
        e.preventDefault()
        $el.trigger("click")
    });

}

/*  -------------------------------------------------------------------------------------
*    tab메뉴         tabs(this, "탭콘텐츠")
----------------------------------------------------------------------------------------- */
function tabs(el, cont) {	
	$(cont).eq(0).addClass(AC)    
	$(el).on("click", function(e){ 	            
			$(this).attr("title", "선택된 탭메뉴").parent().addClass(AC)
			.siblings().removeClass(AC).find("button, a").attr("title", "비활성 탭메뉴")            
			$("#"+$(this).data('id')).addClass(AC).siblings().removeClass(AC)            
			e.preventDefault()
	}).attr("title", "비활성 탭메뉴").parent(".active").children("button, a").attr("title", "선택된 탭메뉴")   
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
				if($(".foot_logo")){
					scrollT > $(".foot_logo").offset().top - $(window).height() ? $el.addClass("stick") : $el.removeClass("stick")
				}else{
					scrollT > $("footer").offset().top - $(window).height() ? $el.addClass("stick") : $el.removeClass("stick")
				}
			}
	})

	$el.on("click", function() {
			$("html,body").stop().animate({scrollTop: 0}, 500)
	})
}

/*  -------------------------------------------------------------------------------------
*    함수 실행, 웹접근성, 모바일
----------------------------------------------------------------------------------------- */
$(function(){

	//관련사이트 열기
	listOpen("footer .related .label");

	//top버튼 이동
	goTop(".btn-top");

	//tab 접근성
	$(".depth4_tab>ul>li").each(function(){
		$(this).children("a").attr("role","tab");
		if($(this).hasClass(AC)) $(this).children("a").attr("aria-selected", "true");
	});

	//내용 많은 테이블
	$(".responsive").each(function(){
		$(this).before("<p class='horizontal_scroll mobile'><span class='txt'>좌, 우로 이동하여 더 많은 내용을 볼수 있습니다.</span></p>");
	})  

	// web accessibility
	$("[class*='ri-'], .icon").attr("aria-hidden", "true");
	$("a[target='_blank']").attr("title", "새창으로 열림");

	// 교수소개 정렬
	$(".page_setting a").on("click", function() {
		$(".page_setting a").removeClass("active");
		$(this).addClass("active");
	});

})


//열린총장실 글쓰기 (로그인시 href로, 비로그인시 본인인증 페이지로)
function fnc_loginPin_search(href){
	if(!!document.querySelector("#hnb div.login")){
		location.href = href;
		return;
	}
	const urlParams = new URL(location.href).searchParams;
	let sid_ = "a1";
	let mid = urlParams.get('mid');
	let sid_rex = /^[a-z0-9]{2}$/;
	if(!!mid && sid_rex.test(mid.substring(0,2))){
		sid_ = mid.substring(0,2);
	}
	location.href = "/loginPin_search.es?sid="+sid_;
}
