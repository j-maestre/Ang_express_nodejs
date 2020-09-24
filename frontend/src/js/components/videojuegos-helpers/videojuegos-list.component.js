class VideojuegosListCtrl{
    constructor($scope){
        'ngInject';
        this._$scope = $scope;
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