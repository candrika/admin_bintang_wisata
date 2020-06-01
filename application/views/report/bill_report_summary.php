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
                <h3><strong>Jumlah Total:&nbsp;Rp.&nbsp;<?=str_replace(',','.',number_format($grand_total))?></strong></h3>   
    </center><br>
<?php
    if($bill!=null){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='100%' border="1px solid" padding="0">
<tr class="blue_line">
     <td style="width: 1%;"><strong>No</strong></td>
     <td style="width: 8%;"><strong>No Diagnosa</strong></td>
     <td style="width: 10%;"><strong>Tgl Berobat</strong></td>
     <td style="width: 8%;"><strong>Nama Pasien</strong></td>
     <td style="width: 13%;"><strong>Nama Pegawai/Anggota</strong></td>
     <td style="width: 4%;"><strong>No. NP</strong></td>
     <td style="width: 4%;"><strong>status</strong></td>
     <td style="width: 17%;"><strong>Diagnosa</strong></td>
     <td style="width: 12%;"><strong>Konsultasi Dokter&nbsp;(Rp)</strong></td>
     <td style="width: 11%;"><strong>Tindakan Medis&nbsp;(Rp)</strong></td>
     <td style="width: 12%;"><strong>Obat-obatan/Alkes&nbsp;(Rp)</strong></td> 
     <td style="width: 20%;"><strong>Total&nbsp;(Rp)</strong></td> 
</tr>    
<?php
    $service_amount =0;
    $act_fee =0;
    $service_amount =0;
    $drug_fee =0;
    $i=1;
    foreach ($bill as $key => $value) {
    // print_r($pharmacy_put);
    $service_amount +=$value->{'service_amount'};    
    $act_fee +=$value->{'act_fee'};    
    $drug_fee +=$value->{'drug_fee'};    
?>
<tr>
     <td><?=$i?></td>
     <td><?=$value->{'medical_record_no'}?></td>
     <td ><?=backdate2($value->{'medical_record_date'})?></td>
     <td><?=$value->{'patient_name'}?></td>
     <?php
     if(isset($value->{'member_name'})){
     ?>
     <td ><?=$value->{'member_name'}?></td> 
     <?php
     }else{
     ?>
     <td ></td> 
     <?php  
     }
     ?>
     <td ><?=$value->{'np_number'}?></td> 
     <td><?=$value->{'status'}?></td>
     <td><?=$value->{'diagnosa'}?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'service_amount'}))?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'act_fee'}))?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'drug_fee'}))?></td>
     <td width="20%" align="right"><?=str_replace(',','.',number_format($value->{'total_medical_amount'}))?></td>
</tr>
<?php
$i++;
}    
?>
<tr>
    <td colspan="8" style="width: 100%;" align="right">Total</td>
    <td align="right"><?=str_replace(',','.',number_format($service_amount))?></td>
    <td align="right"><?=str_replace(',','.',number_format($act_fee))?></td>
    <td align="right"><?=str_replace(',','.',number_format($drug_fee))?></td>
    <td align="right"><?=str_replace(',','.',number_format($grand_total))?></td>
    <!-- <td></td> -->
</tr>
</table>
<?php
}
?>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>