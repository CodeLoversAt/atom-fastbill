!function(){"use strict";module.exports=["$scope","$log","$state","FastBill",function(t,o,n,e){t.isActive=function(t){var o=new RegExp("^"+t);return o.test(n.current.name)},t.logout=function(){e.logout(),n.go("login")}}]}();
//# sourceMappingURL=../controller/nav.js.map