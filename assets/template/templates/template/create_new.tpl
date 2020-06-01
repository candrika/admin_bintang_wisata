<section class="scrollable wrapper"> 
    <section class="panel"> 
<div class="tab-content"> 

    <section class="tab-pane active" id="basic"> 

<form name="multiform" id="multiform" action="save" class="form-horizontal" method="post" data-validate="parsley" enctype="multipart/form-data"> 

<div class="form-group m-t-lg"> 
<label class="col-sm-3 control-label">{$lang['contact'][2]}

</label> 

<div class="col-sm-4 media m-t-none"> 

<div class="bg-light pull-left text-center media-lg thumb-lg padder-v"><i class="icon-user inline icon-light icon-3x m-t-lg m-b-lg"></i>
</div> 

<div class="media-body"> 
<input id="photo" type="file" name="photo" title="{$lang['general'][1]}" class="btn btn-sm btn-info m-b-sm">
<br> <button class="btn btn-sm btn-default">{$lang['general'][2]}</button> 
</div> 
</div> 
</div> 

<div class="form-group"> 
<label class="col-sm-3 control-label">Email
</label> 

<div class="col-sm-4"> 
<input type="text" name="email" class="bg-focus form-control parsley-validated" data-required="true" data-type="email"> 
</div> 
</div> 


<div class="form-group"> 
<label class="col-sm-3 control-label">{$lang['contact'][3]}
</label> 

<div class="col-sm-4"> 
<input type="text" name="name" placeholder="Username" class="form-control parsley-validated"> 
</div> 
</div> 

{*<div class="form-group"> 
<label class="col-sm-3 control-label">{$lang['contact'][4]}
</label> *}

{*<div class="col-sm-4"> 
<select name="contact_group_id" class="form-control"> 

<option value="1">Editor</option> 

<option value="0">Admin</option> 
</select> 
</div> *}

<div class="form-group"> 
<label class="col-sm-3 control-label">{$lang['contact'][4]}
</label> 

    <div class="col-sm-4"> 
    <div id="combox"> </div> 
    </div> 
</div> 

{*</div> *}



<div class="form-group"> 
<label class="col-sm-3 control-label">{$lang['contact'][5]}
</label> 

<div class="col-sm-5"> 
<textarea name="notes" placeholder="Notes" rows="5" data-trigger="keyup" data-rangelength="[2,200]" class="form-control parsley-validated"></textarea> 

<div class="checkbox"> 
<label> 
<input name="agree" type="checkbox" data-required="true"> {$lang['contact'][6]} 
</label> 
</div> 
</div> 
</div> 

<div class="form-group"> 

<div class="col-sm-4 col-sm-offset-3"> 
    <button type="submit" class="btn btn-white">{$lang['general'][3]} </button> 
    <button type="submit" class="btn btn-primary">{$lang['general'][4]}</button> 
</div> 
</div> 
</form> 
    
    </section>


</div> 
</section>
</section>
<script src="{$assets_url}js/jquery-1.10.2.min.js"></script> 
<script type='text/javascript'>
    
       $( document ).ready(function() {
       //load combox campaign
        $.ajax({
                        url: '{$site_url}/loader/combox/contact_group/true',
			type: "GET",
                        cache: false,
			processData:false,
			success: function(data, textStatus, jqXHR)
                        {
                            console.log(data)
                            $('#combox').html(data);
                        },
		  	error: function(jqXHR, textStatus, errorThrown) 
                        {
                            $('#combox').html(jqXHR);
                        }    
	   });   
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