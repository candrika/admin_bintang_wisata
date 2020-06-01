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
				Tanggal Invoice: <?=backdate2($data['invoice_date']);?><br> 
				No SI: #<?=$data['no_si']?><br>
				No Faktur: #<?=$data['no_faktur']?><br>
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
				<p><?=$data['customer']['namecustomer']?><br> 
				Alamat: <?=$data['customer']['address']?><br> 
				Phone: <?=$data['customer']['telephone']?><br> 
				Mobile: <?=$data['customer']['handphone']?> </p>
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
		foreach ($data['detail'] as $key => $value) : $subtotal+=$value['total']; ?>
			<tr>
				<td width="30"><?=$key+1?></td>
				<td><?=$value['sku_no']?></td>
				<td><?=$value['nameinventory']?></td>  
				<td align="right"><?=$value['qty_kirim']?></td>
				<td align="center"><?=$value['short_desc']?></td>
				<td align="right"><?=$value['size']?></td>
				<td align="center"><?=$value['size_measurement']?></td>
				<td align="right"><?php echo $value['qty_kirim']*$value['size']; ?></td>
				<td align="right"><?=number_format($value['price'])?></td>
				<td align="right"><?=number_format($value['total'])?></td>
			</tr>
		<?php endforeach; ?>
		</tbody>
	</table>
	<!-- <br> -->

	<?php
	if($data['inv']->include_tax==1){

	} else {

	}
	?>
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

		<tr>
			<td colspan="3" ></td>
			<td align="left">Biaya Kirim </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($data['freigthcost']?:0)?>
			</td>
		</tr>
		<tr>
			<td colspan="3" ></td>
			<td align="left">Total </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format(str_replace(',', '', $subtotal)+$data['freigthcost'])?>
			</td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">DPP </td>
			<td>:</td>
			<td align="right">
					<?=number_format($data['total_dpp'],2)?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">PPN </td>
			<td>:</td>
			<td align="right">
					<?=number_format($data['totaltax'],2)?>
			</td>
			<td></td>
		</tr>
		<tr>
			<td colspan="3"></td>
			<td align="left">Grand Total </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=str_replace('.00','',number_format($data['inv']->totalamount,2))?>
			</td>
		</tr>
		<?php if($data['totalowed']=='9x0'): ?>
		<tr>
			<td colspan="3"></td>
			<td align="left">Saldo Terhutang </td>
			<td>:</td>
			<td colspan="2" align="right">
					<?=number_format($data['totalowed'],2)?>
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
			<td colspan="4" align="left"><?=terbilang($data['inv']->totalamount)?></td>
		</tr>
		
		<tr>
			<td class="cell-bordered"><h3>Ship Address</h3></td>
			<td rowspan="4" width="10%"></td>
			<td colspan="5" style="text-decoration:underline;" align="right">Payment Term: <?=$data['payment_term']?></td>
		</tr>
		<tr>
			<td class="cell-bordered"><?=$data['shipaddress']?></td>
			<td colspan="5">&nbsp;</td>
		</tr>
		
	</table>

	<table class="table" border="0" cellpadding="0" cellspacing="0" style="page-break-inside:avoid">
		<tr>
			<!-- notes -->
			<td width="45%">
				<p>Notes:</p>
				<ul>
				<?php 
				foreach($data['notes'] as $note){
					if($note != null)
						echo "<li>".$note."</li>";
				}
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