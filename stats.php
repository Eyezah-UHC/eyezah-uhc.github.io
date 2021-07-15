<?php
	header('Content-type: application/json');
	if (isset($_GET["user"])) {
		$user = $_GET["user"];
		$mojang = json_decode(file_get_contents("https://api.mojang.com/users/profiles/minecraft/" . $_GET["user"]), true);
		if (isset($mojang["id"])) {
			$uuid = $mojang["id"];
			
			$uuid = substr_replace($uuid, "-", 8, 0);
			$uuid = substr_replace($uuid, "-", 13, 0);
			$uuid = substr_replace($uuid, "-", 18, 0);
			$uuid = substr_replace($uuid, "-", 23, 0);
			
			require("config.php");
			
			$conn = mysqli_connect($database_ip,$database_user,$database_password,$database_name,$database_port);
			
			$queryx = "SELECT `kill`, `death`, `win` FROM `cutclean_stats` WHERE `id` = '$uuid'";
			
			$result = mysqli_query($conn, $queryx);
			mysqli_close($conn);
			
			$stats = array();
			$stats["uuid"] = $uuid;
			$stats["username"] = $mojang["name"];
			$stats["kills"] = "n/a";
			$stats["deaths"] = "n/a";
			$stats["wins"] = "n/a";
			$stats["kd"] = "n/a";
			$stats["games"] = 0;
			while($row = $result->fetch_assoc()) {
				$stats["kills"] = $row["kill"];
				$stats["deaths"] = $row["death"];
				$stats["wins"] = $row["win"];
				$stats["games"] = $row["win"] + $row["death"];
				if ($stats["deaths"] == 0) {
					$stats["kd"] = $stats["kills"];
				} else {
					$stats["kd"] = $stats["kills"] / $stats["deaths"];
				}
			}
			echo json_encode($stats);
		} else {
			$error = array();
			$error["error"] = "invalid user";
			echo json_encode($error);
		}
	} else {
		$error = array();
		$error["error"] = "no user";
		echo json_encode($error);
	}
?>