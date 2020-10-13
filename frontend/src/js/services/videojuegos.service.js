export default class Videojuegos{
    constructor(JWT, AppConstants, $http, $state, $q) {
        'ngInject';
    
        this._JWT = JWT;
        this._AppConstants = AppConstants;
        this._$http = $http;
        this._$state = $state;
        this._$q = $q;
    
        this.current = null;
    
      }


     
      getVideojuegos(){
        // console.log("VWE");


        return this._$http({
            url: this._AppConstants.api + "/videojuegos",  //  /videojuegos/
            // url: 'localhost:4000/api/videojuegos',
            method: "GET"
          }).then(res => {
            // console.log("HOLA");
            // console.log(res.data.videojuegos);
            return res.data.videojuegos;
          });
    }

    getVideojuego(slug) {
      return this._$http({
        url: this._AppConstants.api + "/videojuegos/" + slug,
        method: "GET"
      }) //.then(res => res.data.hotel); //recibo 1 hotel
        .then(res => {
          console.log(slug);
          console.log(res.data.videojuego);
          return res.data.videojuego
        });
    }


    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/videojuegos/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/videojuegos/' + slug + '/favorite',
        method: 'DELETE'
      })
    }



}