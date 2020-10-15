import angular from 'angular';
let videojuegosModule = angular.module('app.videojuegos',[]);


import VideojuegosConfig from './videojuegos.config';
videojuegosModule.config(VideojuegosConfig);

import VideojuegosCtrl from './videojuegos.controller';
videojuegosModule.controller('VideojuegosCtrl',VideojuegosCtrl);

export default videojuegosModule;