import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        plataform(slug: String!): Plataform
        plataforms: [Plataform]
        plataformsResults(slug: String!): [Plataform]
    }
    extend type Mutation {
        createPlataform(input: PlataformInput): Plataform
    }
    type Plataform {
        id: ID!
        slug: String!
        name: String
        description: String
        price: String
        rate: String
    }
    input PlataformInput {
        slug: String!
        name: String
        description: String
        price: String
        rate: String
    }
`;

export default typeDefs;