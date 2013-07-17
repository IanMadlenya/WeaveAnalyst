
/** DataDialog Module
 * DataDialogCtrl - Controls dialog button and closure.
 * DataDialogConnectCtrl - Manages the content of the Dialog. 
 */
angular.module('aws.DataDialog', ['aws'])
.controller('DataDialogCtrl',function($scope, $dialog){
  $scope.opts = {
    backdrop: true,
    keyboard: true,
    backdropClick: true,
    templateUrl: 'tlps/dataDialog.tlps.html',
    controller: 'DataDialogConnectCtrl'
  };

$scope.openDialog = function(partial){
  	
	if(partial){
		$scope.opts.templateUrl = 'tlps/' + partial + '.tlps.html';
	}
	
	var d = $dialog.dialog($scope.opts);
    
	d.open().then(aws.DataClient.getDataTableList(function(result){console.log(result)}));
	
	$scope.dataTables = [];
	$scope.dataColumns = [];
	
  };
})

.controller('DataDialogConnectCtrl', function($scope, $http, dialog){

	
	
	$scope.close = function(){
	    dialog.close();
	 };

})