class VideojuegoActionsCtrl {
    constructor(Videojuegos, User, $state,$scope) {
      'ngInject';
  
      this.videojuegos = Videojuegos;
      this._$state = $state;
  
      setTimeout(()=>{
        if (User.current) {
          this.canModify = ((this.videojuego.author)&&(User.current.username === this.videojuego.author.username)); //PEta aqui
        } else {
   
          this.canModify = false;
        }
        $scope.$apply();
      },10);
      
  
    }
  
    deleteVideojuego() {
      console.log("Dentro de delete videojuegoo");
      this.isDeleting = true;

      console.log(this.videojuegos);

      this.videojuegos.destroy(this.videojuego.slug).then(
        (success) => this._$state.go('app.home'),
        (err) => this._$state.go('app.home')
      )
    }
  }
  
  let VideojuegoActions = {
    bindings: {
      videojuego: '='
    },
    controller: VideojuegoActionsCtrl,
    templateUrl: 'videojuego/videojuego-actions.html'
  };
  
  export default VideojuegoActions;
  