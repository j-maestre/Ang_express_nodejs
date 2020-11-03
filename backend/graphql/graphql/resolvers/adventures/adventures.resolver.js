const mongoose = require('mongoose');
const Adventure = mongoose.model('Adventure');
//const City = mongoose.model('City');

const resolvers = {
    Query: {
      adventure: (root, {slug}) => {
        return Adventure.findOne({slug: slug}).exec();
      },
      adventures: () =>  {
        return Adventure.find().exec();
      }
    },
};

export default resolvers;