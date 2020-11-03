import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        restaurant(slug: String!): Restaurant
        restaurants(limit: Int, offset: Int, city: String): [Restaurant]
        restaurantsCount: Int
        restaurantsResults(slug: String!): [Restaurant]
    }
    extend type Mutation {
        createRestaurant(input: RestaurantInput): Restaurant
    }
    type Restaurant {
        id: ID!
        slug: String!
        title: String
        description: String
        reservePrice: Int
        city: City
        streetAddress: String
        image: String
    }
    input RestaurantInput {
        title: String!
        description: String
        reservePrice: Int
        city: String
        streetAddress: String
        image: String
    }
`;

export default typeDefs;