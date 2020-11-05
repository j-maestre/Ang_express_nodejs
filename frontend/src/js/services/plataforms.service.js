export default class Plataforms {
    constructor(AppConstants, $http, $q,GraphQLClient) {
      'ngInject';
  
      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }

    query(config) {
      if (!config.filters.offset) {
        config.filters.offset = 0;
      }
      if (!config.filters.limit) {
        config.filters.limit = 8;
      }
      let query = `
        query getPlataformsAndCount {
          plataforms(limit:${config.filters.limit},offset:${config.filters.offset}) {
            id
            slug
            name
            description
            price
            rate 
          }
          plataformsCount
        }
      `;
      return this._GQL.get(query);
    }
  
    get(slug) {
      let deferred = this._$q.defer();
  
      if (!slug.replace(" ", "")) {
        deferred.reject("Restaurant slug is empty");
        
        return deferred.promise;
      }
  
      let query = `
        query getRestaurant {
          plataform(slug:"${slug}") {
            id
            title
            slug
            description
            streetAddress
            reservePrice
            city {
              id
              slug
              name
              country {
                id
                slug
                name
              }
            }
          }
        }
      `;
      return this._GQL.getAuth(query);
    }
  
    getPlataformsByCity(city) {
      let query = `
        query {
          plataformsResults(slug:"${city}") {
              id
              slug
              title
              description
              reservePrice
              streetAddress
              image
            }
        }
      `;
      return this._GQL.get(query);
    }

    destroy(slug) {
      return this._$http({
        url: this._AppConstants.api + '/plataforms/' + slug,
        method: 'DELETE'
      })
    }
  
    save(plataform) {
      let request = {};
  
      if (plataform.slug) {
        request.url = `${this._AppConstants.api}/plataforms/${plataform.slug}`;  //O es .rest o es .api, voy a dejar de momento .api
        request.method = 'PUT';
        delete plataform.slug;
  
      } else {
        request.url = `${this._AppConstants.api}/plataforms/`;
        request.method = 'POST';
      }
  
      request.data = { plataform: plataform };
  
      return this._$http(request).then((res) => res.data.plataform);
    }
  
  
    favorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/plataforms/' + slug + '/favorite',
        method: 'POST'
      })
    }
  
    unfavorite(slug) {
      return this._$http({
        url: this._AppConstants.api + '/plataforms/' + slug + '/favorite',
        method: 'DELETE'
      })
    }
  
  
  }
  