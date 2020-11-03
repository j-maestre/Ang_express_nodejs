const mongoose = require('mongoose');
const Travel = mongoose.model('Travel');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        travel: (root, {slug}) => {
            return Travel.findOne({slug: slug}).exec();
          },
          travels: () => {
            return Travel.find().exec();
          },
    },
    Travel: {
        destination: (parent) => {
          return City.findOne({_id: parent.destination}).exec();
        },
        exit: (parent) => {
          return City.findOne({_id: parent.exit}).exec();
        }
      }
};

export default resolvers;