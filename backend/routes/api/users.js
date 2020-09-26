var mongoose = require('mongoose');
var router = require('express').Router();
var passport = require('passport');
var User = mongoose.model('User');
var auth = require('../auth');

router.get('/user', auth.required, function(req, res, next){  //Select User UNICO
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

//////////////////////////////////////7


router.put('/user', auth.required, function(req, res, next){  //Update user
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }

    // only update fields that were actually passed...
    if(typeof req.body.user.username !== 'undefined'){
      user.username = req.body.user.username;
    }
    if(typeof req.body.user.email !== 'undefined'){
      user.email = req.body.user.email;
    }
    if(typeof req.body.user.bio !== 'undefined'){
      user.bio = req.body.user.bio;
    }
    if(typeof req.body.user.image !== 'undefined'){
      user.image = req.body.user.image;
    }
    if(typeof req.body.user.password !== 'undefined'){
      user.setPassword(req.body.user.password);
    }

    return user.save().then(function(){
      return res.json({user: user.toAuthJSON()});
    });
  }).catch(next);
});


//////////////////////////////////////////

router.post('/users/login', function(req, res, next){  //LOGIN LOCAL
  if(!req.body.user.email){
    return res.status(422).json({errors: {email: "can't be blank"}});
  }

  if(!req.body.user.password){
    return res.status(422).json({errors: {password: "can't be blank"}});
  }

  passport.authenticate('local', {session: false}, function(err, user, info){
    if(err){ return next(err); }

    if(user){
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});



////////////////////////////////////////////


router.post('/users/sociallogin', function (req, res, next){
  let memorystore = req.sessionStore;
  let sessions = memorystore.sessions;
  let sessionUser;
  for(var key in sessions){
    sessionUser = (JSON.parse(sessions[key]).passport.user);
  }


  User.findOne({'_id' : sessionUser},function(err,user){
    console.log("social login findOne");
    console.log(err);
    console.log(user);
    if(err){
      return done(err);
    }

    //Si hemos encontrao al usuario lo logueamos

    if(user){
      console.log("Usuario encontrado");
      console.log(user);
      user.token = user.generateJWT();
      return res.json({user: user.toAuthJSON()}); //Usuario encontrado, return user
      
    }else{
      console.log("Usuario NO encontrado");
      return res.status(422).json(err);
    }
  });
});



router.post('/users', function(req, res, next){ 
  var user = new User();

  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user.save().then(function(){
    return res.json({user: user.toAuthJSON()});
  }).catch(next);
});

//GOOGLE PLUS

router.get('/auth/googleplus',passport.authenticate('google', {scope:[
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read'
  ]})
);

// router.get('/auth/googleplus',passport.authenticate{'google'});

router.get('/auth/googleplus/callback',
  passport.authenticate('google',{
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",
    failureRedirect: "/"
  }));



//GITHUB

router.get("/auth/github", passport.authenticate("github"));
console.log("Users get github passport autenticate");
router.get("/auth/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:4000/#!/auth/sociallogin",  //El puerto estaba en 3001 antes
    failureRedirect: "/"
  })
);








module.exports = router;
