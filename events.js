var events = {
    sendShip: {
        active: false,
        loop: function () {
            "use strict";
            function shipLoop() {
                ship.progress = ship.progress + ship.speed;
                updates.planet.distance.update();
            }
            (function () {
                if (station.buttons.ship.visible === false && station.buttons.ship.active === false) {
                    $('#send-ship').addClass('inactive');
                    $('#send-ship').click();
                }
                station.buttons.ship.active = false;
                if (distance > ship.progress) {
                    window.setInterval(shipLoop(), 2000);
                } else {
                    ship.progress = distance;
                    updates.planet.distance.update();
                }
            }());
            (function () {
                logMake(station.buttons.ship.logMsg);
            }());
        }
    }
};
