var url = $('#url').val();
var token = $('input[name="_token"]').val();
var slotcount = 0;
var slotcountupdate = 0;
var errorarray = [];

$(document).ready(function(){

  $('#close_update').click(function(){
    $('#service_form_edit').trigger("reset");
    $('#tokeniniupdateerr').hide();
    $('#servicecategoryupdateerr').hide();
    $('#update_submit').removeAttr('disabled');
  });

  $('#close').click(function(){
    $('#servicecatrgorynameadd').removeAttr('value');
    $('.help-block').hide();
    $('#servicecategoryerr').hide();
    $('#tokeninierr').hide();
    $('#service_form').trigger("reset");
    $('#submit').removeAttr('disabled');
  });

  $('#submit').click(function(){
    $('#service_form')[0].reset;
  }); 

  $('#update_submit').click(function(){
    $('#service_form_edit')[0].reset;
  });

  $('#close').click(function(){
    $('#servicecategoryname_add').val('');
    $('#service_form')[0].reset;
    $('#service_form_edit')[0].reset;
  });

  $('#addslotbtn').click(function(){
    addslotbtn(1);
  });

  $('#addslotbtnupdate').click(function(){
    addslotbtn(2);
  });

    /////////////////////// check servicecategory start ////////////////////////////////////
    $('#servicecatrgorynameadd').on('input', function(){

      let servicecategoryname = $(this).val();
      let update = 0;
      $('#servicecategoryerr').hide();
      if(servicecategoryname){

        $.ajax({

          type : 'POST', 
          url : url+'/servicecategory/checkservicecategotyexist',
          data : {servicecategoryname:servicecategoryname, update:update, _token : token},
          success : function(res){
            if(res == 200){

              $('#servicecategoryerr').show();
              errorarray.push('category');
              checkerrorarray(0);

            }else{

              $('#servicecategoryerr').hide();
              var index = errorarray.indexOf('category');

              if(index != -1){
                errorarray.splice(index, 1);
              }

              checkerrorarray(0);
            }
          }
        });

      }else{

        var index = errorarray.indexOf('category');
        errorarray.splice(index, 1);
        $('#servicecategoryerr').hide();

        checkerrorarray(0);



      }


    });
    /////////////////////// check servicecategory end  ////////////////////////////////////

    /////////////////////// check servicecategory start ////////////////////////////////////
    $('#tokenini').on('input', function(){

      let tokenini = $(this).val();
      let update = 0;
      $('#tokeninierr').hide();
      if(tokenini){
        console.log('done');
        $.ajax({

          type : 'POST', 
          url : url+'/servicecategory/tokenexist',
          data : {tokenini:tokenini, update:update, _token : token},
          success : function(res){
            if(res == 200){
              $('#tokeninierr').show();
              errorarray.push('tokenini');
              checkerrorarray(0);
            }else{
              $('#tokeninierr').hide();
              var index = errorarray.indexOf('tokenini');
              if(index != -1){
                errorarray.splice(index, 1);
              }

              checkerrorarray(0);
            }
          }
        });

      }else{

        var index = errorarray.indexOf('tokenini');
        errorarray.splice(index, 1);

        checkerrorarray(0);
      }


    });
    /////////////////////// check servicecategory end  ////////////////////////////////////

     /////////////////////// check update servicecategory start ////////////////////////////////////
     $('#servicecatrgorynameupdate').on('input', function(){

      let servicecategoryname = $(this).val();
      let update = 0;
      $('#servicecategoryerr').hide();
      if(servicecategoryname){

        $.ajax({

          type : 'POST', 
          url : url+'/servicecategory/checkservicecategotyexist',
          data : {servicecategoryname:servicecategoryname, update:update, _token : token},
          success : function(res){
            if(res == 200){

              $('#servicecategoryupdateerr').show();
              errorarray.push('category');
              checkerrorarray(1);

            }else{

              $('#servicecategoryupdateerr').hide();
              var index = errorarray.indexOf('category');

              if(index != -1){
                errorarray.splice(index, 1);
              }

              checkerrorarray(1);
            }
          }
        });

      }else{

        var index = errorarray.indexOf('category');
        errorarray.splice(index, 1);
        $('#servicecategoryerr').hide();

        checkerrorarray(1);

      }


    });
    /////////////////////// check update servicecategory end  ////////////////////////////////////

    /////////////////////// check update servicecategory start ////////////////////////////////////
    $('#tokeniniupdate').on('input', function(){

      let tokenini = $(this).val();
      let update = 0;
      $('#tokeninierr').hide();
      if(tokenini){

        $.ajax({

          type : 'POST', 
          url : url+'/servicecategory/tokenexist',
          data : {tokenini:tokenini, update:update, _token : token},
          success : function(res){
            if(res == 200){
              $('#tokeniniupdateerr').show();
              errorarray.push('tokenini');
              checkerrorarray(1);
            }else{
              $('#tokeniniupdateerr').hide();
              var index = errorarray.indexOf('tokenini');
              if(index != -1){
                errorarray.splice(index, 1);
              }

              checkerrorarray(1);
            }
          }
        });

      }else{

        var index = errorarray.indexOf('tokenini');
        errorarray.splice(index, 1);

        checkerrorarray(1);
      }


    });
    /////////////////////// check update servicecategory end  ////////////////////////////////////


  });

  ////////////////////////////// check error array start /////////////////////////////////////////

  function checkerrorarray(isupdate){

    if(errorarray.length > 0){
      if(isupdate == 0){

        $('#submit').attr('disabled', 'true');
      }else{
        $('#update_submit').attr('disabled', 'true');

      }
    }else{
      if(isupdate == 0){
        $('#submit').removeAttr('disabled');
      }else{
        $('#update_submit').removeAttr('disabled');

      }
    }

  }

  ////////////////////////////// check error array end  /////////////////////////////////////////



  ////////////////////////////////////// Add slot btn start ////////////////////////////////
  function addslotbtn(verify){
    if(verify == 1){  
      slotcount++;
      commoncount = slotcount;
      slotname = 'slotname';
      $('#slotaddcount').val(commoncount);
    }else{
      slotcountupdate++;
      commoncount = slotcountupdate;
      slotname = 'slotnameupdate';
      $('#slotaddcountupdate').val(commoncount);
    }

    var row = '<div class="col-md-12 col-sm-12 col-lg-12" id="slotrow'+commoncount+'">'+
    '<div class="row">'+
    '<div class="col-md-8 col-sm-8 col-lg-8">'+
    '<div class="form-group">'+
    '<label>Slot Name</label>'+
    '<input type="text" class="form-control text-capitalize" name="'+slotname+commoncount+'" placeholder="Enter Slot Name" id="slotname'+commoncount+'">'+
    '</div>'+
    '</div>'+
    '<div class="col-md-4 col-sm-4 col-lg-4">'+
    '<div class="form-group">'+
    '<a onclick="removeslot('+commoncount+')" class="btn btn_add removebtn"><i class="fa fa-trash"></i></a>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</div>';
    if(verify == 1){ 
      $('#slotaddarea').append(row);
    }else{
      $('#slotaddareaupdate').append(row);

    }
  }
  ////////////////////////////////////// Add slot btn end //////////////////////////////////

  function update(id){

    var servicecategoryname = $('#servicecategoryname'+id).val();
    var servicecategoryid = $('#servicecategoryid'+id).val();
    var categoryareaupdate = $('#categoryareaupdate'+id).val();
    var categorybranch = $('#categorybranch'+id).val();
    var categorytoken = $('#categorytoken'+id).val();
    var categorydependent = $('#categorydependent'+id).val();
    var urlappend = url+'/servicecategory/updateservicecategory/'+servicecategoryid;

    $.ajax({
      type : 'POST',
      url : url+'/servicecategory/getservicecategoryslot',
      data : {id : servicecategoryid, _token : token},
      success : function(data){
        slotcountupdate = data[0];
        $('#slotaddcountupdate').val(data[0]);
        $('#slotaddareaupdate').empty();
        $('#slotaddareaupdate').append(data[1]);
      }
    });


    $('#modal-edit #servicecatrgoryname').val(servicecategoryid);
    $('#modal-edit #servicecatrgorynameupdate').val(servicecategoryname);
    $('#modal-edit #editservicecategoryid').val(servicecategoryname);
    $('#modal-edit #categoryareaupdate').val(categoryareaupdate);
    $('#modal-edit #tokeniniupdate').val(categorytoken);
    if(categorydependent == 1){

      $('#modal-edit #dependentupdate').prop('checked', 'checked');

    }
    $('#modal-edit #branchupdate').val(categorybranch).trigger('change');
    $('#modal-edit #service_form_edit').attr('action', urlappend);


    $('#modal-edit').modal('show');

  }

  function removeslot(count){

    $('#slotrow'+count).remove();

  }

  ////// deactive slot start //////////////////////

  function deactiveslot(slotid){

    $.ajax({
      type : 'POST',
      url : url+'/servicecategory/deactiveslot',
      data : { slotid:slotid, _token : token},
      success : function(data){
        if(data == 200){

          window.location.href='';
        }else{
          toastr.error("Something wrong occure ");
        }
      },
      error : function(err){
        toastr.error("Something wrong occure ");
      }
    });

  }

  ////// deactive slot End //////////////////////

  ////// active slot start //////////////////////

  function activeslot(slotid){

    $.ajax({
      type : 'POST',
      url : url+'/servicecategory/activeslot',
      data : { slotid:slotid, _token : token},
      success : function(data){
        if(data == 200){

          window.location.href='';
        }else{
          toastr.error("Something wrong occure ");
        }
      },
      error : function(err){
        toastr.error("Something wrong occure ");
      }
    });

  }

  ////// active slot end //////////////////////
