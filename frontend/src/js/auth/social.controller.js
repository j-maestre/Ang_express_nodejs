class SocialCtrl {
    constructor(User,Toastr, $state, $scope) { 
      'ngInject';
 
      this._User = User;
      this._$state = $state;
      this._$scope = $scope;
      this._toastr = Toastr;
  
      this.title = $state.current.title;
      this.authType = $state.current.name.replace('app.', '');

      this._User.attemptAuth(this.authType, null).then(
        (res) => {
          // console.log("justo antes del toaster social login");
          // console.log(this._toastr);
          // Toastr.showToastr('success',"ole los caracoles");
          
          this._toastr.showToastr('success','Successfully Logged In');
          alert('Succesfully logged In');
          // alert("prueba");
          // Toastr.showToastr('success','Successfully Logged In');
          // alert("Successfully Logged In");
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
          this._toastr.showToastr('error','Error trying to login');
          alert("Error login");
          this._$state.go('app.home');
        }
      )
    }
  }
  export default SocialCtrl;