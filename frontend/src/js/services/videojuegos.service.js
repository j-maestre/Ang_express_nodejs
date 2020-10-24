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
      query(config) {
        console.log("DENTRO DE QUERY CONFIG SERVICE");
        console.log(config);
        // Create the $http object for this request
        let request = {
          url: this._AppConstants.api + '/videojuegos' + ((config.type === 'feed') ? '/feed' : ''),
          method: 'GET',
          params: config.filters ? config.filters : null
        };
        console.log("request");
        console.log(request);
        let prueba= this._$http(request).then((res) => res.data);
        console.log("PRUEBA RES SERVICE");
        console.log(prueba);
        return prueba;
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