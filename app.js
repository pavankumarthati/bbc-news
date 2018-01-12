var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

app.use(bodyParser.json({type: 'application/*+json'}))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/', router);
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

router.get('/', function (req, res) {
  res.send({"status": "success"});
});

app.listen(3222, function () {
  console.log("I'm started");
});