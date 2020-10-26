class VideojuegosCtrl {
    constructor(videojuegos,$state, $scope, $stateParams) {
      "ngInject";
      ////
      this.$state=$state;
      ////
      console.log("Controller list");
      this._$scope = $scope;
      this.videojuegos = videojuegos;
      this.filter = $stateParams.filter;
      $scope.videojuegos = this.videojuegos;
      this.listConfig = { type: 'all' };

      this._$scope.openDetails = function () {
        $state.go("app.videojuego", { slug: this.videojuego["slug"] });
      };
  }
}
  export default VideojuegosCtrl;