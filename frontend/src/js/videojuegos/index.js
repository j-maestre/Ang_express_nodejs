import angular from 'angular';
let videojuegosModule = angular.module('app.videojuegos',[]);

let videojuegosDetails = angular.module('app.videojuegosDetails',[]);


import VideojuegosConfig from './videojuegos.config';
videojuegosModule.config(VideojuegosConfig);

import VideojuegosCtrl from './videojuegos.controller';
videojuegosModule.controller('VideojuegosCtrl',VideojuegosCtrl);

import VideojuegosDetailsCtrl from './videojuegosDetails.controller';
videojuegosDetails.controller('VideojuegosDetailsCtrl', VideojuegosDetailsCtrl);

export default videojuegosModule;