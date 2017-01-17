const Authentication = require("./controllers/authentication");
const passportService = require("./services/passport");
const passport = require("passport");
const path = require('path');
const poll = require("./services/polls");


const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function (app) {

  app.get('/', requireAuth, function(req, res){
    res.send({ message: 'super secret code in ABC123'});
    //res.sendFile(path.join(__dirname + '/index.html'));
  });
  
  // Auth service
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  
  // Poll service
  app.post('/fetch_polls', poll.fechPolls);
  app.post('/fetch_polls_by_id', poll.fechPollsById);
  app.post('/fetch_poll', poll.fechPoll);
  app.post('/create_poll', poll.createPoll);
  app.post('/delete_poll', poll.deletePolls);
  app.post('/vote_poll', poll.votePolls);
  app.post('/fetch_ip', poll.fetchIP);
  

};