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
                <?php
                if(isset($sales_unpaid)){
                ?> 
                <h5>Rp&nbsp;<?=str_replace(',','.',number_format($sales_unpaid))?></h5> 
                <?php
                }
                ?>  
    </center><br>
<?php
    if(isset($sales_unpaid_detail)){
?>    
<table class='tablereport' style="line-height: <?=$lineheight?>px;" width='100%' border='0' padding="0">
<tr style="background-color: #EDF4F7; color: #000; font-size: 12px;">
     <td><strong>No Resep</strong></td>
     <td><strong>No Rekap Medis</strong></td>
     <td width='20%'><strong>Tanggal diagnosa</strong></td>
     <td width='10%'><strong>Nama Pasien</strong></td>
     <td width='20%'><strong>Nama Anggota</strong></td>
     <td><strong>Kategori</strong></td>
     <td width='10%'><strong>No Barang</strong></td>
     <td width='10%'><strong>Nama Barang</strong></td>
     <td><strong>Qty</strong></td>
     <td><strong>Satuan</strong></td>
     <td align="right"><strong>Harga</strong></td>
     <td align="right"><strong>Diskon</strong></td>
     <td align="right"><strong>Pajak</strong></td>
     <td align="right" width='20%'><strong>Total Harga</strong></td>
     <td align="right" width='20%'><strong>Catatan</strong></td>
</tr>

<?php
    foreach ($sales_unpaid_detail as $value) {    
?>
    <tr>
     <td><?=$value->{'receipt_number'}?></td>
     <td><?=$value->{'medical_record_no'}?></td>
     <?php
     if(isset($value->{'medical_record_date'})){
     ?>
     <td><?=backdate2($value->{'medical_record_date'})?></td>
     <?php
      }else{
     ?>
     <td></td>
     <?php
      }
     ?>
     <!-- <td width='10%'><?=backdate2($value->{'medical_record_date'})?></td> -->
     <td width='15%'><?=$value->{'buyer_name'}?></td>
     <?php
     if(isset($value->{'polis_name'})){
     ?>
     <td><?=$value->{'polis_name'}?></td>
     <?php
      }else{
     ?>
     <td></td>
     <?php
      }
     ?>
     <td><?=$value->{'patient_type'}?></td>
     <td><?=$value->{'no_sku'}?></td>
     <td width='20%'><?=$value->{'product_name'}?></td>
     <td><?=number_format($value->{'qty'})?></td>
     <td><?=$value->{'product_unit_code'}?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'price'}))?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'disc'}))?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'tax'}))?></td>
     <td align="right"><?=str_replace(',','.',number_format($value->{'grand_total'}))?></td>
     <td align="right" width='10%'><?=$value->{'memo'}?></td>
    <tr> 
<?php
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