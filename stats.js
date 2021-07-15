function start() {
	if (getParam("user")) {
		$.get(serverLoc + "stats.php?user=" + getParam("user"), function(response) {
			if (response["error"] != undefined) {
				document.getElementById("error").innerHTML = "No user found.";
				document.getElementById("stats-container").remove();
			} else {
				document.getElementById("error").remove();
				document.getElementById("stats-name").innerHTML = response["username"];
				document.getElementById("stats-img").src = " https://crafatar.com/renders/body/" + response["uuid"] + "?scale=10&overlay=true";
				document.getElementById("stats-games").innerHTML = "Games: " + response["games"];
				document.getElementById("stats-kd").innerHTML = "K/D Ratio: " + response["kd"];
				document.getElementById("stats-wins").innerHTML = "Wins: " + response["wins"];
				document.getElementById("stats-losses").innerHTML = "Losses: " + response["deaths"];
				if (response["games"] == 0) {
					document.getElementById("stats-unplayed").innerHTML = response["username"] + " has not played UHC before.";
					document.getElementById("stats-main").remove();
				} else {
					document.getElementById("stats-unplayed").remove();
				}
			}
			showPage();
			document.getElementById("stats-form-input").focus();
		});
	} else {
		document.getElementById("error").innerHTML = "Please enter a username";
		document.getElementById("stats-container").remove();
		showPage();
		document.getElementById("stats-form-input").focus();
	}
}

window.onload = function() {
	start();
}





function getParam(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}