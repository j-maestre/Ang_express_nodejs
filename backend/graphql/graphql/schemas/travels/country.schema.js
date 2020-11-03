import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        country(slug: String!): Country
        countries: [Country]
    }
    type Country {
        id: ID!
        slug: String!
        name: String
        description: String
    }
`;

export default typeDefs;