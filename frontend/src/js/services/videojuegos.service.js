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
        // Create the $http object for this request
        let request = {
          url: this._AppConstants.api + '/videojuegos' + ((config.type === 'feed') ? '/feed' : ''),
          method: 'GET',
          params: config.filters ? config.filters : null
        };
        return this._$http(request).then((res) => res.data);
      }


     
      getVideojuegos(){
        return this._$http({
            url: this._AppConstants.api + "/videojuegos",  //  /videojuegos/
            // url: 'localhost:4000/api/videojuegos',
            method: "GET"
          }).then(res => {
            return res.data.videojuegos;
          });
    }

    getVideojuego(slug) {
      console.log("GET VIDEOJUEGO");
      console.log(slug);
      return this._$http({
        url: this._AppConstants.api + "/videojuegos/" + slug,
        method: "GET"
      }) //.then(res => res.data.hotel); //recibo 1 hotel
        .then(res => {
          return res.data.videojuego
        });
    }

    destroy(slug) {
      console.log("DESTROY");
      return this._$http({
        url: this._AppConstants.api + '/videojuegos/' + slug,
        method: 'DELETE'
      })
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