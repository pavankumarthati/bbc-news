var express = require('express');
var bodyParser = require('body-parser');
var appServer = require(__dirname + '/utils/server');
var port = process.env.PORT || 3222;

var app = express();
var router = express.Router();

app.use(bodyParser.json({type: 'application/*+json'}));
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

router.post('/api/news', appServer.addNews);
router.get('/api/news', appServer.getNews);

app.listen(port, function () {
  console.log("I'm started");
});