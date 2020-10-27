// Import external dependancies
const faker = require('faker')
const boom = require('boom')

// Import internal dependancies
const fastify = require('../server.js')

// Fake data
const videojuegos = [
	{
		name: 'Spyro',
		models: ['Un nuevo comienzo', 'La noche eterna', 'La fuerza del dragon', 'Trail']
	},
	{
		name: 'Crash Bandicoot',
		models: ['Nitro kart', 'Nsane trilogi', 'Coco-maniaco', 'Boom Bang!']
	},
	{
		name: 'La momia',
		models: ['Imhotep', 'El regreso', 'La tumba del emperador dragon', 'El rey escorpion']
	},
	{
		name: 'Spiderman',
		models: ['El duende verde', 'El doctor Octopus', 'El poder de electro', 'Venom']
	},
	{
		name: 'Super Mario',
		models: ['Galaxy', '64', 'Kart', 'Bros']
	}
]
const serviceGarages = [
	'A++ Auto Services',
	"Gary's Garage",
	'Super Service',
	'iGarage',
	'Best Service'
]

// Get Data Models
const Videojuego = require('../models/Videojuego')
// const Owner = require('../models/Owner')
// const Service = require('../models/Service')

// Fake data generation functions

const generateVideojuego = () =>{
    let videojuego = [];
    let i=0;
    while (i<50){
        const title;
        const description;
        const plataform; 
    }
};
const generatePlataformData = () => {
	let plataformData = []
	let i = 0

	while (i < 50) {
        const plataform = faker.fake('{{plataform}}');
        plataformData.push(plataform);
        i++
        
		// const lastName = faker.fake('{{name.lastName}}')
		// const email = faker.fake(`${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`)

		// const owner = {
		// 	firstName,
		// 	lastName,
		// 	email
		// }

		
	}

	return plataformData;
}

const generateVideojuegoData = ownersIds => {
	let videojuegoData = []
	let i = 0

	while (i < 1000) {
		const owner_id = faker.random.arrayElement(ownersIds)
		const videojuegoObject = faker.random.arrayElement(videojuegos)
		const title = faker.random.arrayElement(videojuegoObject.models)
		const price = faker.random.number({ min: 5000, max: 30000 })
		const age = faker.random.number({ min: 2, max: 10 })

		const videojuego = {
			owner_id,
			brand: videojuegoObject.name,
			title,
			price,
			age
		}

		videojuegoData.push(videojuego)
		i++
	}

	return videojuegoData
}

const generateServiceData = videojuegosIds => {
	let serviceData = []
	let i = 0

	while (i < 5000) {
		const videojuego_id = faker.random.arrayElement(videojuegosIds)
		const name = faker.random.arrayElement(serviceGarages)
		const date = faker.fake('{{date.past}}')

		const service = {
			videojuego_id,
			name,
			date
		}

		serviceData.push(service)
		i++
	}

	return serviceData
}

fastify.ready().then(
	async () => {
		try {
			const owners = await Owner.insertMany(generateOwnerData())
			const ownersIds = owners.map(x => x._id)

			const videojuegos = await Videojuego.insertMany(generateVideojuegoData(ownersIds))
			const videojuegosIds = videojuegos.map(x => x._id)

			const services = await Service.insertMany(generateServiceData(videojuegosIds))

			console.log(`
      Data successfully added:
        - ${owners.length} owners added.
        - ${videojuegos.length} videojuegos added.
        - ${services.length} services added.
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
