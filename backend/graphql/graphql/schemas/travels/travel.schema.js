import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        travel(slug: String!): Travel
        travels: [Travel]
    }
    type Travel {
        id: ID!
        slug: String!
        name: String
        description: String
        destination: City
        exit: City
        price: Float
    }
`;

export default typeDefs;