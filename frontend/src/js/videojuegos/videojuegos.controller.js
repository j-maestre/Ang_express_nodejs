class VideojuegosCtrl {
    constructor(videojuegos,$state, $scope, $stateParams) {
      "ngInject";
      ////
      this.$state=$state;
      ////
      this._$scope = $scope;
      this.videojuegos = videojuegos.videojuegos;
      this.filter = $stateParams.filter;
      $scope.videojuegos = this.videojuegos;
    
    }
  }
  export default VideojuegosCtrl;
  