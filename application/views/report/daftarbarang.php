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
    <table class='tablereport' width='800' border='0' padding="0">
    <tr>
        <!-- <td colspan="5">  -->
            <center>
                <h3><?= $unit ?></h3>
                <h1>DAFTAR BARANG</h1>        
            </center>
        <!-- </td> -->
    </tr>
    
   
    <tr style="background-color: #dceef7; color: #000; font-size: 12px;">
         <td><b>Kode Barang</td>
         <td><b>Nama Barang</td>
         <td><b>Unit</td>
         <td><b>Stok</td>
         <td><b>Satuan</td>
         <td><div  style="float: right;"><b>Harga Satuan</div></td>
         <td><div  style="float: right;"><b>Total Nilai</div></td>
    </tr>

    <?php
    foreach ($data as $value) {
        
            ?>
            <tr style="font-size: 12px;">
                 <td><?=$value['invno']?></td>
                 <td><?=$value['nameinventory']?></td>
                 <td><?=$value['namaunit']?></td>
                 <td><?=$value['qtystock']?></td>
                 <td><?=$value['unitmeasure']?></td>
                 <td><div  style="float: right;"><?=  number_format($value['cost'])?></div></td>
                 <td><div  style="float: right;"><?=number_format($value['total'])?></div></td>
            </tr>
            
            <?php
//           echo "<tr><td colspan=5><hr style=border: none; height: 0;  border-top: 0px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3);> </td></tr>";
    }
    ?>
    

</table>
    
</body>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>