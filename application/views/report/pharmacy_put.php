<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #B3E5FC;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
    .blue_line {
        background-color: #EDF4F7; color: #333;
    }
</style>
<center>
<?php

    // $grand_total =$data->{'total_invoice_unpaid'}+$data->{'total_invoice_paid'};
      
  ?>
  <center>
                <h3><?= $unit ?></h3>
                <h1><?=$title?></h1> 
                <h5><?= $periode ?></h5>   
    </center><br>
<?php
    if($pharmacy_put!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='100%' border='0' padding="0">
<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><strong>No</strong></td>
     <td><strong>No Resep</strong></td>
     <td><strong>Nama Pasien</strong></td>
     <td><strong>Kode Pasien</strong></td>
     <td><strong>Nama Pegawai/Anggota</strong></td>
     <td><strong>No. NP</strong></td>
     <td><strong>Tanggal</strong></td>
     <td><strong>Dokter</strong></td>
     <td><strong>Jumlah</strong></td>
      <!--<td><strong>Qty Akhir</strong></td>
     <td><strong>Catatan</strong></td> -->
</tr>    
<?php
    $i=1;
    foreach ($pharmacy_put as $key => $value) {
    // print_r($pharmacy_put);
?>
<tr>
     <td><?=$i?></td>
     <td><?=$value->{'receipt_number'}?></td>
     <td><?=$value->{'patient_name'}?></td>
     <td><?=$value->{'patient_no'}?></td>
     <!-- <td><?=$value->{'business_name'}?></td> -->
     <?php
     if(isset($value->{'member_name'})){
     ?>
     <td><?=$value->{'member_name'}?></td> 
     <?php
     }else{
     ?>
     <td></td> 
     <?php  
     }
     ?>
     <td><?=$value->{'np_number'}?></td> 
     <td><?=backdate2($value->{'medical_record_date'})?></td>
     <td><?=$value->{'doctor_name'}?></td>
     <td><?=number_format($value->{'amount'})?></td>
     <!-- <td></td> -->
</tr>
<?php
$i++;
}    
?>
<?php
}
?>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>