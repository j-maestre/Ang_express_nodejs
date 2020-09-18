
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
  
    // .state('app.videojuegosDetails', {
    //   url: "/videojuegos/:id",
    //   controller: 'VideojuegosDetailsCtrl',
    //   controllerAs: '$ctrl',
    //   templateUrl: 'videojuegos/videojuegosDetails.html',
    //   title: 'videojuegos Details',
    //   resolve: {
    //     videojuegos: function(Videojuegos, $state, $stateParams) {
    //       return Videojuegos.getVideojuegos($stateParams.id).then(
    //        (data) => data.videojuegos
    //       )
    //     }
    //   }
    // })
  
  
  };
  
  
  
  export default VideojuegosConfig;
  