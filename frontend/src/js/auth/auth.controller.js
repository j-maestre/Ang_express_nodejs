class AuthCtrl {
  constructor(User, Toastr,$state) {
    'ngInject';

    this._User = User;
    this._$state = $state;

    this.title = $state.current.title;
    this.authType = $state.current.name.replace('app.', '');
    this._toastr=Toastr;

  }

  submitForm() {
    console.log("jusot antes del toastr login normal");
    console.log(this._toastr);
    this._toastr.showToastr('success',"Succesfuly logged!");
    this.isSubmitting = true;

    this._User.attemptAuth(this.authType, this.formData).then(
      (res) => {
        // Toastr.showToastr('success',"hola");
        this._$state.go('app.home');

      },
      (err) => {
        this.isSubmitting = false;
        this.errors = err.data.errors;
      }
    )
  }
}

export default AuthCtrl;
