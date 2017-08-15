<?php 


require getcwd().'/../../lib/h.php';

if( isset( $_POST["daily_stats"] ) ){

	$daily_stats = $_POST["daily_stats"];
	$daily_stats = json_decode($daily_stats);
	
	$sql = "INSERT IGNORE INTO `company_dailyStats` ";
	$sql .= "VALUES ";

	foreach($daily_stats as $stat)
		$sql .= "('".$stat->company_symbol."', '".$stat->stats_date."', ".$stat->stats_open.", ".$stat->stats_close.", ".$stat->stats_high.", ".$stat->stats_low.", ".$stat->stats_volume."), ";
	
	$sql = substr($sql, 0, -2);
	$sql .= ";";
	
	jr( sql_set_query( $sql ) );
}
else
	jr("Missing daily_stats array.");

?>