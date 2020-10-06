
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
      title: 'Videojuego Details', 
      resolve: {
        videojuego: function(Videojuegos, $stateParams) {

          // console.log("HOLAA");
          // console.log("Videojuego:");
          // console.log(Videojuegos);
          // console.log("statreparams");
          // console.log($stateParams.slug);
          return Videojuegos.getVideojuego($stateParams.slug).then((data) => data.videojuego);
        }
      }
    })
  
  
  };
  
  
  
  export default VideojuegosConfig;
  