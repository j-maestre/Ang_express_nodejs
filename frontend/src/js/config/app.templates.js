angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("article/article-actions.html","<article-meta article=\"$ctrl.article\">\n\n  <span ng-show=\"$ctrl.canModify\">\n    <a class=\"btn btn-sm btn-outline-secondary\"\n      ui-sref=\"app.editor({ slug: $ctrl.article.slug })\">\n      <i class=\"ion-edit\"></i> Edit Article\n    </a>\n\n    <button class=\"btn btn-sm btn-outline-danger\"\n      ng-class=\"{disabled: $ctrl.isDeleting}\"\n      ng-click=\"$ctrl.deleteArticle()\">\n      <i class=\"ion-trash-a\"></i> Delete Article\n    </button>\n  </span>\n\n  <span ng-hide=\"$ctrl.canModify\">\n    <follow-btn user=\"$ctrl.article.author\"></follow-btn>\n    <favorite-btn article=\"$ctrl.article\">\n      {{ $ctrl.article.favorited ? \'Unfavorite\' : \'Favorite\' }} Article <span class=\"counter\">({{$ctrl.article.favoritesCount}})</span>\n    </favorite-btn>\n  </span>\n\n</article-meta>\n");
$templateCache.put("article/article.html","<div class=\"article-page\">\n\n  <!-- Banner for article title, action buttons -->\n  <div class=\"banner\">\n    <div class=\"container\">\n\n      <h1 ng-bind=\"::$ctrl.article.title\"></h1>\n\n      <div class=\"article-meta\">\n        <!-- Show author info + favorite & follow buttons -->\n        <article-actions article=\"$ctrl.article\"></article-actions>\n\n      </div>\n\n    </div>\n  </div>\n\n\n\n  <!-- Main view. Contains article html and comments -->\n  <div class=\"container page\">\n\n    <!-- Article\'s HTML & tags rendered here -->\n    <div class=\"row article-content\">\n      <div class=\"col-xs-12\">\n\n        <div ng-bind-html=\"::$ctrl.article.body\"></div>\n\n        <ul class=\"tag-list\">\n          <li class=\"tag-default tag-pill tag-outline\"\n            ng-repeat=\"tag in ::$ctrl.article.tagList\">\n            {{ tag }}\n          </li>\n        </ul>\n\n      </div>\n    </div>\n\n    <hr />\n\n    <div class=\"article-actions\">\n\n      <!-- Show author info + favorite & follow buttons -->\n      <article-actions article=\"$ctrl.article\"></article-actions>\n\n    </div>\n\n    <!-- Comments section -->\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-md-8 offset-md-2\">\n\n        <div show-authed=\"true\">\n          <list-errors from=\"$crl.commentForm.errors\"></list-errors>\n          <form class=\"card comment-form\" ng-submit=\"$ctrl.addComment()\">\n            <fieldset ng-disabled=\"$ctrl.commentForm.isSubmitting\">\n              <div class=\"card-block\">\n                <textarea class=\"form-control\"\n                  placeholder=\"Write a comment...\"\n                  rows=\"3\"\n                  ng-model=\"$ctrl.commentForm.body\"></textarea>\n              </div>\n              <div class=\"card-footer\">\n                <img ng-src=\"{{::$ctrl.currentUser.image}}\" class=\"comment-author-img\" />\n                <button class=\"btn btn-sm btn-primary\" type=\"submit\">\n                 Post Comment\n                </button>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n\n        <div show-authed=\"false\">\n          <a ui-sref=\"app.login\">Sign in</a> or <a ui-sref=\"app.register\">sign up</a> to add comments on this article.\n        </div>\n\n        <comment ng-repeat=\"cmt in $ctrl.comments\"\n          data=\"cmt\"\n          delete-cb=\"$ctrl.deleteComment(cmt.id, $index)\">\n        </comment>\n\n\n      </div>\n    </div>\n\n  </div>\n\n\n\n</div>\n");
$templateCache.put("components/list-errors.html","<ul class=\"error-messages\" ng-show=\"$ctrl.errors\">\n  <div ng-repeat=\"(field, errors) in $ctrl.errors\">\n    <li ng-repeat=\"error in errors\">\n      {{field}} {{error}}\n    </li>\n  </div>\n</ul>\n");
$templateCache.put("auth/auth.html","<div class=\"auth-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n        <h1 class=\"text-xs-center\" ng-bind=\"::$ctrl.title\"></h1>\n        <p class=\"text-xs-center\">\n          <a ui-sref=\"app.login\"\n            ng-show=\"$ctrl.authType === \'register\'\"><!--register-->\n            Have an account?\n          </a>\n         \n\n          <a ui-sref=\"app.register\"\n            ng-show=\"$ctrl.authType === \'login\'\">\n            Need an account?\n          </a>\n        </p>\n         \n        <!-- Href a google o github -->\n        \n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form name=\"formData\" ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\" ng-show=\"$ctrl.authType === \'register\'\" ng-disabled=\"$ctrl.authType != \'register\'\">\n  \n                <input required class=\"form-control form-control-lg\" required type=\"text\" placeholder=\"Username\" ng-model=\"$ctrl.formData.username\" minlength=\"4\" maxlength=\"12\" name=\"Username\" autocomplete=false/>\n\n                <div ng-messages=\"formData.Username.$error\" style=\"color:red; font-weight: bold;\">\n                  <p ng-message=\"required\" ng-show=\"formData.Username.$dirty\">Username is required</p>\n                  <p ng-message=\"minlength\">Enter more than 4 caracters</p>\n                  <p ng-message=\"maxlength\">Enter less than 12 caracters</p>\n                </div>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n\n                <fieldset class=\"form-group\">\n                  <input required class=\"form-control form-control-lg\" type=\"text\" placeholder=\"email\" ng-model=\"$ctrl.formData.email\" name=\"Email\"/>\n                  <div ng-messages=\"formData.Email.$error\" style=\"color:red; font-weight: bold;\">\n                    <p ng-message=\"required\" ng-show=\"formData.Email.$dirty\">Email is required</p>\n                  </div>\n                </fieldset>\n            </fieldset>\n\n            \n            <fieldset class=\"form-group\">\n        \n                <input required class=\"form-control form-control-lg\" type=\"text\" placeholder=\"password\" ng-model=\"$ctrl.formData.password\" name=\"Password\" ng-minlength=\"4\" ng-maxlength=\"40\"/>\n              <div ng-messages=\"formData.Password.$error\" style=\"color: red; font-weight: bold;\">\n                <p ng-message=\"required\" ng-show=\"formData.Password.$dirty\">Password is required</p>\n                <p ng-message=\"minlength\">Enter more than 4 characters</p>\n                <p ng-message=\"maxlength\">Enter less than 40 caracters</p>\n              </div>\n\n\n\n            </fieldset>\n\n\n            \n            <!-- <fieldset ng-show=\"$ctrl.authType === \'login\'\">\n              <button class=\"btn btn-lg btn-primary pull-xs-right\" type=\"submit\" ng-bind=\"::$ctrl.title\"\n                            ng-show=\"formData.Password.$valid && formData.Email.$valid\"\n                            ng-click=\"$ctrl.authSubmit()\">\n              </button>\n              <button class=\"btn btn-lg btn-primary pull-xs-right\" type=\"submit\" ng-bind=\"::$ctrl.title\"\n                            ng-hide =\"formData.Password.$valid && formData.Email.$valid\"\n                            ng-click=\"$ctrl.nvalidSubmit()\">\n              </button>\n            </fieldset> -->\n            <button class=\"btn btn-lg btn-primary pull-xs-right\" type=\"submit\" ng-bind=\"::$ctrl.title\">\n            </button>\n            \n            \n\n            <!-- El puerto estaba antes en 3002 -->\n            <a href=\"http://localhost:3000/api/auth/github\" style=\"font-size: 25px; color:black\"><i class=\"ion-social-github\"></i>&nbsp;Github</a></br>\n            <a href=\"http://localhost:3000/api/auth/googleplus\" style=\"font-size: 25px; color:black\"><i class=\"ion-social-google\"></i>&nbsp;google</a>\n\n          </fieldset>\n        </form>\n      </div>\n\n    </div>\n  </div>\n</div>\n");
$templateCache.put("editor/editor.html","<div class=\"editor-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-10 offset-md-1 col-xs-12\">\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form>\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                ng-model=\"$ctrl.article.title\"\n                type=\"text\"\n                placeholder=\"Article Title\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                ng-model=\"$ctrl.article.description\"\n                type=\"text\"\n                placeholder=\"What\'s this article about?\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control\"\n                rows=\"8\"\n                ng-model=\"$ctrl.article.body\"\n                placeholder=\"Write your article (in markdown)\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"Enter tags\"\n                ng-model=\"$ctrl.tagField\"\n                ng-keyup=\"$event.keyCode == 13 && $ctrl.addTag()\" />\n\n              <div class=\"tag-list\">\n                <span ng-repeat=\"tag in $ctrl.article.tagList\"\n                  class=\"tag-default tag-pill\">\n                  <i class=\"ion-close-round\" ng-click=\"$ctrl.removeTag(tag)\"></i>\n                  {{ tag }}\n                </span>\n              </div>\n            </fieldset>\n\n            <button class=\"btn btn-lg pull-xs-right btn-primary\" type=\"button\" ng-click=\"$ctrl.submit()\">\n              Publish Article\n            </button>\n\n          </fieldset>\n        </form>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("home/home.html"," <div class=\"home-page\">\n  <home-slider-cmp></home-slider-cmp>\n  \n  <!-- Splash banner that only shows when not logged in -->\n  <div class=\"banner\" show-authed=\"false\">\n    <div class=\"container\">\n      <h1 class=\"logo-font\" ng-bind=\"::$ctrl.appName | lowercase\"></h1>\n      <p>A place to share your knowledge.</p>\n    </div>\n  </div>\n\n  <div class=\"container page\">\n\n    <!-- <div class=\"container\">\n      <div class=\"row\" infinite-scroll=\"load()\" infinite-scroll-distance=\'0\' infinite-scroll-immediate-check=\'false\'>\n        <div class=\"col-sm-4\" ng-repeat=\"sector in infoSect\"> \n          <div class=\"panel panel-info\">\n            <img ng-src=\"/images/{{slide.slide}}.svg\"\n                class=\"img-responsive\" style=\"width: 100%;\"\n                ui-sref=\"app.projects({filter:sector.sector})\"> -->\n          <!-- </div></br>\n        </div></br>\n      </div>\n    </div></br></br> -->\n\n    <!-- <home-slider-cmp></home-slider-cmp> -->\n    <div class=\"row\">\n\n\n      <!-- Main view - contains tabs & article list -->\n      <div class=\"col-md-9\">\n        <!-- Tabs for toggling between feed, article lists -->\n        <div class=\"feed-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\" show-authed=\"true\">\n              <a href=\"\" class=\"nav-link\"\n                ng-class=\"{ active: $ctrl.listConfig.type === \'feed\' }\"\n                ng-click=\"$ctrl.changeList({ type: \'feed\' })\">\n                Your Feed\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a href=\"\" class=\"nav-link\"\n                ng-class=\"{ active: $ctrl.listConfig.type === \'all\' && !$ctrl.listConfig.filters }\"\n                ng-click=\"$ctrl.changeList({ type: \'all\' })\">\n                Global Feed\n              </a>\n            </li>\n\n            <li class=\"nav-item\" ng-show=\"$ctrl.listConfig.filters.tag\">\n              <a href=\"\" class=\"nav-link active\">\n                <i class=\"ion-pound\"></i> {{$ctrl.listConfig.filters.tag}}\n              </a>\n            </li>\n\n          </ul>\n        </div>\n\n        <!-- List the current games -->\n        <videojuegos-list limit=\"5\" list-config=\"$ctrl.listConfig\"></videojuegos-list>\n\n\n      </div>\n\n      <!-- Sidebar where popular tags are listed -->\n      <div class=\"col-md-3\">\n        <div class=\"sidebar\">\n\n          <p>Popular Tags</p>\n\n          <div class=\"tag-list\" ng-show=\"$ctrl.tags\">\n            <a href=\"\" class=\"tag-default tag-pill\"\n              ng-click=\"$ctrl.changeList({ type: \'all\', filters: { tag: tagName } })\"\n              ng-repeat=\"tagName in $ctrl.tags\"\n              ng-bind=\"tagName\">\n            </a>\n          </div>\n\n          <div ng-show=\"!$ctrl.tagsLoaded\">\n            Loading tags...\n          </div>\n\n          <div class=\"post-preview\"\n            ng-show=\"$ctrl.tagsLoaded && !$ctrl.tags.length\">\n            No tags are here... yet.\n          </div>\n\n        </div>\n      </div>\n\n      <!-- End the row & container divs -->\n    </div>\n  </div>\n\n</div>\n\n\n<plataforms-list limit=\"5\" list-config=\"$ctrl.listConfigP\"></plataform-list>\n");
$templateCache.put("home/homeSlider.html","<div style=\"height: 400px\">\n    <!-- <img src=\'/images/bingo1.png\'></img> -->\n    <div uib-carousel active=\"active\" interval=\"$ctrl.myInterval\" no-wrap=\"$ctrl.noWrapSlides\">\n        <div uib-slide ng-repeat=\"slide in $ctrl.slides track by slide.id\" index=\"slide.id\" style=\"height: 400px\">\n        <img ng-src=\"{{slide.image}}\" class=\"img-fluid\" style=\"filter: blur(2px);\">\n        <div class=\"carousel-caption\" style=\"padding-bottom:100px;\">\n            <!-- <img src=\"images/bingo1.png\"></img> -->\n            <h2>{{slide.text}}</h2>\n        </div>\n        </div>\n    </div>\n</div>");
$templateCache.put("layout/app-view.html","<app-header></app-header>\n\n<div ui-view></div>\n\n<app-footer></app-footer>\n");
$templateCache.put("layout/footer.html","<footer>\n  <div class=\"container\">\n    <a class=\"logo-font\" ui-sref=\"app.home\" ng-bind=\"::$ctrl.appName | lowercase\"></a>\n    <span class=\"attribution\">\n      &copy; {{::$ctrl.date | date:\'yyyy\'}}.\n      An interactive learning project from <a href=\"https://thinkster.io\">Thinksters</a>.\n      Code licensed under MIT.\n    </span>\n  </div>\n</footer>\n");
$templateCache.put("layout/header.html","<nav class=\"navbar navbar-light\">\n  <div class=\"container\">\n\n    <a class=\"navbar-brand\"\n      ui-sref=\"app.home\"\n      ng-bind=\"::$ctrl.appName | lowercase\">\n    </a>\n\n    <!-- Show this for logged out users -->\n    <ul show-authed=\"false\"\n      class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.login\">\n          Sign in\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.register\">\n          Sign up\n        </a>\n      </li>\n\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.plataforms\">\n          <ion-icon name=\"copy-outline\"></ion-icon>Plataforms\n        </a>\n      </li>\n\n      </li>\n\n    </ul>\n\n    <!-- Show this for logged in users -->\n    <ul show-authed=\"true\"\n      class=\"nav navbar-nav pull-xs-right\">\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.home\">\n          Home\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.plataforms\">\n          <i class=\"ion-outline\"></i>&nbsp;Plataforms\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.editor\">\n          <i class=\"ion-compose\"></i>&nbsp;New Article\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.settings\">\n          <i class=\"ion-gear-a\"></i>&nbsp;Settings\n        </a>\n      </li>\n\n      <li class=\"nav-item\">\n        <a class=\"nav-link\"\n          ui-sref-active=\"active\"\n          ui-sref=\"app.profile.main({ username: $ctrl.currentUser.username})\">\n          <img ng-src=\"{{$ctrl.currentUser.image}}\" class=\"user-pic\" />\n          {{ $ctrl.currentUser.username }}\n        </a>\n      </li>\n\n    </ul>\n\n\n  </div>\n</nav>\n");
$templateCache.put("profile/profile-videojuegos.html","<videojuegos-list limit=\"5\" list-config=\"$ctrl.listConfig\"></videojuegos-list>");
$templateCache.put("profile/profile.html","<div class=\"profile-page\">\n\n  <!-- User\'s basic info & action buttons -->\n  <div class=\"user-info\">\n    <div class=\"container\">\n      <div class=\"row\">\n        <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n          <img ng-src=\"{{::$ctrl.profile.image}}\" class=\"user-img\" />\n          <h4 ng-bind=\"::$ctrl.profile.username\"></h4>\n          <p ng-bind=\"::$ctrl.profile.bio\"></p>\n\n          <a ui-sref=\"app.settings\"\n            class=\"btn btn-sm btn-outline-secondary action-btn\"\n            ng-show=\"$ctrl.isUser\">\n            <i class=\"ion-gear-a\"></i> Edit Profile Settings\n          </a>\n\n          <follow-btn user=\"$ctrl.profile\" ng-hide=\"$ctrl.isUser\"></follow-btn>\n\n        </div>\n      </div>\n    </div>\n  </div>\n\n  <!-- Container where User\'s posts & favs are list w/ toggle tabs -->\n  <div class=\"container\">\n    <div class=\"row\">\n\n      <div class=\"col-xs-12 col-md-10 offset-md-1\">\n\n        <!-- Tabs for switching between author articles & favorites -->\n        <div class=\"articles-toggle\">\n          <ul class=\"nav nav-pills outline-active\">\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link active\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.main({username: $ctrl.profile.username})\">\n                My Games\n              </a>\n            </li>\n\n            <li class=\"nav-item\">\n              <a class=\"nav-link\"\n                ui-sref-active=\"active\"\n                ui-sref=\"app.profile.favorites({username: $ctrl.profile.username})\">\n                Favorited Games\n              </a>\n            </li>\n\n          </ul>\n        </div>\n\n        <!-- List of articles -->\n        <div ui-view></div>\n\n\n      </div>\n\n    <!-- End row & container divs -->\n    </div>\n  </div>\n\n</div>\n");
$templateCache.put("settings/settings.html","<div class=\"settings-page\">\n  <div class=\"container page\">\n    <div class=\"row\">\n      <div class=\"col-md-6 offset-md-3 col-xs-12\">\n\n        <h1 class=\"text-xs-center\">Configuraxione</h1>\n\n        <list-errors errors=\"$ctrl.errors\"></list-errors>\n\n        <form ng-submit=\"$ctrl.submitForm()\">\n          <fieldset ng-disabled=\"$ctrl.isSubmitting\">\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control\"\n                type=\"text\"\n                placeholder=\"URL of profile picture\"\n                ng-model=\"$ctrl.formData.image\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"text\"\n                placeholder=\"Username\"\n                ng-model=\"$ctrl.formData.username\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <textarea class=\"form-control form-control-lg\"\n                rows=\"8\"\n                placeholder=\"Short bio about you\"\n                ng-model=\"$ctrl.formData.bio\">\n              </textarea>\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"email\"\n                placeholder=\"Email\"\n                ng-model=\"$ctrl.formData.email\" />\n            </fieldset>\n\n            <fieldset class=\"form-group\">\n              <input class=\"form-control form-control-lg\"\n                type=\"password\"\n                placeholder=\"New Password\"\n                ng-model=\"$ctrl.formData.password\" />\n            </fieldset>\n\n            <button class=\"btn btn-lg btn-primary pull-xs-right\"\n              type=\"submit\">\n              Update Settings\n            </button>\n\n          </fieldset>\n        </form>\n\n        <!-- Line break for logout button -->\n        <hr />\n\n        <button class=\"btn btn-outline-danger\"\n          ng-click=\"$ctrl.logout()\">\n          Or click here to logout.\n        </button>\n\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("videojuego/comment.html","<div class=\"card\">\n  <div class=\"card-block\">\n    <p class=\"card-text\" ng-bind=\"::$ctrl.data.body\"></p> <!--{{$ctrl.data.body}}-->\n  </div>\n  <div class=\"card-footer\">\n    <a class=\"comment-author\" ui-sref=\"app.profile.main({ username: $ctrl.data.author.username })\">\n      <img style=\"width: 70px;\" ng-src=\"{{::$ctrl.data.author.image}}\" class=\"comment-author-img\" />\n    </a>\n    &nbsp;\n    <a class=\"comment-author\" ui-sref=\"app.profile.main({ username: $ctrl.data.author.username })\" ng-bind=\"::$ctrl.data.author.username\">\n    </a>\n    <span class=\"date-posted\"\n      ng-bind=\"::$ctrl.data.createdAt | date: \'longDate\'\">\n    </span>\n    <span class=\"mod-options\" ng-show=\"$ctrl.canModify\">\n      <i class=\"ion-trash-a\" ng-click=\"$ctrl.deleteCb()\"></i>\n    </span>\n  </div>\n</div>\n");
$templateCache.put("videojuego/videojuego-actions.html","<videojuego-meta videojuego=\"$ctrl.videojuego\">\n\n    <span ng-show=\"$ctrl.canModify\">\n      <a class=\"btn btn-sm btn-outline-secondary\"\n        ui-sref=\"app.editor({ slug: $ctrl.videojuego.slug })\">\n        <i class=\"ion-edit\"></i> Edit videojuego\n      </a>\n  \n      <button class=\"btn btn-sm btn-outline-danger\"\n        ng-class=\"{disabled: $ctrl.isDeleting}\"\n        ng-click=\"$ctrl.deleteVideojuego()\">\n        <i class=\"ion-trash-a\"></i> Delete Videojuego\n      </button>\n    </span>\n  \n    <span ng-hide=\"$ctrl.canModify\">\n      <follow-btn user=\"$ctrl.videojuego.author\"></follow-btn>\n      <favorite-btn videojuego=\"$ctrl.videojuego\">\n        {{ $ctrl.videojuego.favorited ? \'Unfavorite\' : \'Favorite\' }} Videojuego <span class=\"counter\">({{$ctrl.videojuego.favoritesCount}})</span>\n      </favorite-btn>\n    </span>\n  \n  </videojuego-meta>");
$templateCache.put("videojuego/videojuego.html","<!-- <videojuegos-list videojuegos=\"$ctrl.videojuegos\"></videojuegos-list>\n<videojuego-actions videojuego=\"$ctrl.videojuego\"></videojuego-actions> -->\n<!-- <videojuego-preview videojuego=\"$ctrl.videojuego\"></videojuego-preview> -->\n\n<div class=\"videojuego\">\n    <!-- <h2 ng-bind=\"$ctrl.videojuego.title\"> </h2> -->\n    <h2>{{videojuego.title}}</h2>\n    <p>{{videojuego.plataform}}</p>\n    <p>{{videojuego.description}}</p>\n    <!-- <p>$ctrl.videojuego.description</p> -->\n    <favorite-btn videojuego=\"$ctrl.videojuego\" class=\"pull-xs-right\">\n        {{$ctrl.videojuego.favoritesCount}}\n      </favorite-btn>\n\n\n    <div class=\"videojuego-meta\">\n      <!-- Show author info + favorite & follow buttons -->\n      <videojuego-actions videojuego=\"$ctrl.videojuego\"></videojuego-actions>\n    </div>\n\n\n    <!-- Comments section -->\n    <div class=\"row\">\n      <div class=\"col-xs-12 col-md-8 offset-md-2\">\n\n        <div show-authed=\"true\">\n          <list-errors from=\"$crl.commentForm.errors\"></list-errors>\n          <form class=\"card comment-form\" ng-submit=\"$ctrl.addComment()\">\n            <fieldset ng-disabled=\"$ctrl.commentForm.isSubmitting\">\n              <div class=\"card-block\">\n                <textarea class=\"form-control\"\n                  placeholder=\"Write a comment...\"\n                  rows=\"3\"\n                  ng-model=\"$ctrl.commentForm.body\"></textarea>\n              </div>\n              <div class=\"card-footer\">\n                <img ng-src=\"{{::$ctrl.currentUser.image}}\" class=\"comment-author-img\" />\n                <button class=\"btn btn-sm btn-primary\" type=\"submit\">\n                 Post Comment\n                </button>\n              </div>\n            </fieldset>\n          </form>\n        </div>\n\n        <div show-authed=\"false\">\n          <a ui-sref=\"app.login\">Sign in</a> or <a ui-sref=\"app.register\">sign up</a> to add comments on this game.\n        </div>\n\n        <comment ng-repeat=\"cmt in $ctrl.comments\"\n          data=\"cmt\"\n          delete-cb=\"$ctrl.deleteComment(cmt.id, $index)\">\n        </comment>\n\n\n      </div>\n    </div>\n</div>\n");
$templateCache.put("videojuegos/videojuegos.html","<!-- <videojuegos-list videojuegos=\"$ctrl.videojuegos\"></videojuegos-list> -->\n<videojuegos-list limit=\"5\" list-config=\"$ctrl.listConfig\"></videojuegos-list>\n\n<!-- <videojuego-actions videojuego=\"$ctrl.videojuego\"></videojuego-actions> -->\n<!-- <videojuego-preview videojuego=\"$ctrl.videojuego\"></videojuego-preview> -->");
$templateCache.put("components/buttons/favorite-btn-videojuego.html","<button class=\"btn btn-sm\"\n  ng-class=\"{ \'disabled\' : $ctrl.isSubmitting,\n              \'btn-outline-primary\': !$ctrl.videojuego.favorited,\n              \'btn-primary\': $ctrl.videojuego.favorited }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-heart\"></i> <ng-transclude></ng-transclude>\n</button>\n");
$templateCache.put("components/buttons/favorite-btn.html","<button class=\"btn btn-sm\"\n  ng-class=\"{ \'disabled\' : $ctrl.isSubmitting,\n              \'btn-outline-primary\': !$ctrl.article.favorited,\n              \'btn-primary\': $ctrl.article.favorited }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-heart\"></i> <ng-transclude></ng-transclude>\n</button>\n");
$templateCache.put("components/buttons/follow-btn.html","<button\n  class=\"btn btn-sm action-btn\"\n  ng-class=\"{ \'disabled\': $ctrl.isSubmitting,\n              \'btn-outline-secondary\': !$ctrl.user.following,\n              \'btn-secondary\': $ctrl.user.following }\"\n  ng-click=\"$ctrl.submit()\">\n  <i class=\"ion-plus-round\"></i>\n  &nbsp;\n  {{ $ctrl.user.following ? \'Unfollow\' : \'Follow\' }} {{ $ctrl.user.username }}\n</button>\n");
$templateCache.put("components/article-helpers/article-list.html","<article-preview\n  article=\"article\"\n  ng-repeat=\"article in $ctrl.list\">\n</article-preview>\n\n<div class=\"article-preview\"\n  ng-hide=\"!$ctrl.loading\">\n  Loading articles...\n</div>\n\n<div class=\"article-preview\"\n  ng-show=\"!$ctrl.loading && !$ctrl.list.length\">\n  No articles are here... yet.\n</div>\n\n<list-pagination\n total-pages=\"$ctrl.listConfig.totalPages\"\n current-page=\"$ctrl.listConfig.currentPage\"\n ng-hide=\"$ctrl.listConfig.totalPages <= 1\">\n</list-pagination>\n");
$templateCache.put("components/article-helpers/article-meta.html","<div class=\"article-meta\">\n  <a ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\">\n    <img ng-src=\"{{$ctrl.article.author.image}}\" />\n  </a>\n\n  <div class=\"info\">\n    <a class=\"author\"\n      ui-sref=\"app.profile.main({ username:$ctrl.article.author.username })\"\n      ng-bind=\"$ctrl.article.author.username\">\n    </a>\n    <span class=\"date\"\n      ng-bind=\"$ctrl.article.createdAt | date: \'longDate\' \">\n    </span>\n  </div>\n\n  <ng-transclude></ng-transclude>\n</div>\n");
$templateCache.put("components/article-helpers/article-preview.html","<div class=\"article-preview\">\n  <article-meta article=\"$ctrl.article\">\n    <favorite-btn\n      article=\"$ctrl.article\"\n      class=\"pull-xs-right\">\n      {{$ctrl.article.favoritesCount}}\n    </favorite-btn>\n  </article-meta>\n\n  <a ui-sref=\"app.article({ slug: $ctrl.article.slug })\" class=\"preview-link\">\n    <h1 ng-bind=\"$ctrl.article.title\"></h1>\n    <p ng-bind=\"$ctrl.article.description\"></p>\n    <span>Read more...</span>\n    <ul class=\"tag-list\">\n      <li class=\"tag-default tag-pill tag-outline\"\n        ng-repeat=\"tag in $ctrl.article.tagList\">\n        {{tag}}\n      </li>\n    </ul>\n  </a>\n</div>\n");
$templateCache.put("components/article-helpers/list-pagination.html","<nav>\n  <ul class=\"pagination\">\n\n    <li class=\"page-item\"\n      ng-class=\"{active: pageNumber === $ctrl.currentPage }\"\n      ng-repeat=\"pageNumber in $ctrl.pageRange($ctrl.totalPages)\"\n      ng-click=\"$ctrl.changePage(pageNumber)\">\n\n      <a class=\"page-link\" href=\"\">{{ pageNumber }}</a>\n\n    </li>\n\n  </ul>\n</nav>\n");
$templateCache.put("components/plataforms-helpers/plataform-preview.html","\n<div class=\"plataform-preview\" plataform=\"$ctrl.plataform\">\n \n      <h3>{{$ctrl.plataform.name}}</h3>\n        <p>Descripcion: {{$ctrl.plataform.description}}</p>\n      <!-- <favorite-btn videojuego=\"$ctrl.videojuego\" class=\"pull-xs-right\"   > -->\n        <!-- {{$ctrl.videojuego.favoritesCount}} -->\n      <!-- </favorite-btn> -->\n      <!-- <button ui-sref=\"app.videojuego({slug:$ctrl.videojuego.slug})\" class=\"preview-link\">Detalles</button> -->\n\n</div>\n<span>----------------------------</span>");
$templateCache.put("components/plataforms-helpers/plataforms-list.html","<plataform-preview\n  plataform=\"plataform\"\n  ng-repeat=\"plataform in $ctrl.list\">\n</plataform-preview>");
$templateCache.put("components/videojuegos-helpers/list-pagination.html","<nav>\n  <ul class=\"pagination\">\n\n    <li class=\"page-item\"\n      ng-class=\"{active: pageNumber === $ctrl.currentPage }\"\n      ng-repeat=\"pageNumber in $ctrl.pageRange($ctrl.totalPages)\"\n      ng-click=\"$ctrl.changePage(pageNumber)\">\n\n      <a class=\"page-link\" href=\"\">{{ pageNumber }}</a>\n\n    </li>\n\n  </ul>\n</nav>\n");
$templateCache.put("components/videojuegos-helpers/videojuego-preview.html","<div class=\"videojuego-preview\" videojuego=\"$ctrl.videojuego\">\n    <!-- <videojuego-meta videojuego=\"$ctrl.videojuego\"> -->\n      <h3>{{$ctrl.videojuego.title}}</h3>\n        <p>Plataforma: {{$ctrl.videojuego.plataform}}</p>\n      <favorite-btn videojuego=\"$ctrl.videojuego\" class=\"pull-xs-right\"   >\n        \n        {{$ctrl.videojuego.favoritesCount}}\n        \n         \n     <!-- <button ui-sref=\"app.videojuegosDetails({slug:videojuego.slug})\">See more </button> -->\n\n      </favorite-btn>\n      <button ui-sref=\"app.videojuego({slug:$ctrl.videojuego.slug})\" class=\"preview-link\">Detalles</button>\n      <!-- <div ng-click = \"openDetails()\" class=\"preview-link\">Detalles</div> -->\n</div>\n\n\n\n    <!-- </videojuego-meta> -->\n   \n<!--<a ui-sref=\"app.videojuego({ slug: $ctrl.videojuego.slug })\" class=\"preview-link\">\n      <h1 ng-bind=\"$ctrl.videojuego.title\"></h1>\n      <p ng-bind=\"$ctrl.videojuego.description\"></p>\n      <span>Read more...</span>\n      <ul class=\"tag-list\">\n        <li class=\"tag-default tag-pill tag-outline\"\n          ng-repeat=\"tag in $ctrl.videojuego.tagList\">\n          {{tag}}\n        </li>\n      </ul>\n    </a>\n  </div> -->");
$templateCache.put("components/videojuegos-helpers/videojuegos-list.html","<videojuego-preview\n  videojuego=\"videojuego\"\n  ng-repeat=\"videojuego in $ctrl.list\"> <!--ng-repeat=\"videojuego in $ctrl.videojuegos\">-->\n</videojuego-preview>\n\n<!-- <div class=\"videojuego-preview\"\n  ng-hide=\"!$ctrl.loading\">\n  Loading videojuegos...\n</div> -->\n\n<list-pagination\n total-pages=\"$ctrl.listConfig.totalPages\"\n current-page=\"$ctrl.listConfig.currentPage\"\n ng-hide=\"$ctrl.listConfig.totalPages <= 1\">\n</list-pagination>");}]);