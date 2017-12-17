let ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Version, Authorization, Content-Type");
        res.header("Access-Control-Allow-Methods", "PUT");
        next();
    });

    app.get('/', function(req, res, next) {
        // Handle the get for this route
    });

    app.post('/', function(req, res, next) {
        // Handle the post for this route
    });

    app.put('/', function(req, res, next) {
        // Handle the put for this route
    });



    app.get('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(item);
            }
        });
    });





    app.put('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        const note = {
       //    text: req.body.body,
          title: req.body.title};
        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(note);
            }
        });
    });


    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send('Note ' + id + ' deleted!');
            }
        });
    });


    app.post('/notes', (req, res) => {
        const note = {

          // text: req.body.body,
          title: req.body.title};

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(result.ops[0]);
            }
        });
    });
};