
class VideojuegosDetailsCtrl {
  
    constructor(videojuego,$state, $scope, $stateParams) {
      "ngInject";
      ////
      this.$state=$state;
      ////
      this._$scope = $scope;
      this.videojuego = videojuego;
      this.filter = $stateParams.filter;
      $scope.videojuego = this.videojuego;

  }
  }
  export default VideojuegosDetailsCtrl;