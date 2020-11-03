var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
require('../travels/City');

var City = mongoose.model('City');

var RetaurantSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  title: String,
  description: String,
  reservePrice: Number,
  city: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  streetAddress: String,
  image: String
}, {
  timestamps: true,
  usePushEach: true
});


RetaurantSchema.plugin(uniqueValidator, {message: 'is already taken'});

RetaurantSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

RetaurantSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

RetaurantSchema.methods.toJSONFor = function(city,country){
  return {
    slug: this.slug,
    title: this.title,
    description: this.description,
    reservePrice: this.reservePrice,
    city: city.toJSONFor(country),
    streetAddress: this.streetAddress,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    image: this.image
  };
};


mongoose.model('Restaurant', RetaurantSchema);