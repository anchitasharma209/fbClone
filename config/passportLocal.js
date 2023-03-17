var express = require("express")
var passport = require("passport");
const User = require("../models/user");
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
  //deserializing the user from the key in the cookies
  passport.deserializeUser=(function(id, done) {
    
    User.findById(id, function(err, user) {
      if(err){
        console.log(err)
      }
      return done(null,user)
  });
});
  passport.checkAuthentication={}
  passport.setAuthenticatedUser={}
  module.exports = passport;