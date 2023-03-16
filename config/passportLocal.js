var express = require("express")
var passport = require("passport")
var LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false); }
        if (!user.verifyPassword(password)) { return done(null, false); }
        return done(null, user);
      });
    }
  ));
  //serialising the user which key is to be kept in the cookies
  passport.serializeUser (function(user,done){
    done(null,user.id)
  });
  passport.deserializeUser=(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
  });
});
  passport.checkAuthentication={}
  passport.setAuthenticatedUser={}
  module.exports = passport;