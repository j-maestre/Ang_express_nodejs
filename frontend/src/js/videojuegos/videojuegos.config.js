
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
          console.log("videojuegos config resolve");
          console.log(Videojuegos);
          let prueba= Videojuegos.getVideojuegos().then(videojuegos =>videojuegos);
          console.log("prueba");
          console.log(prueba);
          return prueba;
        }

      }
    })
  };
  
  export default VideojuegosConfig;