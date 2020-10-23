class VideojuegosListCtrl{
    constructor(Videojuegos,$scope,$state){
        'ngInject';
        this._Videojuegos=Videojuegos;
        console.log("HOLA constructor list");
        // this._$scope = $scope;

        this.setListTo(this.listConfig);


        $scope.$on('setListTo', (ev, newList) => {
          this.setListTo(newList);
        });
    
        $scope.$on('setPageTo', (ev, pageNumber) => {
          this.setPageTo(pageNumber);
        });

    }

    
    setListTo(newList) {
      // Set the current list to an empty array
      this.list = [];
  
      // Set listConfig to the new list's config
      this.listConfig = newList;
  
      this.runQuery();
    }
  
    setPageTo(pageNumber) {
      this.listConfig.currentPage = pageNumber;
  
      this.runQuery();
    }

    runQuery() {
      // Show the loading indicator
      this.loading = true;
      this.listConfig = this.listConfig || {};
  
      // Create an object for this query
      let queryConfig = {
        type: this.listConfig.type || undefined,
        filters: this.listConfig.filters || {}
      };
  
      // Set the limit filter from the component's attribute
      queryConfig.filters.limit = this.limit;
  
      // If there is no page set, set page as 1
      if (!this.listConfig.currentPage) {
        this.listConfig.currentPage = 1;
      }
  
      // Add the offset filter
      queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1));
  
      // Run the query
      this._Videojuegos.query(queryConfig).then(
          (res) => {
            console.log("HOLa run query this.videojuegos");
            console.log(res.videojuegos);
            // console.log(this.listConfig.totalPages);//totalpages es undefined
            this.loading = false;
  
            // Update list and total pages
            this.list = res.videojuegos;
  
            this.listConfig.totalPages = Math.ceil(res.videojuegosCount / this.limit);
            console.log("listconfig");
            console.log(this.listConfig);
          });
    }
}
// console.log("HOLAAAAA");

// let VideojuegosList = {
//   bindings: {
//     videojuegos: '='
//   },
//   controller: VideojuegosListCtrl,
//   templateUrl: 'components/videojuegos-helpers/videojuegos-list.html'
// };



let VideojuegosList = {
    bindings: {
      limit: '=',
      listConfig: '=',
    },
    controller: VideojuegosListCtrl,
    templateUrl: 'components/videojuegos-helpers/videojuegos-list.html'
  };
  export default VideojuegosList;