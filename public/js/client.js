(function ($) {
	var msgtpl_left = $('#msgtpl-left').html();
	var msgtpl_right = $('#msgtpl-right').html();
	var usertpl_left = $('#usertpl-left').html();
	var usertpl_right = $('#usertpl-right').html();
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

	socket.on('newUser', function(user){  console.log(Mustache.render(usertpl_left, user), user);
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