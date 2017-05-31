var distance = 300;
var seasons = ['winter', 'spring', 'summer', 'autumn'];
var date = {
    year: 0,
    day: 0,
    season: seasons[0]
};
var resources = {
    money: 0
};
var ship = {
    progress: 0,
    speed: 1
};

function round(x, dec) {
    "use strict";
    return Number(Math.round(x + 'e' + dec) + 'e-' + dec);
}

function format(x) {
    "use strict";
    if (x >= 1000000000000) {
        return (x / 1000000000000).toFixed(3).replace(/\.0$/, '') + 'T';
    }
    if (x >= 1000000000) {
        return (x / 1000000000).toFixed(3).replace(/\.0$/, '') + 'B';
    }
    if (x >= 1000000) {
        return (x / 1000000).toFixed(3).replace(/\.0$/, '') + 'M';
    }
    if (x >= 1000) {
        return (x / 1000).toFixed(3).replace(/\.0$/, '') + 'K';
    }
    return x;
}

function logMake(message) {
    "use strict";
    (function () {
        $('#log').prepend('<span class="log-entry"><span class=' + date.season + '>' + date.season + ' ' + date.day + ', ' + date.year + '</span>' + ': ' + message + '.</span><br>');
        if ($('.log-entry').length > 20) {
            while ($('.log-entry').length > 20) {
                var z = $('.log-entry').last();
                z.remove();
            }
        }
    }());
}

var updates = {
    date: {
        update: function () {
            "use strict";
            (function () {
                $('#date').html(date.season + ' ' + date.day + ', ' + date.year);
                console.log('date update');
            }());
        },
        interval: 2
    },
    money: {
        update: function () {
            "use strict";
            (function () {
                $('#money').html('money on hand: $' + format(resources.money));
                console.log(format(resources.money));
                console.log('money update');
            }());
        }
    },
    resources: {},
    planet: {
        distance: {
            update: function () {
                "use strict";
                (function () {
                    $('#distance').html('ship progress:' + ship.progress + '/' + distance);
                }());
            }
        }
    }
};

var station = {
    buttons: {
        start: {
            name: 'start',
            visible: true,
            active: true,
            cost: false,
            price: null,
            logMsg: 'got grant',
            cooldown: false,
            time: null
        },
        ship: {
            name: 'send ship',
            visible: false,
            active: true,
            cost: true,
            price: round((distance / ship.speed) * 10, 2),
            logMsg: 'sent ship to the nearest planet',
            cooldown: false,
            time: null
        }
    }
};

var gameStart = {
    layout: function () {
        "use strict";
        (function () {
            $('#container').prepend('<menu id="resources"><b>Mission details</b><br><span id="money">money on hand: $0</span><br><span id="distance">ship progress: 0/0</span><br></menu>');
            $('#container').append('<menu id="time"><span id="date" class=' + date.season + '>' + date.season + ' ' + date.day + ', ' + date.year + '</span></br><b>log</b></br><div id="log"></div></menu>');
            $('#main').append('<menu id="topper"></menu>');
            $('#main').append('<div id="buttons"></div>');
        }());
    },
    start: function () {
        "use strict";
        station.buttons.start.active = false;
        station.buttons.start.visible = false;
        if (station.buttons.start.visible === false) {
            $('#start').remove();
        }
        resources.money = 1000000000000;
        updates.money.update();
        logMake(station.buttons.start.logMsg);
        $('#buttons').append('<button id="send-ship">' + station.buttons.ship.name + '</button>');
        $('#send-ship').click(events.sendShip.loop);
    },
    init: function () {
        "use strict";
        (function () {
            $('#buttons').append('<button id="start">' + station.buttons.start.name + '</button>');
            $('#start').click(gameStart.start);
        }());
    }
};

$(function () {
    "use strict";
    gameStart.layout();
    gameStart.init();
});
