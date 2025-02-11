<%@ page contentType="text/html" pageEncoding="utf-8" %>
<%@ page import="DAO.*" %>
<%
	int ServerCode = Integer.parseInt(request.getParameter("ServerCode"));
	String Date = request.getParameter("thisPageDate");
	String todoInput = request.getParameter("todoInput");
	String todoWriter = (String)session.getAttribute("uid");
	String tagInput = request.getParameter("tagInput");
	System.out.println("tagInput은?" + tagInput);
	System.out.println(ServerCode);
    out.print((new TodoDAO()).todoInsert(ServerCode, todoInput, todoWriter, Date, tagInput));
    System.out.println("calendarGet의 서버 세션 드록 :" + session.getAttribute("serverSession"));
%>