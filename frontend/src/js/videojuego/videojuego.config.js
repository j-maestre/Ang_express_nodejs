function VideojuegoConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
    .state('app.videojuego', {
      url: "/videojuego/:slug",
      controller: 'VideojuegoCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'videojuego/videojuego.html',
      title: 'Videojuego Details', 
      resolve: {
        videojuego: function(Videojuegos, $stateParams) {
          return Videojuegos.getVideojuego($stateParams.slug).then((videojuego) => videojuego);
        }
      }
    });
  
  
  };
  
  export default VideojuegoConfig;