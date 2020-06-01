<!doctype html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<title>
			<?=$title?>
	</title>
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
				Tanggal Pengiriman: <?=backdate2($data['delivery_date']);?><br> 
				No DO: #<?=$data['no_do']?><br>
				No Faktur: #<?=$data['no_faktur']?><br>

			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<h3><?=$data['namaunit']?></h3>
			</td>
			<td class="cell-bordered">
				<h3>Customer</h3>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<p><?=$data['alamat']?><br> 
				Phone: <?=$data['telp']?><br> 
				Fax: <?=$data['fax']?> </p>
			</td>
			<td class="cell-bordered">
				<p><?=$data['header']['namecustomer']?><br> 
				Alamat: <?=$data['header']['address_customer']?><br> 
				Phone: <?=$data['header']['telephone_customer']?><br> 
				Mobile: <?=$data['header']['handphone_customer']?> </p>
			</td>
		</tr>
		<tr><td colspan="3"></td></tr>
	</table>

	<table class="table" border="1" cellspacing="0" cellpadding="4">
		<thead>	
			<tr>
				<th width="30">NO</th>  
				<th>SKU</th>                       
				<th>NAMA BARANG</th>
				<th>QTY ORDER</th>
				<th>SAT.</th>
				<th>UKURAN</th>
				<th>SAT.</th>
				<th>QTY KIRIM</th>
			</tr>
		</thead>
		<tbody>
		<?php 
			$total_order = 0;
			$total_kirim = 0;
		?>
		<?php foreach ($data['detail'] as $key => $value) : ?>
			<tr>
				<td width="30"><?=$key+1?></td>
				<td><?=$value['sku_no']?></td>
				<td><?=$value['nameinventory']?></td>  
				<td align="right"><?=$value['qty']?></td>
				<td align="center"><?=$value['short_desc']?></td>
				<td align="right"><?=$value['size']?></td>
				<td align="center"><?=$value['size_measurement']?></td>
				<td align="right"><?=number_format($value['qty_kirim'])?></td>
			</tr>
			<?php
				$total_order += $value['qty'];
				$total_kirim += $value['qty_kirim'];
			?>
		<?php endforeach; ?>
		</tbody>
	</table>

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid;">
		<tr><td colspan="4"></td></tr>
		<tr>
			<td width="75%">&nbsp;</td>
			<td colspan="3" width="15%">Total Qty Order</td>
			<td>:</td>
			<td align="right"><?=$total_order?></td>
		</tr>
		<tr>
			<td>&nbsp;</td>
			<td colspan="3">Total Qty Kirim</td>
			<td>:</td>
			<td align="right"><?=$total_kirim?></td>
		</tr>
		<!-- <tr>
			<td>&nbsp;</td>
			<td colspan="3">Sisa Qty Kirim</td>
			<td>:</td>
			<td align="right"><?=$total_order - $total_kirim?></td>
		</tr> -->
	</table>

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid;">
		<tr>
			<td width="30%"></td>
			<td width="5%"></td>
			<td width="15%"></td>
			<td width="15%"></td>
			<td width="5%"></td>
			<td width="30%"></td>
		</tr>
		<tr>
			<td colspan="3">
				<!-- notes -->
				<p>Notes:</p>
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

		</tr>
		<tr>
			<td align="center" class="cell-bordered">Diterima Oleh:
			<td></td>
			<td colspan="2" align="center"  class="cell-bordered">Diketahui Oleh:
			<td></td>
			<td align="center" class="cell-bordered">Dibuat Oleh:
		</tr>
		<tr>
			<td align="center" class="cell-bordered" style="height:150px; vertical-align:bottom;">Pelanggan</td>
			<td></td>
			<td colspan="2" align="center" class="cell-bordered" style="height:150px; vertical-align:bottom;">Kepala Pabrik</td>
			<td></td>
			<td align="center" class="cell-bordered" style="height:150px; vertical-align:bottom;">Gudang</td>
		</tr>
	</table>
</body>
</html>