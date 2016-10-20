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

        moofx(Container).animate({
            opacity: 0
        }, {
            duration: 500,
            callback: function () {
                Container.style.zIndex = -1;
            }
        });
    });

    
    window.onpopstate = function (event) {
        event.stop();
    };

});