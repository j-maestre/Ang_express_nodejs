var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
require('./City');

var City = mongoose.model('City');

var TravelSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
  destination: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  exit: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  price: Number
}, {
  timestamps: true,
  usePushEach: true
});

TravelSchema.plugin(uniqueValidator, {message: 'is already taken'});

TravelSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

TravelSchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

TravelSchema.methods.toJSONFor = function(){  
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
  };
};

mongoose.model('Travel', TravelSchema);