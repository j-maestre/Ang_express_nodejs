class VideojuegoListCtrl{
    constructor($scope,$state){
        'ngInject';
        this._$scope = $scope;

    //   this._$scope.openDetails = function (slug) {
    //     this.slug=this.videojuego.slug;
    //     // this.hotel["slug"]
    //     console.log("SLUG");
    //     console.log(this.slug);
    //     $state.go("app.videojuegosDetails", { slug: this.slug});
    //   };
    }
}


let VideojuegoList = {
    bindings: {
      videojuego: '='
    },
    controller: VideojuegoListCtrl,
    templateUrl: 'components/videojuego-helpers/videojuego-list.html'
  };
  export default VideojuegoList;