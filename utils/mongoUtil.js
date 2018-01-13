var MongoDb = require('mongodb');
var MongoClient = MongoDb.MongoClient;
var connection_string = "mongodb://pavankumar:74ls138@ds251737.mlab.com:51737/heroku_pj4s3c40";

var db;
MongoClient.connect(connection_string, function (err, database) {
  if (err) {
    console.log("connection not established");
    return;
  }
  db = database;
  console.log("connection established successfully");
});

var NEWS = "news";

var mongoUtil = {
  getNews : function (query, limit, projection, sort, callback) {
    if (!db) {
      var err = new Error("no connection to db");
      err.status = 500;
      callback(err);
      return;
    }

    db.collection(NEWS).find(query).limit(limit).project(projection).sort(sort).toArray(function (mongoError, news) {
      if (mongoError) {
        console.log("unable to get news from mongodb " + mongoError);
        callback(mongoError)
      } else {
        callback(null, news);
      }
    });
  },
  addNews : function (payload, callback) {
    if (!db) {
      var err = new Error("no connection to db");
      err.status = 500;
      callback(err);
      return;
    }
    db.collection(NEWS).insertOne(payload, function (mongoError, status) {
      if (mongoError) {
        callback(mongoError);
      } else {
        callback(null, payload);
      }
    })
  }

};

module.exports = mongoUtil;

