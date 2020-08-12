var token = $('input[name="_token"]').val();
var url = $('#url').val();
var categoryslotarray = '';
var activeempcount  = 0;
var activecardarray = [];
var freecardarray = [];
var occupiedcardarray = [];
var count = 0;
let index = 0;

$(document).ready(function(){



    ////////////////// epin start ////////////////////////////////

    $('#selectemp').change(function(){
      var beautician = $(this).val();
      if(beautician){
        $('#activebtn').hide();
        $('#epindiv').show();
      }else{
        $('#epin').val('');
        $('#epindiv').hide();
      }
    });

    $(".number").keypress(function (e) {
     //if the letter is not digit then display error and don't type anything
     if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $(this).find('.errmsg').html("Digits Only are allowed ").show().fadeOut("slow");
        return false;
      }
    });

   

    $('#epin').on('input', function(){
      let epin  = $(this).val();
      if(epin.length == 4){
        $('#activebtn').show();
      }else{
        $('#activebtn').hide();
      }
    }); 

    $('#deactiveepin').on('input', function(){
      let epin  = $(this).val();
      if(epin.length == 4){
        $('#deactivebtn').show();
      }else{
        $('#deactivebtn').hide();
      }
    });

    $('#activebtn').click(function(){
      let beautician = $('#selectemp').val();
      let servicecategory = $('#servicecategory').val();
      let data = beautician.split(',');
      let beauticianid = data[0];
      let epin = $.trim(data[1]);
      let enteredepin = $.trim($('#epin').val());
   

      if(Number(enteredepin) == Number(epin)){

        var slotid = $('#slotid').val();
        $('#epin_err').hide();
        $('#selectemp').val('').trigger('change');
        $('#epin').val('');
        $('#activeModel').modal('hide');

        activecard(slotid, beauticianid, servicecategory,epin);


      }else{
        $('#epin_err').show();
      }

    });

    $('#deactivebtn').click(function(){
      var beautician = $('#selectempdeactive').val();
      var data = beautician.split(',');
      var beauticianid = data[0];
      var epin = $.trim(data[1]);
      var enteredepin = $.trim($('#deactiveepin').val());
   

      if(Number(enteredepin) == Number(epin)){

        var slotid = $('#deactiveslotid').val();
        $('#epin_err_deactive').hide();
        $('#selectempdeactive').val('').trigger('change');
        $('#deactiveepin').val('');
        $('#deactiveModel').modal('hide');

        deactivecard(slotid, beauticianid);


      }else{
        $('#epin_err_deactive').show();
      }

    });

    $('#deactivebtnclose').click(function(){
      $('#deactiveepin').val('');
    });

    ////////////////// epin end ////////////////////////////////


    ////////////////////////// assign Slot start /////////////////////////
    $('#nexttoken').click(function(){
      var selectedcategory = $('#servicecategory').val();
      $.ajax({

        type : 'get',
        url : url+'/appointment/checkactiveslot/'+selectedcategory,
        success : function(slotstatus){
          let slotstatusdata = slotstatus[0];
          let slotstatusdatacount = slotstatus[1];

          if(slotstatusdatacount > 1){
            showcardoption(slotstatusdata);
          }else if(slotstatusdatacount == 1){
            assignslot(slotstatusdata[0].categoryslotid);
          }else{
            alert('No Slot Available');
          }
        }

      });
      
    });
    ////////////////////////// assign Slot end /////////////////////////

    ////////////////////////// Complete start /////////////////////////////

    $(document).on('input', '#verifyepin',function(){
      
      let epin = $(this).val();
      if(epin.length == 4){
        $('#completebtn').show();
      }else{
        $('#completebtn').hide();
      }


    });

   /* $('#completebtn').click(function(){
      let epin = $('#verifyepin').val();
      $('#completeepinerr').hide();
      if(epin && epin.length == 4){
        let confirmpin = $('#completeemppin').val();
        if(Number(confirmpin) == Number(epin)){
        $('#completeepinerr').hide();

        }else{
          $('#completeepinerr').show();
        }
      }
    });*/


    ////////////////////////// Complete end //////////////////////////////

    function recreatecard(tokendata, slotid, empname){


      if(tokendata.length > 0){
        $.each(tokendata, function(index, value){
          let tokenno = value.tokenno;
          let slotid = value.slotid;
          
        });
      }



    }




    //////////////////////// set interval end   /////////////////////////

    ///////////////////////////// showcardoption start //////////////////////

    function showcardoption(slotstatusdata){
      $('#cardmodel #cardoptiondiv').empty();
      if(slotstatusdata){
        $.each(slotstatusdata, function(index, value){
          let currentclotname = $('#slotcard'+value.categoryslotid+' h4').text();
          var cardoption = '<div class="col-md-6 col-sm-12 col-lg-6">'+
                              '<div class="card">'+
                                '<div class="card-header">'+
                                  '<h4>'+currentclotname+'</h4>'+
                                '</div>'+
                                '<div class="card-body">'+
                                  '<center><a class="btn btn_add" onclick="assignslot('+value.categoryslotid+')">Assign</a></center>'+
                                '</div>'+
                              '</div>'+
                            '</div>';

          $('#cardmodel #cardoptiondiv').append(cardoption);
        });
        $('#cardmodel').modal('show');
      }



    }



    ///////////////////////////// showcardoption end //////////////////////

  });


  function active(slotid){

    $('#slotid').val(slotid);
    $('#activeModel').modal('show');

  }

  function deactive(slotid, empid){
    
    $("#deactiveModel #selectempdeactive option[data-id='" + empid + "']").prop('selected', 'true');
    $('#deactiveModel #deactiveempname').val($('#empname'+slotid).text());
    $('#deactiveslotid').val(slotid);
    $('#deactiveModel').modal('show');
  }


//////////////////////////////// get slot start //////////////////////////////////////////
$('#servicecategory').change(function(){
	var servicecategory = $(this).val();
	if(servicecategory){
		$.ajax({

			type : 'get', 
			url : url+'/appointment/getservicecategoryslot/'+servicecategory,
			success : function(slots){
				categoryslotarray = slots;
				generateslot(categoryslotarray);
			}

		});
	}

});


function generateslot(categoryslotarray){
  let empdata = '';
	if(categoryslotarray.length > 0){

		$('#cardappend').empty();
    var count = 0;
		$.each(categoryslotarray, function(index, value){
      let isactivecheck = 0;
      count = ++index;

      var slotstatusckeck = value.slotstatus;
     
   
      if(slotstatusckeck !== '' &&  slotstatusckeck !== null){
        
        isactivecheck = slotstatusckeck.isactive;
        empdata = slotstatusckeck.emp;
      }

     
      
      if(isactivecheck === 1){
      
        var empname = '';
        var emppin = '';
        var employeeid = 0;
        if(empdata){
          empname  = empdata.aliasname;
          emppin  = empdata.epin;
          employeeid  = empdata.id;
        }



        var card = '<div class="col-md-3 col-sm-12 col-lg-3" id="slotcard'+value.servicecategoryslotid+'">'+
              '<div class="card" style="background : #343a40; color:white;" data-id="'+value.servicecategoryslotid+'">'+
                '<div class="card-header">'+
                  '<input type="hidden" id="cardslotid'+value.servicecategoryslotid+'" class="cardslotid" value="'+value.servicecategoryslotid+'">'+
                  '<h4>'+value.slotname+'</h4>'+
                '</div>'+
                '<div class="card-body">'+
                  '<input type="hidden" id="empid'+value.servicecategoryslotid+'" value="'+employeeid+'">'+
                  '<input type="hidden" id="emppin'+value.servicecategoryslotid+'" value="'+emppin+'">'+
                  '<div class="mb-3" id="empname'+value.servicecategoryslotid+'">'+empname+'</div>'+
                  '<div id="token'+value.servicecategoryslotid+'"><div>'+
                  '<div class="row">'+
                    '<div class="col-md-6 col-lg-6 col-sm-6">'+
                      '<center><a id="activelink'+value.servicecategoryslotid+'" onclick="deactive('+value.servicecategoryslotid+', '+employeeid+')" class="btn btn-success">Deactive</a></center>'+
                    '</div>'+
                    '<div class="col-md-6 col-lg-6 col-sm-6">'+
                      '<span id="assignbtn'+value.servicecategoryslotid+'"><center><a class="btn btn-success ml-3" onclick="assignmanually('+value.servicecategoryslotid+')">Manually</a></center></span>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
            '</div>';
      activeempcount++;
      }else if(isactivecheck === 2) {
        occupiedslot(value.servicecategoryslotid);
      }else{

        if(!freecardarray.includes(Number(value.servicecategoryslotid))){
          freecardarray.push(Number(value.servicecategoryslotid));
        }

        var card = '<div class="col-md-3 col-sm-12 col-lg-3" id="slotcard'+value.servicecategoryslotid+'">'+
              '<div class="card" data-id="'+value.servicecategoryslotid+'">'+
                '<div class="card-header">'+
                '<input type="hidden" id="cardslotid'+value.servicecategoryslotid+'" class="cardslotid" value="'+value.servicecategoryslotid+'">'+
                  '<h4>'+value.slotname+'</h4>'+
                '</div>'+
                '<div class="card-body">'+
                  '<input type="hidden" id="empid'+value.servicecategoryslotid+'">'+
                  '<input type="hidden" id="emppin'+value.servicecategoryslotid+'">'+
                  '<div class="mb-3" id="empname'+value.servicecategoryslotid+'"></div>'+
                  '<div id="token'+value.servicecategoryslotid+'"><div>'+
                  '<div class="row">'+
                    '<div class="col-md-6 col-sm-6 col-lg-6">'+
                      '<center><a id="activelink'+value.servicecategoryslotid+'" onclick="active('+value.servicecategoryslotid+')" class="btn btn-success">Active</a></center>'+
                    '</div>'+
                    '<div class="col-md-6 col-sm-6 col-lg-6">'+
                      '<span id="assignbtn'+value.servicecategoryslotid+'"></span>'+
                    '</div>'+
                  '</div>'+
              '</div>'+
            '</div>';
      }

		$('#cardcount').val(count);
		$('#cardappend').append(card);
			
		});
    $('#activeempcount').val(activeempcount);

    $('#nextbtndiv').show();
	}else{
		$('#cardappend').empty();
		var card = 'No Slot Found';
		$('#cardappend').append(card);
	}
}





//////////////////////////////// get slot end ///////////////////////////////////////////

//////////////////////////////// Active Card Start //////////////////////////////////////

function activecard(slotid, beauticianid, servicecategory, epin){
	$.ajax({
		type : 'get',
		url : url+'/appointment/cardactive/'+slotid+'/'+beauticianid+'/'+servicecategory,
		success : function(emp){
			if(emp != 201){
				$('#slotcard'+slotid+' .card').css('background', '#343a40');
				$('#slotcard'+slotid+' .card').css('color', 'white');
        $('#slotcard'+slotid+' .card').addClass('active'+slotid);
				$('#empname'+slotid).text(emp);
        $('#emppin'+slotid).val(epin);
        $('#empid'+slotid).val(Number(beauticianid));
        var deactivefunction = "deactive("+slotid+","+beauticianid+")";
        $('#activelink'+slotid).attr('onclick', deactivefunction);
				$('#activelink'+slotid).text('Deactive');
        $('#assignbtn'+slotid).append('<center><a class="btn btn-success ml-3" onclick="assignmanually('+slotid+')">Manually</a></center>');

        if(!activecardarray.includes(Number(slotid))){
          activecardarray.push(Number(slotid));
        }


        var indexoffreecard = freecardarray.indexOf(Number(slotid));
        freecardarray.splice(indexoffreecard,1);

        activeempcount++;
        $('#activeempcount').val(activeempcount);
			}else{
				alert('Beautician is already active');
			}
		}
	});
}



//////////////////////////////// Active Card End //////////////////////////////////////

//////////////////////////////// Deactive Card Start //////////////////////////////////////

function deactivecard(slotid, beauticianid){
  $.ajax({
    type : 'get',
    url : url+'/appointment/carddeactive/'+slotid+'/'+beauticianid,
    success : function(emp){
      if(emp != 201){
        $('#slotcard'+slotid+' .card').css('background', 'white');
        $('#slotcard'+slotid+' .card').css('color', 'black');
        $('#empname'+slotid).text('');
        var slot = 'active('+slotid+')';
        $('#empid'+slotid).val(0);
        $('#assignbtn'+slotid).empty();
        $('#activelink'+slotid).attr('onclick', slot);
        $('#activelink'+slotid).text('Active');
      }else{
        alert('Beautician is already active');
      }
    }
  });
}




//////////////////////////////// Deactive Card End //////////////////////////////////////


//////////////////////////////// Assign Slot start /////////////////////////////////////

  function assignslot(slotid, tokenid = 0){
    
    let cardempid = $('#empid'+slotid).val();
    let servicecategoryid = $('#servicecategory').val();
    let route = url+'/appointment/getandsettoken/'+servicecategoryid+'/'+cardempid+'/'+slotid;
    if(tokenid != 0){
      route = url+'/appointment/getandsettokenmanually/'+tokenid+'/'+slotid+'/'+cardempid;
    }

    $.ajax({
      type : 'get',
      url : route,
      success : function(tokendata){
        if(tokendata != 201){
          displayinfo(tokendata, slotid);
        }else{
          alert('No Token Available');
          $('#cardmodel').modal('hide');
        }
      }
    });
  }

  function displayinfo(tokendata, slotid){

    if(tokendata != undefined){

      let tokenno = tokendata.tokenno;
      let tokenid = tokendata.tokenid;
      let tokenservices = tokendata.tokenservices;
      let client = tokendata.client;
      let tokenservicecount = 0;
      let servicenamevalue = ''; 
      
      var indexoffreecard = activecardarray.indexOf(Number(slotid));
      activecardarray.splice(indexoffreecard,1);

      occupiedcardarray.push(Number(slotid));
      var row = '<div class="row">'+
                  '<div class="col-md-12 col-sm-12 col-lg-12">'+
                    '<input type="hidden" name="clientid" id="occupiedclientid'+slotid+'" value="'+client.member_id+'">'+
                    '<input type="hidden" name="tokenno" id="tokenid'+slotid+'" value="'+tokenid+'">'+

                    '<label>Token No : <span id="tokenname'+slotid+'">'+tokenno+'</span></label><br/>'+
                    '<label>Client Name : <span id="clientname'+slotid+'">'+client.firstname+' '+client.lastname+'</span></label>';

                  if(tokenservices != undefined){
                    row += '<center><h3>Services</h3></center>';
                    $.each(tokenservices, function(index, value){
                      tokenservicecount++;

                      let currentserviceid = value.tokenserviceid;
                      let servicearray = value.service;
                      let packageidrepeat = value.tokenpackageidrepeat;
                      let invoiceid = value.invoiceid;
                      let packageid = value.packageid;
                      let packageclaimid = value.position;
                      let tokencategoryid = value.tokencategoryid;
                     

                      
                      if(servicearray != undefined){
                        servicenamevalue = servicearray.servicename;
                      }
                      
                        row += '<div class="row currentservice'+slotid+'"" id="tokenservice'+slotid+'">'+
                                      '<div class="col-md-12 col-sm-12 col-lg-12">'+
                                        '<input type="hidden" name="tokenservicename'+slotid+'" id="tokenservicename'+slotid+'" value="'+servicenamevalue+'">'+
                                        '<input type="hidden" name="tokenserviceid'+slotid+'" id="tokenserviceid'+slotid+'" value="'+currentserviceid+'">'+
                                        '<input type="hidden" name="tokenpackagerepeatid'+slotid+'" id="tokenpackagerepeatid'+slotid+'" value="'+packageidrepeat+'">'+
                                        '<input type="hidden" name="invoiceid'+slotid+'" id="invoiceid'+slotid+'" value="'+invoiceid+'">'+
                                        '<input type="hidden" name="packageclaimid'+slotid+'" id="packageclaimid'+slotid+'" value="'+packageclaimid+'">'+
                                        '<input type="hidden" name="packageid'+slotid+'" id="packageid'+slotid+'" value="'+packageid+'">'+
                                        '<input type="hidden" name="tokencategoryid'+slotid+'" id="tokencategoryid'+slotid+'" value="'+tokencategoryid+'">'+
                                        '<input type="checkbox" id="servicecheck'+slotid+'" value="'+currentserviceid+'"> <label><span id="servicedisplayname'+slotid+'">'+servicearray.servicename+'</span></label>'+
                                      '</div>'+
                                      
                                    '</div>';
                      
                    });

                  }

      row +=  '<div class="row">'+
                '<div class="col-md-6 col-lg-6 col-sm-12">'+
                  '<center><a onclick="complete('+slotid+')" class="btn btn-success">Complete</a>'+
                '</div>'+
                '<div class="col-md-6 col-lg-6 col-sm-12">'+
                  '<center><a class="btn btn-success ml-3" onclick="skip('+slotid+','+tokenid+')">Skip</a></center>'+
                '</div>'+
              '<div/>';
      $('#token'+slotid).empty();
      $('#token'+slotid).append(row);

      $('#cardmodel').modal('hide');
      $('#assigntokenmodal').modal('hide');
    }


  }


  function occupiedslot(slotid){

    $.ajax({

      type : 'get',
      url : url+'/appointment'+'/occupiedslot/'+slotid,
      success : function(occupiedslotdata){
        if(occupiedslotdata != undefined){
          generateoccupiedcard(occupiedslotdata, slotid);
        }
      }

    });

  }

  function generateoccupiedcard(occupiedslotdata, slotid){

    let tokendata = occupiedslotdata[0];
    let empdata = occupiedslotdata[1];
    let slotdata = occupiedslotdata[2];
    let tokenno = tokendata.tokenno;
    let tokenid = tokendata.tokenid;
    let tokenservices = tokendata.tokenservices;
    let client = tokendata.client;
    let tokenservicecount = 0;
    let servicenamevalue = '';
 

    if(tokendata != undefined){
      index++;
       var row = '<div class="col-md-3 col-sm-12 col-lg-3" id="slotcard'+tokendata.slotid+'">'+ 
                  '<div class="card" style="background : #343a40; color:white;" data-id="'+slotdata.servicecategoryslotid+'">'+
                  '<div class="card-header">'+
                  '<input type="hidden" id="cardslotid'+slotdata.servicecategoryslotid+'" class="cardslotid" value="'+slotdata.servicecategoryslotid+'">'+
                  '<h4>'+slotdata.slotname+'</h4>'+
                  '</div>'+
                  '<div class="card-body">'+
                  '<input type="hidden" id="empid'+slotdata.servicecategoryslotid+'" value="'+empdata.id+'">'+
                  '<input type="hidden" id="emppin'+slotdata.servicecategoryslotid+'" value="'+empdata.epin+'">'+
                  '<div id="empname'+slotdata.servicecategoryslotid+'">'+empdata.aliasname+'</div>'+
                  '<div id="token'+slotdata.servicecategoryslotid+'"><div>'+
                  '<div class="row">'+
                  '<div class="col-md-12 col-sm-12 col-lg-12">'+
                    '<input type="hidden" name="clientid" id="occupiedclientid'+slotid+'" value="'+client.member_id+'">'+
                    '<input type="hidden" name="tokenno" id="tokenid'+slotid+'" value="'+tokenid+'">'+

                    '<label>Token No : <span id="tokenname'+tokendata.slotid+'">'+tokenno+'</span></label><br/>'+
                    '<label>Client Name : <span id="clientname'+tokendata.slotid+'">'+client.firstname+' '+client.lastname+'</span></label>';

                     if(tokenservices != undefined){
                    row += '<center><h3>Services</h3></center>';
                    $.each(tokenservices, function(index, value){
                      tokenservicecount++;

                      let currentserviceid = value.tokenserviceid;
                      let servicearray = value.service;
                      let packageidrepeat = value.tokenpackageidrepeat;
                      let invoiceid = value.invoiceid;
                      let packageid = value.packageid;
                      let packageclaimid = value.position;
                      let tokencategoryid = value.tokencategoryid;
                      
                      if(servicearray != undefined){
                        let servicenamevalue = servicearray.servicename;
                      }
                      
                        row += '<div class="row currentservice'+slotid+'" id="tokenservice'+slotid+'">'+
                                      '<div class="col-md-12 col-sm-12 col-lg-12">'+
                                        '<input type="hidden" name="tokenservicename'+slotid+'" value="'+servicenamevalue+'">'+
                                        '<input type="hidden" name="tokenserviceid'+slotid+'" value="'+currentserviceid+'">'+
                                        '<input type="hidden" name="packageid'+slotid+'" id="packageid'+slotid+'" value="'+packageid+'">'+
                                        '<input type="hidden" name="tokencategoryid'+slotid+'" id="tokencategoryid'+slotid+'" value="'+tokencategoryid+'">'+
                                        '<input type="hidden" name="tokenpackagerepeatid'+slotid+'" id="tokenpackagerepeatid'+slotid+'" value="'+packageidrepeat+'">'+
                                        '<input type="hidden" name="packageclaimid'+slotid+'" id="packageclaimid'+slotid+'" value="'+packageclaimid+'">'+
                                        '<input type="hidden" name="invoiceid'+slotid+'" id="invoiceid'+slotid+'" value="'+invoiceid+'">'+
                                        '<input type="checkbox" id="servicecheck'+slotid+'" value="'+currentserviceid+'"> <label><span id="servicedisplayname'+slotid+'">'+servicearray.servicename+'</span></label>'+
                                      '</div>'+
                                      
                                    '</div>';
                      
                    });

                  }
     row += '<div class="row">'+
                '<div class="col-md-6 col-lg-6 col-sm-12">'+
                  '<center><a onclick="complete('+slotid+')" class="btn btn-success">Complete</a>'+
                '</div>'+
                '<div class="col-md-6 col-lg-6 col-sm-12">'+
                  '<center><a class="btn btn-success ml-3" onclick="skip('+slotid+', '+tokenid+')">Skip</a></center></center>'+
                '</div>'+  
            '<div/>';

    $('#cardappend').append(row);
    }

  }



//////////////////////////////// Assign Slot end /////////////////////////////////////


////////////////////////////////// Complete Appointment start //////////////////////////////////////////
function complete(slotid){

  let empname = $('#empname'+slotid).text();
  let clientname = $('#clientname'+slotid).text();
  let tokenname = $('#tokenname'+slotid).text();
  let slotname = $('#slotcard'+slotid+' .card .card-header h4').text();
  let tokenid = $('#tokenid'+slotid).val();
  let empid = $('#empid'+slotid).val();
  let clientid = $('#occupiedclientid'+slotid).val();
  let emppin = $('#emppin'+slotid).val();
  let packageid = $('#packageid'+slotid).val();
  let invoiceid = $('#invoiceid'+slotid).val();
  let category = $('#tokencategoryid'+slotid).val();
  let checkservice = $(".currentservice"+slotid);
  let checkedservicearray = [];
  let completeservicecount = 0;

  var checkedservicearraydisplay = [];
  
  if(checkservice.length > 0){
    $.each(checkservice, function(index, value){
      if($(this).find('input[type="checkbox"]').is(':checked')){
        if(!checkedservicearray.includes(Number($(this).find('#packageclaimid'+slotid).val()))){
          checkedservicearray.push(Number($(this).find('#packageclaimid'+slotid).val()));
         
        }
      }
    });
  }

  if(checkedservicearray.length == 0){
    alert('Please Select Completed Service');
    return;
  }

  var row = 
                '<input type="hidden" name="empid" id="completeempid'+slotid+'" value="'+empid+'">'+
                '<input type="hidden" name="slotid'+slotid+'" value="'+slotid+'">'+
                '<input type="hidden" name="tokenid'+slotid+'" id="completetokenid'+slotid+'" value="'+tokenid+'">'+
                '<input type="hidden" name="completeemppin" id="completeemppin" value="'+emppin+'">'+
                '<input type="hidden" name="clientid" id="completeclientid'+slotid+'" value="'+clientid+'">'+
                '<input type="hidden" name="invoiceid" id="completeinvoiceid'+slotid+'" value="'+invoiceid+'">'+
                '<input type="hidden" name="category" id="completecategory'+slotid+'" value="'+category+'">'+
                '<input type="hidden" name="packageid" id="completepackageid'+slotid+'" value="'+packageid+'">'+
                '<div class="row">'+
                  '<div class="col-md-12 col-sm-12 col-lg-12">'+
                    '<div class="form-group">'+
                      '<label>Slot Name</label>'+
                      '<input type="text" class="form-control" value="'+slotname+'" readonly>'+
                    '</div>'+
                  '</div>'+
                  '<div class="col-md-6 col-dm-12 col-lg-6">'+
                    '<div class="form-group">'+
                      '<label>Beautician Name</label>'+
                      '<input type="text" name="completeempname" class="form-control" value="'+empname+'" readonly>'+
                    '</div>'+
                  '</div>'+
                  '<div class="col-md-6 col-dm-12 col-lg-6">'+
                    '<div class="form-group">'+
                      '<label>Client Name</label>'+
                      '<input type="text" name="completeclientname" class="form-control" value="'+clientname+'" readonly>'+
                    '</div>'+
                  '</div>'+
                '</div>'+
                '<div class="row">'+
                 
                    '<h4>Completed Services</h4>';
                   

                  if(checkservice.length > 0){
                    $.each(checkservice, function(index, value){
                      ++completeservicecount;
                      let currentcompletedservice = $(this).find('#servicedisplayname'+slotid).text();
                      if($(this).find('input[type="checkbox"]').is(':checked')){
                        let currentserviceid = $(this).find('input[name="packageclaimid'+slotid+'"]').val();
                        let tokenpackagerepeatid = $(this).find('input[name="tokenpackagerepeatid'+slotid+'"]').val();
                        //var currentservicearray = [];
                        var currentservicearray = {'currentserviceid' : currentserviceid, 'tokenpackagerepeatid' : tokenpackagerepeatid};
                        /*currentservicearray['checkedserviceid'] = currentserviceid;
                        currentservicearray['tokenpackagerepeatid'] = tokenpackagerepeatid;*/
                        checkedservicearraydisplay.push(currentservicearray);
                        row += 
                              '<input type="hidden" name="completeserviceid'+completeservicecount+'" value="'+Number($(this).find('#servicecheck'+slotid).val())+'">'+ 
                              '<div class="col-md-12 col-sm-12 col-lg-12">'+
                                '<div class="form-group">'+
                                  '<input type="text" readonly class="form-control" value="'+currentcompletedservice+'">'+
                                '</div>'+
                              '</div>';
                              
                      }
                    });

                    
                  } 

         row += 
                '</div>'+
                '<input type="hidden" name="checkedservicearray" id="checkedservicearray'+slotid+'">'+
              '</div>'+
              '<div class="row">'+
                '<div class="col-md-12 col-sm-12 col-lg-12">'+
                  '<div class="form-group">'+
                    '<label>Enter EPin<span style="color:red;"></span></label>'+
                    '<input type="password" class="form-control number" maxlength="4" name="emppin" id="verifyepin" placeholder="Enter EPin">'+
                    '<span id="completeepinerr" style="color:red;display:none;">Please Enter valid E-Pin</span>'
                  '</div>'+
            '</div>';

          $('#completeappointmentdiv').empty();
          $('#completeappointmentdiv').append(row);

          let completebtn = 'completeslot('+slotid+');';

          $('#completebtn').attr('onclick', completebtn);
         
          $(document).find('#completemodal #tokendisplaymodal').text('#'+tokenname);
          $('#completemodal').modal('show');
           let checked=JSON.stringify(checkedservicearraydisplay);
           $('#checkedservicearray'+slotid+'').text(checked);

}





////////////////////////////////// Complete Appointment end //////////////////////////////////////////


  function completeslot(slotid){

    let clientid = $('#completeclientid'+slotid).val();
    let empidid = $('#completeempid'+slotid).val();
    let tokenid = $('#completetokenid'+slotid).val();
    let packageid = $('#completepackageid'+slotid).val();
    let invoiceid = $('#completeinvoiceid'+slotid).val();
    let categoryid = $('#completecategory'+slotid).val();
    let completeservice = $('#checkedservicearray'+slotid+'').text();
    let completeservicearray = JSON.parse(completeservice);

    let epin = $('#verifyepin').val();
      $('#completeepinerr').hide();
      if(epin && epin.length == 4){
        let confirmpin = $('#completeemppin').val();
        if(Number(confirmpin) == Number(epin)){
          $('#completeepinerr').hide();
          $.ajax({
            type : 'POST',
            url : url+'/appointment/completeslot',
            data : {clientid:clientid, empidid:empidid, tokenid:tokenid, completeservicearray:completeservicearray, packageid:packageid, invoiceid:invoiceid, categoryid:categoryid, slotid:slotid , _token : $('meta[name="_token"]').attr('content')},
            success : function(freeslot){
              if(freeslot == 200){
                $('#completemodal').modal('hide');
                $('#servicecategory').trigger('change');
              }
            } 
          });

        }else{

          $('#completeepinerr').show();
          
        }
      }
  }


////////////////////////// Skip Token start //////////////////////////////////
function skip(slotid, tokenid){

  if(Number(slotid) != 0 && slotid != NaN && slotid != undefined){
    $('#skiptokenmodal #skiptokenslot').val(slotid);
    $('#skiptokenmodal #skiptokenid').val(tokenid);

    $('#skiptokenmodal').modal('show');

  }else{

    toastr.error("Something wrong occure.");
  }

}

$('#skiptokenbtn').click(function(){

  var skiptokenslot = $('#skiptokenslot').val();
  var skiptokenid = $('#skiptokenid').val();
  if(skiptokenslot != undefined && skiptokenslot != NaN && Number(skiptokenslot) > 0){
    
    $.ajax({
      type : 'POST',
      url : url+'/appointment/skiptoken',
      data : { skiptokenslot:skiptokenslot, skiptokenid:skiptokenid, _token : token },
      success : function(res){
        if(res == 200){
          $('#skiptokenmodal').modal('hide');
          $('#servicecategory').trigger('change');
        }
      }


    });

  }else{
    toastr.error("Something wrong occure.");

  }

});
////////////////////////// Skip Token end  //////////////////////////////////


///////////////////////////// Assign Token Manually Start ///////////////////////////////////
function assignmanually(slotid){

  if(slotid != NaN && slotid != undefined && Number(slotid) > 0){
    var count = 0;
    var row = '';
    var categoryid = $('#servicecategory').val();
    var manuallyslotname = $('#slotcard'+slotid+' .card .card-header h4').text();
    if(Number(categoryid) > 0 && categoryid != NaN && categoryid != undefined ){
      $.ajax({
        type: 'POST',
        url : url+'/appointment/getfreetoken',
        data : { categoryid:categoryid, slotid:slotid, _token : token},
        success : function(response){
          console.log(manuallyslotname);
          $('#assigntokenmodal #manuallyslotname').text(manuallyslotname);
          if(response == 201){
            row += '<tr><td colspan="6"><center>No Token Available</center></td></tr>';
          }else{
            $.each(response, function(index, value){
              count++;
              row += '<tr>'+
                          '<td>'+count+'</td>'+
                          '<td>'+value.tokenno+'</td>';
                          // token service start
                          if(value.tokenservices.length > 0){
                            row += '<td>';
                            $.each(value.tokenservices, function(index, services){                      
                                row += '<li>'+services.service.servicename+'</li>';
                            });
                            row += '</td>';
                          }
                          // token service end
                          
                            row += '<td>'+value.client.firstname+' '+value.client.lastname+'</td>';
                         
                  row +='<td>'+value.status+'</td>';
                  row +='<td><a class="btn btn-success" onclick="assignslot('+slotid+','+value.tokenid+')">Assign</a></td>'


                  row +='</tr>';

            });
          }
          
          $('#assigntokenmodal #assignmanuallytbl tbody').empty();
          $('#assigntokenmodal #assignmanuallytbl tbody').append(row);
          $('#assigntokenmodal').modal('show');
        },
        error: function(){
          err();
        }
      });
    }else{
      err();
    }
  }else{  
    err();
  }

}
///////////////////////////// Assign Token Manually End  ///////////////////////////////////
  ///////////////////// Error Function Start /////////////////////////////
  function err(){

    toastr.error('Something wrong occure!');
    return;
  }
  ///////////////////// Error Function End /////////////////////////////



  ///////////////////// Set cookie start //////////////////////////

  function setlockcategory(){

    let selectedcategory = $('#lockcategory').val();

    if(selectedcategory){

      $.ajax({

        type: 'POST',
        url : url+'/appointment/setcookie',
        data : { selectedcategory:selectedcategory, _token : token },
        success : function(res){
          if(res == 200){
            $('#servicecategory').val(selectedcategory).trigger('change');
            toastr.success('Service category is locked');
            return;
          }else{
            toastr.error('Something wrong occure!');
            return;
          }
        }

      });
    }else{
      alert('Please select category');
    }

  }

  ///////////////////// Set cookie end  //////////////////////////

  $(document).ready(function(){
    $('#servicecategory').trigger('change')
  });