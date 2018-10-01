(
    function() {
        "use strict";

        angular.module("timerApp", [])
                .component("timer", {
                    templateUrl: "timer.html",
                    controller: TimerController,
                });

        TimerController.$inject = ["$interval"];
        function TimerController($interval) {
            var $ctrl = this;
            $ctrl.timerStr = getCurrentTime();
            
            function CountryInfo(countryName, offsetInMinutes) {
                this.countryName = countryName;
                this.offsetInMinutes = offsetInMinutes;
            }

            {
                $ctrl.countryInfo = [];
                $ctrl.countryInfo.push(new CountryInfo("India", 5 * 60 + 30));
                $ctrl.countryInfo.push(new CountryInfo("USA", -4 * 60));
            }

            $ctrl.currentCountry = $ctrl.countryInfo[1];

            console.log($ctrl.currentCountry);
            $ctrl.onCountryNameChanged = function() {
                console.log($ctrl.currentCountry);
                $ctrl.timerStr = getCurrentTime();
            }
            
            $interval(function() {
                $ctrl.timerStr = getCurrentTime();
            }, 1000);

            function getCurrentTime() {
                var date = new Date();
                
                var localDate = null;
                if ($ctrl.currentCountry === undefined) {
                    localDate = date;
                } else {
                    localDate = new Date(date.getTime() + (date.getTimezoneOffset() + $ctrl.currentCountry.offsetInMinutes) * 60 * 1000);
                }

                var hr = normalizeIntToTwoCharString(localDate.getHours());
                var min = normalizeIntToTwoCharString(localDate.getMinutes());
                var sec = normalizeIntToTwoCharString(localDate.getSeconds());

                return hr + ":" + min + ":" + sec;
            }

            function normalizeIntToTwoCharString(val) {
                if (val < 10) {
                    return "0" + val;
                }

                return val + "";
            }
        }
    }
)();