// toastr=require['toastr'];

export default class Toastr {
    constructor (AppConstants, $http, toastr) {
      'ngInject';
        this._AppConstants= AppConstants;
        this._$http=$http;
        this._toastr = toastr;
        // this._toastr.isOpened=true;
    }
  
    showToastr(type, message){
    //  alert("entra en showToastr");
      switch (type) {
        case 'success':
          // alert("Dentro del type succes");
          // console.log(this._toastr.success("hola"));
          // alert(message);
          // this._toastr.isOpened=true;

          this._toastr.success(message);
          // toastr.success("Hola");
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