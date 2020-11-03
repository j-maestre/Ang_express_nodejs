var mongoose = require('mongoose');

//Schema commment videojuego
var VideojuegoCommentSchema = new mongoose.Schema({
  body: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  videojuego: { type: mongoose.Schema.Types.ObjectId, ref: 'Videojuego' }
}, {timestamps: true});

///Coment videojuego population author
VideojuegoCommentSchema.methods.toJSONFor = function(user){
  return {
    id: this._id,
    body: this.body,
    createdAt: this.createdAt,
    author: this.author.toProfileJSONFor(user)
  };
};

mongoose.model('VideojuegoComment', VideojuegoCommentSchema);
