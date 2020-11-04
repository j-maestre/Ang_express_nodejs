// Import external dependancies
const faker = require('faker')
const boom = require('boom')
const fastify = require('fastify')({
	logger: true
})
const mongoose = require('mongoose')

// Connect to DB
mongoose
	.connect('mongodb://localhost/conduit_nodejs')
	.then(() => console.log('MongoDB connected...'))
	.catch(err => console.log(err))

// Get Data Models
require('../models/travels/Country')
require('../models/travels/City')
require('../models/restaurants/Restaurant');
require('../models/adventures/Adventure');
require('../models/companys/Company');
// hotels
require("../models/hotels/Hotel");
require("../models/User");


let Company = mongoose.model('Company');
let User = mongoose.model('User');

// hotels
var hotel = mongoose.model("Hotel");

const generateCompanys = () =>{
	let companys = [];
	let i=0;


	while(i<50){
		const name;
		const description;
		const city;
		const stars;
		const image;

	}
}

const generateAdventures = () => {
	let adventures = [];
	let i = 0;

	while (i < 50) {
		const title = faker.fake('{{commerce.productName}}');
		const description = faker.fake('{{commerce.productAdjective}}') + " " + faker.fake('{{commerce.productMaterial}}' + " " + faker.fake('{{commerce.color}}'));
		const price = faker.fake('{{commerce.price}}');
		const image = "http://lorempixel.com/200/200/technics/";

		const adventure = {
			title,
			description,
			price,
			image,
			favoritesCount: 0
		}

		if (adventures.filter(value => value.title == adventure.title).length == 0) {
			adventures.push(adventure)
			i++
		}
	}
	return adventures;
}


fastify.ready().then(
	async () => {
		try {
			const adventures = await Adventure.insertMany(generateAdventures())
			const countries = await Country.insertMany(generateCountries())
			const countriesIds = countries.map(x => x._id)
			const cities = await City.insertMany(generateCities(countriesIds))
			const citiesIds = cities.map(x => x._id)
			const hotels = await hotel.insertMany(generateHotels(citiesIds))
			const restaurants = await Restaurant.insertMany(generateRestaurants(citiesIds))
			console.log(`
	  Data successfully added:
		- ${adventures.length} adventures added.	  
		- ${countries.length} countries added.
		- ${cities.length} cities added.
		- ${restaurants.length} restaurants added.
		- ${hotels.length} hotels added.
		`)
		
		} catch (err) {
			throw boom.boomify(err)
		}
		process.exit()
	},
	err => {
		console.log('An error occured: ', err)
		process.exit()
	}
)

