(function () {
    document.addEvent('domready', function () {
        "use strict";

        function addEvent (Elm, event, func) {
            if (typeof Elm.addEventListener != "undefined") {
                Elm.addEventListener(event, func, false);
            } else if (typeof Elm.attachEvent != "undefined") {
                Elm.attachEvent("on" + event, func);
            }
        }

        if (typeof Pace === 'undefined') {
            document.addEvent('load', function () {
                var Container = document.getElementsByClassName('quiqqer-page-transition');

                if (!Container || !Container.length) {
                    return;
                }

                Container[0].style.zIndex  = -1;
                Container[0].style.opacity = 0;
            });

            return;
        }

        addEvent(window, 'beforeunload', function () {
            var Container = document.getElementsByClassName('quiqqer-page-transition');

            if (!Container || !Container.length) {
                return;
            }

            Container[0].style.zIndex = 1999;

            moofx(Container).animate({
                opacity: 1
            }, {
                duration: 200
            });
        });

        // show page
        Pace.on('done', function () {
            var Container = document.getElementsByClassName('quiqqer-page-transition');

            if (!Container || !Container.length) {
                return;
            }

            document.body.addClass('quiqqer-page-transition-loaded');

            if (typeof window.QUIQQER_PAGE_TRANSITION === 'undefined') {
                window.QUIQQER_PAGE_TRANSITION = '';
            }

            Container = Container[0];

            if (window.QUIQQER_PAGE_TRANSITION === '') {
                Container.style.zIndex  = -1;
                Container.style.opacity = 0;
                return;
            }

            if (window.QUIQQER_PAGE_TRANSITION === 'opacity') {
                moofx(Container).animate({
                    opacity: 0
                }, {
                    duration: 500,
                    callback: function () {
                        Container.style.zIndex = -1;
                    }
                });

                return;
            }

            Container.addClass(window.QUIQQER_PAGE_TRANSITION + '-hide');

            setTimeout(function () {
                Container.style.zIndex  = -1;
                Container.style.opacity = 0;
            }, 1000);
        });
    });
})(window);
