var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var User = mongoose.model('User');

var CompanySchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  id:{type: String, unique: true},
  name: String,
  description: String,
  city: String,
  stars:String,
  image:String
}, {
  timestamps: true,
  usePushEach: true
});

CompanySchema.plugin(uniqueValidator, {message: 'is already taken'});

CompanySchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

CompanySchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

CompanySchema.methods.toJSONFor = function(user){
    return {
      slug: this.slug,
      id: this.id,
      name:this.name,
      description: this.description,
      city: this.city,
      stars:this.stars,
      image:this.image,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
  
  mongoose.model('Company', CompanySchema);