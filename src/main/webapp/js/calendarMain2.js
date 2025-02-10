var Calendar = {
    init: function() {
		$("#todo-title").show();
		$("#calendarList").show();
		$("#todo-list-section").show();
    },

	// 데이터가 없는 경우 메시지 출력
	//calendarShow.js에서 호출 됨
	todoShow : function(){
		$("#todo-list-section").show();
		var dateParams = {"POST_DATE": AllSession.dateGet(), "ServerCode": AllSession.serverGet()};
		AJAX.call("../JSP/todoGet.jsp", dateParams, function(data) {
		    var feeds = JSON.parse(data.trim());
			
			if (feeds.length != 0) {
		        Calendar.showCalendarTODO(feeds);
		    } else {
		        Calendar.showCalendarNothing();
		    }
		});
	},
	
	showCalendarTODO: function(feeds) {
	    var calStr = "";
	    for (var i = 0; i < feeds.length; i++) {
	        // 예시: Board 객체의 getFeedCode 함수로 항목 생성 (필요에 따라 수정)
	        calStr += Calendar.getFeedCode(feeds[i]);
	    }
	    $("#todo-list-section").append(calStr);
	},
	
	showCalendarNothing: function() {
	    var calStr = "아직 아무 데이터도 존재하지 않습니다.";
	    $("#todo-list-section").append(calStr);
	},
	
	// todoPlus: To-Do 입력 필드의 값을 읽어와 후속 작업 수행
	todoPlus: function(){
	    var todoInput = document.getElementById("todo-input");
	    if (todoInput) {
	        var todoValue = todoInput.value.trim();

	        if (todoValue === "") {
	            alert("할 일을 입력해주세요.");
	            return;
	        }
			
	        var todoParams = {"ServerCode":AllSession.serverGet(), "todoInput": todoValue, "thisPageDate": AllSession.dateGet()};
	        
			AJAX.call("../JSP/todoInsert.jsp", todoParams, function(data) {
	            if (data.trim() === "OK") {
	                alert(AllSession.dateGet() + "에 할 일이 추가되었습니다.");
	                todoInput.value = "";
	            } else {
	                alert("네트워크 에러가 발생되었습니다.");
	            }
	        });
	    } else {
	        alert("todo-input 요소를 찾을 수 없습니다.");
	    }
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
