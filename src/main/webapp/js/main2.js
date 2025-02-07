var Board = {
    init: function() {
        $(document).ready(function() {
            Page.init(Board.start);  // Board.start를 콜백으로 넘김
        });
    },
    start: function(uid) {
        Board.checkServer(uid);
        Board.suid = uid;
    },

    checkServer: function(uid) {
        var serverParams = { "serverList": uid };
        AJAX.call("../JSP/checkServer.jsp", serverParams, function(data) {
            var rvalue = JSON.parse(data.trim());
            console.log(rvalue);
            var keys = Object.keys(rvalue);
            
            var values = keys.map(function(key) {
                return rvalue[key];
            });
            console.log(values);
            
            Board.serverListShow(values);
            console.log("data는 " + data);
        });
    },

    serverListShow: function(values) {
        var serverListShowStr = "<div class = 'server-list'>";
        console.log(values[0]);
        if (values[0] == "0") {
            serverListShowStr += "<div class = 'server-item' onclick='Board.serverAdd()'>";
            serverListShowStr += 0;
            serverListShowStr += "</div>";
        }

        if (values.length > 0) {
            for (let i = 1; i < values.length; i++) {
                var sc = values[i];
                serverListShowStr += "<div class = 'server-item' onclick='Board.serverClick(\"" + sc + "\")'>";
                serverListShowStr += values[i];
                serverListShowStr += "</div>";
                
                console.log("rvalue 는???? " + values[i]);
            }
            serverListShowStr += "</div>";
        }

        $("#serverList").append(serverListShowStr);
    },

    serverAdd: function() {
        window.location.href = "ServerAdd.html";
    },

    serverClick: function(sc) {
        alert(sc);
        Board.recentServerCode = sc;
        $("#list").empty();
        var params = { "recentServerCode": sc };
        AJAX.call("../JSP/feedGetGroup.jsp", params, function(data) {
            var feeds = JSON.parse(data.trim());
            console.log(feeds);
            if (feeds.length > 0) {
                Board.minNo = feeds[feeds.length - 1].BOARD_CODE;
                Board.recentNo = feeds[feeds.length - 1].BOARD_CODE;
            }
            console.log("minNo는? " + Board.minNo);
            Board.show(feeds);
        });
    },

    show: function(feeds) {
        var str = "";
        for (var i = 0; i < feeds.length; i++) {
            str += Board.getFeedCode(feeds[i]);
        }
        $("#list").append(str);
    },

    getFeedCode: function(feed) {
        var clickCode = feed.BOARD_CODE;
        var str = "<div style='display: flex; align-items: center; padding: 10px; border-bottom: 1px solid #ddd;' onclick='Board.handleRowClick(\"" + clickCode + "\")'>";
        
        str += "<div style='width: 100px; text-align: center;'>" + feed.BOARD_CODE + "</div>";
        str += "<div style='flex: 2; text-align: center;'>" + feed.TITLE + "</div>";
        str += "<div style='width: 150px; text-align: center;'>" + feed.AUTHOR + "</div>";
        str += "<div style='width: 150px; text-align: center;'>" + feed.POSTDATE + "</div>";
        str += "</div>";

        return str;
    },

    handleRowClick: function(clickCode) {
        alert("게시글 코드: " + clickCode + " 클릭됨!");
        window.location.href = "b_view.html?boardCode=" + clickCode;
    },

    getNext: function() {
        var params = { maxNo: Board.minNo, recentServerCode: Board.recentServerCode };
        console.log(Board.minNo);
        AJAX.call("../JSP/feedGetGroup.jsp", params, function(data) {
            var feeds = JSON.parse(data.trim());
            if (feeds.length > 0) {
                Board.minNo = feeds[feeds.length - 1].BOARD_CODE;
            }
            Board.show(feeds);
        });
    }
};

// 실행
