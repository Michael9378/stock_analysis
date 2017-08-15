<?php 


require getcwd().'/../../lib/h.php';

if( isset( $_POST["company_symbol"] ) && isset( $_POST["start_date"] ) && isset( $_POST["end_date"] ) ){

	$company_symbol = $_POST["company_symbol"];
	$start_date = $_POST["start_date"];
	$end_date = $_POST["end_date"];

	$sql = "SELECT DISTINCT * ";
	$sql .= "FROM `company_dailyStats` ";
	$sql .= "WHERE `company_symbol` = '".mssqlDate($company_symbol)."' ";
	$sql .= "AND `stats_date` <= '".mssqlDate($start_date)."' ";
	$sql .= "AND `stats_date` >= '".mssqlDate($end_date)."';";
	jr( sql_get_query( $sql ) );
}
elseif( isset( $_POST["company_symbol"] ) && isset( $_POST["start_date"] ) ){

	$company_symbol = $_POST["company_symbol"];
	$start_date = $_POST["start_date"];

	$sql = "SELECT DISTINCT * ";
	$sql .= "FROM `company_dailyStats` ";
	$sql .= "WHERE `company_symbol` = '".mssqlDate($company_symbol)."' ";
	$sql .= "AND `stats_date` >= '".mssqlDate($start_date)."';";
	jr( sql_get_query( $sql ) );
}
else
	jr("Missing company_symbol/start_date param.");

?>