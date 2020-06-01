<?php

function pembulatan($uang) {
    $uang = round($uang);
    $ratusan = substr($uang, -3);
    if ($ratusan < 500)
        $akhir = $uang - $ratusan;
    else
        $akhir = $uang + (1000 - $ratusan);
    return $akhir;
}

function clearnumberic($num) {
//    62,000.00 -> 62000.00
    $num =  str_replace(",", "", str_replace(".00", "", $num));
    return $num == "" ? null : $num;
}

function cleardot($num)
{
	return str_replace(".", "", str_replace(".00", "", $num));
}

function cleardot2($num)
{
	return str_replace(".", "", $num);
}

function cleardot3($num)
{
	return str_replace(",", ".", str_replace(".", "", $num));
}

function cleartanggal($tgl)
{
    return str_replace("T00:00:00", "", $tgl);
}

function fetchUnit($unit,$alias=null)
{
	//buat di rekap
	$u = explode(",", $unit);
	// echo count($u);
	$wer='(';
		$i=1;
	foreach ($u as $key => $value) {
		$wer.=$alias.".idunit=".$value;
		if($i<count($u))
		{
			$wer.=" OR ";
		}
		$i++;
		
	}
	$wer.=')';
	return $wer;
}

function bilangRatusan($x)
{
	$kata = array(
		'',
		'Satu ',
		'Dua ',
		'Tiga ',
		'Empat ',
		'Lima ',
		'Enam ',
		'Tujuh ',
		'Delapan ',
		'Sembilan '
	);
	$string = '';
	$ratusan = floor($x / 100);
	$x = $x % 100;
	if ($ratusan > 1) $string.= $kata[$ratusan] . "Ratus ";
	  else
	if ($ratusan == 1) $string.= "Seratus ";
	$puluhan = floor($x / 10);
	$x = $x % 10;
	if ($puluhan > 1)
		{
		$string.= $kata[$puluhan] . "Puluh ";
		$string.= $kata[$x];
		}
	  else
	if (($puluhan == 1) && ($x > 0)) $string.= $kata[$x] . "Belas ";
	  else
	if (($puluhan == 1) && ($x == 0)) $string.= $kata[$x] . "Sepuluh ";
	  else
	if ($puluhan == 0) $string.= $kata[$x];
	return $string;
}

// function terbilang($x)
// {
// 	$x = number_format(intval($x), 0, "", ".");
// 	$pecah = explode(".", $x);
// 	$string = "";
// 	for ($i = 0; $i <= count($pecah) - 1; $i++)
// 		{
// 		if ((count($pecah) - $i == 5) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Triliyun ";
// 		  else
// 		if ((count($pecah) - $i == 4) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Milyar ";
// 		  else
// 		if ((count($pecah) - $i == 3) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Juta ";
// 		  else
// 		if ((count($pecah) - $i == 2) && ($pecah[$i] == 1)) $string.= "Seribu ";
// 		  else
// 		if ((count($pecah) - $i == 2) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]) . "Ribu ";
// 		  else
// 		if ((count($pecah) - $i == 1) && ($pecah[$i] != 0)) $string.= bilangRatusan($pecah[$i]);
// 		}

// 	return $string;
// }

function post_number($val){
	return str_replace(',','',$val);
}

function number_field($val){
	if(isset($val) && $val!='NaN'){
		return number_format($val);
	} else {
		return 0;
	}
}

function payment_term_sales($id,$dmax=null,$ddays=null,$eomddays=null,$daydisc=null){
	if($id==1){
		return "Cash in Advance";
	} else if($id==2){
			return "Cash in Delivery";
		}  else if($id==3){
			return "NET $ddays days";
		}  else if($id==4){
			return "NET EOM $eomddays days";
		}  else if($id==5){
			return "Discount";
		} 
}


function kekata($x) {
    $x = abs($x);
    $angka = array("", "satu", "dua", "tiga", "empat", "lima",
    "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
    $temp = "";
    if ($x <12) {
        $temp = " ". $angka[$x];
    } else if ($x <20) {
        $temp = kekata($x - 10). " belas";
    } else if ($x <100) {
        $temp = kekata($x/10)." puluh". kekata($x % 10);
    } else if ($x <200) {
        $temp = " seratus" . kekata($x - 100);
    } else if ($x <1000) {
        $temp = kekata($x/100) . " ratus" . kekata($x % 100);
    } else if ($x <2000) {
        $temp = " seribu" . kekata($x - 1000);
    } else if ($x <1000000) {
        $temp = kekata($x/1000) . " ribu" . kekata($x % 1000);
    } else if ($x <1000000000) {
        $temp = kekata($x/1000000) . " juta" . kekata($x % 1000000);
    } else if ($x <1000000000000) {
        $temp = kekata($x/1000000000) . " milyar" . kekata(fmod($x,1000000000));
    } else if ($x <1000000000000000) {
        $temp = kekata($x/1000000000000) . " trilyun" . kekata(fmod($x,1000000000000));
    }     
        return $temp;
}
 
 
function terbilang($x, $style=4) {
    if($x<0) {
        $hasil = "minus ". trim(kekata($x));
    } else {
        $hasil = trim(kekata($x));
    }     
    switch ($style) {
        case 1:
            $hasil = strtoupper($hasil);
            break;
        case 2:
            $hasil = strtolower($hasil);
            break;
        case 3:
            $hasil = ucwords($hasil);
            break;
        default:
            $hasil = ucfirst($hasil);
            break;
    }     
    return $hasil;
}
?>