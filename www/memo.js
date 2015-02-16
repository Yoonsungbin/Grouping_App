// 탭에서 넘어갈때 깜빡임 없애줌
$.mobile.defaultPageTransition = 'none'
$.mobile.defaultDialogTransition = 'none'
$.mobile.buttonMarkup.hoverDelay = 0

// 업무에서 드래그 앤 드롭 관련
$(document).bind('pageinit', function() {
	$( "#pre_memolist" ).sortable({ // id가 pre_memolist인것을 sortable하겠다.
		handle:".ui-icon-bars",	//아이콘(bars) touch시만 drag & drop
		items: 'li[id!=headermenu]' // 맨 윗줄 list-dvider는 drag & drop 금지
	});
	$( "#pre_memolist" ).disableSelection();
	$( "#pre_memolist" ).bind( "sortstop", function(event, ui) {
		$('#pre_memolist').listview('refresh');
	});
});

//업무 클릭시 memo_show.html로 넘어감
$(document).on("click", ".memolist", function() {
	var tempid = $(this).parent().attr('id');
	console.log('hi');
	console.log('asdjklqjwkldjklasjdkljklqjwkljdaklsjdklqwjdklasjkldjqklwjklasjkldjklasjdklasjdq');
	console.log(tempid);
	console.log(this.id);
	localStorage.setItem("Project_Work_Id", tempid);
	location.replace('memo_show.html');
});

//업무리스트에서 X표시 클릭시 팝업 표시
$(document).on("click", ".deletememo", function() {
	var tempid = $(this).parent().attr('id');
	localStorage.setItem('Select_Project_Id',  $(this).parent().attr('id'));
	$('#deletememo').popup("open");
});

//업무리스트를 디비와 연동해서 보여지게 하는 부분
$.ajax({
		url : 'http://165.132.221.182:8080/appviewmemo',
		dataType : 'json',
		type : 'POST',
		data : {
			'Project_Id' : localStorage.getItem('Project_Id'),
			'User_Name' : localStorage.getItem('User_Name')
		},
		success : function(result) {
			var Work_Name = new Array();
			var Work_DueDate = new Array();
			var Work_Id = new Array();
			var memodataform = JSON.stringify(result);
			var memotemp = JSON.parse(memodataform);
			console.log(memotemp);
			console.log(memodataform);
			console.log('momo count : ' + memotemp.Work_Length);
			var memocount = memotemp.Work_Length;
			for (var i = 0; i < memocount; i++) {
				Work_Id[i] = memotemp.Work_Id[i];
				Work_Name[i] = memotemp.Work_Name[i];
				if(memotemp.Work_DueDate[i]==null){
					Work_DueDate[i] = 0;

				} else {
					Work_DueDate[i] = memotemp.Work_DueDate[i];
				}
				console.log(Work_Id[i]);
				console.log(Work_Name[i]);
				console.log(Work_DueDate[i]);
			}
			var memolist = [];
			for (var i = 0; i < memocount; i++) {
				memolist.push({
					'Work_Name' : Work_Name[i],
					'Work_Id' :Work_Id[i],
					'Work_DueDate' :  Work_DueDate[i]
				});
			}
			var text = "";
			
			$.each(memolist, function(index,item) {
				text += "<li id ='"+item.Work_Id+"' class='ui-state-default'>"+"<a class='memolist' href='' rel='external'>"+"<span class='ui-icon ui-icon-bars ui-btn-icon-left'></span>"+"<span class='ui-li-count'>D-Day:"+item.Work_DueDate+"</span>"+ item.Work_Name+ "<a href='' class ='deletememo' data-rel='popup' data-position-to='window' data-transition='pop'>삭제</a></li>"			
			});

			$('#pre_memolist').append(text).listview('refresh');
			console.log('출력 완료');
		}

	});


//업무리스트에서 X 표시 클릭시 뜨는 팝업에서 삭제 클릭시 동작함수
function deletememo(){
		var deleteid = localStorage.getItem('Select_Project_Id');
		$.ajax({
			url : 'http://165.132.221.182:8080/appdeletememo',
			dataType : 'json',
			type : 'POST',
			data : {'Delete_MemoId' : deleteid},
			success : function(data) {	
				location.replace('tab_memo.html');											
			}
		});	
	}

//업무 추가에서 멤버 선택 함수
function selectmember() {
		console.log('selectmember 시작');
		console.log(localStorage.getItem('Project_Id'));
		$.ajax({
			url : 'http://165.132.221.182:8080/appgetprojectmember',
			dataType : 'json',
			type : 'POST',
			data : {
				'Project_Id' : localStorage.getItem('Project_Id')
			},
			success : function(result) {
				var Project_Member_Name = [];
				var Member_Id = [];
				var dataform = JSON.stringify(result);
				var temp = JSON.parse(dataform);
				console.log(temp[0]);
				var count = temp[0].In_Member.length;
				var list = [];	


				console.log(count);

				for (var i = 0; i < count; i++) {
					list.push({'user': temp[0].In_Member[i], 'id':temp[0]._id[i]});		
				}

				var index = 0;

				var text = "";
				$.each(list, function(index, item) {
					text += "<option value="+item.id+">" + item.user
					+ "</option>";
				});			
				$('#select-participant').empty();
				$('#select-participant').listview().listview('refresh');
				$('#select-participant').append(text).listview('refresh');
				text = "";
				index = 0;
				list = [];
			}
		});
	}

//설정패널에서 다른 곳으로 넘어갈 때
function mypagefunc(){
		location.replace('mypage.html');
	}
	function project_selectfunc(){
		location.replace('project_select.html');
	}
	function App_communityfunc(){
		location.replace('App_community.html');
	}
	function logout(){
		location.replace('index.html');
	}

//업무 추가 버튼 클릭시 
function memoaddfunc() {
		var Work_Person = new Array();
		var sel = document.getElementsByTagName('select').item(0);
		$('#select-participant > option:selected').each(function() {
			var User_Info = new Object();
			console.log($(this).text());
			User_Info.User_Name = $(this).text();
			User_Info.User_Id = $(this).val();
			Work_Person.push(User_Info);
			console.log(Work_Person);
		});
		var dataform = JSON.stringify(Work_Person);
		$.ajax({
			url : 'http://165.132.221.182:8080/appaddmemo',
			dataType : 'json',
			type : 'POST',
			data : {
				'Project_Id' : localStorage.getItem('Project_Id'),
				'Work_Name' : $('#m_sbj').val(),
				'Work_Memo' : $('#m_textarea').val(),
				'Work_Sday' : $('#m_date_start').val(),
				'Work_Dday' : $('#m_date_end').val(),
				'Work_Finish' : 'ing',
				'Work_Person' : dataform
			},
			success : function(result) {
				console.log('success');
			}
		});
		location.replace('tab_memo.html');
	}

//프로젝트에 멤버 추가시 사용되는 함수
function addprojectmember() {
	$.ajax({
		url : 'http://165.132.221.182:8080/addprojectmember',
		dataType : 'json',
		type : 'POST',
		data : {
			'Project_Id' : localStorage.getItem('Project_Id'),
			'Member_Email' : $("#member_name").val(),
			'User_Email' : localStorage.getItem('User_Email'),
			'User_Pass' : localStorage.getItem('User_Pass')
			//프로젝트 내용
		},
		success : function(result) {

			console.log('success');

			//$('#add_member').popup("close");
			$('#add_member').popup("close");
		}
	});
}