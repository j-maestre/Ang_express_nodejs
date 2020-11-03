

var router = require('express').Router();
let faker = require('faker');
faker.locale = "es";
var mongoose = require('mongoose');
var Videojuego = mongoose.model('Videojuego');
var passport = require("passport");
var VideojuegoComment = mongoose.model('VideojuegoComment');
var User = mongoose.model('User');
var auth = require('../auth');
var utils = require('./utils');

router.post('/videojuegos/:qty', async (req, res, next) => {
    try {//Aqui se crean los videojuegos y abajo se añaden 
        var qty = req.params.qty;
        var toInsert = [];
        let users= await utils.getUserNames();
        var plataforms =["ps2","wii","ps3","ps4","psp","NDS","Wii U","Xbox 360","Xbox One","ps5","ps1","game boy","game boy advance"];
        var titulos = ["Super Mario 64","The Legend of Zelda: Breath of the Wild","Super Mario World","Halo: Combat Evolved","Super Mario Bros","Tetris","Wii Sports","Star Wars: Rogue Leader ","Minecraft","Red Dead Redemption 2","Super Mario Odyssey","GTAV","Forza horizon 4","The Last of Us","Skyrim","Half-life","Half-Life2","God of war"];

        for(let i=0; i< qty;i++){
            //Crear videojuegos fakes
            
            toInsert.push(new Videojuego({
                title: titulos[Math.round(Math.random() * ((titulos.length-1) - 0) + 0  )],
                description: faker.hacker.phrase(),
                plataform:plataforms[Math.round(Math.random() * ((plataforms.length-1) - 0) + 0  )],
                body:faker.company.companyName(),
                tagList:[faker.name.firstName(),faker.name.firstName(),faker.name.firstName()],
                author: users[Math.round(Math.random() * ((users.length-1) - 0) + 0  )]._id
               
            }));

        }
    
        await Videojuego.insertMany(toInsert);
        return res.sendStatus(200);    
    } catch (e) {
        next(e);
    }
});

module.exports = router;