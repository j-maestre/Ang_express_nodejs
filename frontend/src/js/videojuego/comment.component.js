class CommentCtrl {
  constructor(User,$scope) {
    'ngInject';

 
    this.$onInit = () => {
      setTimeout(()=>{
        if (User.current) {
          // console.log("autor");
          // console.log(User.current);
          // console.log("this data");
          // console.log(this.data.author.username);
          this.canModify = (User.current.username === this.data.author.username);
        } else {
          this.canModify = false;
        }
        $scope.$apply();
      },1000);
    }

  }
}

let Comment = {
  bindings: {
    data: '=',
    deleteCb: '&'
  },
  controller: CommentCtrl,
  templateUrl: 'videojuego/comment.html'
};

export default Comment;
