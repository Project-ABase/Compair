 var Calendar = {
	init:function(){
		let today = new Date().toISOString().split('T')[0];
		AllSession.dateSession(today); 
	},
	
	todoShow : function(){
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
		var tagValues = tagify.value; //tag 값 저장 변수
		var tags = tagValues.map((item) => item.value); //tag를 저장
		//추가 기능에 tag도 추가해야함.
		var tagInput = document.getElementById("todo-tag-input");
	    var todoInput = document.getElementById("todo-input");
		var tagparams = tags.join(" ");
		alert(tagparams);
	    if (todoInput) {
	        var todoValue = todoInput.value.trim();

	        if (todoValue === "") {
	            alert("할 일을 입력해주세요.");
	            return;
	        }
			else if(AllSession.serverGet() == 'null'){
				alert("서버를 선택해주세요");
				return;
			}
	        var todoParams = {"tagInput":tagparams, "ServerCode":AllSession.serverGet(), "todoInput": todoValue, "thisPageDate": AllSession.dateGet()};
	        
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
	    var clickCode = feed.TODO_CODE; // To-Do의 고유 식별자
	    var content = feed.TODO_CONTENT; // 할 일 내용
	    var writer = feed.TODO_WRITER; // 작성자
		var tag = feed.TODO_TAGS;
	    var isDone = feed.TODO_CHECK; //추가 필요
		//if(feed.CHECK == 1) isDone = true;
	    var str = `<div class="todo-item ${isDone}" id="todo-${clickCode}">`;
	   	str += `<span class="todo-writer" id="todo-writer-${clickCode}">[${writer}]</span>`;
		str += `<span class="todo-text" id="todo-text-${clickCode}" onclick="toggleExpand(${clickCode})">${content}</span>`;
		str += `<div class="todo-tags">${tag}</div>`;
		    // 태그가 있는 경우 태그 출력
		
	    //버튼 추가
	    str += `<div>`;
	    str += `<button onclick="Calendar.toggleTodo(${clickCode})"><i class="fa-solid ${isDone ? 'fa-rotate-left' : 'fa-check'}"></i></button>`;
	    str += `<button onclick="Calendar.editTodo(${clickCode})"><i class="fa-solid fa-pen"></i></button>`;
	    str += `<button onclick="Calendar.deleteTodo(${clickCode})"><i class="fa-solid fa-trash-can"></i></button>`;
	    str += `</div>`;
	    str += `</div>`; // todo-item 닫기

	    return str;
	},
	
	toggleTodo: function(id) {
	    // id를 이용해 해당 할 일 항목의 최상위 div 요소를 가져옵니다.
	    var todoItem = document.getElementById("todo-" + id);
	    if (!todoItem) return; // 요소가 없으면 종료

	    // 현재 완료 상태는 "done" 클래스의 존재 여부로 판단합니다.
	    var isDone = todoItem.classList.contains("done");
	    
	    // 관련된 텍스트 요소를 가져옵니다.
	    var textSpan = document.getElementById("todo-text-" + id);
	    // 토글 버튼의 아이콘 요소를 찾습니다.
	    var toggleButtonIcon = todoItem.querySelector("button:first-child i");
	    
	    if (isDone) {
	        // 현재 완료 상태라면 → 미완료 상태로 변경
	        todoItem.classList.remove("done");
	        // 미완료 상태일 때는 밑줄 효과 적용 (feed.TODO_CHECK가 0인 경우)
	        if (textSpan) {
	            textSpan.classList.add("underline");
	        }
	        // 토글 아이콘도 변경 (미완료이면 체크 아이콘)
	        if (toggleButtonIcon) {
	            toggleButtonIcon.classList.remove("fa-rotate-left");
	            toggleButtonIcon.classList.add("fa-check");
	        }
	    } else {
	        // 현재 미완료 상태라면 → 완료 상태로 변경
	        todoItem.classList.add("done");
	        // 완료 상태일 때는 밑줄 제거
	        if (textSpan) {
	            textSpan.classList.remove("underline");
	        }
	        // 토글 아이콘도 변경 (완료이면 복구 아이콘)
	        if (toggleButtonIcon) {
	            toggleButtonIcon.classList.remove("fa-check");
	            toggleButtonIcon.classList.add("fa-rotate-left");
	        }
	    }
		alert(AllSession.uidGet());
		var params ={"ServerCode":AllSession.serverGet(), "todoCode":id, "writer":AllSession.uidGet()};
		AJAX.call("../JSP/todoUpdate.jsp", params, function(data) {
		    if (data.trim() === "OK") {
				alert("업데이트 성공");
		    } else {
		        alert("네트워크 에러가 발생되었습니다.!!");
		    }
		});
	},

	
	deleteTodo:function(id) {
	  todoList = todoList.filter((todo) => todo.id !== id);
	  renderTodoList();
	}
	/*
	// 완료 상태 토글 함수


	    // 할 일 삭제 함수


	    function editTodo(id) {
	      const todoItem = todoList.find((todo) => todo.id === id);
	      if (!todoItem) return;

	      // 기존 <span> 요소를 찾아서 <input>으로 변환
	      const todoTextElement = document.getElementById(`todo-text-${id}`);
	      if (!todoTextElement) return; // 요소가 없으면 종료

	      // 새로운 <input> 요소 생성
	      const inputElement = document.createElement("input");
	      inputElement.type = "text";
	      inputElement.className = "input_style";
	      inputElement.id = `edit-${id}`;
	      inputElement.value = todoItem.content;

	      // 입력한 내용을 저장하는 이벤트 추가
	      inputElement.addEventListener("keypress", function (event) {
	        if (event.key === "Enter") {
	          updateTodo(id, inputElement.value);
	        }
	      });

	      // 기존 <span>을 <input>으로 교체
	      todoTextElement.replaceWith(inputElement);

	      // 입력창에 자동 포커스
	      inputElement.focus();
	    }

	    function updateTodo(id, newContent) {
	      if (!newContent.trim()) {
	        alert("할 일을 입력하세요!");
	        return;
	      }

	      // todoList에서 해당 id를 가진 항목 찾고 업데이트
	      todoList = todoList.map((todo) =>
	        todo.id === id ? { ...todo, content: newContent } : todo
	      );

	      // 화면 다시 렌더링
	      renderTodoList();
	    }

	    // 긴 내용 펼치기 함수
	    function toggleExpand(id) {
	      const todoText = document.getElementById(`todo-text-${id}`);
	      if (!todoText) return;
	      todoText.classList.toggle("expanded");
	    }

	    function initializeTodo() {
	      const addTodoButton = document.getElementById("add-todo-button");
	      const todoInput = document.getElementById("todo-input");

	      addTodoButton.addEventListener("click", function () {
	        addTodo(todoInput.value);
	        todoInput.value = ""; // 입력 필드 초기화
	      });

	      renderTodoList(); // 초기 렌더링
	    }
	
	 */

};
