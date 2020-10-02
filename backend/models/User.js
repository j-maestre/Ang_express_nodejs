var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret = require('../config').secret;

var UserSchema = new mongoose.Schema({
  idsocial: String,
  username: String,//{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/^[a-zA-Z0-9]+$/, 'is invalid'], index: true},
  email: String,//{type: String, lowercase: true, unique: true, required: [true, "can't be blank"], match: [/\S+@\S+\.\S+/, 'is invalid'], index: true},
  bio: String,
  image: String,
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Article' }],
  favoritesV: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Videojuego' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  hash: String,
  salt: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: 'is already taken.'});

UserSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

UserSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.generateJWT = function() {
  var today = new Date();
  var exp = new Date(today);
  exp.setDate(today.getDate() + 60);

  return jwt.sign({
    id: this._id,
    username: this.username,
    exp: parseInt(exp.getTime() / 1000),
  }, secret);
};

UserSchema.methods.toAuthJSON = function(){
  return {
    username: this.username,
    email: this.email,
    token: this.generateJWT(),
    bio: this.bio,
    image: this.image
  };
};

UserSchema.methods.toProfileJSONFor = function(user){
  return {
    username: this.username,
    bio: this.bio,
    image: this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg',
    following: user ? user.isFollowing(this._id) : false
  };
};

//Favorite article
UserSchema.methods.favorite = function(id){
  if(this.favorites.indexOf(id) === -1){
    // this.favorites.push(id);
    this.favorites=this.favorites.concat([id]);

  }

  return this.save();
};


//Favorite videojuego
UserSchema.methods.favoriteV = function(id){

  console.log("SUMANDO FAVORITO VIDEOJUEGO EN USER");
  if(this.favoritesV.indexOf(id) === -1){
    // this.favorites.push(id);
    this.favoritesV=this.favoritesV.concat([id]);

  }

  console.log(this.favoritesV);
  return this.save();
};

//Unfavorite article
UserSchema.methods.unfavorite = function(id){
  this.favorites.remove(id);
  return this.save();
};

//Unfavorite Videojuego
UserSchema.methods.unfavoriteV = function(id){

  console.log("UNFAVORITE VIDEOJUEGO");
  this.favoritesV.remove(id);


  console.log(this.favoritesV);
  return this.save();
};

//Is favorite article
UserSchema.methods.isFavorite = function(id){
  return this.favorites.some(function(favoriteId){
    return favoriteId.toString() === id.toString();
  });
};

//Isfavorite videojuego
UserSchema.methods.isFavoriteV = function(id){
  return this.favoritesV.some(function(favoriteId){
    return favoriteId.toString() === id.toString();
  });
};

//Follow user
UserSchema.methods.follow = function(id){
  if(this.following.indexOf(id) === -1){
    // this.following.push(id);
    this.following=this.following.concat([id]);
  }

  return this.save();
};

//Unfollow user
UserSchema.methods.unfollow = function(id){
  this.following.remove(id);
  return this.save();
};

//Is following user
UserSchema.methods.isFollowing = function(id){
  return this.following.some(function(followId){
    return followId.toString() === id.toString();
  });
};

mongoose.model('User', UserSchema);
