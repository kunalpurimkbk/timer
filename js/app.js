(
    function() {
        "use strict";

        angular.module("timerApp", [])
                .directive("timer", Timer);

        function Timer() {
            var ddo = {
                templateUrl: "timer.html",
                controller: TimerController,
                controllerAs: "timerCtrl"
            };

            return ddo;
        }

        TimerController.$inject = ["$interval"];
        function TimerController($interval) {
            var timerCtrl = this;
            timerCtrl.timerStr = getCurrentTime();
            
            function CountryInfo(countryName, offsetInMinutes) {
                this.countryName = countryName;
                this.offsetInMinutes = offsetInMinutes;
            }

            {
                timerCtrl.countryInfo = [];
                timerCtrl.countryInfo.push(new CountryInfo("India", 5 * 60 + 30));
                timerCtrl.countryInfo.push(new CountryInfo("USA", -4 * 60));
            }

            timerCtrl.currentCountry = timerCtrl.countryInfo[1];

            console.log(timerCtrl.currentCountry);
            timerCtrl.onCountryNameChanged = function() {
                console.log(timerCtrl.currentCountry);
            }
            
            $interval(function() {
                timerCtrl.timerStr = getCurrentTime();
            }, 1000);

            function getCurrentTime() {
                var date = new Date();
                
                var localDate = null;
                if (timerCtrl.currentCountry === undefined) {
                    localDate = date;
                } else {
                    localDate = new Date(date.getTime() + (date.getTimezoneOffset() + timerCtrl.currentCountry.offsetInMinutes) * 60 * 1000);
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