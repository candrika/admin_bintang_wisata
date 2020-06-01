<style>
.grid {
    padding: 20px 20px 100px 20px;
    max-width: 1300px;
    margin: 0 auto;
    list-style: none;
    text-align: center;
    position: inherit;
}
 
.grid li {
    display: inline-block;
    width: 215px;
    margin: 0;
    padding: 20px;
    text-align: left;
    position: relative;
}

.grid figure {
    margin: 0;
    position: fixed;
}
.grid figure img {
    max-width: 100%;
{*    display: block;*}
    position: relative;
}
.grid figcaption {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px;
    background: #2c3f52;
    color: #ed4e6e;
}
.grid figcaption h3 {
    margin: 0;
    padding: 0;
    color: #fff;
}
 
.grid figcaption span:before {
    content: 'by ';
}
 
.grid figcaption a {
    text-align: center;
    padding: 5px 10px;
    border-radius: 2px;
    display: inline-block;
    background: #ed4e6e;
    color: #fff;
}

.tblpreview {
    width:84px;
{*    left: 20px;*}
    background: #ed4e6e;
    color: #fff;
}
.tbluse {
    width:84px;
{*    right: 20px;*}
    background: #ed4e6e;
    color: #fff;
}

@media screen and (max-width: 31.5em) {
    .grid {
        padding: 10px 10px 100px 10px;
    }
    .grid li {
        width: 100%;
        min-width: 300px;
    }
}

.cs-style-1 figcaption {
    height: 100%;
    width: 100%;
    opacity: 0;
    text-align: center;
    backface-visibility: hidden;
    transition: transform 0.3s, opacity 0.3s;
}


/* Caption Style 6 */
.cs-style-6 figure img {
	z-index: 10;
	-webkit-transition: -webkit-transform 0.4s;
	-moz-transition: -moz-transform 0.4s;
	transition: transform 0.4s;
}

.no-touch .cs-style-6 figure:hover img,
.cs-style-6 figure.cs-hover img {
	-webkit-transform: translateY(-50px) scale(0.5);
	-moz-transform: translateY(-50px) scale(0.5);
	-ms-transform: translateY(-50px) scale(0.5);
	transform: translateY(-50px) scale(0.5);
}

.cs-style-6 figcaption {
	height: 100%;
	width: 100%;
	-webkit-backface-visibility: hidden;
	-moz-backface-visibility: hidden;
	backface-visibility: hidden;
}

.cs-style-6 figcaption h3 {
	margin-top: 80%;
}

                        </style>
                       
<ul class="grid cs-style-6">
     {foreach from=$template item=r}
    <li>
        <figure>
            <img src="{$base_url}/template/thumb/{$r->image}" width="215" alt="img01">
            <figcaption>
                <h3>{$r->template_name}</h3>
                <a class="tblpreview nyroModal" href="{$site_url}/template/preview/{$r->template_master_id}">Preview</a> 
                <a class="tbluse" href="{$site_url}/template/use/{$r->template_master_id}">Use</a>
            </figcaption>
        </figure>
    </li>
    {/foreach}
</ul>
      

{*           href="{$site_url}/template/preview/{$r->template_master_id}              *}
<script src="{$assets_url}js/jquery-1.10.2.min.js"></script> 
<link rel="stylesheet" href="{$base_url}/assets/js/modal/styles/nyroModal.css" type="text/css" media="screen" />
{*<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js"></script>*}
<script type="text/javascript" src="{$base_url}/assets/js/modal/js/jquery.nyroModal.custom.js"></script>

<!--[if IE 6]>
	<script type="text/javascript" src="{$base_url}/assets/js/modal/js/jquery.nyroModal-ie6.min.js"></script>
<![endif]-->

<script type='text/javascript'>
    
$(function() {
  $('.nyroModal').nyroModal();
});

       $( document ).ready(function() {
    });
    
    /* attach a submit handler to the form */
    $("#multiform").submit(function(event) {

      /* stop form from submitting normally */
      event.preventDefault();

      /* get some values from elements on the page: */
      var $form = $( this ),
          url = $form.attr( 'action' );

      /* Send the data using post */
      var formData = new FormData(this);
        
        if ( $(this).parsley('validate') ) {
            $.ajax({
                        url: url,
			type: "POST",
			data:  formData,
			mimeType:"multipart/form-data",
			contentType: false,
                        cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR)
                        {
                             var obj = jQuery.parseJSON(data);
                             $('#alert').append(obj.msg);
                             
                             $("#photo").val("");
                             $(':input','#multiform')
                                .not(':button, :file, :submit, :reset, :hidden')
                                .val('')
                                .removeAttr('checked')
                                .removeAttr('selected');
                        },
		  	error: function(jqXHR, textStatus, errorThrown) 
                        {
                            $('#alert').append(data);
                        }    
	   });   
        }
           

    });
    
    
    

</script>
<script src="{$base_url}assets/js/parsley.js"></script> 