var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
var socialKeys = require('../credentials/credentials.json');

passport.use(new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]'
}, function(email, password, done) {
  User.findOne({email: email}).then(function(user){
    if(!user || !user.validPassword(password)){
      return done(null, false, {errors: {'email or password': 'is invalid'}});
    }

    return done(null, user);
  }).catch(done);
}));


///Serializer
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(error => {
      console.log(`Error: ${error}`);
    });
});
//////


///Login github
  passport.use(new GithubStrategy({
    clientID: socialKeys.GITHUB_CLIENT_ID,
    clientSecret: socialKeys.GITHUB_CLIENT_SECRET,
    callbackURL: socialKeys.GITHUB_CALLBACK,
    scope: 'user:email',
    passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) { 

      console.log("profile email:");
      console.log(profile.email);

      //CONSOLE LOG DEL PROFILE PARA VER QUE ESTA TODO


      User.findOne({idsocial:profile.id.toString()}, function(err, user) {

        console.log("USER FINDONE");
          if (err){

            console.log("if err");
            return done(err);
            

          }
          // if the user is found then log them in
          if (user) {
            console.log("if user");
              return done(null, user);
          } else {
            console.log("else");
            if(!profile.email[0].value){ //ME PETA AQUI  //Ponia emails[], pero en el json pone email[]
              console.log("if hola");
              return done("The email is private");
            }else{
              console.log("else hola");
              var user = new User({
                  idsocial: profile.id,
                  username: profile.username,
                  type: "client",
                  email: profile.emails[0].value,
                  image: profile.photos[0].value,
              });
              user.save(function(err) {
                  //if(err){
                    console.log("save user");
                    console.log(err);
                      return done(null, user);
                  //}
              });
            }
        }
      });
    }
  ));
  //////////////
