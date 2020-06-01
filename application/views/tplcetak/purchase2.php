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
          <h2 class="name"><?=$data['d']->{'namesupplier'}?></h2>
          <?php
            if(isset($customer->{'address'})){
          ?>
          <div class="address"><?=$customer->{'address'}?></div>
          <?php 
            }
          ?>
          <?php
            if(isset($customer->{'email'})){
          ?>  
          <div class="email"><a href="mailto:<?=$customer->{'email'}?>"><?=$customer->{'email'}?></a></div>
        <?php 
            }
          ?>
        </div>
        <div id="invoice">
          <div style="color:#0087C3; font-size:24px;">No. Invoice #<?=$data['d']->{'no_purchase_order'}?></div>
          <div class="date">Tanggal Invoice: <?=$invoice_date?></div>
          <div class="date">Tanggal Jatuh Tempo: <?=$due_date?></div>
          <!-- <div class="date">Syarat Bayar: <?=$data->{'term_name'}?></div> -->
          <div class="date">Status Pembayaran: <?= $status_bayar?></div>
        </div>
      </div>
      <table border="0" cellspacing="0" cellpadding="0">
        <thead>
          <tr>
            <th class="no">#</th>
            <th class="desc">Barang/Jasa</th>
            <th class="unit">Harga</th>
            <th class="qty">Qty</th>
            <th class="qty">Diskon %</th>
            <th class="total">TOTAL</th>
          </tr>
        </thead>
        <tbody>
        <?php
        $no=1;
        foreach ($data['d2'] as $key => $v) {
        ?>
          <tr>
            <td class="no"><?=$no?></td>
            <td class="desc"><h3><?=$v->{'product_name'}?></h3><?=$v->{'description'}?></td>
            <td class="unit">Rp. <?=number_format($v->{'price'})?></td>
            <td class="qty"><?=number_format($v->{'qty'})?></td>
             <td class="qty"><?=number_format($v->{'disc'})?></td>
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
            <td colspan="2">SUBTOTAL</td>
            <td>Rp. <?=number_format($data['d']->{'subtotal'})?></td>
          </tr>
             <tr>
            <td colspan="3"></td>
            <td colspan="2" class="no_border_top">Diskon (-)</td>
            <td class="no_border_top">Rp. <?=number_format($data['d']->{'disc'})?></td>
          </tr>
          <tr>
            <td colspan="3"></div>
            </td>
            <td colspan="2" class="no_border_top">Biaya Kirim (+)</td>
            <td class="no_border_top">Rp. <?=number_format($data['d']->{'freight'})?></td>
          </tr>
           <tr>
            <td colspan="3"></td>
            <td colspan="2">TOTAL</td>
            <td>Rp. <?=number_format($data['d']->{'total'})?></td>
          </tr>
          <?php if($tax->{'is_tax_ppn'}==1){
            ?>
             <tr>
              <td colspan="3"></td>
              <td colspan="2" class="no_border_top">Pajak PPN <?=$tax->{'coa_ppn_rate'}?>%</td>
              <td class="no_border_top">Rp. <?=number_format($tax->{'total_tax_ppn'})?></td>
            </tr>
            <?php
          }?>
          
           <?php if($tax->{'is_tax_pph23'}==1){
            ?>
          <tr>
            <td colspan="3">
            </td>
            <td colspan="2" class="no_border_top">Pajak PPh 23 <?=$tax->{'coa_pph23_rate'}?>%</td>
            <td class="no_border_top">Rp. <?=number_format($tax->{'total_tax_pph'})?></td>
          </tr>
           <?php
          }?>
          <tr class="grand_total">
            <td colspan="3"></td>
            <td colspan="2">GRAND TOTAL</td>
            <td>Rp. <?=number_format($tax->{'grand_total'})?></td>
          </tr>
          <?php
          if($data['d']->{'paidtoday'}>0){
          ?>
          <tr>
            <td colspan="3"></td>
            <td colspan="2" class="no_border_top">Jumlah Terbayar</td>
            <td class="no_border_top">Rp. <?=number_format($data['d']->{'paidtoday'})?></td>
          </tr>
           <?php
          }?>
        </tfoot>
      </table>
      <!-- <div id="thanks">Thank you!</div> -->
    
</main>

      <div id="notices">
        <div id="notice_title">Memo:</div>
        <div class="notice"><?=$data['d']->{'memo'}?></div>
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