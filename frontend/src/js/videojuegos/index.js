import angular from 'angular';
let videojuegosModule = angular.module('app.videojuegos',[]);


import VideojuegosConfig from './videojuegos.config';
videojuegosModule.config(VideojuegosConfig);

import VideojuegosCtrl from './videojuegos.controller';
videojuegosModule.controller('VideojuegosCtrl',VideojuegosCtrl);

// import VideojuegosDetailsCtrl from './videojuegosDetails.controller';
// videojuegosModule.controller('videojuegosDetailsCtrl', VideojuegosDetailsCtrl);

import VideojuegosDetailsCtrl from './videojuegosDetails.controller';
videojuegosModule.controller('videojuegosDetailsCtrl', VideojuegosDetailsCtrl);

export default videojuegosModule;
// export default videojuegosDetails;