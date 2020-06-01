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
				Tanggal Retur: <?=backdate2($data['return_date']);?><br> 
				No Retur: #<?=$data['noreturn']?><br>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<h3><?=$namaunit?></h3>
			</td>
			<td class="cell-bordered">
				<h3>Billed To</h3>
			</td>
		</tr>
		<tr>
			<td class="cell-bordered">
				<p><?=$alamat?><br> 
				Phone: <?=$telp?><br> 
				Fax: <?=$fax?> </p>
			</td>
			<td class="cell-bordered">
				<p><?=$data['namecustomer']?><br> 
				Alamat: <?=$data['address_customer']?><br> 
				Phone: <?=$data['telephone_customer']?><br> 
				Mobile: <?=$data['handphone_customer']?> </p>
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
				<th width="30">NO</th>  
				<th>SKU</th>                       
				<th>NAMA BARANG</th>
				<th>QTY</th>
				<th>SAT.</th>
				<th>UKURAN</th>
				<th>SAT.</th>
				<th>JML</th>
				<th>HARGA</th>
				<th>TOTAL</th>
			</tr>
		</thead>
		<tbody>
		<?php $subtotal = 0;
		foreach ($detail as $key => $value) : $subtotal+=$value['total']; ?>
			<tr>
				<td width="30"><?=$key+1?></td>
				<td><?=$value['sku_no']?></td>
				<td><?=$value['nameinventory']?></td>  
				<td align="right"><?=$value['qty_return']?></td>
				<td align="center"><?=$value['short_desc']?></td>
				<td align="right"><?=$value['size']?></td>
				<td align="center"><?=$value['size_measurement']?></td>
				<td align="right"><?php echo $value['qty']*$value['size']; ?></td>
				<td align="right"><?=number_format($value['price'])?></td>
				<td align="right"><?=number_format($value['total'])?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
	<!-- <br> -->

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
		<tr>
			<td width="45%">&nbsp;</td>
			<td width="5%"></td>
			<td width="10%"></td>
			<td width="12.5%"></td>
			<td width="2.5%"></td>
			<td width="15%"></td>
			<td width="10%"></td>
		</tr>
		<tr>
			<td colspan="3" ></td>
			<td align="left">Subtotal </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($subtotal)?>
			</td>
		</tr>
		<!-- <tr>
			<td colspan="3"></td>
			<td align="left">PPN </td>
			<td>:</td>
			<td align="right"> -->
					<?//=number_format($data['totaltax'],2)?>
		<!-- 	</td>
			<td></td>
		</tr> -->
		<tr>
			<td colspan="3"></td>
			<td align="left">Grand Total </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($subtotal)?>
			</td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">Terbilang </td>
			<td>:</td>
			<td colspan="2" align="right">
				
			</td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td colspan="4" align="left"><?=terbilang($subtotal)?></td>
		</tr>
		
		
	</table>

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
		<tr>
			<!-- notes -->
			<td width="45%">
				<p>Notes:</p>
				<ul>
				<?php 
				echo $data['memo'];
				?>
				</ul>
			</td>
			<!-- end of notes -->
			
			<td></td>

			<!-- ttd 1 -->
			<td width="25%" align="center">
				<!-- Disetujui oleh:<br><br><br><br><br><br><br>((Zora Suzanna))</td> -->
			<!-- end of ttd1 -->

			<!-- ttd 2 -->
			<td width="25%" align="center">
				Disetujui oleh:<br><br><br><br><br><br><br>(Zora Suzanna)</td>
			</td>
			<!-- end of ttd 2 -->
		</tr>
	</table>	
</body>
</html>