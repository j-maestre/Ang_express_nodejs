var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let slug = require('slug');
var User = mongoose.model('User');

//Borrar la BD y vovler a insertar los videojuegos por las tablas de favoritos y coments que no estaban antes y por eso peta

var VideojuegoSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  id:String,
  title: String,
  description: String,
  plataform: String,
  body: String,
  favoritesCount: {type: Number, default: 0},
 
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  tagList: [{ type: String }],
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

  return User.count({favorites: {$in: [videojuego._id]}}).then(function(count){
    videojuego.favoritesCount = count;

    return videojuego.save();
  });
};

VideojuegoSchema.methods.toJSONFor = function(){ //user
  // if(!user){
  //   user="anonimo";
  // }
  // console.log("HELLOOO");
  // console.log(this.slug);
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    plataform: this.plataform,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    tagList: this.tagList,
    favorited: user ? user.isFavoriteV(this._id) : false,
    favoritesCount: this.favoritesCount,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('Videojuego', VideojuegoSchema);
