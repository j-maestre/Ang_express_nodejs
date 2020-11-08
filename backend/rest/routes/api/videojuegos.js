var router = require('express').Router();
var mongoose = require('mongoose');
var Videojuego = mongoose.model('Videojuego');
var passport = require("passport");
var VideojuegoComment = mongoose.model('VideojuegoComment');
var User = mongoose.model('User');
var auth = require('../auth');
let videojuegosUtils = require('../utils/videojuegosUtils');
let userUtils = require('../utils/usersUtils');
// const axios = require('axios');
const { createApolloFetch } = require('apollo-fetch');

// Preload videojuego objects on routes with ':videojuego'
router.param('videojuego', function(req, res, next, slug) {
  Videojuego.findOne({ slug: slug}).populate('author').then(function (videojuego) {
      if (!videojuego) { return res.sendStatus(404); }

      req.videojuego = videojuego;

      return next();
    }).catch(next);
});



router.get('/', auth.optional, function(req, res, next) { //auth.required
  var query = {};
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  if( typeof req.query.tag !== 'undefined' ){
    query.tagList = {"$in" : [req.query.tag]};
  }

  Promise.all([
    req.query.author ? User.findOne({username: req.query.author}) : null,
    req.query.favorited ? User.findOne({username: req.query.favorited}) : null
  ]).then(function(results){
    var author = results[0];
    var favoriter = results[1];

    if(author){
      query.author = author._id;
    }

    if(favoriter){
      query._id = {$in: favoriter.favoritesV};//FavoritesV porque son los videojuegos, favorites son los articles
    } else if(req.query.favorited){
      query._id = {$in: []};
    }

    return Promise.all([
      Videojuego.find(query)
        .limit(Number(limit))
        .skip(Number(offset))
        .sort({createdAt: 'desc'})
        .populate('author')
        .exec(),
      Videojuego.count(query).exec(),
      req.payload ? User.findById(req.payload.id) : null,
    ]).then(function(results){
      var videojuegos = results[0];
      var videojuegosCount = results[1];
      var user = results[2];

      return res.json({
        videojuegos: videojuegos.map(function(videojuego){
          return videojuego.toJSONFor(user);
        }),
        videojuegosCount: videojuegosCount
      });
    });
  }).catch(next);
});

router.get('/feed', auth.required, function(req, res, next) {
  var limit = 20;
  var offset = 0;

  if(typeof req.query.limit !== 'undefined'){
    limit = req.query.limit;
  }

  if(typeof req.query.offset !== 'undefined'){
    offset = req.query.offset;
  }

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    Promise.all([
      Videojuego.find({ author: {$in: user.following}})
        .limit(Number(limit))
        .skip(Number(offset))
        .populate('author')
        .exec(),
      Videojuego.count({ author: {$in: user.following}})
    ]).then(function(results){
      var videojuegos = results[0];
      var videojuegosCount = results[1];

      return res.json({
        videojuegos: videojuegos.map(function(videojuego){
          return videojuego.toJSONFor(user);
        }),
        videojuegosCount: videojuegosCount
      });
    }).catch(next);
  });
});




router.post("/",auth.optional ,async function(req, res, next) {
  try {
      let user = await User.findById(req.payload.id)
      if (!user) { return res.sendStatus(401); }

      let videojuego = new Videojuego(req.body.videojuego);
      videojuego.author=user;
     
    //Conectando con backend de graphql 
        const fetch = createApolloFetch({
          uri: 'http://localhost:3002/api/graphql',
        });

        let resp = await fetch({
                query: `
                query {
                  plataforms{
                    id
                    slug
                    name
                    description
                    price
                    rate
                  }
                }
                  `,
        })
        let plataforms=resp.data.plataforms;

        //Buscamos la plataform con el mismo name que le hemos puesto en videojuego y devolvemos todo el objeto plataform
        let result =plataforms.filter(element =>
          element.name==videojuego.plataform
        );

        //Asignamos al campo plataform el id de la plataform de graphql 
         videojuego.plataform=result[0].id;
        

      await videojuego.save();
      await userUtils.UpdateKarma(user.id,40);
    
      return res.json({videojuego: videojuego.toJSONFor(user) });
  } catch (error) {
      next(error);
  }
});




// return a videojuego
router.get('/:videojuego', auth.optional, function(req, res, next) {
  Promise.all([
    req.payload ? User.findById(req.payload.id) : null,
    req.videojuego.populate('author').execPopulate()
  ]).then(function(results){
    var user = results[0];

    return res.json({videojuego: req.videojuego.toJSONFor(user)});
  }).catch(next);
});

// update videojuego
router.put('/:videojuego', auth.required, function(req, res, next) {
  User.findById(req.payload.id).then(function(user){
    if(req.videojuego.author._id.toString() === req.payload.id.toString()){
      if(typeof req.body.videojuego.title !== 'undefined'){
        req.videojuego.title = req.body.videojuego.title;
      }

      if(typeof req.body.videojuego.description !== 'undefined'){
        req.videojuego.description = req.body.videojuego.description;
      }
      if(typeof req.body.videojuego.plataform !== 'undefined'){
        req.videojuego.plataform = req.body.videojuego.plataform;
      }

      if(typeof req.body.videojuego.body !== 'undefined'){
        req.videojuego.body = req.body.videojuego.body;
      }

      if(typeof req.body.videojuego.tagList !== 'undefined'){
        req.videojuego.tagList = req.body.videojuego.tagList
      }

      req.videojuego.save().then(function(videojuego){
        return res.json({videojuego: videojuego.toJSONFor(user)});
      }).catch(next);
    } else {
      return res.sendStatus(403);
    }
  });
});

// delete videojuego
router.delete('/:videojuego', auth.required, async(req, res, next) =>{
  console.log("dentro de delete");
   try{
    let user= await User.findById(req.payload.id);
    console.log("user");
    console.log(user);
    if(!user) return res.sendStatus(401);

    if(req.videojuego.author._id.toString()===req.payload.id.toString()){

      console.log("videojuego a borrar");
      console.log(req.videojuego);
      let vidDel = await videojuegosUtils.DeleteVideojuego(req.videojuego);
      await userUtils.UpdateKarma(user.id,-40);
      if(vidDel) return res.sendStatus(204);
      

    }else{
      return res.sendStatus(403);
    }

   }catch(e){
     next(e);
   }
});


// Favorite an videojuego
router.post('/:videojuego/favorite', auth.required, function(req, res, next) { //Favorito videojuego
  var videojuegoId = req.videojuego._id;

  User.findById(req.payload.id).then(function(user){
    if (!user) { return res.sendStatus(401); }

    return user.favoriteV(videojuegoId).then(function(){ //La linea mas importante
      return req.videojuego.updateFavoriteCount().then(function(videojuego){
        return res.json({videojuego: videojuego.toJSONFor(user)});
      });
    });
  }).catch(next);
});

// Unfavorite an videojuego
router.delete('/:videojuego/favorite', auth.required, function(req, res, next) {//Borrar favorito videojuego
  var videojuegoId = req.videojuego._id;

  User.findById(req.payload.id).then(function (user){ 
    if (!user) { return res.sendStatus(401); }

    return user.unfavoriteV(videojuegoId).then(function(){//Linea mas importante
      return req.videojuego.updateFavoriteCount().then(function(videojuego){
        return res.json({videojuego: videojuego.toJSONFor(user)});
      });
    });
  }).catch(next);
});


//////COMENTARIOS
// return an videojuego's comments
router.get('/:videojuego/comments', auth.optional, function(req, res, next){
  Promise.resolve(req.payload ? User.findById(req.payload.id) : null).then(function(user){
    return req.videojuego.populate({
      path: 'comments',
      populate: {
        path: 'author'
      },
      options: {
        sort: {
          createdAt: 'desc'
        }
      }
    }).execPopulate().then(function(videojuego) {
      return res.json({comments: req.videojuego.comments.map(function(comment){
        return comment.toJSONFor(user);
      })});
    });
  }).catch(next);
});

// create a new comment
router.post('/:videojuego/comments', auth.required, function(req, res, next) {//Poner comentario
  User.findById(req.payload.id).then(function(user){
    if(!user){ return res.sendStatus(401); }
    var comment = new VideojuegoComment(req.body.comment);
  
    comment.videojuego = req.videojuego;
    comment.author = user;
    return comment.save().then(function(){//Guardamos el comentario
      // req.videojuego.comments.push(comment);
      req.videojuego.comments=req.videojuego.comments.concat([comment]);

      return req.videojuego.save().then(function(videojuego) {//Guardamos el videojuego porque el comentario sismpre va asociado a un videojuego
        res.json({comment: comment.toJSONFor(user)});
      });
    });
  }).catch(next);
});

router.delete('/:videojuego/comments/:comment', auth.required, function(req, res, next) {
   //Borrar comentario
  if(req.videojuego.author._id.toString() === req.payload.id.toString()){ //Hay que borrar el req.videojuego.comments(El comentario con la id igual) que sea igual que :comment
    req.videojuego.comments.remove(req.params.comment);
    req.videojuego.save()
      // .then(VideojuegoComment.find({_id: req.comment._id}).remove().exec())
      .then(function(){
        res.sendStatus(204);
      });
  } else {
    res.sendStatus(403);
  }
});
//////



module.exports = router;
