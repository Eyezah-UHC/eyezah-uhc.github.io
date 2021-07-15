<?php
	
	require("config.php");

	$old = json_decode(file_get_contents("usernames.json"), true);
	
	$changed = 0;
	
	$i = 0;
	$new = array();
	$uuids = array();
	$stamp = time();
	while ($i < count($old)) {
		if ($old[$i]["timestamp"] + 3600 > $stamp) {
			$new[count($new)] = $old[$i];
			$uuids[count($uuids)] = $old[$i]["uuid"];
		} else {
			$changed = 1;
		}
		$i++;
	}
	
	$conn = mysqli_connect($database_ip,$database_user,$database_password,$database_name,$database_port);
	
	$queryx = "SELECT `uuid` FROM `luckperms_players` WHERE `primary_group` = 'uhc-participant'";
	
	$result = mysqli_query($conn, $queryx);
	mysqli_close($conn);
	
	$participants = array();
	
	while($row = $result->fetch_assoc()) {
		$o = array();
		$o["uuid"] = $row["uuid"];
		if (!in_array($row["uuid"], $uuids)) {
			$temp = array();
			$temp["uuid"] = $row["uuid"];
			$mojang = json_decode(file_get_contents("https://api.mojang.com/user/profiles/" . $row["uuid"] . "/names"), true);
			$temp["username"] = $mojang[count($mojang) - 1]["name"];
			$temp["timestamp"] = $stamp;
			$new[count($new)] = $temp;
			$o["username"] = $temp["username"];
			$changed = 1;
		} else {
			$i = 0;
			while ($i < count($uuids) && $new[$i]["uuid"] != $row["uuid"]) {
				$i++;
			}
			if ($new[$i]["uuid"] == $row["uuid"]) {
				$o["username"] = $new[$i]["username"];
			}
		}
		$participants[count($participants)] = $o;
	}
	
	if ($changed) {
		file_put_contents("usernames.json", json_encode($new));
	}
	
	shuffle($participants);
	
	$out = array();
	$out["players"] = $participants;
	$out["total"] = $money_per_person * count($participants);
	
	header('Content-type: application/json');
	
	echo json_encode($out);
?>