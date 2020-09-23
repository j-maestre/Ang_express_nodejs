
function VideojuegosConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
    .state("app.videojuegos", {
      url: "/videojuegos",
      controller: "VideojuegosCtrl",
      controllerAs: "$ctrl",
      templateUrl: "videojuegos/videojuegos.html",
      title: "Videojuegos",
      resolve: {
        videojuegos: function(Videojuegos) {
          return Videojuegos.getVideojuegos().then(videojuegos =>videojuegos);

        }

      }
    })
  
    .state('app.videojuegosDetails', {
      url: "/videojuegos/:slug",
      controller: 'VideojuegosDetailsCtrl',
      controllerAs: '$ctrl',
      templateUrl: 'videojuegos/videojuegosDetails.html',
      title: 'Videojuegos Details',
      resolve: {
        videojuego: function(Videojuegos, $stateParams) {
          // console.log(Videojuegos.getVideojuego($stateParams.slug));
          return Videojuegos.getVideojuego($stateParams.slug).then(videojuego => videojuego)
        }
      }
    })
  
  
  };
  
  
  
  export default VideojuegosConfig;
  