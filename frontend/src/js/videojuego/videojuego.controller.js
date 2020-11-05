class VideojuegoCtrl {
    constructor(videojuego,User,Comments,$scope) {
      "ngInject";

      this._$scope = $scope;
      this.videojuego = videojuego;
      this._Comments=Comments;

  
      $scope.videojuego = this.videojuego;

      Comments.getAll(this.videojuego.slug).then(
        (comments) => this.comments = comments
      );
  
      this.resetCommentForm();

      Comments.getAll(this.videojuego.slug).then(
        (comments) => this.comments = comments
      );
  }

  
  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    }
  }

  // Comments.getAll();
      
  addComment(){
    this.commentForm.isSubmitting = true;

    this._Comments.add(this.videojuego.slug, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    )
  }

  deleteComment(commentId, index) {
    this._Comments.destroy(commentId, this.videojuego.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    )
  }

}
  export default VideojuegoCtrl;

  // class VideojuegosDetailsCtrl {
//     constructor(videojuego,$scope) {
//       "ngInject";
//       this._$scope=$scope
//       $scope.videojuego = videojuego;
      
//     }
//   }
//   export default VideojuegosDetailsCtrl;


