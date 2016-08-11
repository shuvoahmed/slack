var express = require('express');
var app = express();
var fs = require('fs');

var dbapp = require('./app.js');

app.use(express.static('public'));
app.use(express.static('files'));

// fs.readFile('./public/images/pokemon1.jpg',(err,data) => {
//     if (err) {
//         throw err;
//     }

//     app.get('/', function(req, res) {
//         res.send(data);
//     });
// });


app.get('/', function(req, res) {
    console.log("Application Base...");
    res.send('Hello World!');
});

app.get('/tweets', function(req, res){  //'tweets/:id/'; var id = req.params.id;
    console.log("/tweets");
    res.sendFile(__dirname + "/" + "public/web/userOwnTweets.html")
});

app.get('/get_tweets', function(req, res){
    console.log("/get_tweets");
    // console.log(dbapp.p2);
    // res.send(JSON.stringify(dbapp.p2));

    dbapp.getUserTweetsJSON('shuvo').then(
         (val) => {
            console.log(val);
            res.send(val);
         },
         (err) => {
             console.log('Oh No', err);
         }
     )
});

app.get('/get_tweets/:id/', function(req, res){
    console.log("/get_tweets/:id/");
    // console.log(dbapp.p2);
    // res.send(JSON.stringify(dbapp.p2));
    var id = req.params.id;
    dbapp.getUserTweetsJSON(id).then(
         (val) => {
            console.log(val);
            res.send(val);
         },
         (err) => {
             console.log('Oh No', err);
         }
     )
});

app.listen(3000, function() {
    console.log('Example app listening on port 3000');
});