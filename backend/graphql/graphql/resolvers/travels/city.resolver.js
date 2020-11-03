const mongoose = require('mongoose');
const City = mongoose.model('City');
const Country = mongoose.model('Country');

const resolvers = {
    Query: {
        city: (root, {slug}) => {
            return City.findOne({slug: slug}).exec();
          },
        cities: () => {
            return City.find().exec();
        },
    },
    City: {
        country: (parent) => {
          return Country.findOne({_id: parent.country}).exec();
        }
    },
};

export default resolvers;