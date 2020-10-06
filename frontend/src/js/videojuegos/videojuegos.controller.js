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

      this._$scope.openDetails = function () {
        $state.go("app.videojuegosDetails", { slug: this.videojuego["slug"] });
      };
  }

}
  export default VideojuegosCtrl;
  


    // videojuegos.getVideojuegos().then(
  //   (videojuegos) => {
  //     this.videojuegos = videojuegos

  //     let AllVideojuegos = new Array();

  //     this.videojuegos.forEach(videojuegos => {
  //       AllVideojuegos.push(videojuegos);
  //     });
  //     $scope.AllVideojuegos = AllVideojuegos;
  //   });