var md5 = require('md5');
exports.controller = function (app) {
    app.get('/tchat', function (req, res) {
        res.render('tchat.html.twig', {user: req.session.user});
    });

    var io = app.get('io');
    var users = [];
    var messages = [];
    var history = 5;

    io.sockets.on('connection', function (socket) {
        var me = false;

        for (var k in users) {
            socket.emit('newUser', users[k]);
        }

        for (var m in messages) {
            socket.emit('addMsg', messages[m]);
        }

        socket.on('login', function (user) {

            me = {};
            me.id = user.id;
            me.username = user.username;
            me.mail = user.email;
            me.time = new Date();
            me.avatar = 'https://gravatar.com/avatar/' + md5(user.email) + '?s=50';
            users[me.id] = me;
            io.sockets.emit('newUser', me);
        });

        socket.on('disconnect', function () {
            if (!me)
                return false;

            delete users[me.id]; 
            io.sockets.emit('exitUser', me);

        });

        socket.on('newMsg', function (msg) {
            msg.user = me;
            date = new Date();
            msg.h = date.getHours();
            msg.m = date.getMinutes();
            messages.push(msg);
            if (messages.length > history) {
                messages.shift();
            }
            io.sockets.emit('addMsg', msg);

        });

    });


};