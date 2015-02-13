﻿# Grouping_App
Bit Project App

동구씨 자바스크립트파일 분리해주세요 



## 변경사항 1.0
[README.md 문법 사용법](https://teragoon.wordpress.com/2012/04/04/github%EC%97%90%EC%84%9C-readmemd-%EC%9E%91%EC%84%B1%ED%95%98%EA%B8%B0markdown-%EB%AC%B8%EB%B2%95/)

<전체>
JS 파일 분리
  - Calendar.js
  - Camera_Upload.js
  - Chat.js
  - Memo.js


##====================업무창======================
###헤더
  - 상단 헤더 아이콘만 표시(글씨제거)
  - 상단 설정 패널 내용 추가
	- 프로필 사진, 사용자명, 사용자이메일
  - 상단 오른쪽 헤더 (+)아이콘 추가
	- 아코디언메뉴추가 (멤버추가, 업무추가, 사진업로드)
	
###컨텐트
  - 변경사항 없음
  
###푸터
  - 업무추가 제거

##====================일정창======================
###헤더
  - 상단 설정 패널 내용 추가
	- 프로필 사진, 사용자명, 사용자이메일
	
###컨텐트
  - 변경사항 없음

###푸터
  - 푸터 글씨 제거

##==================부가기능창====================
###헤더
  - 상단 헤더 아이콘만 표시(글씨제거)
  - 상단 설정 패널 내용 추가
	- 프로필 사진, 사용자명, 사용자이메일
  - 상단 헤더 멤버보기 UI 변경
	- 접속 한/안한 멤버 list-divider로 표현
	- 패널 닫기 버튼 추가 
	
###컨텐트
  - 변경사항 없음

###푸터
  - 푸터 글씨 제거

##====================채팅창======================
###헤더
  - 상단 설정 패널 내용 추가
	- 프로필 사진, 사용자명, 사용자이메일
   
##컨텐트
 - 변경사항 없음

##푸터
  - 변경사항 없음

# 현재 문제점
  - 패널에서 닫기 버튼 클릭시 빠르게 닫기를 누르면 작동x(길게 누르면 작동)
  - 채팅창 컨텐트 안에 컨텐트 높이 조절하는 script가 있는데 이를 따로 js파일에 놓으면 작동x
	- 원래는 Chat.js에 있어야 하는데 어쩔수 없이 채팅페이지의 컨텐트 안에 있다.
