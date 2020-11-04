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

const resolvers = merge(
  QueryResolvers,
  CompanyResolvers,
  UserResolvers
);

export default resolvers;