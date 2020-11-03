// https://graphql.org/learn/queries/ 

/* Pagination
 https://codeburst.io/graphql-pagination-by-example-part-1-15ec3313ae08
 https://codeburst.io/graphql-pagination-by-example-part-2-2803802ef23a */

/* Nested resolvers
 https://reactgo.com/nested-resolvers-relationaldata-graphql/ */

/* Modularising
 https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2 */

/* Authentication
 https://www.apollographql.com/docs/apollo-server/security/authentication/
 https://www.apollographql.com/docs/apollo-server/data/errors/ */

import { ApolloServer, AuthenticationError } from "apollo-server-express"
import typeDefs from "../../graphql/schemas/schema";
import resolvers from "../../graphql/resolvers/resolver";
const mongoose = require('mongoose');
const User = mongoose.model('User');

const SERVER = new ApolloServer({
    typeDefs,
    resolvers
});

const SERVERAUTH = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let user = null;
        
        if (req.payload) {
            user = await User.findById(req.payload.id);
        } // else do nothing and let user be null
        
        // add the user to the context
        return { user, AuthenticationError };
    }
});

const SERVERS = {
    graphql: SERVER,
    graphqlauth: SERVERAUTH
};

export default SERVERS;