var express = require('express');
var passport = require('passport');
const User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({usernameField:'email'},
    function(email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) { return done(err); }
        if (!user || user.password!=password) { return done(null, false); }
        
        return done(null, user);
      });
    }
  ));
// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
  done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
      if(err){
          console.log('Error in finding user --> Passport');
          return done(err);
      }

      return done(null, user);
  });
});

// check user is autheniticagted
passport.checkAuthentication =function(req, res, next){
  if(req.isAuthenticated()){
      return next();  
  }
  return res.redirect('/users/sign-in');
}
passport.setAuthenticatedUser =  function(req, res, next){
  if(req.isAuthenticated()){
     res.locals.user = req.user;
      
  }
  return next(); 
}

module.exports = passport;