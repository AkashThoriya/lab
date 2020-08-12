var url = $('#url').val();
var token = $('input[name="_token"]').val();

  $(document).ready(function(){

    $('#submitinert').click(function(){
      $('#service_form_insert')[0].reset;
    });

    $('#closeinert').click(function(){
      $('#service_form_insert')[0].reset;
    });

    $('#close_update').click(function(){
      $('#service_form_edit')[0].reset;
    });

    $('#submitupdate').click(function(){
      $('#service_form_edit')[0].reset;
    });

     $('#close').click(function(){
      $('#service_form')[0].reset;
      $('#service_form_edit')[0].reset;
    });

    $('#close_update').click(function(){
      $('#mo').removeAttr('checked');
      $('#tu').removeAttr('checked');
      $('#we').removeAttr('checked');
      $('#th').removeAttr('checked');
      $('#fr').removeAttr('checked');
      $('#sa').removeAttr('checked');
      $('#su').removeAttr('checked');
      $('#service_form_edit')[0].reset;
    });

    $('#copyprice').click(function(){
      var mainmsp = $('#mspinsert1').val();
      var mainmrp = $('#mrpinsert1').val();
      var branchcountinsert = $('#branchcountinsert').val();

      console.log(mainmsp, mainmrp, branchcountinsert);

      if(mainmsp != NaN || mainmrp != NaN){

        for(var k = 1; k <= Number(branchcountinsert); k++){

          $('#mspinsert'+k).val(Number(mainmsp));
          $('#mrpinsert'+k).val(Number(mainmrp));


        }

      }



    });

     $('#copypriceupdate').click(function(){
      var mainmsp = $('#mspupdate1').val();
      var mainmrp = $('#mrpupdate1').val();
      var branchcountinsert = $('#branchcountinsert').val();

      console.log(mainmsp, mainmrp, branchcountinsert);

      if(mainmsp != NaN || mainmrp != NaN){

        for(var k = 1; k <= Number(branchcountinsert); k++){

          $('#mspupdate'+k).val(Number(mainmsp));
          $('#mrpupdate'+k).val(Number(mainmrp));


        }

      }



    });

    $('#servicename').on('input', function(){

      var currentservicename = $(this).val();
      $('#serviceexistmsg').hide();

      $.ajax({
        type : 'POST',
        url : url+'/service/checkserviceexist',
        data : { currentservicename:currentservicename, _token: token },
        success : function(res){
          if(res == 200){
            $('#submitinsert').removeAttr('disabled');
            $('#serviceexistmsg').hide();
          }else{
            $('#serviceexistmsg').show();
            $('#submitinsert').attr('disabled', 'true');
          }
        }

      });


    });
   

  });

  /*function update(id){

    var currentserviceid = $('#serviceid'+id).val();
    var urlappend = url+'/service/updateservice/'+currentserviceid;
    var servicename = $('#servicename'+id).val();
    var mrp = $('#mrp'+id).val();
    var msp = $('#msp'+id).val();
    var minute = $('#minute'+id).val();
    var serviceid = $('#serviceid'+id).val();
    var from = $('#from'+id).val();
    var to = $('#to'+id).val();
    var servicecategoryid = $('#servicecatid'+id).val();
    var branchpricecount = 1; 


    $('#modal-edit #service').val(servicename);
    $('#modal-edit #servicecategory_edit').val(servicecategoryid).trigger("change");
    //$('#modal-edit #servicecategoryid').find('[option]').attr('checked', 'true');
    $('#modal-edit #mrp').val(mrp);
    $('#modal-edit #msp').val(msp);
    $('#modal-edit #minute').val(minute);
    $('#modal-edit #editid').val(serviceid);
    $('#modal-edit #from').val(from);
    $('#modal-edit #to').val(to);
    $('#modal-edit #service_form_edit').attr('action', urlappend);

    for(var i = 1; i <= branchpricecount; i++){

      let currentmsp = $('#msphidden'+i).val();
      let currentmrp = $('#mrphidden'+i).val();
      let brancpriceidhidhidden = $('#brancpriceidhidhidden'+i).val();

      console.log(brancpriceidhidhidden);

      $('#mspupdate'+i).val(currentmsp);
      $('#mrpupdate'+i).val(currentmrp);
      $('#servicebranchpriceupdate'+i).val(brancpriceidhidhidden);

    }


    $('#modal-edit').modal('show');

  }
*/
 

