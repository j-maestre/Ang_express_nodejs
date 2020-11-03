var router = require('express').Router();
var mongoose = require('mongoose');
var Videojuego = mongoose.model('Videojuego');

// return a list of tags
router.get('/', function(req, res, next) {
  Videojuego.find().distinct('tagList').then(function(tags){
    return res.json({tags: tags});
  }).catch(next);
});
module.exports = router;
