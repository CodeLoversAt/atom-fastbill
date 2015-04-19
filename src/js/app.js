import angular from 'angular';
import './config';
import './controller';
import './service';
import 'angular-sanitize';
import 'angular-ui-bootstrap/ui-bootstrap-tpls';
import './trans';
import './directive';
import './filter';

angular.module('app', ['config', 'controller', 'service', 'directive', 'filter', 'ngSanitize', 'trans', 'ui.bootstrap']);
