import { merge } from 'lodash';

// .exec() is used at the end of the GET mongoose queries so it doesn't run twice

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}


import CompanyResolvers from "../../graphql/resolvers/company/company.resolver";
import UserResolvers from "../../graphql/resolvers/users/user.resolver";
import PlataformResolvers from "../../graphql/resolvers/plataform/plataform.resolver"; 

const resolvers = merge(
  QueryResolvers,
  CompanyResolvers,
  PlataformResolvers,
  UserResolvers
);

export default resolvers;
console.log("resolvers");
console.log(resolvers);