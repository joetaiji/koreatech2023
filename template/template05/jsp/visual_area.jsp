<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %><%@ include file="/include/config.jsp" %><%@ include file="/include/util.jsp" %>
<%@ page import="egovframework.easeWeb.ease.menu.MenuVO"%>
<%
	List titleNavi = (List)request.getAttribute("titleNavi");
	String menuTitle = "";
	for(int i = 0 ; i < titleNavi.size(); i++){
		MenuVO menuTitleList = (MenuVO)titleNavi.get(i);
		if(i == 0){ menuTitle = SearchXSS(menuTitleList.getMenu_name()); }
	}
%>
			<c:set var="subvisual_path">${pageContext.request.contextPath}/upload/subVisual/<c:out value="${fn:substring(es:SearchXSS(param.mid), 0, 2)}" /></c:set>
			<c:set var="subvisual_file"><c:out value="${fn:substring(es:SearchXSS(param.mid), 2, 4)}" /></c:set>
			<div id="visual" class="visual2 active" style="background-image:url('${es:getSubVisualFileName(subvisual_path,subvisual_file)}')">
				<div class="container">
					<strong class="title">
						<em>${siteDetail.site_nm}</em>
						<%=menuTitle%>
					</strong>		
				</div>
				<jsp:include page="/quickMain.es">
					<jsp:param name="sid" value="${siteDetail.sid}" />
					<jsp:param name="file_name" value="quick_list_${siteDetail.site_template}_sub" />
				</jsp:include>
			</div>
