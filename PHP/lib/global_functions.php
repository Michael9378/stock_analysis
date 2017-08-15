<?php 
// Global functions used in general.
// to be included in every h.php file

// shortcut for sending back a json object (jr = json response)
function jr($obj) {
	echo( json_encode( $obj ) );
}

function mssqlDate($timestamp){
	// YYYY-MM-DD
	$formatedDate = date("Y-m-d", $timestamp);
	return $formatedDate;
}

?>