(function ($) {
    var msgtpl_left = '<li class="left clearfix" userId="{{user.id}}">' +
            '<span class="chat-img pull-left">' +
            '<img src="{{user.avatar}}" alt="{{user.username}}">' +
            '</span>' +
            '<div class="chat-body clearfix">' +
            '<div class="header">' +
            '<strong class="primary-font">{{user.username}}</strong>' +
            '<small class="pull-right text-muted"><i class="fa fa-clock-o"></i>{{h}}:{{m}}</small>' +
            '</div>' +
            '<p>{{message}}</p>' +
            '</div>' +
            '</li>';
    var msgtpl_right = '<li class="right clearfix" userId="{{user.id}}">' +
            '<span class="chat-img pull-right">' +
            '<img src="{{user.avatar}}" alt="{{user.username}}">' +
            '</span>' +
            '<div class="chat-body clearfix">' +
            '<div class="header">' +
            '<strong class="primary-font">{{user.username}}</strong>' +
            '<small class="pull-right text-muted"><i class="fa fa-clock-o"></i>{{h}}:{{m}}</small>' +
            '</div>' +
            '<p>{{message}}</p>' +
            '</div>' +
            '</li>';
    var usertpl = '<li class="bounceInDown" id="user-{{id}}"><a href="#" class="clearfix"><img src="{{avatar}}" alt="{{username}}" class="img-circle"><div class="friend-name"><strong>{{username}}</strong> </div></a></li>';
    var usertplFirst = '<li class="active bounceInDown" id="user-{{id}}"><a href="#" class="clearfix"><img src="{{avatar}}" alt="{{username}}" class="img-circle"><div class="friend-name"><strong>{{username}}</strong> </div></a></li>';


    $('#message').focus();

    var socket = io.connect('http://localhost:3030');

    socket.emit('login', {
        username: $('#datas').attr('username'),
        email: $('#datas').attr('email'),
        id: $('#datas').attr('userid'),
    });

    socket.on('newUser', function (user) {  
        if (user.id == $('#datas').attr('userid'))
            $('#users').prepend(Mustache.render(usertplFirst, user));
        else
            $('#users').append(Mustache.render(usertpl, user));
    });

    socket.on('exitUser', function (user) { 
        $('#user-' + user.id).remove();
    });


    /*
     * envoi d'un message
     **/
    $('#submit').on('click', function (e) {
        e.preventDefault();
        if ($('#message').val() != '') {
            socket.emit('newMsg', {message: $('#message').val()});
            $('#message').val('')
        }
        $('#message').focus();
    });

    /*
     * Reception message
     */
    socket.on('addMsg', function (msg) {
        var last = $('#messages li:last'); 
        if (last.attr("userId") == msg.user.id) {
            if (last.hasClass('left'))
                $('#messages').append(Mustache.render(msgtpl_left, msg));
            else
                $('#messages').append(Mustache.render(msgtpl_right, msg));
        } else {
            if (last.hasClass('left'))
                $('#messages').append(Mustache.render(msgtpl_right, msg));
            else
                $('#messages').append(Mustache.render(msgtpl_left, msg));
        }
    })


})(jQuery)