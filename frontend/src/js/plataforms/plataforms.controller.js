class PlataformsCtrl {
    constructor(plataforms,$state, $scope, $stateParams) {
      "ngInject";
      ////
      this.$state=$state;
      ////
      this._$scope = $scope;
      this.plataforms = plataforms;
      this.filter = $stateParams.filter;
      $scope.plataforms = this.plataforms;
      this.listConfig = { type: 'all' };

      this._$scope.openDetails = function () {
        $state.go("app.plataform", { slug: this.plataform["slug"] });
      };
  }
}
  export default PlataformsCtrl;