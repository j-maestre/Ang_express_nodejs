var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var CountrySchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  name: String,
  description: String,
}, {
  timestamps: true,
  usePushEach: true
});

CountrySchema.plugin(uniqueValidator, {message: 'is already taken'});

CountrySchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }
  next();
});

CountrySchema.methods.slugify = function() {
  this.slug = slug(this.name);
};

CountrySchema.methods.toJSONFor = function(){
  return {
    slug: this.slug,
    name: this.name,
    description: this.description
  };
};

mongoose.model('Country', CountrySchema);