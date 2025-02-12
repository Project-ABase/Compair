# **자바 풀스택 과정 1st 프로젝트 - 6조**  
## 🌟 팀원 구성  
| ![김재현](https://github.com/kod0406.png) | ![류재열](https://github.com/fbwoduf112.png?size=100) | ![남현](https://github.com/hyun3138.png?size=100) | ![이소영](https://github.com/SoYoungLEE-me.png?size=100) |
| --- | --- | --- | --- |
| 김재현 (팀장) | 류재열 |  남현 | 이소영 |

<br>

##  🌟 프로젝트 소개  
**프로젝트명** : **COM_PAIR**

✨ *모두를 연결하는 협업 공간*
![Image](https://github.com/user-attachments/assets/e80abeb3-edb8-4da1-8808-4c171bf7f8bf)

<br>  **간단한 소개**  

> COM-PAIR는 그룹웨어 서비스로 협업을 위한 환경과 공간을 고민하며 구상되었습니다.  
<br> 서버 단위의 그룹 관리 시스템을 기반으로, 유저가 원하는 서버(그룹)에 가입하고 해당 서버에서 다양한 협업 기능을 활용할 수 있도록 설계되었습니다.  
> 유저는 각 서버마다 가입 기능을 실행할 수 있고 게시판, 캘린더 To-do-list 를 통한 그룹 일정 관리, 이메일 등의 기능을 통해 협업을 위한 관리를 진행할 수 있습니다.

🎯 **핵심 기능**
* 다중 서버 기반 협업 플랫폼
* 게시판을 통한 정보 공유 (파일 업로드 지원)
* 캘린더 & 공용 TODO 리스트로 일정 및 할 일 관리(멤버 태그 지원)
* 이메일 시스템을 통한 커뮤니케이션

<br>**역할 분담** 
| 팀원 | 역할 | 주요 구현 기능 |
| --- | --- | --- |
| **김재현** | 백엔드 개발 | - **캘린더 TODO 관리:** TODO CRUD 기능 구현 <br> - **투두리스트:** 태그된 TODO 조회, 서버별 TODO 출력 <br> - **이메일 시스템:** 수신/송신 메일 열람, 조회, 작성, 삭제 <br> - **서버(그룹) 관리:** 서버 생성 (공동 구현) |
| **류재열** | 백엔드 개발 | - **페이지 로드 AJAX 구현** <br> - **세션 관리:** 세션 저장 및 유지 (서버 변경 후에도 유지) <br> - **게시판 기능:** 게시글 작성 및 조회 <br> - **서버(그룹) 관리:** 서버 생성(공동 구현), 서버 변경, 서버 변경 버튼 구현 |
| **남현** | 백엔드 개발 | - **회원 관리 시스템:** 로그인, 회원가입, 회원 찾기 기능 <br> - **마이페이지:** 회원 정보 수정 및 탈퇴 기능 |
| **이소영** | 프론트엔드 개발 | - **반응형 UI 설계 및 구현** <br> - **TODO 리스트 태그 기능 (프론트엔드)** 
| **이소영** | 프론트엔드 개발 | - **전체 UI 설계, 구현 및 반응형 페이지 구현** <br> - **TODO 리스트 태그 기능 (프론트엔드)** 
<br>

## 🌟 개발 환경  

📌 **Backend**  
-  Java 17 (JSP)
-  Tomcat 10.1 (서버 실행 환경)

📌 **Frontend**  
- HTML / CSS / JavaScript
- BootStrap

 📌 **Development Tool**
 -  Eclipse IDE 2024-12(2.34.0) 

📌 **Database**  
-  Oracle 21c

📌 **협업 도구**  
- Git & GitHub 
- Discord (팀 커뮤이케이션)

<br>

## 🌟 개발 기간 및 작업 관리  
⏳ **개발 기간**  
- **시작일 : 2025-01-21**
- 중간 연휴 : 2025-01-27 ~ 2025-01-30
- **종료일 : 2025-02-12**

📌 **작업 일정**
![Image](https://github.com/user-attachments/assets/c36321bc-2d7f-4403-8a5e-9e4f6a2b3713)


  <br>

## 🌟 대표 기능 소개  
📌 **주요 기능**<br>  

 **1. 회원 관리**   
    ✔ 회원 가입, 로그인, 회원 정보 수정, 회원 탈퇴<br>   
    ![Image](https://github.com/user-attachments/assets/9cd00761-43c8-47a2-815b-ea8b5f05c827)

 **2. 서버 (그룹) 시스템**   
    ✔ 사용자는 여러 개의 서버(그룹)에 가입 가능  
    ✔ 서버별로 게시판, 캘린더, TODO 리스트, 이메일 기능이 독립적으로 운영됨<br>  
    ![Image](https://github.com/user-attachments/assets/d31cd364-2b69-4de6-8589-b8e8da5a5267)

 **3. 게시판**   
    ✔ 게시글 업로드 기능 제공  
    ✔ 업로드된 게시글 목록 확인 가능  
    ✔ 이미지 및 문서 업로드 지원<br>  
    ![Image](https://github.com/user-attachments/assets/d31cd364-2b69-4de6-8589-b8e8da5a5267)

 **4. 캘린더를 통한 To-Do-List**   
    ✔ 캘린더 날짜를 클릭하면 해당 날짜에 TODO 리스트 추가 가능  
    ✔ 일정에 팀원 태그 기능을 활용하여 담당자를 지정 가능  
    ✔ 팀원들은 자신의 업무를 쉽게 확인하고 관리 가능  
    ✔ 각 To-Do 항목들은 완료 표시, 수정, 삭제 가능<br>  
    ![Image](https://github.com/user-attachments/assets/33af1863-3357-4017-8626-c6ff0acaa52e)

 **5. My To-Do-List**  
    ✔ 내가 태그된 할 일(TODO)을 날짜별로 볼 수 있음    
    ✔ 개별 TO-DO-List에서도 항목별로 완료 표시, 수정, 삭제 가능<br>
    ![Image](https://github.com/user-attachments/assets/560fba99-c3e5-463a-89ef-107d50989542)

 **6. 이메일**   
     ✔ 사용자 간 이메일 송수신 기능 지원  
     ✔ 메일을 보낸 메일, 받은 메일로 구분하여 관리 가능  
     ✔ 메일을 열어 내용 확인 및 답장 가능<br>
     ![Image](https://github.com/user-attachments/assets/e2558f48-75a9-4c5a-a6bf-491dae9f49b0)
     
<br>

## 🌟 실행 방법  
```bash
① 해당 레포지토리를 클론하여 Import한다.
② 프로젝트의 SQL스크립트에 맞게 Oracle DB를 설정한다.
③ tomcat서버를 실행하고 프로젝트를 실행한다.
```

<br>

## 🌟 팀원 GitHub  
- 👨‍💻 **김재현** : [GitHub](https://github.com/kod0406)  
- 👨‍💻 **류재열** : [GitHub](https://github.com/fbwoduf112)  
- 👨‍💻 **남현** : [GitHub](https://github.com/hyun3138)  
- 👩‍💻 **이소영** : [GitHub](https://github.com/SoYoungLEE-me)

## 📖 프로젝트 후기  

### 🔍 김재현

JSP를 활용하여 Todo 캘린더와 메시지 기능을 구현한 이번 프로젝트에서는 기술적인 성과 못지않게 팀 협업 경험을 중요하게 생각했습니다. 프로젝트 초기에 기능 분할이 명확하지 않아 코드가 복잡해지면서 디버깅에 어려움을 겪었고, 팀원들의 개발환경 통합 과정에서도 많은 시행착오가 있었습니다. GitHub을 통한 협업 프로세스를 익히고 팀원들과의 원활한 소통을 최우선 과제로 삼았으며, 이 과정에서 체계적인 기능 분할과 환경 설정의 중요성을 깊이 깨달을 수 있었습니다. 개발 과정에서 발생한 여러 버그들을 해결하면서 시간 압박으로 인해 트러블슈팅 과정을 상세히 기록하지 못한 점이 아쉬움으로 남지만, 전반적으로 유의미한 협업 경험을 쌓을 수 있었던 프로젝트였습니다.

### 🍔

### 🌠

### 🎱


### 🎱
