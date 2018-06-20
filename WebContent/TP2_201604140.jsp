<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>충남대학교 틀린그림찾기 - 랭킹확인</title>
	<style>
		body div {
		  position: fixed;
		  background: url("img/GameOver_UI.jpg");
		  background-size: 100% 100%;
		  top: 0px;
		  left: 0px;
		  width: 100%;
		  height: 100%;
		  background-color: transparent;
		}
	</style>
</head>
<body>
	<div></div>
	 <%
    String name = request.getParameter("name");
    %>
    <ol>
    	<li><%=name%>            스코어<%=name%></li>
    </ol>
</body>
</html>
