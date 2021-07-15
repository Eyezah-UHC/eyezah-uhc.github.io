var playerInfo = [];
var total = -1;

function start() {
	$.get(serverLoc + "info.php", function(response) {
		total = response["total"];
		var i = 0;
		var html = "";
		playerInfo = response["players"];
		while (i < response["players"].length) {
			html += "<a href=\"stats?user=" + response["players"][i]["username"] + "\"><div><img onLoad=\"this.parentElement.style.opacity = 1\" src=\"https://minotar.net/helm/" + response["players"][i]["uuid"] + "/200\" /><span>" + response["players"][i]["username"] + "</span></div></a>";
			i++;
		}
		document.getElementById("current-prize-display").innerHTML = response["total"];
		document.getElementById("participants-container").innerHTML = html;
		showPage();
	});
}

window.onload = function() {
	start();
}