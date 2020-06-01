<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title><?=$title?></title>
    <link rel="stylesheet" href="<?=base_url()?>assets/css/style_print.css" media="all" />
  </head>
<?php
if($print==1) { echo "<body onload=\"window.print()\">"; } else { echo "<body>"; }
?>
    <header class="clearfix">
      <div id="logo">
        <img src="<?=$coop_data['logo']?>">
      </div>
      <div id="company">
        <h2 class="name"><?=$coop_data['namaunit']?></h2>
        <div><?=$coop_data['alamat']?></div>
        <div><?=$coop_data['telp']?></div>
        <div><a href="mailto:<?=$coop_data['email']?>"><?=$coop_data['email']?></a></div>
      </div>
      </div>
    </header>
    <main>
      <div id="details" class="clearfix">
        <div id="client">
          <div class="to">KEPADA:</div>
          <h2 class="name"><?=$coop_data['d']->{'namesupplier'}?></h2>
          <?php
            if(isset($coop_data['d']->{'address'})){
          ?> 
          <div class="address"><?=$coop_data['d']->{'address'}?></div>
          <?php 
            }
          ?>
          <?php
            if(isset($customer->{'email'})){
          ?> 
          <div class="email"><a href="mailto:<?=$coop_data['d']->{'email'}?>"><?=$coop_data['d']->{'email'}?></a></div>
          <?php 
            }
          ?>
        </div>
        <div id="invoice">
          <div style="color:#0087C3; font-size:24px;">No. Retur #<?=$coop_data['d']->{'no_purchase_order'}?></div>
          <div class="date">Tanggal PO: <?=$date_purchase?></div>
          <div class="date">Tanggal Retur: <?=$date_return?></div>
          <!-- <div class="date">Status Penerimaan: <?=$status_purchase_receipt?></div> -->
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">Barang/Jasa</th>
            <th class="unit">Harga</th>
            <th class="qty">Qty Pembelian</th>
            <th class="qty">Qty Retur</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
        <?php
        $no=1;
        foreach ($data['return_items'] as $k => $v) {
        ?>
          <tr>
            <td class="no"><?=$no?></td>
            <td class="desc"><h3><?=$v->{'product_name'}?></h3></td>
            <td class="unit">Rp. <?=number_format($v->{'price'})?></td>
            <td class="qty"><?=number_format($v->{'qty_purchase'})?></td>
            <td class="qty"><?=number_format($v->{'qty_retur'})?></td>
            <td class="total">Rp. <?=number_format($v->{'total'})?></td>
          </tr>
        <?php
        $no++;
        }
        ?>
        <tfoot>
          <tr>
            <td colspan="3">

            </td>
            <td colspan="2">TOTAL QTY RETUR</td>
            <td><?=number_format($coop_data['d']->{'total_qty_return'})?></td>
          </tr>
          <!-- <tr>
            <td colspan="3">
            </td>
            <td colspan="2">TOTAL QTY SISA</td>
            <td><?=number_format($data['d']->{'total_rest_qty'})?></td>
          </tr> -->
          <tr>
            <td colspan="3">
            </td>
            <td colspan="2">TOTAL RETUR</td>
            <td>Rp. <?=number_format($coop_data['d']->{'total_amount_return'})?></td>
          </tr>
        </tfoot>
      </table>
      <!-- <div id="thanks">Thank you!</div> -->
    </main>

      <div id="notices">
        <div id="notice_title">Memo:</div>
        <div class="notice"><?=$coop_data['d']->{'memo'}?></div>
      </div>
        <table width="100%" style="height:200px; position: relative; border: solid 0px;">
          <tr>
            <td width="25%" style="background-color: #fff;">
              <!-- 1 -->
            </td>
             <td width="25%" style="background-color: #fff;">
              <!-- 2 -->
            </td>
             <td width="25%" style="background-color: #fff; bottom: 0;">
               <center>
      <?=$this->session->userdata('realname').'<br>'.$this->session->userdata('usergroup').'<br>'.$this->session->userdata('unit')?>
    </center>
            </td>
          </tr>
        </table>
  <!--   <center>
      Invoice was created on a computer and is valid without the signature and seal.
    </center> -->
  </body>
</html>