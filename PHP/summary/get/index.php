<?php 


require getcwd().'/../../lib/h.php';

$sql = "SELECT DISTINCT `company_symbol` ";
$sql .= "FROM `company_summary`; ";
jr( sql_get_query( $sql ) );

?>