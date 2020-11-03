const mongoose = require('mongoose');
const Company = mongoose.model('Company');
const City = mongoose.model('City');

const resolvers = {
    Query: {
        company: (root, {slug}) => {
            return Company.findOne({slug: slug}).exec();
        },
        companys: () => {
            return Company.find().exec();
        },
        companysResults: async function(root, {slug}) {
          let city = await City.findOne({slug: slug});
          return Company.find({city: city._id});
        }
    },
    Company: {
      city: (parent) => {
        return City.findOne({_id: parent.city}).exec();
      }
    },

    Mutation: {
      createCompany: (root, {input}) => {
          const company = new Company(input);
  
          // no .exec();
          company.save();
          return company;
      }
  }
//   Company: {
//       city: (parent) => {
//           return City.findOne({_id: parent.city}).exec();
//       }
//   }
};

export default resolvers;