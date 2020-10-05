class VideojuegosDetailsCtrl{
  constructor($scope){
      'ngInject';
      this._$scope = $scope;

    // this._$scope.openDetails = function (slug) {
    //   this.slug=slug;
    //   $state.go("app.videojuegoDetails", { slug: this.slug});
    // };
  }
}


let VideojuegosDetails = {
  bindings: {
    videojuego: '='
  },
  controller: VideojuegosDetailsCtrl,
  templateUrl: 'components/videojuegos-helpers/videojuegos-detail.html'
};

export default VideojuegosDetails;