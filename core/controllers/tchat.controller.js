
exports.controller = function (app) {
    app.get('/tchat', function (req, res) {
        res.render('tchat.html.twig', {});
    });

};