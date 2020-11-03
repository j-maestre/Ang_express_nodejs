var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
require('./Country');

var Country = mongoose.model('Country');

var CitySchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  latitude: Number,
  longitude: Number,
  country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
  image: String
}, {
  timestamps: true,
  usePushEach: true
});

CitySchema.plugin(uniqueValidator, {message: 'is already taken'});

CitySchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

CitySchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

CitySchema.methods.toJSONFor = function(country){  
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    latitude: this.latitude,
    longitude: this.longitude,
    country: country.toJSONFor(),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    image: this.image
  };
};

mongoose.model('City', CitySchema);