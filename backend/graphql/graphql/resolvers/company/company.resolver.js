const mongoose = require('mongoose');
const Company = mongoose.model('Company');
// const City = mongoose.model('City'); //Quitar city y dejarlo como una String

const resolvers = {
    Query: {
        company: (root, {slug}) => {
            return Company.findOne({slug: slug}).exec();
        },
        companys: async () => {
            console.log("resolve de todas las companys");
            console.log("prueba");
            let prueba=Company.find({}).exec();
            console.log(prueba);
            return await Company.find({}).exec();
        },
        // companysResults: async function(root, {slug}) {
        //   let city = await City.findOne({slug: slug});
        //   return Company.find({city: city._id});
        // }
    },
    // Company: {
    //   city: (parent) => {
    //     return City.findOne({_id: parent.city}).exec();
    //   }
    // },

//     Mutation: {
//       createCompany: (root, {input}) => {
//           const company = new Company(input);
  
//           // no .exec();
//           company.save();
//           return company;
//       }
//   }
//   Company: {
//       city: (parent) => {
//           return City.findOne({_id: parent.city}).exec();
//       }
//   }
};

export default resolvers;