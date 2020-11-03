var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');
var city = mongoose.model("City");
// var room = mongoose.model("Room");


var HotelSchema = new mongoose.Schema({
  slug: { type: String, lowercase: true, unique: true },
  name: String,
  description: String,
  city: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
  stars: Number,
  reviewScore: Number,
  features: [String],
  rooms: Number, //TODO: change to an array of Rooms
  services: [String],
  image: String
}, {
  timestamps: true,
  usePushEach: true
});

HotelSchema.plugin(uniqueValidator, { message: 'is already taken' });

HotelSchema.pre('validate', function (next) {
  if (!this.slug) {
    this.slugify()
  }
  next();
});

HotelSchema.methods.slugify = function () {
  this.slug = slug(this.name);
};

HotelSchema.methods.toJSONFor = function () {
  return {
    slug: this.slug,
    name: this.name,
    description: this.description,
    city: this.city,
    stars: this.stars,
    reviewScore: this.reviewScore,
    features: this.features,
    rooms: this.rooms,
    services: this.services,
    image: this.image
  };
};

mongoose.model('Hotel', HotelSchema);


// db.conduit_nodejs.insert({
	// "hotel": {
	//     "name": "third-name",
	//     "description": "asdasdsadsadasdasdsad",
	//     "city": "Ontinyent",
	//     "inDate": "indate",
	//     "outDate": "outDate",
	//     "stars": 5,
	//     "reviewScore": 7,
	//     "features": "asdasdasda",
	//     "rooms": 4,
	//     "services": "asdasdasd"

	// }
// })