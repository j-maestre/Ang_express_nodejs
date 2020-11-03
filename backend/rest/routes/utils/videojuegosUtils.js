
let mongoose = require("mongoose");
let VideojuegoComment = mongoose.model('VideojuegoComment');

exports.DeleteVideojuego = async function(videojuego) {
    videojuego.comments.forEach(async function(element) {
        await VideojuegoComment.findById(element).remove().exec();
    });
    videojuego.save();

    return videojuego.remove();
}// end_DeleteNews