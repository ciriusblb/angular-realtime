(function(){
	'use strict';

	angular
		.module('rtCharts')
		.directive('rtGauge',['rtWebMetricService',rtGaugeControl]);

	function rtGaugeControl(rtWebMetricService){
		return {
			templateUrl: 'app/rtCharts/rtGaugeTemplate.html',
            link: function (scope, el, attrs) {
                scope.initialized = false;

                scope.options = {
                	width:200, height:200,
                    redFrom: 90, redTo: 100,
                    yellowFrom: 75, yellowTo: 90,
                    minorTicks: 5
                };



                // var widget = el.closest('.gridster-item');

                // scope.options.width = widget.width();
                // scope.options.height = widget.height();

                // // monitorear el evento resize del widget
                // widget.resize(function () {
                //     scope.options.width = widget.width();
                //     scope.options.height = widget.height();
                // });

                scope.$on('socket', function (evt, data) {
                    if(!scope.initialized){
                        scope.data = google.visualization.arrayToDataTable([
                            ['Label','Value'],
                            ['CPU %',0]
                        ]);

                        scope.chart = new google.visualization.Gauge(el[0]);
                        scope.initialized = true;
                    }

                    scope.data.setValue(0,1, Math.round(data.cpuPct));
                    scope.chart.draw(scope.data, scope.options);
                });
            }
		};
	}

}());