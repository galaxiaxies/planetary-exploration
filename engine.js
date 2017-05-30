var fileManagement = {
	gameSave: function () {
		localStorage.gameState = JSON.stringify(State);
	}
};