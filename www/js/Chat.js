//채팅 부분
var socket = io.connect('http://54.65.21.180:8080');
var User_Name = localStorage.getItem('User_Name');
var Project_Id = localStorage.getItem('Project_Id');
var Time = new Date();
var lastdate = '';


socket.emit('join', {
	User_Name : User_Name,
	Project_Id : Project_Id
});

socket.emit('getgreet', User_Name + '님이 접속하셨습니다.');
console.log('chat join');
socket.on('connect',function() {
	$('form').submit(function() {
		var message = $('#m').val();
		var current_time = Time.getHours() + ":"+ Time.getMinutes();
		socket.emit('getmessage', {
			message : message,
			User_Name : User_Name,
			Time : current_time
			});
		$('#m').val('');
		return false;
		});
	
	socket.on('premessage',function(data) {
		var text = '';
		if (data.NewJoin == User_Name) {
			if (data.Member == User_Name) {
				text += "<div>";
				text += "<span style='display:inline-block; .display:inline; float: right; border: 1px solid blue; margin:auto width:auto'>"
					+ data.message + "</span>";
				text += "<span style='display:inline-block; .display:inline; float: right; margin:auto width:auto'><sub>"
					+ data.Time + "</sub></span>";
				text += "</div><p>&nbsp;</p>";
				$('#messages').append(text);
				} else {
					var text = '';	
					text += "<div>";
					text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto'>"
						+ data.Member + ':'	+ "</span>";
					text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto'>"
						+ data.message + "</span>";
					text += "<span style='display:inline-block; .display:inline; float: left; margin:auto width:auto'><sub>"
						+ data.Time	+ "</sub></span>";
					text += "</div><p>&nbsp;</p>";
					$('#messages').append(text);
					}
			}
		var el = document.getElementById('messages');
		el.scrollIntoView(false);
		});
	socket.on('putgreet', function(msg) {
		$('#messages').append(
				$('<h4 align="center">').text(msg));
		});
	// 접속유저 보이는 곳
	// 접속한 사람을 알기위한 함수
	socket.on('Connect_Member', function(data) {
		if (data == null) {	

		} else {
			var Connect_List = [];
			var Connect_Dataform = JSON.stringify(data);
			var Connect_User = '';
			var Connect = JSON.parse(Connect_Dataform);
			var count = Connect[0].Access_Member.length;
			for (var i = 0; i < count; i++) {
				console.log(Connect[0].Access_Member[i]);
				Connect_List.push({
					'user' : Connect[0].Access_Member[i]
				});
				}
			$.each(Connect_List, function(index, item) {
				Connect_User += "<li class='ui-btn ui-shadow ui-btn-icon-right ui-icon-heart'>"+item.user +"</li>";
				});
			$('#access_user').empty();
			$('#access_user').listview().listview('refresh');
			$('#access_user').append(Connect_User).listview('refresh');
			Connect_User = '';
			Connect_List = '';
			}
		});
	socket.on('Disconnect_Member',function(data) {
		if(data == null ) {
			//alert('aaa');
		}
		else {
			var DisConnect_Dataform = JSON.stringify(data);
			var DisConnect_User = '';
			var DisConnect = JSON.parse(DisConnect_Dataform);
			var DisConnect_Count = DisConnect[0].Access_Member.length;
			var DisConnect_List = [];
			for (var i = 0; i < DisConnect_Count; i++) {
				DisConnect_List.push({'user' : DisConnect[0].Access_Member[i]
				});
				}
			$.each(DisConnect_List, function(index,	item) {
				DisConnect_User +="<li class='ui-btn ui-shadow ui-btn-icon-right ui-icon-heart'>"+item.user + "</li>";
				});
			$('#nonaccess_user').empty();
			$('#nonaccess_user').listview().listview('refresh');
			$('#nonaccess_user').append(DisConnect_User).listview('refresh');
			DisConnect_User = '';
			DisConnect_List = '';
		   }
		});
	socket.on('putmessage',function(data) {
		if (data.User_Name == User_Name) {
			var text = '';
			text += "<div>";
			text += "<span style='display:inline-block; .display:inline; float: right; border: 1px solid blue; margin:auto width:auto'>"
				+ data.message + "</span>";	
			text += "<span style='display:inline-block; .display:inline; float: right; margin:auto width:auto'><sub>"
				+ data.Time + "</sub></span>";
			text += "</div><p>&nbsp;</p>";
			$('#messages').append(text);
			} 
		else {
			var text = '';
			text += "<div>";
			text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto;'>"
				+ data.User_Name + ':' + "</span>";
			text += "<span style='display:inline-block; .display:inline; float: left; border: 1px solid red; margin:auto width:auto;'>"
				+ data.message + "  </span>";
			text += "<span style='display:inline-block; .display:inline; float: left; margin:auto width:auto;'><sub>"
				+ data.Time	+ "</sub></span>";
			text += "</div><p>&nbsp;</p>";
			$('#messages').append(text);
			}
		var el = document.getElementById('messages');
		el.scrollIntoView(false);
		});
	});
