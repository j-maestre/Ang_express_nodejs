class VideojuegosCtrl {
    constructor(videojuegos,$state, $scope, $stateParams) {
      "ngInject";
      ////
      this.$state=$state;
      ////
      this._$scope = $scope;
      this.videojuegos = videojuegos;
      this.filter = $stateParams.filter;
      $scope.videojuegos = this.videojuegos;
    
    

    




  
  // videojuegos.getVideojuegos().then(
  //   (videojuegos) => {
  //     this.videojuegos = videojuegos

  //     let AllVideojuegos = new Array();

  //     this.videojuegos.forEach(videojuegos => {
  //       AllVideojuegos.push(videojuegos);
  //     });
  //     $scope.AllVideojuegos = AllVideojuegos;
  //   });

  }

}
  export default VideojuegosCtrl;
  