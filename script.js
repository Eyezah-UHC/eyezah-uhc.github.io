var projects = [];

window.onload = function() {
	$.get("https://web-backend.eyezah.com/eyezah.com/get-projects.php", function(data, status) {
		document.getElementById("load").style.opacity = 0;
		setTimeout(function() {
			document.getElementById("load").remove();
		}, 300);
		var i = 0;
		var html = "";
		
		projects = data;
		
		while (i < data.length) {
			html += "<a href=\"#" + data[i] + "\"><div class=\"project-thumbnail-container\" style=\"background-image: url('https://web-backend.eyezah.com/eyezah.com/get-project-data.php?file=" + data[i] + "-thumbnail.jpg')\"><div class=\"project-thumbnail-fade\"></div><span>" + data[i] + "</span></div></a>";
			i++;
		}
		document.getElementById("projects-container").innerHTML = html;
		if (window.location.hash != undefined && window.location.hash != "#" && window.location.hash != "") {
			var hash = decodeURI(window.location.hash.substring(1));
			if (projects.includes(hash)) {
				openProject(hash);
			} else {
				window.history.replaceState("", "", "./");
			}
		}
	});
}


var oldHash = window.location.hash;
window.onpopstate = function(e) {
	if (window.location.hash != oldHash) {
		oldhash = window.location.hash;
		if (window.location.hash == "") {
			closeProject();
		} else {
			var hash = decodeURI(window.location.hash.substring(1));
			if (projects.includes(hash)) {
				openProject(hash);
			} else {
				window.history.replaceState("", "", "./");
				closeProject();
			}
		}
	}
}

window.onhashchange = function() {
	oldHash = window.location.hash;
	var hash = decodeURI(window.location.hash.substring(1));
	if (projects.includes(hash)) {
		openProject(hash);
	} else {
		window.history.replaceState("", "", "./");
	}
}

function openProject(id) {
	document.getElementById("project").scrollTop = 0;
	document.getElementById("project-banner-image").style.transition = "opacity 0s";
	document.getElementById("project-banner-image").style.opacity = 0;
	document.getElementById("project-information").innerHTML = "";
	document.getElementById("project-banner-image").style.transition = "opacity 0s";
	document.getElementById("project-information").style.opacity = 0;
	document.documentElement.style.overflowY = "hidden";
	setTimeout(function() {
		document.getElementById("project-banner-image").style.transition = "opacity 0.3s";
		document.getElementById("project-information").style.transition = "opacity 0.3s";
		document.getElementById("project-banner-image").src = "https://web-backend.eyezah.com/eyezah.com/get-project-data.php?file=" + id + "-banner.jpg";
	}, 0);
	console.log("https://web-backend.eyezah.com/eyezah.com/get-project-data.php?file=" + id + ".txt");
	$.get("https://web-backend.eyezah.com/eyezah.com/get-project-data.php?file=" + id + ".txt", function(data, status) {
		document.getElementById("project-information").innerHTML = data;
		document.getElementById("project-information").style.opacity = 1;
	});
	document.getElementById("project").style.left = "0px";
}

function closeProject() {
	document.getElementById("project").style.left = "-100%";
	window.history.pushState("", "", "./");
	document.documentElement.style.overflowY = "auto";
}