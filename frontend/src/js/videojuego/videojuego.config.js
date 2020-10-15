console.log("OLE LOS CARACOLES videojuego config");
function VideojuegoConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
    .state('app.videojuego', {
      url: "/videojuegos/:slug",
      controller: 'VideojuegoCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'videojuego/videojuego.html',
      title: 'Videojuego Details', 
      resolve: {
        videojuego: function(Videojuego, $stateParams) {
          console.log("OLAAA");
          return Videojuego.getVideojuego($stateParams.slug).then((videojuego) => videojuego);
        }
      }
    })
  
  
  };
  
  export default VideojuegoConfig;