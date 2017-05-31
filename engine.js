var engine = {
    // versioning guide
        // 0 - major verion, backwards incompatibile
        // 0.0 - minor version, backward compatible, but things have been added
        // 0.0.0 - bug fixes/patches, nothing other than a few bugs are changed, and everything is compatible
    version: 0.1
};

var fileManagement = {
	gameSave: function () {
        'use strict';
		localStorage.gameState = JSON.stringify(state);
	}
};