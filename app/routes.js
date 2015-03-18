// grab the nerd model we just created

    module.exports = function(app) {

        // server routes ===========================================================
        // handle things like api calls
        // authentication routes
        app.get('/', function(req, res) {

            res.status(200).send('yes!');
        });


       

        // route to handle creating goes here (app.post)
        // route to handle delete goes here (app.delete)

        // frontend routes =========================================================
        // route to handle all angular requests
        app.get('*', function(req, res) {
            res.sendfile('./public/index.html'); // load our public/index.html file
        });

    };