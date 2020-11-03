import { gql } from 'apollo-server-express';
/* 
    Note: In the current version of GraphQL, you can’t have an empty type even if you intend to extend it later. 
    So we need to make sure the Mutation type has at least one field — in this case we can add a fake _empty field. 
    Hopefully in future versions it will be possible to have an empty type to be extended later.
*/

const Query = gql`
    scalar Date
    type Query {
        message: String
        authenticationError: String
    }
    type Mutation {
        _empty: String
    }
`;

import Restaurant from "../../graphql/schemas/restaurants/restaurant.schema";
import Country from "../../graphql/schemas/travels/country.schema";
import City from "../../graphql/schemas/travels/city.schema";
import Hotel from "../../graphql/schemas/hotels/hotel.schema";
import Company from "../../graphql/schemas/company/company.schema";
import Room from "../../graphql/schemas/hotels/room.schema";
import Adventure from "../../graphql/schemas/adventures/adventure.schema";
import User from "../../graphql/schemas/users/user.schema";
import Travel from "../../graphql/schemas/travels/travel.schema"

const typeDefs = [
    Query,
    Restaurant,
    Country,
    City,
    Hotel,
    Company,
    Room,
    Adventure,
    User,
    Travel
];

export default typeDefs;
