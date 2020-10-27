

var router = require('express').Router();
// var faker = require('faker').Router();
// import {faker} from 'faker';
// import { Resource, Resource_type } from "../../models";
let faker = require('faker');
faker.locale = "es";

var mongoose = require('mongoose');
var Videojuego = mongoose.model('Videojuego');
var passport = require("passport");
var VideojuegoComment = mongoose.model('VideojuegoComment');
var User = mongoose.model('User');
var auth = require('../auth');


router.post('/videojuegos/:qty', async (req, res, next) => {
    console.log("HOLA DESDE EL POST DE TEST");
    try {//Aqui se crean los videojuegos y abajo se añaden 

        //Cosas a crear del videojuego:
        //Title
        //Description Fake
        //Plataform
        //Body fake
        //Tag list Fake max 3

        var qty = req.params.qty;
        // var types = await Resource_type.find({}, {_id:1});

        var toInsert = [];

        // for (let i = 0; i < qty; i++) {
        //     toInsert.push(new Resource({
        //         type: types[faker.random.number(types.length - 1)]._id, 
        //         title: faker.commerce.productName()
        //     }));
        // }


        for(let i=0; i< qty;i++){
            //Crear videojuegos fakes
            
            toInsert.push(new Videojuego({
                title: "Videojuego"+i,
                description: faker.hacker.phrase(),
                plataform:"ps2",
                body:faker.company.companyName(),
                tagList:[faker.name.firstName(),faker.name.firstName(),faker.name.firstName()],
                author: "j-maestre"
            }));

        }
    
        await Videojuego.insertMany(toInsert);
        return res.sendStatus(200);    
    } catch (e) {
        next(e);
    }
});

module.exports = router;