<?php 
// Connect to database.
// hide this file from github

$dbservername = "localhost";
$dbname = "stock_symbols";
$dbusername = "mike_scott";
$dbpassword = "d1rt>str33t";

// Create connection
$conn = new mysqli($dbservername, $dbusername, $dbpassword, $dbname);

// // Check connection
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

?>