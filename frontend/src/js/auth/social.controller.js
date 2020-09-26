class SocialCtrl {
    constructor(User, $state, $scope,Toastr ) {//
      'ngInject';
 
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
      this._toaster = Toastr;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');
  console.log("Bon dia pel mati");


      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          this._toaster.showToastr('success','Successfully Logged In');
          alert("Successfully Logged In");
          if(res.data.user.type == "admin"){
            alert("saludos mi admin");
            this._$state.go('app.adminpanel');
          }else {
            location.reload(); //Ojo con esta linea
            this._$state.go('app.home');
          }
        },
        (err) => {
          console.log(err);
          this._toaster.showToastr('error','Error trying to login');
          alert("Error login");
          this._$state.go('app.home');
        }
      )
    }
  }
  export default SocialCtrl;