var mongoUtil = require(__dirname + '/mongoUtil');
var MAX_LIMIT = 10;

var appServer = {

  getNews: function (req, res) {
    var id = req.query.id || undefined;
    var max_id = req.query.max_id || undefined;
    var limit = req.query.limit || MAX_LIMIT;

    var query = {};
    var sortBy = {"_id": -1};

    if (id !== undefined && max_id !== undefined) {
     query = {
       $and: [{"_id" : {$gte: id}}, {"_id": {$lte: max_id}}]
     };
    } else if (id !== undefined) {
      query = {"_id" : {$gte: id}};
    } else if (max_id !== undefined) {
      query = {"_id": {$lte: max_id}};
    }

    mongoUtil.getNews(query, limit, {}, sortBy, function (error, results) {
      if (error) {
        console.log("unable to fetch news " + error);
        res.status = error.status;
        res.send({"msg": "unable to fetch news " + error});
      } else {
        res.status = 200;
        res.send(results);
      }
    });


  },
  addNews: function (req, res) {
    if (req.body === null || req.body === undefined) {
      res.status = 400;
      res.send({"msg": "body empty"});
    } else {
      var title = req.body.title || undefined;
      var thumbnail = req.body.thumbnail || undefined;
      var description = req.body.description || undefined;
      var link = req.body.link || undefined;
      var pubDate = req.body.pubDate || undefined;
      var payload = {
        "title": title,
        "thumbnail": thumbnail,
        "description": description,
        "link": link,
        "pubDate": pubDate
      };

      mongoUtil.addNews(payload, function (err, results) {
        if (!err) {
          console.log("News item inserted successfully " + results);
          res.status = 200;
          res.send(results);
        } else {
          console.log("error occurred while inserting. " + err);
          res.status = err.status;
          res.send({"msg": "error occurred while inserting."});
        }
      })
    }
  }
};

module.exports = appServer;