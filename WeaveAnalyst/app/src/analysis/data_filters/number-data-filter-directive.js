AnalysisModule.directive('numberDataFilter', function(WeaveService) {
	
	function link($scope, element, attrs, ngModel, ngModelCtrl) {
//		element.draggable({ containment: "parent"}).resizable({
//			 //maxHeight: 300,
//		     maxWidth: 250,
//		     minHeight: 80,
//		     minWidth: 180
//		});
		element.addClass('databox');
		element.width(180);
		//element.height("100%");
		
	}

	return {
		restrict : 'E',
		transclude : true,
		templateUrl : 'src/analysis/data_filters/number_data_filter.tpl.html',
		link : link,
		require : 'ngModel',
		scope : {
			columns : '=',
			ngModel : '='
		},
		controller : function($scope, $element, $rootScope, $filter) {
			
			var filterName = $scope.$parent.filterName;
			
			var pathToFilters = WeaveService.getPathToFilters();
			
			pathToFilters.push(filterName).exec("registerLinkableChild(this, WeaveAPI.StatisticsCache.getColumnStatistics(column))")
			  .addCallback(function() {
				  var min = this.getValue("EquationColumnLib.getMin(column);");
				  var max = this.getValue("EquationColumnLib.getMax(column);");

				   if(this.getValue("linkableObjectIsBusy(this)"))
					  return;
				   	
					if(isFinite(min) && isFinite(max) && $scope.sliderOptions == "") {
						$scope.sliderOptions = { min:min, max:max };
						if($scope.ngModel.min == "" && $scope.ngModel.max == "") {
							$scope.ngModel.min = min;
							$scope.ngModel.max = max;
						}
						$rootScope.$safeApply();
					}
			});
			
			$scope.$watch('ngModel.column', function(column) {
				$scope.sliderOptions = "";
				if(column)
				{
					var pathToFilters = WeaveService.getPathToFilters();
					
					if(pathToFilters) {
						pathToFilters.push(filterName).request("NumberDataFilter").push("column").setColumn(column.metadata, column.dataSourceName);
					}
				}
			}, true);
			
			// this code gets triggered only if the user change the column
			// for example it will not get triggered when uploading a queryObject
			$scope.resetSliderValues = function() {
				$scope.ngModel.min = "";
				$scope.ngModel.max = "";
			};

			$scope.$watch(function() {
				return [$scope.ngModel.min,$scope.ngModel.max];
			}, function() {

				if($scope.ngModel.min && $scope.ngModel.max) {
					
					var pathToFilters = WeaveService.getPathToFilters();
					if(pathToFilters) {
						pathToFilters.push(filterName).request("NumberDataFilter").push("min").state($scope.ngModel.min);
						pathToFilters.push(filterName).request("NumberDataFilter").push("max").state($scope.ngModel.max);
					}
				}
			}, true);
		}
	};
});