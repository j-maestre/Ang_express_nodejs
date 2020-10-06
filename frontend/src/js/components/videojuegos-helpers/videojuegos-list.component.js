class VideojuegosListCtrl{
    constructor($scope,$state){
        'ngInject';
        this._$scope = $scope;

      this._$scope.openDetails = function (slug) {
        this.slug=this.videojuego.slug;
        // this.hotel["slug"]
        console.log("SLUG");
        console.log(this.slug);
        $state.go("app.videojuegosDetails", { slug: this.slug});
      };
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