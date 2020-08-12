var url = $('#url').val();
var token = $('input[name="_token"]').val();

$(document).ready(function(){
    calldatabale();

    $('#submit').click(function(){
      calldatabale(); 

    });

    $('#clear').click(function(){
      $('#username').val('').trigger('change');
      $('#mobileno').val('').trigger('change');
      $('#from').val('');
      $('#to').val('');
      $('#keyword').val('');
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
        url : url+'/client/getclient',
        data : function(d){
          d.username = $('#username').val();
          d.mobileno = $('#mobileno').val();
          d.from = $('#from').val();
          d.to = $('#to').val();
          d.keyword = $('#keyword').val();
        }
      },
      columns: [
            {data: 'DT_RowIndex', name: 'DT_RowIndex'},
            {data: 'fullname', name: 'fullname',  orderable: true, searchable: true},
            {data: 'email', name: 'email',  orderable: true, searchable: true},
            {data: 'phoneno', name: 'phoneno', orderable: true, searchable: true},
            {data: 'status', name: 'status', orderable: true, searchable: true},
            {data: 'action', name: 'action', orderable: true, searchable: true},
        ]
    });
  }



  function turnoffdnd(clientid){

    $('#modal-default #clientid').val(clientid);
    $('#modal-default #dndmode').val(0);
    $('#modal-default #textupdate').text('DND Turn Off will send Sms and Email to Client. Are you sure to turn off DND?');

    $('#modal-default').modal('show');
  }

   function turnondnd(clientid){
    
    $('#modal-default #clientid').val(clientid);
    $('#modal-default #dndmode').val(1);
    $('#modal-default #textupdate').text('DND Turn on will not send any Sms and Email to Client. Are you sure to turn off DND?');

    $('#modal-default').modal('show');
  }