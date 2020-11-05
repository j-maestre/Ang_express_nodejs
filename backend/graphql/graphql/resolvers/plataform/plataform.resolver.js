const mongoose = require('mongoose');
const Plataform= mongoose.model('Plataform');


const resolvers = {
    Query: {
        plataform: (root, {slug}) => {
            return Plataform.findOne({slug: slug}).exec();
        },
        plataforms: async () => {
            console.log("resolve de todas las plataforms");
            console.log("prueba");
            let prueba=Plataform.find({}).exec();
            console.log(prueba);
            return await Plataform.find({}).exec();
        },
      
    },
    Mutation: {
      createPlataform: (root, {input}) => {
          const plataform = new Plataform(input);
  
          // no .exec();
          plataform.save();
          return plataform;
      }
  }
};

export default resolvers;