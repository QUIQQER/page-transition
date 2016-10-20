(function () {
    document.addEvent('domready', function () {
        "use strict";

        function addEvent(Elm, event, func) {
            if (typeof Elm.addEventListener != "undefined") {
                Elm.addEventListener(event, func, false);
            } else if (typeof Elm.attachEvent != "undefined") {
                Elm.attachEvent("on" + event, func);
            }
        }

        // show page
        Pace.on('done', function () {
            var Container = document.getElementsByClassName('quiqqer-page-transition');

            if (!Container || !Container.length) {
                return;
            }

            Container = Container[0];
            Container.addClass('hide');

            setTimeout(function () {
                Container.style.zIndex = -1;
                Container.style.opacity = 0;
            }, 1000);
        });
    });
})(window);
