class VideojuegosListCtrl{
    constructor($scope){
        'ngInject';
        this._$scope = $scope;

      // this._$scope.openDetails = function (slug) {
      //   this.slug=slug;
      //   $state.go("app.videojuegoDetails", { slug: this.slug});
      // };
    }
}


let VideojuegosList = {
    bindings: {
      videojuegos: '='
    },
    controller: VideojuegosListCtrl,
    templateUrl: 'components/videojuegos-helpers/videojuegos-list.html'
  };
  export default VideojuegosList;