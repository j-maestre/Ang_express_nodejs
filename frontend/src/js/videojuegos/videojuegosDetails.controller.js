class VideojuegosDetailsCtrl {
  constructor(videojuego,$scope) {
    "ngInject";
    this._$scope=$scope
    $scope.videojuego = videojuego;
    
  }
}
export default VideojuegosDetailsCtrl;