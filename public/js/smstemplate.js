var token = $('input[name="_token"]').val();
var url = $('#url').val();

$('#datatable_table_template').DataTable({
  processing: true,
  serverSide: true,
  order : [ 0, 'desc' ],
  ajax: {
    url : url+'/sms/getsmstemplate',
  },
  columns: [
    {data: 'DT_RowIndex', name: 'DT_RowIndex'},
    {data: 'templatename', name: 'templatename',  orderable: true, searchable: true},
    {data: 'template', name: 'template',  orderable: true, searchable: true},
    {data: 'status', name: 'status', orderable: true, searchable: true},
    {data: 'action', name: 'action', orderable: true, searchable: true},
  ]
});

///// add words in template start /////////////

function addwordintemplate(word){

  var template = $('#template').val();
  var combination = template +' '+word;
  if(combination.length >= 255){
    alert('Template size is 255');
    return;
  }else{  

    template = template +' '+word;
    $('#template').val(template);

    countlength();
  }

}


///// add words in template end /////////////

$('#template').on('input', function(){
  countlength();
});

/////////// countcharacter start //////////////

function countlength(){

  let template = $('#template').val();

  var length = template.length;

  if(length > 255){
    alert('Template size is motre than 255');
    return false;
  }else{
    $('#usedword').text(length);
  }
}

$('#template').on('input', function(){


});


/////////// countcharacter end  /////////////

////////// Check Templatename start ////////////
  
$('#templatename').on('input', function(){

  var templatename = $(this).val();

  $.ajax({
    type : 'POST',
    url : url+'/sms/checktemplatename',
    data : {templatename:templatename, _token:token},
    success : function(data){
      if(data == 200){
        $('#templatenameerr').hide();
        $('#submit_btn').removeAttr('disabled');
      }else{
        $('#templatenameerr').show();
        $('#submit_btn').attr('disabled', 'true');
      }
    },
    error : function(err){
      toast.error('Something wrong occure');
    }
  });




});



////////// Check Templatename End  ////////////

////////// Check Templatename edit start ////////////
  
$('#templatenameedit').on('input', function(){

  var templatename = $(this).val();
  var editid = $('#editid').val();

  $.ajax({
    type : 'POST',
    url : url+'/sms/checktemplatename',
    data : {templatename:templatename, editid:editid,  _token:token},
    success : function(data){
      if(data == 200){
        $('#templatenameerr').hide();
        $('#submit_btn').removeAttr('disabled');
      }else{
        $('#templatenameerr').show();
        $('#submit_btn').attr('disabled', 'true');
      }
    },
    error : function(err){
      toast.error('Something wrong occure');
    }
  });




});



////////// Check Templatename edit End  ////////////
