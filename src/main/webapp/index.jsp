<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%
    if (session.getAttribute("uid") != null) {
        response.sendRedirect("user.jsp");
        return;
    } else {
    	response.sendRedirect("login.jsp");
    	return;
    }
%>