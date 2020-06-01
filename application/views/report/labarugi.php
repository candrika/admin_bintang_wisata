<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
if($option!='print')
{
    $borderstyle = "border-bottom: #E6E8E6; background-color: #B3E5FC;  border-bottom-width: thin; border-bottom-style: dotted; ";
} else {
    $borderstyle = null;
}
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<center>
    <table class='tablereport' style="line-height: <?=$lineheight?>px;"  width='80%' border='0' padding="0">
    <tr>
        <td colspan="2"> 
            <center>
                <br><br> 
                <h1>LABA RUGI</h1>        
                <h3><?= $unit ?></h3><br>
                <h5><?= $periode ?></h5>
            </center>
        </td>
    </tr>

<tr>
    <td colspan="2"><b>Pendapatan</b></td>
</tr>

<?php
$total = 0;

foreach ($arrHarta as $k => $v) {

    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: ".$fontsize."px; '>" . $value['accnumber']." ".$value['accname'] . '</td>';
        if ($value['child'] == 'false') {
            echo "<td><div class='balance'>" . number_format($value['balance']) . "</div></td>";
        } else {
            echo "<td><div class='balance'></div></td>";
        }
        
        echo "</tr>";
        $total+=$value['balance'];
        if ($value['child'] != 'false') {
            $total+=echoChild($value['child'], $startindent + 20,$total);
        }
        // $total += $value['balance'];
    }
//    echo "<tr><td class='total'><div>Total " . $v . ':</td>';
//    echo "<td class='subtotal'><div class='subtotal2'>" . number_format($total) . "</div></td>";
     // echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: ".$fontsize."px; $borderstyle color: #0D1973;  '>Total " . $v . '</td>';
     // echo "<td style='$borderstyle color: #0D1973;  '><div style='float:right; font-size: ".$fontsize."px;'>" . number_format($value['balance']) . "</div></td>";
}
?>
    <tr>
        <td><b>Total Pendapatan:</b></td>
        <td><div class='total2'><?=number_format($totalpendapatan)?></div></td>
    </tr>
    
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <!--///////////////////////////////////////////////////////////////////-->
    
<tr>
    <td colspan="2"><b>Biaya Atas Pendapatan</b></td>
</tr>

<?php
$total = 0;
$value =0;

foreach ($arrKewajiban as $k => $v) {
//echo $$k;
    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: ".$fontsize."px; '>" . $value['accnumber']." ".$value['accname'] . '</td>';
        if ($value['child'] == 'false') {
            echo "<td><div class='balance'>" . number_format($value['balance']) . "</div></td>";
        } else {
             echo "<td><div class='balance'></div></td>";
        }
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChild($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }

     echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: ".$fontsize."px; '>Total " . $v . '</td>';
     echo "<td><div style='float:right; font-size: ".$fontsize."px;'>" . number_format($total) . "</div></td>";
}
?>
    <tr>
        <td><b>Total Biaya Atas Pendapatan:</b></td>
        <td><div class='total2'><?=number_format($totalbiayapendapatan)?></div></td>
    </tr>
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <tr style="background-color: #E6FAE7;">
        <td><b>Laba Rugi Kotor:</b></td>
        <td><div class='total2'><?=number_format($labarugikotor)?></div></td>
    </tr>
    
   <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    
    <tr>
    <td colspan="2"><b>Pengeluaran</b></td>
</tr>

<?php
$total = 0;
$value =0;
foreach ($arrPengeluaran as $k => $v) {

    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: ".$fontsize."px; '>" . $value['accnumber']." ".$value['accname'] . '</td>';
        if ($value['child'] == 'false') {
            echo "<td><div class='balance'>" . number_format($value['balance']) . "</div></td>";
        } else {
             echo "<td><div class='balance'></div></td>";
        }
        echo "</tr>";
        $total += $value['balance'];
        if ($value['child'] != 'false') {
            $total += echoChild($value['child'], $startindent + 20,$total);
        }
        
    }

    echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: ".$fontsize."px;'>Total " . $v . '</td>';
     echo "<td><div style='float:right; font-size: ".$fontsize."px;'>" . number_format($total) . "</div></td>";
}
?>
    <tr>
        <td><b>Total Pengeluaran:</b></td>
        <td><div class='total2'><?=number_format($totalpengeluaran)?></div></td>
    </tr>
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <tr style="background-color: #E6FAE7;">
        <td><b>Laba Rugi Operasi:</b></td>
        <td><div class='total2'><?=number_format($labarugioperasi)?></div></td>
    </tr>
    
    <!--//////////////////////////////////////////////////////////////////////////////////-->
    
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <tr>
    <td colspan="2"><b>Pendapatan Lain</b></td>
</tr>

<?php
$total = 0;
$value =0;
foreach ($arrPendapatanLain as $k => $v) {
//echo $$k;
    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: ".$fontsize."px; '>" . $value['accnumber']." ".$value['accname'] . '</td>';
        if ($value['child'] == 'false') {
            echo "<td><div class='balance'>" . number_format($value['balance']) . "</div></td>";
        } else {
             echo "<td><div class='balance'></div></td>";
        }
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChild($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }

    echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: ".$fontsize."px;'>Total " . $v . '</td>';
     echo "<td><div style='float:right; font-size: ".$fontsize."px;'>" . number_format($total) . "</div></td>";
}
?>
    <tr>
        <td><b>Total Pendapatan Lain:</b></td>
        <td><div class='total2'><?=number_format($totalpendapatanlain)?></div></td>
    </tr>
    
    
       <!--//////////////////////////////////////////////////////////////////////////////////-->
    
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <tr>
    <td colspan="2"><b>Pengeluaran Lain</b></td>
</tr>

<?php
$total = 0;
$value =0;
foreach ($arrPengeluaranLain as $k => $v) {
//echo $$k;
    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        // print_r($value);
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: ".$fontsize."px; '>" . $value['accnumber']." ".$value['accname'] . '</td>';
        if ($value['child'] == 'false') {
            echo "<td><div class='balance'>" . number_format($value['balance']) . "</div></td>";
        } else {
             echo "<td><div class='balance'></div></td>";
        }
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChild($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }

    echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: ".$fontsize."px;'>Total " . $v . '</td>';
     echo "<td><div style='float:right; font-size: ".$fontsize."px;'>" . number_format($total) . "</div></td>";
}
?>
    <tr>
        <td><b>Total Pengeluaran Lain:</b></td>
        <td><div class='total2'><?=number_format($totalpengeluaranlain)?></div></td>
    </tr>
    
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <tr style="background-color: #E6FAE7;">
        <td><b>Laba Sebelum Pajak:</b></td>
        <td><div class='total2'><?=number_format($labarugisebelumpajak)?></div></td>
    </tr>
    <tr style="background-color: #E6FAE7;">
        <td><b>Pajak Penghasilan:</b></td>
        <td><div class='total2'><?=number_format($pajakpenghasilan)?></div></td>
    </tr>
    <tr style="background-color: #E6FAE7;">
        <td><b>Laba Setelah Pajak:</b></td>
        <td><div class='total2'><?=number_format($labarugisesudahpajak)?></div></td>
    </tr>
    
</table>
</center>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>