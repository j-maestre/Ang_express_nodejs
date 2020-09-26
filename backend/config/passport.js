var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
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
  console.log("SERIALIZE");
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // console.log(`id: ${id}`);
  console.log("DESERIALIZE");
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
    // scope: 'user:email',
    passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) { 

      

      //CONSOLE LOG DEL PROFILE PARA VER QUE ESTA TODO


      User.findOne({idsocial:profile.id.toString()}, function(err, user) {

        profile.emails=profile.username+'@gmail.com';
       
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
            if(!profile.emails){ 
              console.log("if hola");
              return done("The email is private");
            }else{
              console.log("else hola");
              var user = new User({
                  idsocial: profile.id,
                  username: profile.username,
                  type: "client",
                  email: profile.emails,
                  image: profile.photos[0].value,
              });

              // console.log("USUARIO GUARDADO:");
              console.log(user);
              user.save(function(err) {
                  //if(err){
                    console.log("SAVE USER");

                    if(err)
                    console.log("ERROR",err);
                    
                    // console.log(err);
                      return done(null, user);
                  //}
              });
            }
        }
      });
    }
  ));
  //////////////


  //Google strategy

  passport.use(new GoogleStrategy({
    clientID: socialKeys.GOOGLEPLUS_CLIENT_ID,
    clientSecret: socialKeys.GOOGLEPLUS_CLIENT_SECRET,
    callbackURL: socialKeys.GOOGLEPLUS_CALLBACK,
    // scope: 'user:email',
    passReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) { 

      

      //CONSOLE LOG DEL PROFILE PARA VER QUE ESTA TODO


      User.findOne({idsocial:profile.id.toString()}, function(err, user) {

        console.log("OLE LOS CARACOLES");
        // console.log(profile.email);

        profile.emails=profile.username+'@gmail.com';
       
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
            if(!profile.emails){ 
              console.log("if hola");
              return done("The email is private");
            }else{
              console.log("else hola");
              var user = new User({
                  idsocial: profile.id,
                  username: profile.username,
                  type: "client",
                  email: profile.emails,
                  image: profile.photos[0].value,
              });

              // console.log("USUARIO GUARDADO:");
              console.log(user);
              user.save(function(err) {
                  //if(err){
                    console.log("SAVE USER GOOGLE");

                    if(err)
                    console.log("ERROR",err);
                    
                    // console.log(err);
                      return done(null, user);
                  //}
              });
            }
        }
      });
    }
  ));
