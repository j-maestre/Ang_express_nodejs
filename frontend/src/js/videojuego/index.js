import angular from 'angular';
let videojuegoModule = angular.module('app.videojuego',[]);


import VideojuegoConfig from './videojuego.config';
videojuegoModule.config(VideojuegoConfig);

import VideojuegoCtrl from './videojuego.controller';
videojuegoModule.controller('VideojuegoCtrl',VideojuegoCtrl);

import VideojuegoActions from './videojuego-actions.component';
videojuegoModule.component('videojuegoActions', VideojuegoActions);

// import Comment from './comment.component';
// articleModule.component('comment', Comment);


export default videojuegoModule;
