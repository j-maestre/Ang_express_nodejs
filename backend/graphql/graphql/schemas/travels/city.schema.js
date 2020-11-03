import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        city(slug: String!): City
        cities: [City]
    }
    type City {
        id: ID!
        slug: String!
        name: String
        latitude: Float
        longitude: Float
        country: Country
        image: String
    }
`;

export default typeDefs;