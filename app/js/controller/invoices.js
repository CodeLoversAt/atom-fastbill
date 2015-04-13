!function(){"use strict";require("angular");module.exports=["$scope","$log","FastBill","$filter","$state",function(e,t,n,r,o){function a(t){e.$apply(function(){e.invoices=t})}o.params.customerId?n.getInvoices(o.params.customerId).then(a):n.getInvoices(null).then(a),e.showHeader=!o.params.customerId,e.model={currentPage:1,invoicesPerPage:10,startInvoice:0,endInvoice:10},e.invoicesPerPageOptions=[1,5,10,20,25,50],e.$watch("[model.currentPage,model.invoicesPerPage]",function(n){t.debug("[InvoicesCtrl] values",n);var r=parseInt(n[0],10),o=parseInt(n[1],10),a=Math.max(0,r-1);e.model.startInvoice=a*o,e.model.endInvoice=e.model.startInvoice+o}),e.downloadInvoice=function(e){var t=r("translate")("INVOICE.FILE_NAME")+e.number+".pdf",n=require("remote"),o=n.getCurrentWindow(),a=n.require("dialog"),i=require("ipc"),c=i.sendSync("get-user-home");/\/$/.test(c)||(c+="/"),console.log("language",navigator.language),a.showSaveDialog(o,{defaultPath:c+t,title:r("translate")("INVOICE.SAVE_FILE")},function(t){if(t){var r=n.require("request"),o=n.require("fs");r(e.url).pipe(o.createWriteStream(t))}})},e.$watch("invoices",function(t){t&&(e.turnOver=0,t.forEach(function(t){e.turnOver+=t.total}))})}]}();
//# sourceMappingURL=../controller/invoices.js.map