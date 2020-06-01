<!doctype html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<title><?=$title?></title>
		<link href="<?=base_url()?>/assets/css/print2.css" rel="stylesheet">
</head>

<body>
<table class="table" border="0" cellpadding="0" cellspacing="0">
		<tr>
			<td style="width:45%">
				<?=$this->logo?>
			</td>
			<td rowspan="3" style="width:10%">&nbsp;</td>
			<td style="width:45%" align="right">
				<h2><?=$title?></h2>
				Tanggal Order: <?=backdate2($data['datetrans']);?><br> 
				No PO: #<?=$data['no']?><br> 
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<h3><?=$data['namaunit']?></h3>
			</td>
			<td class="cell-bordered">
				<h3>Billed To</h3>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<p><?=$data['alamat']?><br> 
				Phone: <?=$data['telp']?><br> 
				Fax: <?=$data['fax']?> </p>
			</td>
			<td class="cell-bordered">
				<p> <?=$data['supplier']['namesupplier'].'<br>'.
        $data['supplier']['companyaddress']?> <br>
        Phone: <?=$data['supplier']['telephone']?> <br>
        Fax: <?=$data['supplier']['fax']?> <br> </p>
			</td>
		</tr>
		<tr>
				<td colspan="3">&nbsp;</td>
		</tr>
	</table>
	<br>
	<table class="table" border="1" cellpadding="4" cellspacing="0">
    <thead>
      <tr>
        <th width="30">No</th>  
        <th>NO SKU</th>                       
        <th>NAMA BRG</th>                                               
        <th>QTY</th>
        <th>SATUAN</th>
        <th>HARGA</th>
        <th>TOTAL</th>
				<th>NOTES</th>
      </tr>
    </thead>
    <tbody>
    <?php foreach ($data['detail'] as $key => $value) : ?>
      <tr>
        <td width="30"><?=$key+1?></td>
        <td><?=$value['sku_no']?></td>
        <td><?=$value['nameinventory']?></td>  
        <td align="right"><?=number_format($value['qty'],2)?></td>
        <td><?=$value['short_desc']?></td>
        <td align="right"><?=number_format($value['price'],2)?></td>
        <td align="right"><?=number_format($value['total'],2)?></td>
				<td><?=$value['notes']?></td>
      </tr>
    <?php endforeach; ?>
    </tbody>
  </table>
	<br>
	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
    <tr>
			<td width="42%">&nbsp;</td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="10%"></td>
			<td width="2.5%"></td>
			<td width="15.5%"></td>
			<td width="9%"></td>
		</tr>
    <tr>
			<td colspan="3" ></td>
			<td align="left">Subtotal </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=$data['subtotal']?>
			</td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">DPP </td>
			<td>:</td>
			<td align="right">
					<?=$data['dpp']?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">PPN </td>
			<td>:</td>
			<td align="right">
					<?=$data['tax']?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">Grand Total </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=$data['totalamount']?>
			</td>
		</tr>
    <?php if($data['balance']!=0): ?>
		<tr>
			<td colspan="3"></td>
			<td align="left">Saldo Terhutang </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=$data['balance']?>
			</td>
		</tr>
    <?php endif; ?>
		<tr>
			<td colspan="3"></td>
			<td align="left">Terbilang </td>
			<td>:</td>
			<td colspan="2" align="left"></td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td colspan="4" align="left"><?=$data['terbilang']?></td>
		</tr>
		
    <tr><td colspan="7">&nbsp;</td></tr>
    <tr>
      <td class="cell-bordered">Catatan</td>
      <td colspan="4">&nbsp;</td>
      <td colspan="2" class="cell-bordered" align="center">Dipesan oleh:</td>
    </tr>
    <tr>
      <td class="cell-bordered" style="vertical-align: top">
        <!-- notes -->
				<ul>
				<?php 
				foreach($data['notes'] as $note){
					if($note != null)
						echo "<li>".$note."</li>";
				}
				?>
				</ul>
        <!-- end of notes -->
      </td>
      <td colspan="4">&nbsp;</td>
      <td colspan="2" class="cell-bordered" align="center"><br><br><br><br><br><br>Ivan Susanto</td>
    </tr>
	</table>	
</body>
</html>
