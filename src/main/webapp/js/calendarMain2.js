var Calendar = {
    currentDate: new Date(),
    // 캘린더 관련 최소/최근 번호 (필요 시 Board와 공유하거나 별도로 관리)
	//세션 스토리지로 따로 관리
    minNo: null,
    recentNo: null,
	nowScreen: 'calendar',
	currentServerCode:null,
	thisPageDate: null,
    init: function() {
		Page.init(Calendar.calendar);
    },

    // 캘린더 페이지를 생성하고 이벤트를 바인딩
    calendar: function() {
        // 필요한 경우 Board.recentNo 값을 사용하여 minNo를 설정할 수 있음
        Calendar.minNo = Calendar.recentNo;
        console.log("minNo는? " + Calendar.minNo);

        // 리스트 영역 및 캘린더 영역 초기화
        $("#list").empty();
        $("#calendarList").empty();
        console.log("캘린더 버튼 클릭됨, 리스트 영역 비워짐.");
        alert("캘린더");

        // 캘린더 HTML 생성 (달력과 To-Do 리스트 섹션 포함)
        Calendar.showCalendar();

        // 현재 날짜를 기준으로 달력 날짜 생성
        Calendar.generateCalendar(Calendar.currentDate);

        // 이전/다음 달 버튼 이벤트 바인딩
        document.getElementById("prevMonth").addEventListener("click", function () {
            Calendar.changeMonth(-1);
        });
        document.getElementById("nextMonth").addEventListener("click", function () {
            Calendar.changeMonth(1);
        });
    },

    // 월 변경 후 캘린더 재생성
    changeMonth: function(step) {
        Calendar.currentDate.setMonth(Calendar.currentDate.getMonth() + step);
        Calendar.generateCalendar(Calendar.currentDate);
    },

    // 날짜 클릭 시 호출되는 함수
    handleDateClick: function(date) {
		Calendar.thisPageDate = date;
        alert("선택한 날짜: " + date);
        Calendar.todoShow(date);
    },

    // 선택한 날짜에 해당하는 데이터를 서버로부터 가져온 후 캘린더 TODO 목록 출력
    selectDate: function(date) {
        var dateParams = { "POST_DATE": date};
        AJAX.call("../JSP/calendarGet.jsp", dateParams, function(data) {
            var feeds = JSON.parse(data.trim());
            console.log("feed는: " + feeds);

            if (feeds.length > 0) {
                Calendar.minNo = feeds[feeds.length - 1].BOARD_CODE;
                Calendar.recentNo = feeds[feeds.length - 1].BOARD_CODE;
            }
            console.log("minNo는? " + Calendar.minNo);

            if (feeds.length !== 0) {
                Calendar.showCalendarTODO(feeds);
            } else {
                Calendar.showCalendarNothing();
            }
        });
    },

    // 서버에서 받아온 피드 데이터로 TODO 목록 생성 (필요 시 Board 객체의 getFeedCode 함수 활용)
    showCalendarTODO: function(feeds) {
        var calStr = "";
        for (var i = 0; i < feeds.length; i++) {
            // 예시: Board 객체의 getFeedCode 함수로 항목 생성 (필요에 따라 수정)
            calStr += Calendar.getFeedCode(feeds[i]);
        }
        $("#list").empty();
        $("#list").append(calStr);
    },

    // 데이터가 없는 경우 메시지 출력
    showCalendarNothing: function() {
        $("#list").empty();
        var calStr = "아직 아무 데이터도 존재하지 않습니다.";
        $("#list").append(calStr);
    },

    // 캘린더 HTML 구조를 생성하여 calendarList 영역에 추가 (달력과 To-Do 리스트 섹션 포함)
    showCalendar: function() {
        var str = "<div id='calendar-page'>";
        str += "<div class='calendar-header'>";
        str += "<button id='prevMonth' class='calendar-nav'>&lt;</button>";
        str += "<span id='calendarMonthYear'></span>";
        str += "<button id='nextMonth' class='calendar-nav'>&gt;</button>";
        str += "</div>";
        str += "<table class='calendar-table'>";
        str += "<thead><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr></thead>";
        str += "<tbody id='calendarBody'></tbody>";
        str += "</table>";
        // 달력 테이블 아래에 To-Do 리스트 섹션을 별도의 컨테이너로 추가
        str += "<div id='todo-list-section'>";
        str += "<h2>To-Do 리스트</h2>";
        str += "<div class='todo-input-area'>";
        str += "<input type='text' id='todo-input' placeholder='할 일을 입력하세요'/>";
        str += "<button id='add-todo-button' onclick='Calendar.todoPlus()'>+</button>";
        str += "</div>";
        str += "<div id='todo-list'></div>";
        str += "</div>";
        str += "</div>";
        $("#calendarList").html(str);
    },

    // 캘린더의 날짜들을 생성하여 화면에 출력 (달력 본체만 업데이트)
    generateCalendar: function(date) {
        var monthYear = document.getElementById("calendarMonthYear");
        var calendarBody = document.getElementById("calendarBody");

        monthYear.textContent = date.getFullYear() + "년 " + (date.getMonth() + 1) + "월";
        calendarBody.innerHTML = "";

        var firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        var lastDate = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

        var row = "<tr>";

        // 첫 주의 빈 칸 채우기
        for (var i = 0; i < firstDay; i++) {
            row += "<td></td>";
        }

        // 날짜 채우기
        for (var day = 1; day <= lastDate; day++) {
            if ((firstDay + day - 1) % 7 === 0 && day !== 1) {
                row += "</tr><tr>";
            }

            var fullDate = date.getFullYear() + "-" + 
                           String(date.getMonth() + 1).padStart(2, "0") + "-" + 
                           String(day).padStart(2, "0");
            console.log("fullDate " + fullDate);

            // 날짜 클릭 시 Calendar.handleDateClick 호출
            row += "<td class='calendar-day' data-date='" + fullDate + 
                   "' onclick=\"Calendar.handleDateClick('" + fullDate + "')\">" + day + "</td>";
        }

        row += "</tr>";
        calendarBody.innerHTML = row;
    },
    

	// todoPlus: To-Do 입력 필드의 값을 읽어와 후속 작업 수행
	todoPlus: function(){
	    var todoInput = document.getElementById("todo-input");
	    if (todoInput) {
	        var todoValue = todoInput.value.trim(); // 입력값 가져오기

	        if (todoValue === "") {
	            alert("할 일을 입력해주세요.");
	            return;
	        }

	        alert("입력된 할 일: " + todoValue);
	        var todoParams = {"ServerCode":sessionStorage.getItem("currentServerCode"), "todoInput": todoValue, "thisPageDate": Calendar.thisPageDate};
	        
			AJAX.call("../JSP/todoInsert.jsp", todoParams, function(data) {
	            if (data.trim() === "OK") {
	                alert("할 일이 추가되었습니다.");
	                todoInput.value = ""; // 입력 필드 초기화
	            } else {
	                alert("추가 실패 ㅠㅠ");
	            }
	        });
	    } else {
	        alert("todo-input 요소를 찾을 수 없습니다.");
	    }
	},

	todoShow : function(date){
		//writer버그
		var dateParams = {"POST_DATE": date, "ServerCode": sessionStorage.getItem("currentServerCode")};
		AJAX.call("../JSP/todoGet.jsp", dateParams, function(data) {
		    var feeds = JSON.parse(data.trim());
		    console.log("feed는: " + feeds);

		    if (feeds.length > 0) {
		        Calendar.minNo = feeds[feeds.length - 1].TODO_CODE;
		        Calendar.recentNo = feeds[feeds.length - 1].TODO_CODE;
		    }
		    console.log("minNo는? " + Calendar.minNo);

		    if (feeds.length != 0) {
		        Calendar.showCalendarTODO(feeds);
		    } else {
		        Calendar.showCalendarNothing();
		    }
		});
	},
	
	getFeedCode: function(feed) {
		//수정 부분
	    var clickCode = feed.TODO_CODE; //이게 식별자 id랑 같은 역할
		var content = feed.TODO_CONTENT; //내용
		var writer = feed.TODO_WRITER; //작성자
		var isDone = feed.IS_DONE ? "done" : ""; //완료 여부 확인 추가해야함
		
		var str = `<div class="todo-item ${isDone}" id="todo-${clickCode}">`;
			str += `<span class="todo-writer" id="todo-writer-${clickCode}">[${writer}]</span> `;
		   str += `<span class="todo-text" id="todo-text-${clickCode}" onclick="toggleExpand(${clickCode})">${content}</span>`;
		   str += `<div>`;
		   str += `<button onclick="toggleTodo(${clickCode})"><i class="fa-solid ${isDone ? 'fa-rotate-left' : 'fa-check'}"></i></button>`;
		   str += `<button onclick="editTodo(${clickCode})"><i class="fa-solid fa-pen"></i></button>`;
		   str += `<button onclick="deleteTodo(${clickCode})"><i class="fa-solid fa-trash-can"></i></button>`;
		   str += `</div>`;
		   str += `</div>`;
		   
		   //toggleTodo는 완료 여부 판단 함수
		   //editTodo는 수정 함수 
		   //deleteTodo는 삭제 함수
		   //toggleExpand는 긴 내용 ...으로 더보기 기능 구현한 함수

		   /* function toggleExpand(id) {
		       const todoText = document.getElementById(`todo-text-${id}`); // 특정 id를 가진 요소 찾기
		       if (!todoText) return; // 요소가 없으면 함수 종료

		       if (todoText.classList.contains("expanded")) {
		         todoText.classList.remove("expanded"); // 축소
		       } else {
		         todoText.classList.add("expanded"); // 펼치기
		       }
		     }
			 
			 function toggleTodo(id) {
			     todoList = todoList.map((todo) =>
			       todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
			     );
			     renderTodoList(); //사용자가 클릭한 항목에서 id를 비교해서 배열에서 해당 항목을 찾고
			     //체크 버튼을 누르냐, 로테이션 버튼을 누르냐에 따라 isDone 값이 바뀜
			   }
			   // 할 일 삭제 함수
			   function deleteTodo(id) {
			     todoList = todoList.filter((todo) => todo.id !== id);
			     renderTodoList(); //마찬가지로 클릭한 항목에서 id를 비교해서 배열에서 해당 항목을 찾고 filter 함수로 새로운 배열 반환
			   }

			   // 할 일 수정 함수
			   function editTodo(id) {
			     const todoItem = todoList.find((todo) => todo.id === id);
			     if (!todoItem) return;

			     // 기존 span을 input으로 변경
			     const todoTextElement = document.getElementById(`todo-text-${id}`);
			     todoTextElement.outerHTML = `<input class = "input_style" type="text" id="edit-${id}" value="${todoItem.content}" 
			     onkeypress="updateTodo(event, ${id})"/>`;

			     // 자동 포커스
			     setTimeout(() => {
			       document.getElementById(`edit-${id}`).focus();
			     }, 100);
			   }

			   //수정 내용 저장 함수
			   function updateTodo(event, id) {
			     if (event.key === "Enter") {
			       //엔터 키 누르면 저장되도록
			       const updatedContent = event.target.value;
			       todoList = todoList.map((todo) =>
			         todo.id === id ? { ...todo, content: updatedContent } : todo
			       );
			       renderTodoList();
			     }
			   }
*/

		   return str;
	},
	
};
