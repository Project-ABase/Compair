<%@page import="DAO.ServerDAO"%>
<%@page import="DAO.TodoDAO"%>
<%@page import="DAO.UserDAO"%>
<%@page import="java.util.Map"%>
<%@page import="java.util.List"%>
<%@ page contentType="application/json; charset=UTF-8"%>
<%@page import="org.json.simple.JSONObject"%>
<%
try {
    String todoCodeStr = request.getParameter("todo_code");
    String serverCodeStr = request.getParameter("server_code");
    String newTitle = request.getParameter("new_title");
    String newTag = request.getParameter("new_tag");
    String userId = (String) session.getAttribute("uid");
    if (userId == null) {
        userId = request.getParameter("uid");
    }

    int todoCode = Integer.parseInt(todoCodeStr);
    int serverCode = Integer.parseInt(serverCodeStr);

    UserDAO userDao = new UserDAO();
    ServerDAO serverDao = new ServerDAO();
    String[] tagArray = newTag.split(",");
    for (String tag : tagArray) {
        if (!userDao.isIdExist(tag)) {
            out.print("{ \"error\": \"해당 UID 없음: " + tag + "\" }");
            return;
        } else if (!serverDao.isUserInServer(tag, serverCode)) {
            out.print("{ \"error\": \"해당 UID는 서버에 속해있지 않음: " + tag + "\" }");
            return;
        }
    }

    TodoDAO dao = new TodoDAO();
    Map<String, Object> resultMap = dao.updateTodo(todoCode, serverCode, newTitle, newTag, userId);

    boolean success = (boolean) resultMap.get("success");

    JSONObject responseJson = new JSONObject();
    responseJson.put("success", success);

    out.print(responseJson.toJSONString());

} catch (Exception e) {
    response.setStatus(500);
    out.print("{ \"error\": \"수정 실패: " + e.getMessage() + "\" }");
    e.printStackTrace();
}
%>
