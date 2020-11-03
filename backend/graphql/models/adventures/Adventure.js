var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
require("../User");
var User = mongoose.model('User');

var AdventureSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  price: Number,
  favoritesCount: {type: Number, default: 0},
  image: String
}, {
  timestamps: true,
  usePushEach: true
});

AdventureSchema.plugin(uniqueValidator, {message: 'is already taken'});

AdventureSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

AdventureSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

AdventureSchema.methods.updateFavoriteCount = function() {
  var adventure = this;

  return User.count({favoriteAdventures: {$in: [adventure._id]}}).then(function(count){
    adventure.favoritesCount = count;
    return adventure.save();
  });
};

AdventureSchema.methods.toJSONFor = function(user){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    price: this.price,
    image: this.image,
    favorited: user ? user.isFavoriteAdventure(this._id) : false,
    favoritesCount: this.favoritesCount,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt
  };
};

mongoose.model('Adventure', AdventureSchema);