class VideojuegosDetailsCtrl{
  constructor(Videojuegos, $scope){
      'ngInject';
      this._$scope = $scope;
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