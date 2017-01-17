const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

var db_global = {};

var getRandomColor = function() {
     var letters = '0123456789ABCDEF';
     var color = '#';
     for (var i = 0; i < 6; i++) {
       color += letters[Math.floor(Math.random() * 16)];
     }
     
     console.log(color);
     return color;
  }

exports.startDB = function(req, res, next) {

  MongoClient.connect('mongodb://0.0.0.0:27017/auth', function(err, db) {
    
    assert.equal(null, err);
    db_global = db;
  });
}

exports.fechPoll = function(req, res, next) {

  console.log(req.body);

  db_global.collection('polls').find({_id: ObjectID(req.body.id)}).toArray(function(err, docs) {
    console.log(docs);  
      
    res.send({docs});
  });
}

exports.fechPolls = function(req, res, next) {

      db_global.collection('polls').find({}).toArray(function(err, docs) {
        var poll_list = [];
        docs.map(function (obj) {
            poll_list.push({title: obj.title, user: obj.user, _id: obj._id}); 
        }); 

        res.send(poll_list);
      });
}

exports.fechPollsById = function(req, res, next) {

    db_global.collection('polls').find({user: req.body.user}).toArray(function(err, docs) {
      var poll_list = [];
        docs.map(function (obj) {
            poll_list.push({title: obj.title, user: obj.user, _id: obj._id}); 
        }); 
        res.send(poll_list);     
    });
}

exports.createPoll = function(req, res, next) {

  try {
    var colors = [];
    var votes = [];
    req.body.options.map(function (element) { 
        colors.push(getRandomColor());
        votes.push(0);
    });
    db_global.collection('polls').insertOne(
      {
        "title" : req.body.title, 
        "user" : req.body.user, 
        "options" : req.body.options, 
        "color" : colors, 
        "votes" : votes, 
        "user_vote" : []
      });
    res.send({ result: "OK" });
  } catch (e) {
    res.send({ result: "ERROR" });
  }
}

exports.deletePolls = function(req, res, next) {

  try {
    db_global.collection('polls').deleteMany({ _id:  ObjectID(req.body.id)});
    res.send({ result: "OK" });
  }
  catch (e){
    res.send({ result: "ERROR" });
  }
}

exports.fetchIP = function(req, res, next) {

  try {
    var IPaddress = (req.headers['x-forwarded-for'] || '').split(',')[0] 
        || req.connection.remoteAddress;
    res.send({ result: IPaddress});
  }
  catch (e){
    res.send({ result: "ERROR" });
  }
}

exports.votePolls = function(req, res, next) {

   db_global.collection('polls').find({_id: ObjectID(req.body.id)}).toArray(function(err, docs) {
    if (err != null) {
      res.send({ result: "ERROR" });
      return;
    }

    if (docs.length > 0) {
        // If document exist: find option
        var index = docs[0].options.findIndex(function(element) {return element === req.body.option});
        
        if (index == -1) { // the NOT option exist
            
        
           var array_options = docs[0].options;
           var array_votes = docs[0].votes; 
           var array_color = docs[0].color; 
           var array_user_vote = docs[0].user_vote;
        
           array_options.push(req.body.option);
           array_votes.push(1); 
           array_color.push(getRandomColor()); 
           array_user_vote.push(req.body.user);
           
           db_global.collection('polls').updateOne(
             {_id: ObjectID(req.body.id)},
             { $set: { options : array_options,
                       color : array_color,
                       votes : array_votes,
                       user_vote : array_user_vote }}
             );
           
        } else { // the option exist
           var array_vote = docs[0].votes;
           array_vote[index]++;
           
           var array_user_vote = docs[0].user_vote;
           array_user_vote.push(req.body.user);
           
           db_global.collection('polls').updateOne(
             {_id: ObjectID(req.body.id)},
             { $set: { votes : array_vote,
                       user_vote : array_user_vote }
             }
             );
        }
    }
    
   db_global.collection('polls').find({_id: ObjectID(req.body.id)}).toArray(function(err, docs) {
        res.send({ result: "OK",
            poll: docs});
   });
    

  });
}
