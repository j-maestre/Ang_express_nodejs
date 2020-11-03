import { gql } from 'apollo-server-express';

const typeDefs = gql`
    extend type Query {
        room(slug: String!): Room
        rooms: [Room]
    }
    type Room {
        id: ID!
        beds: Int
        equipment: [String]
        occupied: Boolean
    }
`;

export default typeDefs;