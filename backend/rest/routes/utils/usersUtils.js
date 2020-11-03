let mongoose = require("mongoose");
let User = mongoose.model('User');

exports.UpdateKarma = async function(id,cant){
    let user = await User.findById(id);

    if(user){
        user = await User.findOneAndUpdate({ _id: user.id}, { $inc: { karma: cant } }, { "fields": { karma: 1 }, new: true });
        if (user.karma < 0) {
            user.karma = 0;
            await user.save();
        }
    }
}