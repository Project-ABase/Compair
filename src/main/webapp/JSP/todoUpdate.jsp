<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="DAO.*" %>
<%
	String ServerCode = request.getParameter("ServerCode");
	System.out.println(ServerCode);
	String todoCode = request.getParameter("todoCode");
	System.out.println("todoCode" + todoCode);
	String writer = request.getParameter("writer");
    out.print((new TodoDAO()).todoCheck(ServerCode, todoCode, writer));
    System.out.println("calendarGet의 서버 세션 드록 :" + session.getAttribute("serverSession"));
%>