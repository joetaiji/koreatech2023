<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %><%@ taglib prefix="c" uri="/WEB-INF/taglib/c.tld" %><%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%><%@ taglib prefix="es" uri="/WEB-INF/taglib/easesoft.tld" %>

<div id="hnb">
	<div class="container">
		<div class="link_list">
			<c:choose>
			<c:when test="${not empty sessionScope['loginId']}">
			<%@ include file="/include/autoLogout.jsp" %>
				<a href="${pageContext.request.contextPath}/logout.es?sid=${siteDetail.sid}">로그아웃</a>
				<%--
				<ul class="list">
					<li class="user"><span>${sessionScope['loginName']}</span>님</li>
					<li class="logout_time"><i class="ri-time-line"></i><span id="divClock"><%=autoLogoutTime%>:00</span></li>
					<li class="logout mr05"><a href="">시간 연장</a></li>
					<li class="logout"><a href="${pageContext.request.contextPath}/logout.es?sid=${siteDetail.sid}">로그아웃</a></li>
				</ul>
				--%>
			</c:when>
			<c:otherwise>
				<a href="${pageContext.request.contextPath}/loginSSO_search.es?sid=${siteDetail.sid}">로그인</a>
			</c:otherwise>
			</c:choose>
			
			<jsp:include page="/toplinkMain.es">
				<jsp:param name="sid" value="${siteDetail.sid}" />
				<jsp:param name="file_name" value="toplink_list_${siteDetail.site_template}" />
			</jsp:include>
		</div>
		<div class="sns_list">
			<button class="sns_open"><span>SNS</span><i class="ri-arrow-down-s-line"></i></button>
			<div class="sns_layer">
				<strong class="sns_title">SNS 바로가기</strong>
				<nav class="list">
					<jsp:include page="/${siteDetail.site_url}/top_sns_link.jsp" />
				</nav>
				<button class="sns_close">
					<i class="xi-close-thin"></i>
					<strong class="sr_only">SNS 닫기</strong>
				</button> 
			</div>
		</div>							
	</div>
</div>
