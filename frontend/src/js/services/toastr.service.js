export default class Toastr {
    constructor (AppConstants, $http, toastr) {
      'ngInject';
    //   console.log("HOLAAAA");
        this._AppConstants= AppConstants;
        this._$http=$http;
        this._toastr = toastr;
    }
  
    showToastr(type, message){
     alert("entra en showToastr");
      switch (type) {
        case 'success':
          this._toastr.success(message);
          break;
        case 'error':
          this._toastr.error(message);
          break;

        case 'info':
            this._toastr.info(message);
            break;
        case 'warning':
            this._toastr.warning(message);
            break;
      }
    }
  }