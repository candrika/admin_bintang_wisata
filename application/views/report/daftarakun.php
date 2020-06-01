<link href="<?=base_url()?>/assets/css/reporting.css" rel="stylesheet">
<?php
$borderstyle = "border-bottom: #E6E8E6;  border-bottom-width: thin; border-bottom-style: dotted; ";
?>
<style>
    td {        
        font-size: <?=$fontsize?>px;
    }
</style>
<center>
    <table class='tablereport' width='600' border='0' padding="0">
    <tr>
        <!-- <td colspan="2">  -->
            <center>
                <h3><?= $unit ?></h3>
                <h1>DAFTAR AKUN</h1>        
            </center>
        <!-- </td> -->
    </tr>
<tr>
    <td><center><b>Akun Perkiraan</b></center></td>
    <td><center><b>Tipe Akun</b></center></td>
</tr>
<tr>
    <td colspan="2">Harta</td>
</tr>

<?php
$total = 0;

foreach ($arrHarta as $k => $v) {

    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: 12px; '>" .$value['accnumber'].' '. $value['accname'] . '</td>';
        echo "<td><div class='balance'>" .$value['acctypename'] . "</div></td>";
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChildAkun($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }
//    echo "<tr><td class='total'><div>Total " . $v . ':</td>';
//    echo "<td class='subtotal'><div class='subtotal2'>" . number_format($total) . "</div></td>";
//     echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: 12px; $borderstyle color: #0D1973;  '>Total " . $v . '</td>';
//     echo "<td style='$borderstyle color: #0D1973;  '><div style='float:right; font-size: 12px;'>" . $value['acctypename'] . "</div></td>";
}
?>
   
    
    <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    <!--///////////////////////////////////////////////////////////////////-->
    
<tr>
    <td colspan="2">Kewajiban</td>
</tr>

<?php
$total = 0;

foreach ($arrKewajiban as $k => $v) {

    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: 12px; '>" . $value['accnumber'].' '.$value['accname'] . '</td>';
        echo "<td><div class='balance'>" . $value['acctypename'] . "</div></td>";
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChildAkun($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }

//    echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: 12px; $borderstyle color: #0D1973;  '>Total " . $v . '</td>';
//     echo "<td style='$borderstyle color: #0D1973;  '><div style='float:right; font-size: 12px;'>" . $value['acctypename'] . "</div></td>";
}
?>
    
   <tr>
        <td colspan="2"><p>&nbsp</p></td>
    </tr>
    
    <tr>
    <td colspan="2">Modal</td>
</tr>

<?php
$total = 0;

foreach ($arrModal as $k => $v) {

    $startindent = 40;
    $total = 0;
    echo "<tr><td class='indent20 head' colspan='2'>$v</td></tr>";

    foreach ($$k as $key => $value) {
        $identpx = $startindent . "px";
        echo "<tr><td><div style='margin-left: $identpx;font-size: 12px; '>" . $value['accnumber'].' '.$value['accname'] . '</td>';
        echo "<td><div class='balance'>" . $value['acctypename'] . "</div></td>";
        echo "</tr>";
        if ($value['child'] != 'false') {
            echoChildAkun($value['child'], $startindent + 20);
        }
        $total += $value['balance'];
    }

//    echo "<tr style=".$borderstyle."><td><div style='margin-left: $identpx; font-size: 12px; $borderstyle color: #0D1973;  '>Total " . $v . '</td>';
//     echo "<td style='$borderstyle color: #0D1973;  '><div style='float:right; font-size: 12px;'>" . $value['acctypename'] . "</div></td>";
}
?>
<!--    <tr>
        <td><b>Total Modal:</b></td>
        <td><div class='total2'><?=number_format($totalmodal)?></div></td>
    </tr>-->
    
    
</table>
</center>

<?php
if($option=='print')
{
    echo "<body onload=\"window.print()\">";
}
?>