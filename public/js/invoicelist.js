var url = $('#url').val();
var token = $('input[name="_token"]').val();

$(document).ready(function(){
    calldatabale();

    $('#submit').click(function(){
      calldatabale(); 

    });

    $('#clear').click(function(){
      $('#client').val('').trigger('change');
      $('#mobileno').val('').trigger('change');
      $('#from').val('');
      $('#to').val('');
      $('#keyword').val('');
      $('#status').val('');
      calldatabale(); 
    });


  });

  /// common function for datatable start
  function calldatabale(){
    
    $("#datatable_table").dataTable().fnDestroy();

    $('#datatable_table').DataTable({
      processing: true,
      serverSide: true,
      order : [ 0, 'desc' ],
      ajax: {
        url : url+'/assignpackage/getinvoicelist',
        data : function(d){
          d.client = $('#client').val();
          d.mobileno = $('#mobileno').val();
          d.from = $('#from').val();
          d.to = $('#to').val();
          d.status = $('#status').val();
        }
      },
      columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex'},
            {data: 'name', name: 'name',  orderable: true, searchable: true},
            {data: 'mobileno', name: 'mobileno',  orderable: true, searchable: true},
            {data: 'billno', name: 'billno', orderable: true, searchable: true},
            {data: 'amount', name: 'amount', orderable: true, searchable: true},
            {data: 'status', name: 'status', orderable: true, searchable: true},
            {data: 'action', name: 'action', orderable: true, searchable: true},
        ]
    });
  }

  function sendsms(userid, invoiceno, invoicetype){

    $.ajax({

      type : 'POST',
      url : url+'/assignpackage/getmessagefrominvoicelist',
      data : {userid : userid, invoiceno : invoiceno, invoicetype:invoicetype, _token : token},
      success : function(res){
        console.log(res);
        try{
          if(res.length > 0){
            $('#clientfullname').val(res[0]);
            $('#contactno').val(res[1]);
            $('#finalsms').val(res[2]);
            $('#clientid').val(res[3]);

            $('#modal-message').modal('show');

          }else{
            toastr.error('Something wrong occure');
            return;
          }
        }catch(err){
          toastr.error('Something wrong occure');
          return;

        }
      },
      error : function(err){
        toastr.error('Something wrong occure');
      }
    });

  }

$('#send_message').click(function(e){
      e.preventDefault();
      var mobileno = $('#contactno').val();
      var finalsms = $('#finalsms').val();
      var clientid = $('#clientid').val();

      $('#send_message').attr('disabled', 'true');
      $('#send_message').text('Sending...');

      $.ajax({
        type: 'POST',
        url : url+'/assignpackage/sendsmsfrominvoice',
        data : {mobileno:mobileno, finalsms:finalsms, clientid:clientid, _token : token},
        success : function(data){
          if(data == 200){
            toastr.success('Message send successfully');
            $('#send_message').removeAttr('disabled');
            $('#send_message').text('Send Message');
            $('#modal-message').modal('hide');
          }else if(data == 201){
            toastr.warning('SMS is Off');
            $('#send_message').removeAttr('disabled');
            $('#send_message').text('Send Message');
            $('#modal-message').modal('hide');
          }else if(data == 202){
            toastr.info('SMS Template is deactive');
            $('#send_message').removeAttr('disabled');
            $('#send_message').text('Send Message');
            $('#modal-message').modal('hide');
          }else if(data == 205){
            toastr.error('There is something wrong while sending sms');
            $('#send_message').removeAttr('disabled');
            $('#send_message').text('Send Message');
            $('#modal-message').modal('hide');
          }
        }
      });
});


 //// confirmcancelpayment start

function confirmcancelpayment(invoiceno, userid){

  $('#modal-cancelpayment #cancelinvoiceno').val(invoiceno);
 
  $('#modal-cancelpayment #canceluserid').val(userid);

  $('#modal-cancelpayment').modal('show');

}

$('#cancelconfirm').click(function(){
  console.log('dfgdfgfd');
  let invoiceno = $('#modal-cancelpayment #cancelinvoiceno').val();
  console.log('invoicenos'+invoiceno);

  let userid = $('#modal-cancelpayment #canceluserid').val();
  console.log('userid'+userid);

  if(invoiceno  && userid){
    console.log('sdfdsfsdf');
    $.ajax({
      type : 'POST',
      url : url+'/assignpackage/cancelpayment',
      data : {invoiceno:invoiceno, userid:userid, _token : token },
      success : function(res){
        if(res == 201){
          $('#modal-cancelpayment').modal('hide');
          toastr.error('Payment can not be cancel as token is generated');
          return;
        }else if(res == 200){
          $('#modal-cancelpayment').modal('hide');
          toastr.success('Payment is cancel Succesfully!!');
          calldatabale();
        }
      },
    });

  }

});

 //// confirmcancelpayment end  


//// activepayment start

  function confirmactivepayment(invoiceno, userid){

    $('#modal-activepayment #activeinvoiceno').val(invoiceno);
   
    $('#modal-activepayment #activeuserid').val(userid);

    $('#modal-activepayment').modal('show');

  }

  $('#activeconfirm').click(function(){

    let invoiceno = $('#modal-activepayment #activeinvoiceno').val();
    
    let userid = $('#modal-activepayment #activeuserid').val();

    if(invoiceno && userid){

      $.ajax({
        type : 'POST',
        url : url+'/assignpackage/activepayment',
        data : {invoiceno:invoiceno, userid:userid, _token : token },
        success : function(res){
          if(res == 200){
            $('#modal-activepayment').modal('hide');
            toastr.success('Payment is active Succesfully!!');
            calldatabale();
          }
        },
      });

    }

  })

//// activepayment end 
