<style type="text/css">
body {
    /*margin-top: 20px;*/
    font-size: 11px;
}

.text-right{
    text-align: right;
}
.text-left{
    text-align: left;
}

table {
    width: 100%;
    font-size: 11px;
}
@media print {
	
@page {
  /*size: 5in 8.5in;*/
}

}
</style>
<body>
<!------ Include the above in your HEAD tag ---------->
<?php
if($this->uri->segment(4)=='print'){
    // echo "<body onload=\"window.print()\">";
    ?>
    <script type="text/javascript">
     setTimeout(function () { window.print(); }, 500);
        window.onfocus = function () { setTimeout(function () { window.close(); }, 500); }
    </script>
    <?php
}
?>
<center>
<div class="container">
    <div class="row">
        <div>
            <div class="row">
                <div class="col-xs-6 col-sm-6 col-md-6">
                    <address>
                        <strong><?=$data['company_name']?></strong>
                        <br>
                        <?=$data['company_address']?>
                        <br>
                        <!-- <abbr title="Phone">P:</abbr> (213) 484-6829 -->
                    </address>
                </div>
                <div class="col-xs-6 col-sm-6 col-md-6 text-center">
                    <p>
                        <em>Tanggal: <?=$data['d']->{'date_sales'}?></em><br>
                        <em>No. Order: #<?=$data['d']->{'no_sales_order'}?></em><br>
                        <?php 
                            if(isset($data['d']->{'buyer_name'})) {

                                echo "<em>Konsumen: ".$data['d']->{'buyer_name'}."</em>";
                        }else{
                            echo "<em>Konsumen: ".''."</em>";
                        } 
                        ?>
                    </p>
                </div>
            </div>
            <div class="row">
                <div class="text-center">
                    <!-- <h1>Receipt</h1> -->
                </div>
                </span>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th class="text-left">Barang</th>
                            <th>Qty</th>
                            <th class="text-right">Harga</th>
                            <th class="text-right">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                        foreach ($data['d1'] as $key => $value) {
                            ?>
                                <tr>
                                    <td class="text-left"><em><?=$value->{'product_name'}?></em></h4></td>
                                    <td style="text-align: center"><?=$value->{'qty'}?></td>
                                    <td class="text-right" style="text-align: right">Rp. <?=number_format($value->{'price'},0)?></td>
                                    <td class="text-right" style="text-align: right">Rp. <?=number_format($value->{'total'},0)?></td>
                                </tr>
                                <?php
                                if($value->{'disc'}>0){
                                        ?>
                                        <tr>
                                            <td class="text-left">&nbsp;&nbsp;&nbsp;&nbsp;<small>Disc Rp. <?=number_format($value->{'disc'},0)?></small></td>
                                            <td style="text-align: center"></td>
                                            <td class="text-right" style="text-align: right"></td>
                                            <td class="text-right" style="text-align: right"></td>
                                        </tr>
                                    <?php
                                }
                        }
                        ?>
                        <tr>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                        </tr>

                        <?php
                        if($data['d']->{'subtotal'}>0){
                            ?>
                            <tr>
                                <td>   </td>
                                <td class="text-left" colspan="2">
                                <p>
                                    <strong>Sub Total: </strong>
                                </p>
                                </td>
                                <td class="text-left">
                                <p class="text-right">
                                    <strong>Rp. <?=number_format($data['d']->{'subtotal'},0)?></strong>
                                </p>
                            </td>
                            </tr>
                            <?php
                        }
                        ?>
                        <?php
                        if($data['d']->{'disc'}>0){
                            ?>
                            <tr>
                                <td>   </td>
                                <td class="text-left" colspan="2">
                                <p>
                                    Diskon:
                                </p>
                                </td>
                                <td class="text-left">
                                <p class="text-right">
                                    Rp. <?=number_format($data['d']->{'disc'},0)?>
                                </p>
                            </td>
                            </tr>
                            <?php
                        }
                        ?>

                        <?php
                        if($data['d']->{'pos_payment_type_id'}==1){
                        ?>
                        <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2">
                            <p>
                                <strong>Total Pembelian: </strong>
                            </p>
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'totalamount'},0)?></strong>
                            </p>
                        </td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <!-- <td>   </td> -->
                            <td class="text-left" colspan="2">
                            <p>
                                Pembayaran: 
                            </p>
                            <!-- <p>
                                <strong>Pajak: </strong>
                            </p> -->
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                Rp. <?=number_format($data['d']->{'payment_amount'},0)?>
                            </p>
                        <!--     <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'tax'},0)?></strong>
                            </p> -->
                        </td>
                        </tr>
                                                <tr>
                            <td>   </td>
                            <!-- <td>   </td> -->
                            <td class="text-left" colspan="2">
                            <p>
                                Uang Kembalian:
                            </p>
                            <!-- <p>
                                <strong>Pajak: </strong>
                            </p> -->
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                Rp. <?=number_format($data['d']->{'change_amount'},0)?>
                            </p>
                        <!--     <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'tax'},0)?></strong>
                            </p> -->
                        </td>
                        </tr>
                       <!--  <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2"><strong>Pembayaran: </strong></td>
                            <td class="text-right"><strong>Rp. <?=number_format($data['d']->{'totalamount'},0)?></strong></td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2">Kembalian:</td>
                            <td class="text-right">Rp. <?=number_format($data['d']->{'totalamount'},0)?></td>
                        </tr> -->
                        <?php
                        }
                        if($data['d']->{'pos_payment_type_id'}==2){
                        ?>
                        <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2">
                            <p>
                                <strong>Total Pembelian: </strong>
                            </p>
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'totalamount'},0)?></strong>
                            </p>
                        </td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <!-- <td>   </td> -->
                            <td class="text-left" colspan="2">
                            <p>
                                Pembayaran (Plafon yang tersedia): 
                            </p>
                            <!-- <p>
                                <strong>Pajak: </strong>
                            </p> -->
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                Rp. <?=number_format($data['d']->{'payment_amount'},0)?>
                            </p>
                        <!--     <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'tax'},0)?></strong>
                            </p> -->
                        </td>
                        </tr>
                                                <tr>
                            <td>   </td>
                            <!-- <td>   </td> -->
                            <td class="text-left" colspan="2">
                            <p>
                                Sisa Plafon:
                            </p>
                            <!-- <p>
                                <strong>Pajak: </strong>
                            </p> -->
                            </td>
                            <td class="text-left">
                            <p class="text-right">
                                Rp. <?=number_format($data['d']->{'change_amount'},0)?>
                            </p>
                        <!--     <p class="text-right">
                                <strong>Rp. <?=number_format($data['d']->{'tax'},0)?></strong>
                            </p> -->
                        </td>
                        </tr>
                       <!--  <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2"><strong>Pembayaran: </strong></td>
                            <td class="text-right"><strong>Rp. <?=number_format($data['d']->{'totalamount'},0)?></strong></td>
                        </tr>
                        <tr>
                            <td>   </td>
                            <td class="text-left" colspan="2">Kembalian:</td>
                            <td class="text-right">Rp. <?=number_format($data['d']->{'totalamount'},0)?></td>
                        <?php
                        }
                        ?>
                    </tbody>
                </table>
            </td>
            </div>
        </div>

        <div class="row">
            <p>&nbsp;</p>
                <div class="col-xs-6 col-sm-6 col-md-6">
                   Terima Kasih Atas Kunjungan Anda
                </div>
            </div>
    </div>