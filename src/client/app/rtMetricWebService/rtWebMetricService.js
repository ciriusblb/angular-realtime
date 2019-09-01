(function(){
	'use strict';
	angular.module('rtWebMetricService',[])
		.factory('rtWebMetricService',['$rootScope',function($rootScope){
			var socket = io.connect();
			socket.on('metricServiceDataEvent',function(data){//socket.io
				$rootScope.$broadcast('socket',data);//angular
			});
			return {};
		}])
}());