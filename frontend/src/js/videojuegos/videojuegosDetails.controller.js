class VideojuegosDetailsCtrl {
  constructor(videojuego,$scope) {
    "ngInject";
    console.log("CONTROLER DETAILSSSS");
    this.videojuego=videojuego;
    $scope.videojuego = this.videojuego;
    // console.log("asdvknaervniwRLKNVÑLRWBJBJÑLFB");
    // console.log(videojuego);
  }
}
export default VideojuegosDetailsCtrl;