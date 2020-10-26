class ProfileVideojuegosCtrl {
  constructor(profile, $state, $rootScope) {
    'ngInject';

    // The profile for this page, resolved by UI Router
    this.profile = profile;

    this.profileState = $state.current.name.replace('app.profile.', '');

    // Both favorites and author videojuegos require the 'all' type
    this.listConfig = { type: 'all' };

    // `main` state's filter should be by author
    if (this.profileState === 'main') {
      this.listConfig.filters = {author: this.profile.username};
      // Set page title
      $rootScope.setPageTitle('@' + this.profile.username);

    } else if (this.profileState === 'favorites') {
      console.log("FILTEr por favorited");
      this.listConfig.filters = {favorited: this.profile.username};
      console.log(this.listConfig.filters);
      // Set page title
      $rootScope.setPageTitle(`Videojuegos favorited by ${this.profile.username}`);
    }

  }
}

export default ProfileVideojuegosCtrl;
