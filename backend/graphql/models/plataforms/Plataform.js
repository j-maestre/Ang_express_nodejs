var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
// var User = mongoose.model('User');
console.log("HOLAAAAAA Plataform");
console.log(mongoose.models);

var PlataformSchema = new mongoose.Schema({
  slug: {type: String, lowercase: true, unique: true},
  id:{type: String, unique: true},
  name: String,
  description: String,
  price:String,
  rate:String
}, {
  timestamps: true,
  usePushEach: true
});

PlataformSchema.plugin(uniqueValidator, {message: 'is already taken'});

PlataformSchema.pre('validate', function(next){
  if(!this.slug)  {
    this.slugify();
  }

  next();
});

PlataformSchema.methods.slugify = function() {
  this.slug = slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

PlataformSchema.methods.toJSONFor = function(){
    return {
      slug: this.slug,
      id: this.id,
      name:this.name,
      description: this.description,
      price:this.price,
      rate:this.rate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  };
  
  mongoose.model('Plataform', PlataformSchema);
  console.log(mongoose.models);