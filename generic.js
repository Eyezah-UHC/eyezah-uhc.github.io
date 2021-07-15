var serverLoc = "https://beatsturning.com/games/eyezah-uhc/";

function showPage() {
	document.getElementById("load-img").style.opacity = 0;
	document.getElementById("load-svg").style.top = "calc(50% + 50px)";
	setTimeout(function() {
		document.getElementById("load-container").style.left = "-100%";
		document.documentElement.style.overflowY = "auto";
	}, 300);
}

if (location.protocol !== 'https:') {
    location.replace(`https:${location.href.substring(location.protocol.length)}`);
}