<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #EDF4F7;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<body>
<center>
    <table class='tablereport' width='<?=$tablewidth?>' border='0.1' padding="0">
    <tr>
        <!-- <td colspan="13">  -->
            <center>               
                <h1><?=$title?></h1>        
                 <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
        <!-- </td> -->
    </tr>
    
   
	
	<tr style='<?=$borderstyle?> color: #0D1973;  '>
	    <td width="5%" rowspan="2"><b>No</td>
	    <td width="15%" rowspan="2"><b>Siswa</td>
	    <td colspan="5"><center><b>Pendapatan</b></center></td>
	  </tr>
	  <?php
		foreach($kolom->result() as $r)
		{
			echo "<td style='background-color: #dceef7;'><center><b>$r->accname <br>$r->accnumber</td>";
		}
	   ?>
	  <?php
		  $no=1;
		foreach($siswa->result() as $rr)
		{
			
			?>
			<tr>
			    <td><?=$no?></td>
			    <td><?=$rr->namasiswa?></td>
				<?php
					foreach($kolom->result() as $rkolom)
					{
						$qbayar = $this->db->query("SELECT sum(jumlah+denda) as jumlah
								FROM siswapembayaran
								WHERE idsiswa =  $rr->idsiswa
								AND idaccountbayar =  $rkolom->idaccount and tglbayar BETWEEN '$startdate' and '$enddate'");
//						$qbayar = $this->db->get_where('siswapembayaran',array('idsiswa'=>$rr->idsiswa,'idaccountbayar'=>$rkolom->idaccount));
//						echo $this->db->last_query();
						if($qbayar->num_rows()>0)
						{
							$rbayar = $qbayar->row();
							echo "<td align=right>".number_format($rbayar->jumlah)."</td>";	
						} else {
							echo "<td align=right>0</td>";	
						}				
					}
				?>
			  </tr>
			<?php
			$no++;
		}
		?> 
<!--		TOTAL-->
		<tr class="trsummary">
			    <td colspan="2"><center><b>TOTAL</b></center></td>
				<?php
				foreach($kolom->result() as $r)
				{
					$qtotal = $this->db->query("SELECT sum(jumlah+denda) as jumlah
								FROM siswapembayaran
								WHERE idaccountbayar = $r->idaccount and tglbayar BETWEEN '$startdate' and '$enddate'");
					if($qtotal->num_rows()>0)
					{
					 $rtotal = $qtotal->row();
					 $total = $rtotal->jumlah;	
					} else {
						$total=0;
					}
					echo "<td align=right>".number_format($total)."</td>";
				}
			   ?>
		</tr>
	  
	
</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>