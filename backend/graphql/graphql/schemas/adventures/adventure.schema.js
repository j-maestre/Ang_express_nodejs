import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        adventure(slug: String!): Adventure
        adventures: [Adventure]
    }
    type Adventure {
        id: ID!
        slug: String!
        title: String
        description: String
        price: Int
        createdAt: Date
        updatedAt: Date
    }
`;

export default typeDefs;