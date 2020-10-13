import angular from 'angular';
let videojuegosModule = angular.module('app.videojuegos',[]);


import VideojuegosConfig from './videojuegos.config';
videojuegosModule.config(VideojuegosConfig);

import VideojuegosCtrl from './videojuegos.controller';
videojuegosModule.controller('VideojuegosCtrl',VideojuegosCtrl);

import VideojuegoActions from './videojuego-actions.component';
videojuegosModule.component('videojuegoActions', VideojuegoActions);

// import Comment from './comment.component';
// articleModule.component('comment', Comment);

// import VideojuegosDetailsCtrl from './videojuegosDetails.controller';
// videojuegosModule.controller('videojuegosDetailsCtrl', VideojuegosDetailsCtrl);

// import VideojuegosDetailsCtrl from './videojuegosDetails.controller';
// videojuegosModule.controller('VideojuegosDetailsCtrl', VideojuegosDetailsCtrl);

export default videojuegosModule;
// export default videojuegosDetails;