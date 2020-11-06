
function PlataformsConfig($stateProvider) {
    "ngInject";
  
    $stateProvider
  
    .state("app.plataforms", {
      url: "/plataforms",
      controller: "PlataformsCtrl",
      controllerAs: "$ctrl",
      templateUrl: "plataforms/plataforms.html",
      title: "Plataforms",
      resolve: {
        plataforms: function(Plataforms) {
          console.log("resolve");
          // let prueba = Plataforms.getPlataforms().then(plataforms =>plataforms);
          // console.log(prueba);
          return Plataforms.getPlataforms().then(plataforms =>plataforms);
          // return prueba;
          }
      }
    })
  };
  
  export default PlataformsConfig;