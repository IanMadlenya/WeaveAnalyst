AnalysisModule.controller("toolsCtrl", function($scope, $filter,queryService, WeaveService, AnalysisService){
	
	$scope.queryService = queryService;
	$scope.WeaveService = WeaveService;
	$scope.AnalysisService = AnalysisService;
	$scope.selectedToolToAdd = {};
	
	
//	 $scope.$watch('selectedToolToAdd.value', function() {
//			console.log($scope.selectedToolToAdd.value); 
//		 });
	$scope.tool_options = ["MapTool", "BarChartTool", "ScatterPlotTool", "DataTableTool", "DataFilterTool", "SummaryAnnotation"];

	$scope.fixed_ids = ["MapTool", "BarChartTool", "ScatterPlotTool", "DataTableTool", "KeyColumn", "ColorColumn", "DataFilterTool", "SummaryAnnotation"];
	
	$scope.addTool = function(name) {
		switch(name) {
			case "SummaryAnnotation":
				var toolName = WeaveService.SummaryAnnotation(null, "");
				queryService.queryObject.visualization[toolName] = {
					title : toolName,
					template_url : 'src/visualization/tools/summaryAnnotation/summary_annotation.tpl.html'
				}
			case "MapTool":
				var toolName = WeaveService.MapTool(null, "");
				queryService.queryObject.visualizations[toolName] = {
					title : "",
					toolName : toolName,
					template_url : 'src/visualization/tools/mapChart/map_chart.tpl.html'
				};
				break;
			case "BarChartTool":
				var toolName = WeaveService.BarChartTool(null, "");
				queryService.queryObject.visualizations[toolName] = {
					title : "",
					toolName : toolName,
					template_url : 'src/visualization/tools/barChart/bar_chart.tpl.html'
				};
				break;
			case "ScatterPlotTool":
				var toolName = WeaveService.ScatterPlotTool(null, "");
				queryService.queryObject.visualizations[toolName] = { 
					title : "",
					toolName : toolName,
					template_url : 'src/visualization/tools/scatterPlot/scatter_plot.tpl.html'
				};
				break;
			case "DataTableTool":
				var toolName = WeaveService.DataTableTool(null, "");
				queryService.queryObject.visualizations[toolName] = {
					title : "",
					toolName : toolName,
					template_url : 'src/visualization/tools/dataTable/data_table.tpl.html'
				};
				break;
			case "DataFilterTool":
				var toolName = WeaveService.DataFilterTool(null, "");
				queryService.queryObject.visualizations[toolName] = {
					title : "",
					toolName : toolName,
					template_url : 'src/visualization/tools/dataFilter/data_filter_tool.tpl.html'
				};
				break;
		}
	};
	

	//clears the session state
	$scope.clearSessionState = function(){
		WeaveService.clearSessionState();
	};
	
	
	$scope.removeTool = function(toolId) {
		WeaveService.weave.path(toolId).remove();
		delete queryService.queryObject.visualizations[toolId];
	};
});