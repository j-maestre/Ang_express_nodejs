import angular from 'angular';

let componentsModule = angular.module('app.components', []);


import ListErrors from './list-errors.component'
componentsModule.component('listErrors', ListErrors);

import ShowAuthed from './show-authed.directive';
componentsModule.directive('showAuthed', ShowAuthed);

import FollowBtn from './buttons/follow-btn.component';
componentsModule.component('followBtn', FollowBtn);

import ArticleMeta from './article-helpers/article-meta.component';
componentsModule.component('articleMeta', ArticleMeta);

import FavoriteBtn from './buttons/favorite-btn.component';
componentsModule.component('favoriteBtn', FavoriteBtn);

//Videojuegos
import VideojuegosList from './videojuegos-helpers/videojuegos-list.component';
componentsModule.component('videojuegosList',VideojuegosList); 

import VideojuegosDetails from './videojuegos-helpers/videojuegos-detail.component';
componentsModule.component('videojuegosDetails',VideojuegosDetails);

/////


import ArticlePreview from './article-helpers/article-preview.component';
componentsModule.component('articlePreview', ArticlePreview);

import ArticleList from './article-helpers/article-list.component';
componentsModule.component('articleList', ArticleList);  

import ListPagination from './article-helpers/list-pagination.component';
componentsModule.component('listPagination', ListPagination);

export default componentsModule;
