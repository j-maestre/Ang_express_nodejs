const mongoose = require('mongoose');
const Country = mongoose.model('Country');

const resolvers = {
    Query: {
      country: (root, {slug}) => {
        return Country.findOne({slug: slug}).exec();
      },
      countries: () => {
        return Country.find().exec();
      },
    }
};

export default resolvers;