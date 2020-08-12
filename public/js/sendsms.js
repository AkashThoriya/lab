var url = $('#url').val();
var token = $('input[name="_token"]').val();
var fields = '';
$(document).ready(function(){

	$('#packagedate').daterangepicker({
        locale: {
          format: 'DD/MM/YYYY'
        }
      }
    );
    $('#servicedate').daterangepicker({
        locale: {
          format: 'DD/MM/YYYY'
        }
      }
    );
	
	$client_list = $('#users_list');
		$client_list.multiselect();

		$usersselect_list = $('#usersselect_list');
		$usersselect_list.multiselect();

	countlength();

	$('#upload_form').on('submit', function(event){
		
  		event.preventDefault();
  		$('#loader').show();
  		var extension = $('#smsfile').val().split('.').pop().toLowerCase();
  		

  			var file_data = $('#smsfile').prop('files')[0];
  			
	  		$('#bitlyurl').val('');
  			$('#bitlyurlrow').hide();

  			var form_data = new FormData();
  			form_data.append('smsfile', file_data);;

	  		/*if (!file.type.match('application/pdf') ||  !file.type.match('image.*')) {
	           alert('You cannot upload this file because it’s not an image or pdf.');
	           return;
	        }*/

	       /* if (file.size >= 2000000 ) {
	            alert('You cannot upload this file because its size exceeds the maximum limit of 2 MB.');
	            return;
	        }*/

	  		$.ajax({
	  			url:url+'/sms/ajaxfileupload',
	  			method:"POST",
	  			data:new FormData(this),
	  			contentType: false,
	  			cache: false,
	  			processData: false,
	  			success:function(res)
	  			{
	  				$('#loader').hide();
	  				$('#bitlyurlrow').show();
	  				$('#bitlyurl').val(res);
	  			},
	  			error : function(){
	  				$('#loader').hide();
	  				toastr.error('Something wrong occure');
	  			}
	  		})
	  	
	});

	$('#reset').click(function(){
		$('#bitlyurl').val('');
		$('#bitlyurlrow').hide();

	});

	$('#add_link').click(function(){

		var smscontent = $('#smscontent').val();
		var emailcontent = $('#emailcontent').val();
		var bitlylink = $('#bitlyurl').val();

		$('#smscontent').val(smscontent+' '+bitlylink);
		$('#emailcontent').val(emailcontent+' '+bitlylink);

	});

	

	$("#send_sms").click(function( e ) {

		
		var method = $('input[name="selectmethod"]:checked').val();
		var message = $('#smscontent').val();
		var emailcontent = $('#emailcontent').val();
		var sendmail = $('#sendmail').is(':checked');
        var fields = $( "#users_list :input" ).serializeArray();
        if(method == 'Select'){
        	if(fields.length == 0){
				$('#loader').hide();
        		toastr.error('Please select client');
        		return;
        	}
        }
        fields = JSON.stringify(fields); 
       	if(fields.length > 0){
       		$('#loader').show();
			$.ajax({
				type : 'POST',
				url : url+'/sms/sendsmsindividual',
				data : { sendmail:sendmail, method:method, fields:fields, emailcontent:emailcontent, message:message, _token : token },
				success : function(response){
					if(response == 200){
						$('#loader').hide();
						toastr.success('Sms will send shortly');
						window.location.href='';
					}else{
						$('#loader').hide();
						toastr.error('Sms is off');
					}
				},
				error : function(){
					$('#loader').hide();
					toastr.error('Something wrong occure');
				}
			});
       	}else{
       		$('#loader').hide();
       		alert('Please Select Contact No');
       	}
		
    });

   












});

/////////// countcharacter start //////////////

function countlength(){

  let template = $('#smscontent').val();

  var length = template.length;

  
    $('#usedword').text(length);
  

}


/////////// countcharacter end  /////////////

////////// change method start

function checkmethod(){

	var method = $('input[name="selectmethod"]:checked').val();

	if(method == 'Select'){
		$('#allclientrow').show();

	}else{
		$('#allclientrow').hide();

	}

}



////////// change method end

function checkselect(){


	var checkedvalue = $('input[name="search"]:checked').val();
	console.log(checkedvalue);
	if(checkedvalue == 'Package'){
		$('#packagerow').show();
		$('#servicerow').hide();
	}else{
		$('#packagerow').hide();
		$('#servicerow').show();
	}
}


///// get getservice

function getservice(){

	var servicecategory = $('#category').val();
	if(servicecategory){
		$.ajax({
			type : 'POST',
			url : url+'/sms/getservicefromsms',
			data : { servicecategory : servicecategory, _token : token },
			success : function(service){
				console.log(service);
				var servicerow ='';
				$.each(service, function(index, servicevalue){
					servicerow += '<option value="'+servicevalue.serviceid+'">'+servicevalue.servicename+'</option>';
				});

				$('#service').empty(); 
				$('#service').append(servicerow); 
			}
		});
	}
}

///// changelanguage()

function changelanguage(){

	var language = $('#language').val();

	if(language == 'Arabic'){
		$('#smscontent').attr('dir', 'rtl');
		$('#smscontent').val('مرحبًا [First Name] [Last Name] ،');
		$('#emailcontent').attr('dir', 'rtl');
		$('#emailcontent').val('مرحبًا [First Name] [Last Name] ،');
	}else{
		$('#smscontent').removeAttr('dir');
		$('#smscontent').val('Dear [First Name] [Last Name],');
		$('#emailcontent').removeAttr('dir');
		$('#emailcontent').val('Dear [First Name] [Last Name],');
	}

}
