<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
$borderstyle = "border-bottom: #E6E8E6;  border-bottom-width: thin; border-bottom-style: dotted; ";
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    <table class='tablereport' width='100%' border='0' padding="0">
    <tr>
        <!-- <td colspan="13">  -->
            <center>               
                <h1><?=$title?></h1>        
                 <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: <?=$fontsize?>px;">
        <td><b>No</td>
        <?php
        foreach ($label as $key => $value) {
        	echo "<td><b>$key</b></td>";
        }
        ?>
    </tr>

    <?php
    $i=0;
    $no=1;

    //bikin nilai awal
    foreach ($label as $key => $v) {
    	$vArr = explode(":", $v);
		        	$type = $vArr[0];
		        	$field = $vArr[1];
    	$total[$field]=0;
    }
// print_r($total);
    // print_r($data->result_array());
    foreach ($data->result_array() as $value) {
            ?>
            <tr style="font-size: <?=$fontsize?>px;">
                <td><?=$no?></td>
                <?php
		        foreach ($label as $key => $v) {
		        	$vArr = explode(":", $v);
		        	$type = $vArr[0];
		        	$field = $vArr[1];

		        	if($type=='txt')
		        	{
		        		echo "<td>".$value[$field]."</td>";
		        	} else if($type=='num')
		        	{
		        		echo "<td align=\"right\">".number_format($value[$field])."</td>";
		        		$total[$field]+= $value[$field];
		        	}
		        }
		        ?>
            </tr>
            <?php
            $no++;
    }
    echo "<tr><td></td>";
    // print_r($total);
    foreach ($label as $key => $v) {
		$vArr = explode(":", $v);
		$type = $vArr[0];
		$field = $vArr[1];
    	if($type=='txt')
    	{
    		echo "<td></td>";
    	} else if($type=='num')
    	{
    		echo "<td align=\"right\"><b>".number_format($total[$field])."</b></td>";
    	}
    }
    echo "</tr>";
    
    ?>
    

</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>