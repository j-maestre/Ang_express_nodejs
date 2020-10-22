class VideojuegoActionsCtrl {
    constructor(Videojuegos, User, $state,$scope) {
      'ngInject';
  
      this.videojuego = Videojuegos;
      this._$state = $state;
  
      setTimeout(()=>{
        if (User.current) {
          console.log("HOLA current user");
          // console.log(this.videojuego.author);

          // console.log(User.current);
          this.canModify = ((this.videojuego.author)&&(User.current.username === this.videojuego.author.username)); //PEta aqui
        } else {
          console.log("Else current user");
          this.canModify = false;
        }
        $scope.$apply();
      },10);
      
  
    }
  
    deleteVideojuego() {
      this.isDeleting = true;
      this.videojuego.destroy(this.videojuego.slug).then(
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
  