class FavoriteBtnVideojuegoCtrl {
    constructor(User, Videojuegos, $state) {
      'ngInject';
  
      this._User = User;
      this._Videojuegos = Videojuegos;
      this._$state = $state;
  
    }


  submit() {
    this.isSubmitting = true;

    if (!this._User.current) {
      this._$state.go('app.register');
      return;
    }

    if (this.videojuego.favorited) {
      this._Videojuegos.unfavorite(this.videojuego.slug).then(
        () => {
          this.isSubmitting = false;
          this.videojuego.favorited = false;
          this.videojuego.favoritesCount--;
        }
      )

    } else {
      this._Videojuegos.favorite(this.videojuego.slug).then(
        () => {
          this.isSubmitting = false;
          this.videojuego.favorited = true;
          this.videojuego.favoritesCount++;
        }
      )
    }

  }

}

let FavoriteBtnVideojuego= {
  bindings: {
    videojuego: '='
  },
  transclude: true,
  controller: FavoriteBtnVideojuegoCtrl,
  templateUrl: 'components/buttons/favorite-btn-videojuego.html'
};

export default FavoriteBtnVideojuego;

