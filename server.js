// server.js

// BASE SETUP
// ==============================================

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const fs = require('fs');

// Type 3: Persistent datastore with automatic loading
var Datastore = require('nedb')
    , db = new Datastore({ filename: './src/data/todos.db', autoload: true });

// This will help to load other included files in index.html
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//app.set('views', ['./src/assets']) // specify the views directory
//app.set("view options", { layout: false });
app.use(express.static(__dirname));

// ROUTES
// ==============================================

// Get all todo items
app.get('/api/todos', function (req, res) {
    // Find all documents in the collection
    db.find({}, function (err, docs) {
        if (err) {
            return err;
        }
        res.status(200).send(docs);
    });

});

app.post('/api/addTodo', function (req, res) {
    var doc = {
        title: req.body.title,
        status: req.body.status,
        today: new Date()
    };

    db.insert(doc, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
        res.status(200).send(newDoc);
    });
});

app.put('/api/updateTodo', function (req, res) {
    console.log("Update Todo item :", req.body, req.params);
    //res.status(200).send({ message: 'Item updated successfully in database.' });

    // Set an existing field's value
    db.update({ _id: req.body.id }, { $set: { title: req.body.title } }, { multi: false }, function (err, numReplaced) {
        db.find({}, function (err, docs) {
            if (err) {
                return err;
            }
            res.status(200).send(docs);
        });
    });
});

app.delete('/api/removeTodo', function (req, res) {
    console.log("Delete Todo item :", req.body, req.params);
    db.remove({ _id: req.body.id }, {}, function (err, numRemoved) {
        console.log('Item removed', numRemoved);
        res.status(200).send({ message: 'Item removed successfully from database.' });
    });
});

// Handle 404 Error
app.use(function (req, res) {
    res.status(400).send({ body: '404: File Not Found', data: "Plese Go Back to Home page." });
});

// Handle 500 Error
app.use(function (error, req, res, next) {
    res.status(500).send({ body: '500: Internal Server Error', data: error });
});

// START THE SERVER
// ==============================================

app.listen(port, function () {
    console.log(`Server is listening at http://localhost:${port}/`);
});
