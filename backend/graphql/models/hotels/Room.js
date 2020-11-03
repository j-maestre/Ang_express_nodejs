var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var slug = require('slug');

var RoomSchema = new mongoose.Schema({
    slug: { type: String, lowercase: true, unique: true },
    // hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel" },
    beds: Number,
    equipment: [String],
    occupied: Boolean,
    price: Number
}, {
    timestamps: true,
    usePushEach: true
});

RoomSchema.plugin(uniqueValidator, { message: 'is already taken' });

RoomSchema.pre('validate', function (next) {
    if (!this.slug) {
        this.slugify();
    }
    next();
});

RoomSchema.methods.slugify = function () {
    this.slug = (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

RoomSchema.methods.toJSONFor = function () {
    return {
        slug: this.slug,
        // hotel: this.hotel,
        beds: this.beds,
        equipment: this.equipment,
        occupied: this.occupied
    };
};

mongoose.model('Room', RoomSchema);


// {
    // "room": {
    //     "slug": "hab-4f5gg6",
    //     "beds": 2,
    //     "equipment": ["shampoo", "towels"],
    //     "occupied": true
    // }
// }
