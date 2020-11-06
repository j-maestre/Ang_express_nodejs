import angular from 'angular';
let plataformsModule = angular.module('app.plataforms',[]);


import PlataformsConfig from './plataforms.config';
plataformsModule.config(PlataformsConfig);

import PlataformsCtrl from './plataforms.controller';
plataformsModule.controller('PlataformsCtrl',PlataformsCtrl);

export default plataformsModule;