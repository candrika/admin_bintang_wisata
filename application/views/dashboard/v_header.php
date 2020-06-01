 <script type="text/javascript">
		var SITE_URL = '<?=site_url()?>/';
		var BASE_URL='<?=base_url()?>';
		var pegawainid = '<?=$this->uri->segment(3)?>';
		var panelHeight =  467;
</script>
<script src='<?=base_url()?>/assets/ext/ext-all.js'></script>
<script src='<?=base_url()?>/assets/ext/ext-theme-neptune.js'></script>
<script src='<?=base_url()?>/assets/js/SearchField4.js'></script>
<script src='<?=base_url()?>/assets/ext/NumericField.js'></script>

<link href="<?=base_url()?>/assets/ext/resources/css/ext-all-neptune-debug.css" rel="stylesheet">
<link href="<?=base_url()?>/assets/css/icons.css" rel="stylesheet">

<!-- <link rel="stylesheet" type="text/css" href="<?=base_url()?>/assets//ext/resources/css/azzurra-medium/azzurra-core.css"> -->
<!-- <link rel="stylesheet" type="text/css" href="<?=base_url()?>/assets//ext/resources/css/azzurra-medium/azzurra-ui-all.css"> -->
<!--<script src='<?=base_url()?>/assets//ext/resources/ext-theme-azzurra/js/azzurra.js'></script> -->

<script src='<?=base_url()?>/assets/js/app/combox.js'></script>
<script src='<?=base_url()?>/assets/js/util.js'></script>
<script src='<?=base_url()?>/assets/js/app/account/treeAccount2.js'></script>
<script src='<?=base_url()?>/assets/js/app/account/gridAccount.js'></script>
<script>



function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}
</script>

<script src='<?=base_url()?>/assets/js/app/money/SiswaListAddRowReceiveSiswa.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/AccListAddRowReceiveSiswa.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/formaddrowReceiveSiswa.js'></script> 
<script src='<?=base_url()?>/assets/js/app/money/accListReceiveSiswa.js'></script>  
<script src='<?=base_url()?>/assets/js/app/money/gridReceiveMoneySiswa.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/entryReceiveMoneySiswa.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/gridReceiveMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/AccListAddRowReceive.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/formaddrowReceive.js'></script>        
<script src='<?=base_url()?>/assets/js/app/money/accListReceive.js'></script>        
<script src='<?=base_url()?>/assets/js/app/money/entryReceiveMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/TabReceiveMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/transferKasForm.js'></script>

<script src='<?=base_url()?>/assets/js/app/money/TabReceiveMoneySiswa.js'></script>

<script src='<?=base_url()?>/assets/js/app/money/AccListAddRowImportReceive.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/importReceiveMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/gridImportReceiveMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/TabImportReceiveMoney.js'></script>

<script src='<?=base_url()?>/assets/js/app/money/AccListAddRowImportSpend.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/importSpendMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/gridImportSpendMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/TabImportSpendMoney.js'></script>

<script src='<?=base_url()?>/assets/js/app/money/gridSpendMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/AccListAddRowSpend.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/formaddrowSpend.js'></script>        
<script src='<?=base_url()?>/assets/js/app/money/accListSpend.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/entrySpendMoney.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/TabSpendMoney.js'></script>        
<script src='<?=base_url()?>/assets/js/app/money/accListReconcile.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/accListReconcileEntryBank.js'></script>   
<script src='<?=base_url()?>/assets/js/app/money/accListReconcileOther.js'></script> 
<script src='<?=base_url()?>/assets/js/app/money/formaddrowReconcile.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/formaddrowReconcileOther.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/gridReconcile.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/entryReconcile.js'></script>
<script src='<?=base_url()?>/assets/js/app/money/TabReconcile.js'></script>

  <script src='<?=base_url()?>/assets/js/app/commonfunc.js'></script>

