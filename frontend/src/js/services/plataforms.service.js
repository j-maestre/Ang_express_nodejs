export default class Plataforms {
    constructor(AppConstants, $http, $q,GraphQLClient) { //Plataforms
      'ngInject';


      // this._Plataforms=Plataforms;

      this._AppConstants = AppConstants;
      this._$http = $http;
      this._$q = $q;
      this._GQL = GraphQLClient;
  
    }

     /////


     getPlataforms(){
      let query = `
        query {
          plataforms{
            id
            slug
            name
            description
            price
            rate
          }
        }
      `;
 
      

      
      return this._GQL.get(query); //Se va a graphql service a la funcion get (funcion sin autorizar) que recibe la query que hemos hecho arriba y la ejecuta y nos devuelve la consulta ejecutada
  }

  /////

    // query(config) {
    //   console.log("plat. service query");
    //   if (!config.filters.offset) {
    //     config.filters.offset = 0;
    //   }
    //   if (!config.filters.limit) {
    //     config.filters.limit = 8; //Cambiar limit?
    //   }
    //   let query = `
    //     query getPlataformsAndCount {
    //       plataforms(limit:${config.filters.limit},offset:${config.filters.offset}) {
    //         id
    //         slug
    //         name
    //         description
    //         price
    //         rate 
    //       }
    //       plataformsCount
    //     }
    //   `;
    //   return this._GQL.get(query);
    // }
  
    // get(slug) {
    //   console.log("plat. service get slug");
    //   let deferred = this._$q.defer();
  
    //   if (!slug.replace(" ", "")) {
    //     deferred.reject("Restaurant slug is empty");
        
    //     return deferred.promise;
    //   }
  
    //   let query = `
    //     query getRestaurant {
    //       plataform(slug:"${slug}") {
    //         id
    //         slug
    //         name
    //         description
    //         price
    //         rate 
    //       }
    //     }
    //   `;
    //   return this._GQL.getAuth(query); //El ._GQL se va a graphql.service a getauth (funcion autorizada) y le pasa la query y nos devuelve los datos ejecutados
    // }

   

  
  
    // getPlataformsByCity(city) {
    //   let query = `
    //     query {
    //       plataformsResults(slug:"${city}") {
    //           id
    //           slug
    //           title
    //           description
    //           reservePrice
    //           streetAddress
    //           image
    //         }
    //     }
    //   `;
    //   return this._GQL.get(query);
    // }
  }