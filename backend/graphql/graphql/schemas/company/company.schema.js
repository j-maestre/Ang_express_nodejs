import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        company(slug: String!): Hotel
        companys: [Hotel]
        companysResults(slug: String!): [Company]
    }
    type Company {
        id: ID!
        slug: String!
        name: String
        description: String
        city: City
        stars: Int
        image: String
    }
`;

export default typeDefs;