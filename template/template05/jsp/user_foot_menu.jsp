<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %><%@ taglib prefix="c" uri="/WEB-INF/taglib/c.tld" %><%@ taglib prefix="fn" uri="/WEB-INF/taglib/fn.tld" %>
		<div class="related">
			<jsp:include page="/relatedSite.es">
				<jsp:param name="sid" value="a1" />
				<jsp:param name="file_name" value="pre_list" />
			</jsp:include>
			<%-- a1 대학사이트 공통사용 --%>
		</div>
		
		<div class="footer_wrap">
			<div class="container">
				<div class="foot_logo">
					<img src="${pageContext.request.contextPath}/template/common/foot_logo.svg" alt="한국기술교육대학교 KOREATECH" />
				</div>
				<div class="foot_info">
					<ul class="fnb">
						<li class="private"><a href="${pageContext.request.contextPath}/menu.es?mid=a10903000000" class="linkWindow" target="_blank" title="새창으로 열림" rel="noopener noreferrer">개인정보처리방침</a></li>
						<li><a href="${pageContext.request.contextPath}/menu.es?mid=a10904000000" class="linkWindow" target="_blank" title="새창으로 열림" rel="noopener noreferrer">영상정보처리기기&middot;운영관리방침</a></li>
						<li><a href="#">이용약관</a></li>
					</ul>
					<div class="siteinfo">
					    <address>[31253] 충청남도 천안시 동남구 병천면 충절로 1600 (가전리, 한국기술교육대학교) / <span class="mbr">TEL : <a href="tel:041-560-1114">041-560-1114</a></span></address>
					    <p class="copyright">COPYRIGHT &copy; KOREATECH. ALL RIGHT RESERVED.</p>
					</div>
					<nav class="sns_list">
						<a href="https://www.youtube.com/channel/UCtFGdkfcvnSIZEZ3wd48I2Q" target="_blank" title="새창으로 열림" rel="noopener noreferrer"><i class="ri-youtube-fill"></i><span class="sr_only">유투브</span></a>
						<a href="https://www.facebook.com/koreatech91/" target="_blank" title="새창으로 열림" rel="noopener noreferrer"><i class="ri-facebook-fill"></i><span class="sr_only">페이스북</span></a>							
						<a href="https://blog.naver.com/koreatech91/" target="_blank" title="새창으로 열림" rel="noopener noreferrer"><i class="icon_blog">b</i><span class="sr_only">블로그</span></a>
						<a href="https://www.instagram.com/koreatech_since1991/" target="_blank" title="새창으로 열림" rel="noopener noreferrer"><i class="ri-instagram-line"></i><span class="sr_only">인스타그램</span></a>							
					</nav>
				</div>
				<div class="btn-top">
					<button>Top</button>
				</div>
			</div>
		</div>	