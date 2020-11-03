const mongoose = require('mongoose');
const Room = mongoose.model('Room');

const resolvers = {
    Query: {
      room: (root, {slug}) => {
        return Room.findOne({slug: slug}).exec();
      },
      rooms: () => {
        return Room.find().exec();
      }
    }
}

export default resolvers;