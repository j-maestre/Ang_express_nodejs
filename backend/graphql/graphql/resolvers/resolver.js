import { merge } from 'lodash';

// .exec() is used at the end of the GET mongoose queries so it doesn't run twice

const QueryResolvers = {
  Query: {
      message: () => 'Hello World!',
      authenticationError: () => {
        throw new AuthenticationError('must authenticate');
      }
  }
}

import RestaurantResolvers from "../../graphql/resolvers/restaurants/restaurant.resolver";
import CountryResolvers from "../../graphql/resolvers/travels/country.resolver";
import CityResolvers from "../../graphql/resolvers/travels/city.resolver";
import HotelResolvers from "../../graphql/resolvers/hotels/hotel.resolver";
import CompanyResolvers from "../../graphql/resolvers/company/company.resolver";
import RoomResolvers from "../../graphql/resolvers/hotels/room.resolver";
import AdventureResolvers from "../../graphql/resolvers/adventures/adventures.resolver";
import UserResolvers from "../../graphql/resolvers/users/user.resolver";
import TravelResolvers from "../../graphql/resolvers/travels/travel.resolver";
const resolvers = merge(
  QueryResolvers,
  RestaurantResolvers,
  CountryResolvers,
  CityResolvers,
  HotelResolvers,
  CompanyResolvers,
  RoomResolvers,
  AdventureResolvers,
  UserResolvers,
  TravelResolvers
);

export default resolvers;