class VideojuegoActionsCtrl {
    constructor(Videojuegos, User, $state) {
      'ngInject';
  
      this.videojuego = Videojuegos;
      this._$state = $state;
  
      if (User.current) {
        console.log("HOLAA");
        console.log(this.videojuego.author);
        // console.log(User.current);
        this.canModify = ((this.videojuego.author)&&(User.current.username === this.videojuego.author.username)); //PEta aqui
      } else {
        this.canModify = false;
      }
  
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
    templateUrl: 'videojuegos/videojuego-actions.html'
  };
  
  export default VideojuegoActions;
  