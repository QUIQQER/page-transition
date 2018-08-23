(function () {
    'use strict';

    var ready = function () {
        function addEvent(Elm, event, func) {
            if (typeof Elm.addEventListener !== "undefined") {
                Elm.addEventListener(event, func, false);
            } else if (typeof Elm.attachEvent !== "undefined") {
                Elm.attachEvent("on" + event, func);
            }
        }

        if (typeof window.Pace === 'undefined') {
            var loaded = function () {
                var Container = document.getElementsByClassName('quiqqer-page-transition');

                if (!Container || !Container.length) {
                    return;
                }

                Container[0].style.zIndex  = -1;
                Container[0].style.opacity = 0;
            };

            if (document.readyState === 'interactive') {
                loaded();
                return;
            }

            addEvent('load', loaded);

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

        // pace bug fix mailto link - quiqqer/page-transition#4
        document.getElements('a').addEvent('click', function (event) {
            var Target = event.target;

            if (Target.href.toString().indexOf('mailto:') !== -1) {
                window.Pace.restart();
                window.Pace.stop();
                return;
            }

            if (Target.get('target').toString().indexOf('_blank') !== -1) {
                window.Pace.restart();
                window.Pace.stop();
            }
        });

        // show page
        window.Pace.on('done', function () {
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
    };

    if (document.readyState === 'loading') {
        document.addEventListener("DOMContentLoaded", ready);
    } else {
        ready();
    }
}());
