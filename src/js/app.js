import angular from 'angular';
import './config';
import './controller';
import './service';
import 'angular-sanitize';
import '../node_modules/angular-ui-bootstrap/ui-bootstrap-tpls';
import '../bower_components/ngstorage/ngStorage';
import './trans';
import './directive';
import './filter';

angular.module('app', ['config', 'controller', 'service', 'directive', 'filter', 'ngSanitize', 'trans', 'ui.bootstrap']);
