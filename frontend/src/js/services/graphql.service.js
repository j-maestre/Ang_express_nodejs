/* Client
 https://medium.com/free-code-camp/graphql-front-end-queries-made-easy-68e9d9ded283 */

/* Token in header
 https://www.apollographql.com/docs/react/networking/authentication/ */

 import { ApolloClient } from 'apollo-client'
 import { createHttpLink } from 'apollo-link-http'
 import { InMemoryCache } from 'apollo-cache-inmemory'
 import { setContext } from 'apollo-link-context';
 import gql from 'graphql-tag'
 
 export default class GraphQL {
     constructor(AppConstants, $q, JWT) {
         'ngInject';
 
         this._AppConstants = AppConstants;
         this._$q = $q;
         this._clients = new Map([[this._AppConstants.gql + '/graphql/', this.createClient()]]);
         this._authClient = this.createAuthClient();
         this._JWT = JWT;
     }
 
     createClient(server = this._AppConstants.api_gql) {
         return new ApolloClient({
             link: createHttpLink({ uri: server }),
             cache: new InMemoryCache()
         });
     }
 
     createAuthClient() {
         return new ApolloClient({
             // concats the 2 ApolloLinks to add the headers to the request
             link: this.createAuthLink().concat(createHttpLink({ uri: this._AppConstants.gql + '/graphqlauth/' })),
             cache: new InMemoryCache()
         });
     }
 
     createAuthLink() {
         // headers unused because '...headers' explodes when gulp compiles
         // works with all default headers anyway
         return setContext((_, { headers }) => {
             // get the authentication token from local storage if it exists
             let token = this._JWT.get();
 
             // return the headers to the context so httpLink can read them
             return {
                 headers: {
                     // ...headers,
                     Authorization: token ? `Bearer ${token}` : "",
                 }
             }
         });
     }
 
     get(query, server = this._AppConstants.api_gql) {  //Aqui se ejecutaran todas las consultas, ya bien sean mutations o consultas o lo que sea
         let deferred = this._$q.defer();
         if (!this._clients.has(server)) {
             this._clients.set(server, this.createClient(server));
         }
         this._clients.get(server).query({
             query: gql(query)
         }).then(
             (res) => deferred.resolve(res.data),
             (err) => deferred.reject(err)
         );
         return deferred.promise;
     }
 
     getAuth(query) {  //Se viene aqui del plataform service y recibe la query y la ejecuta
         let deferred = this._$q.defer();
 
         this._authClient.query({
             query: gql(query)
         }).then(
             (res) => deferred.resolve(res.data),
             (err) => deferred.reject(err)
         );
 
         return deferred.promise;
     }
 };
 