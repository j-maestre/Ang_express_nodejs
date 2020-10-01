class HomeCtrl {
  constructor(User, Tags, AppConstants, $scope) { //sectors
    'ngInject';

    this.appName = AppConstants.appName;
    this._$scope = $scope;

    // if(sectors){
    //   $scope.infoSect = sectors.slice(0,3);
    // }else{
    //   $scope.infoSect = "Error";
    // }

    // $scope.load = function(){
    //   $scope.infoSect = sectors.slice(0, sectors.lenght + 3);
    // }





    // Get list of all tags
    Tags
      .getAll()
      .then(
        (tags) => {
          this.tagsLoaded = true;
          this.tags = tags
        }
      );

    // Set current list to either feed or all, depending on auth status.
    this.listConfig = {
      type: User.current ? 'feed' : 'all'
    };

  }

  changeList(newList) {
    this._$scope.$broadcast('setListTo', newList);
  }


}

export default HomeCtrl;
