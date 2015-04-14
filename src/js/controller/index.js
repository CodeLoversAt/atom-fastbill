import angular from 'angular';
import main from './main';
import nav from './nav';
import login from './login';
import customers from './customers';
import customerDetails from './customerDetails';
import invoices from './invoices';
import projects from './projects';
import body from './body';

var app = angular.module('controller', []);

app.controller('MainCtrl', main);
app.controller('NavCtrl', nav);
app.controller('LoginCtrl', login);
app.controller('CustomersCtrl', customers);
app.controller('CustomerDetailsCtrl', customerDetails);
app.controller('InvoicesCtrl', invoices);
app.controller('ProjectsCtrl', projects);
app.controller('BodyCtrl', body);
