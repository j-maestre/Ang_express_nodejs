const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        hotel: (root, {slug}) => {
            return Hotel.findOne({slug: slug}).exec();
        },
        hotels: () => {
            return Hotel.find().exec();
        },
        hotelsResults: async function(root, {slug}) {
          let city = await City.findOne({slug: slug});
          return Hotel.find({city: city._id});
        }
    },
    Hotel: {
      city: (parent) => {
        return City.findOne({_id: parent.city}).exec();
      }
    }
};

export default resolvers;