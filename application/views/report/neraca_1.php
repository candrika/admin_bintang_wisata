<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu">
 <?php
         $borderstyle= "border-bottom: #E6E8E6;  border-bottom-width: thin; border-bottom-style: dotted; ";
?>
<style>
    body {
        font-family: 'Ubuntu', serif;
        /*font-size: 48px;*/
    }
    .container{
        background-color: #c0c0c0;
    }
    .reportLayout{
        background-color: #fff;
        position: relative;
        top:0;
        bottom: 0;
        left: 0;
        right: 0;

        margin: auto;
        width: 700;
        height: 100%;
        /*border-width: 1px;*/ 
        /*border-style: groove;*/ 
        /*border-color: #C2C7F0;*/
        padding: '10 30 10 30';
    }
    .content{
        color:#000;  
        padding: 30px;
    }
    h1,h3 {
        color:#172385;
    }
    .head{
        color: #0D1973;          
        margin-top: -40px; 
        margin-bottom: -20px;
    }
    .total{
        color: #0D1973;  
        margin-left: 40px;
        font-size: 14px;
        <?=$borderstyle?>
    }
    .indent20{
        margin-left: 20px;
        font-size: 14px;
    }
    .indent40{
        margin-left: 40px;
        font-size: 14px;
    }
    .balance{
        float: right;
        margin-right: 0px;
    }
    h1{
        margin-top: -10px;
    }
    h6{
        margin-top: -20px;
    }
</style>

<!--<div class="container">-->
<div class="reportLayout">
    <?php
    $underlineStyle = "text-decoration: underline;";
    
    $arrHarta = array(
      'kas'=>'Kas',
      'bank'=>'Bank',  
      'piutang'=>'Piutang',
      'persediaan'=>'Persediaan',
      'hartatetap'=>'Harta Tetap'
    );
    
    $arrKewajiban = array(
      'hutanglancar'=>'Hutang Lancar',
      'hutangpanjang'=>'Hutang Jangka Panjang',
      'kewajibanlain'=>'Kewajiban Lain'
    );
    
    $arrModal = array(
      'modal'=>'Modal'
    );
    
   
    ?>
    <center>
        <h3><?=$unit?></h3>
        <h1>NERACA</h1>        
        <h6><?= $sd ?> s/d <?= $nd ?></h6>
    </center>

    <div class="content">
        <br><div class="head">Harta</div><br>

        
        <?php
        $total = 0;
        
           
        function recursive($data,$ident) {
            echoChild($data,$ident+20);
        }

        function echoChild($data,$ident) {
             $borderstyle= "border-bottom: #E6E8E6;border-bottom-width: thin; border-bottom-style: dotted; ";
             
            $identpx = $ident."px";
            foreach ($data as $key => $value) {
                echo "<div style='$borderstyle margin-left: $identpx;font-size: 14px;  margin-top: 0px; margin-bottom: -20px;  '>". $value['accname'];
                echo "<div class='balance'>" . number_format($value['balance']) . "</div>";
                echo "</div>";
                echo "<br>";
                if ($value['child'] != 'false') {
                    recursive($value['child'],$ident+20);
                }
            }
        }
        
        foreach ($arrHarta as $k => $v) {
            
            $startindent = 40;     
            $total=0;
            echo "<span class='indent20 head'>$v</span><br/>";
            
             foreach ($$k as $key => $value) {
                $identpx = $startindent."px";
                echo "<div style='$borderstyle margin-left: $identpx;font-size: 14px; margin-bottom: -20px;  '>".$value['accname'];
                echo "<div class='balance'>" . number_format($value['balance']) . "</div>";
                echo "</div>";
                echo "<br>";
                if ($value['child'] != 'false') {
                    echoChild($value['child'],$startindent+20);
                }
                $total += $value['balance'];
            }

            echo "<div class='total'>Total $v:<div class='balance'>" . number_format($total) . "</div></div><br>";

        }
       
        ?>
        
        <br><div class="head">Total Harta<span class='balance'><?= number_format($totalharta) ?></span></div><br>

        
        <!--//////////////-->
        
        
        
        <br><br><br><br><div class="head">Kewajiban</div><br>

        
        <?php
        $total = 0;
        
        foreach ($arrKewajiban as $k => $v) {
            
            $startindent = 40;     
            $total=0;
            echo "<span class='indent20 head'>$v</span><br/>";
            
             foreach ($$k as $key => $value) {
                $identpx = $startindent."px";
                echo "<div style='$borderstyle margin-left: $identpx;font-size: 14px; margin-bottom: -20px;  '>".$value['accname'];
                echo "<div class='balance'>" . number_format($value['balance']) . "</div>";
                echo "</div>";
                echo "<br>";
                if ($value['child'] != 'false') {
                    echoChild($value['child'],$startindent+20);
                }
                $total += $value['balance'];
            }

            echo "<div class='total'>Total $v:<div class='balance'>" . number_format($total) . "</div></div><br>";

        }
        ?>
        
        <br><div class="head">Total Kewajiban<span class='balance'><?= number_format($totalkewajiban) ?></span></div><br>

         <!--//////////////-->
         
        <br><br><br><br><div class="head">Modal</div><br>

        
        <?php
        $total = 0;
        
        foreach ($arrModal as $k => $v) {
            
            $startindent = 40;     
            $total=0;
            echo "<span class='indent20 head'>$v</span><br/>";
            
             foreach ($$k as $key => $value) {
                $identpx = $startindent."px";
                echo "<div style='$borderstyle margin-left: $identpx;font-size: 14px; margin-bottom: -20px;  '>".$value['accname'];
                echo "<div class='balance'>" . number_format($value['balance']) . "</div>";
                echo "</div>";
                echo "<br>";
                if ($value['child'] != 'false') {
                    echoChild($value['child'],$startindent+20);
                }
                $total += $value['balance'];
            }

            echo "<div class='total'>Total $v:<div class='balance'>" . number_format($total) . "</div></div><br>";

        }
        ?>
        
        <br><div class="head">Total Modal<span class='balance'><?= number_format($totalmodal) ?></span></div><br>
        
    </div>
</div>

<?php
if($print)
{
    echo "<body onload=\"window.print()\">";
}
?>
