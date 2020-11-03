let router = require('express').Router();
// let fake= require('fake').Router();
// import fake from './fake';
router.use('/fake', require('./fake'));
// router.use('/videojuegos',require('./videojuegos'));

module.exports = router;