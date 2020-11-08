var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let slug = require('slug');
var User = mongoose.model('User');
// var Plataform = mongoose.model('Plataform');
// var VideojuegoComment = mongoose.model('VideojuegoComment');


var VideojuegoSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  id:String,
  title: String, //fake
  description: String, //fake
  plataform: String, //fake
  // plataform: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Plataform' }],
  body: String, //fake
  favoritesCount: {type: Number, default: 0},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VideojuegoComment' }],
  tagList: [{ type: String }], //fake
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  
}, {timestamps: true});

VideojuegoSchema.plugin(uniqueValidator, {message: 'is already taken'});
 
VideojuegoSchema.pre('validate', function(next){//next
  if(!this.slug)  {
    this.slugify();
  }
    next();
});
 

VideojuegoSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

VideojuegoSchema.methods.updateFavoriteCount = function() {
  var videojuego = this;

  return User.count({favoritesV: {$in: [videojuego._id]}}).then(function(count){
    videojuego.favoritesCount = count;
    return videojuego.save();
  });
};

VideojuegoSchema.methods.toJSONFor = function(user){
 
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    plataform: this.plataform,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    // comments: this.comments,
    favorited: user ? user.isFavoriteV(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: user ? user.toProfileJSONFor(user) : this.author.toProfileJSONFor(user)
    // author: this.author.toProfileJSONFor(user)
    // author: user.toProfileJSONFor(user)
  };
};

mongoose.model('Videojuego', VideojuegoSchema);
