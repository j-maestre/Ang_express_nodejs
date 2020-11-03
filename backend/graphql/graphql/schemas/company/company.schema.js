import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        company(slug: String!): Company
        companys: [Company]
        companysResults(slug: String!): [Company]
    }
    extend type Mutation {
        createCompany(input: CompanyInput): Company
    }
    type Company {
        id: ID!
        slug: String!
        name: String
        description: String
        city: String
        stars: Int
        image: String
    }
    input CompanyInput {
        slug: String!
        name: String
        description: String
        city: String
        stars: String
        image: String
    }
`;

export default typeDefs;