ngGridDirectives.directive('ngCellHasFocus', ['$domUtilityService',
    function (domUtilityService) {
        var focusOnInputElement = function($scope, elm){
            $scope.isFocused = true;
            domUtilityService.digest($scope);   

            $scope.$broadcast('ngGridEventStartCellEdit');

            $scope.$on('ngGridEventEndCellEdit', function() {
                $scope.isFocused = false;
                domUtilityService.digest($scope);
            });
        };

        return function($scope, elm) {
            var isFocused = false;
            $scope.editCell = function() {
                setTimeout(function() {
                    focusOnInputElement($scope,elm);
                }, 0);
            };
            elm.bind('mousedown', function() {
                elm.focus();
                return true;
            });         
            elm.bind('focus', function() {
                isFocused = true;
                return true;
            });     
            elm.bind('blur', function() {
                isFocused = false;
                return true;
            });
            elm.bind('keydown', function(evt) {
                if (isFocused && evt.keyCode !== 37 && evt.keyCode !== 38 && evt.keyCode !== 39 && evt.keyCode !== 40 && evt.keyCode !== 9 && !evt.shiftKey && evt.keyCode !== 13) {
                    focusOnInputElement($scope,elm);
                }
                if (evt.shiftKey && (evt.keyCode >= 65 && evt.keyCode <= 90)) {
                    focusOnInputElement($scope, elm);
                }
                if (evt.keyCode === 27) {
                    elm.focus();
                }
                return true;
            });
        };
    }]);