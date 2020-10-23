import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

//Videojuego
import FavoriteVideojuegoBtn from './buttons/favorite-btn-videojuego.component';
componentsModule.component('favoriteVideojuegoBtn', FavoriteVideojuegoBtn);

//Esto no creo que tenga que estar aqui
import VideojuegosList from './videojuegos-helpers/videojuego-list.component';
componentsModule.component('videojuegosList',VideojuegosList); 

import VideojuegoPreview from './videojuegos-helpers/videojuego-preview.component';
componentsModule.component('videojuegoPreview', VideojuegoPreview);

// import VideojuegosDetails from './videojuegos-helpers/videojuegos-detail.component';
// componentsModule.component('videojuegosDetails',VideojuegosDetails);

/////

export default componentsModule;
