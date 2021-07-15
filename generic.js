var serverLoc = "https://beatsturning.com/games/eyezah-uhc/";

function showPage() {
	document.getElementById("load-img").style.opacity = 0;
	setTimeout(function() {
		document.getElementById("load-container").style.left = "-100%";
		document.documentElement.style.overflowY = "auto";
	}, 300);
}
