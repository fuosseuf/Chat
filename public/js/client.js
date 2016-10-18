(function ($) {
	var msgtpl_left = '<div class="chat-box-left">{{message}}</div><div class="chat-box-name-left"><img src="{{user.avatar}}" alt="{{user.username}}" class="img-circle" />-  {{user.username}}</div><hr class="hr-clas" />';
	var msgtpl_right = '<div class="chat-box-right">{{message}}</div><div class="chat-box-name-right"><img src="{{user.avatar}}" alt="{{user.username}}" class="img-circle" />-  {{user.username}}</div><hr class="hr-clas" />';
	var usertpl_left = '<div class="chat-box-online-left"><img src="{{avatar}}" alt="{{username}}" class="img-circle" />- {{username}}<br />( <small>Active from 3 hours</small> )</div><hr class="hr-clas-low" />';
	var usertpl_right = '<div class="chat-box-online-right"><img src="{{user.avatar}}" alt="{{username}}" class="img-circle" />- {{username}} <br />( <small>Active from 3 hours</small> )</div><hr class="hr-clas-low" />';
	$('#msgtpl-left').remove();
	$('#msgtpl-right').remove();
	$('#usertpl-left').remove();
	$('#usertpl-right').remove();
	var socket = io.connect('http://localhost:3030');

	socket.emit('login', {
			username: $('#datas').attr('username'),
			email: $('#datas').attr('email'),
			id: $('#datas').attr('userid'),
		});

	socket.on('newUser', function(user){  console.log(user, usertpl_left);
		$('#users').append(Mustache.render(usertpl_left, user));
	});

	socket.on('exitUser', function(user){
		$('#'+user.id).remove();
	});

	socket.on('logged', function(){
		$('#message').focus();
	});

	socket.on('error', function(err){
		alert(err);
	})

	/*
	* envoi d'un message
	**/
	$('#form').submit(function(e){
		e.preventDefault();
		socket.emit('newMsg', {
			message: $('#message').val()
		});
		$('#message').val('')
		$('#message').focus();
	});

	/*
	* Reception message
	*/
	socket.on('addMsg', function(msg){
		$('#messages').append(Mustache.render(msgtpl_right, msg));
	})


})(jQuery)