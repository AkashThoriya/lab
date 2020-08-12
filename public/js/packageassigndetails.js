
var packagedetails=
'<div class="row">'+
  '<div class="col-lg-6">'+
    '<div class="form-group">'+
      '<label>Name</label>'+
      '<input type="text" name="firstname" id="firstname" class="form-control" placeholder="First Name" value='+firstname+" "+lastname+'  class="span11" readonly="" />'+
    '</div>'+
  '</div>'+  

  '<div class="col-lg-6">'+
    '<div class="form-group">'+
        '<label>Mobile No.</label>'+
        '<input type="text" name="mobileno" id="mobileno" class="form-control" placeholder="Mobile No." value='+mobileno+'  class="span11" readonly="" />'+
    '</div>'+
  '</div>'+
 
'</div>'+

'<div class="row">'+

  '<div class="col-lg-6">'+
    '<div class="form-group">'+
        '<label>Purchase Date</label>'+
        '<input placeholder="Joining date" onchange="changedate('+validdays+','+validity+')" type="date" onkeypress="return false" id="startingdate"  value="'+currentdate+'"class="form-control" name="Join_date" class="span11">'+
    '</div>'+
  '</div>'+

  '<div class="col-lg-6">'+
    '<div class="form-group">'+
          '<label>Expiry Date</label>'+
          '<input placeholder="Finishing date"  id="finishdate" class="form-control" name="Expire_date" class="span11" readonly="" value="'+finishdate+'">'+
    '</div>'+
  '</div>'+

'</div>'+

'<div class="row">'+
  
  '<div class="col-lg-6">'+
    '<div class="form-group">'+
          '<label>Package</label>'+
          '<input type="text" name="packageselected" value="'+packagename+'" id="packageselected" class="form-control" placeholder="Package Selected" class="span11" readonly="" />'+
      ' </div>'+
  '</div>'+

  '<div class="col-lg-6">'+
     '<div class="form-group">'+
          '<label>Base Amount</label>'+
          '<input type="hidden" name="BasePrice_hidden" id="BasePrice_hidden" />'+
          '<input type="text" name="BaseAmount" value="'+baseprice+'" id="BasePrice" class="form-control number" placeholder="Base Amount"   class="span11" readonly="" />'+
      '</div>'+
  '</div>'+

'</div>'+

'<div class="row">'+

  '<div class="col-lg-6">'+
    '<div class="form-group">'+
      '<label>Discount</label>'+
          '<input type="text"  name="Discount" autocomplete="off" id="Discount1" class="form-control number" onkeyup="calculate();" placeholder="Discount"  value="0" class="span11" />'+
      '</div>'+
  '</div>'+
  
  '<div class="col-lg-6">'+
     '<div class="form-group">'+
          '<label>Final Amount</label>'+
          '<input type="text" name="ActualAmount" value="'+actualprice+'" id="FinalAmount"class="form-control" placeholder="Final Amount" class="span11" readonly="" />'+
      '</div>'+
  '</div>'+


'</div>'+

'<div class="row">'+

   '<div class="col-lg-6">'+
      '<div class="form-group">'+
          '<label>Total</label>'+
          '<input type="hidden" name="total_hidden" id="total_hidden">'+
          '<input type="text" maxlength="10" name="total_amount" id="total_amount" class="form-control number" placeholder="Total"  value="'+actualprice+'" class="span11" readonly="" />'+
      '</div>'+
  '</div>'+

'</div>'+

'<div class="row">'+
  '<div class="col-lg-12">'+
    '<center>'+
    '<div class="form-group">'+
      '<button type="submit"  id="save" value="button" name="order_btn"  class="btn btn_add">Next</button>'+
         '<button type="button"  id="otp_button" value="button" data-backdrop="static" data-keyboard="false" name="order_btn" data-toggle="modal" data-target="#otpmodel"  class="btn margin bg-pink" style="padding:5px; color:#ffffff; display: none;">Next</button>'+
         '<a disabled class="btn bg-primary" id="btnnew" style="display: none;">Submitting</a>'+
         '<a href="" class="btn btn-default" style="margin-left : 10px;">Cancel</a>'+
    '</div>'+
    '</center>'+
  '</div>'+
'</div>';
  
$("#packageassignbasic").after(packagedetails);

 $('#Discount1').keyup(function(){
   let discount = $(this).val();
     calculate();
   
 });
 function calculate(){

   let baseprice = Number($('#BasePrice').val());
   let finalamount = Number($('#FinalAmount').val());
  
   //let rs = $('#rs').is(':checked');
   let rs = true;
   let percentage = $('#percentage').is(':checked');
   let discount = Number($('#Discount1').val());
  

     //if rs checked
     if(rs == true){
       if(discount > 0){
       
         if(Number(discount) <= Number(baseprice)){
           let calculate_discount = finalamount - discount;
           $('#total_amount').val(Math.round(Number(calculate_discount)));
 
         } else {
           $('#Discount1').val('');
           $('#total_amount').val(finalamount);
           alert('Amount shoud not be greater than Base Amount');
         }// end of Number(discount) < Number(baseprice)  
       }// end of discount > 0
       else{
         discount = 0;
         $('#total_amount').val(Math.round(finalamount));
       }// end of else od discount > 0
     }
     //if rs checked end
     
      // if percentage start
     if(percentage == true){
       if(Number(discount) > 100){
 
         $('#Discount1').val('');
      
         $('#total_amount').val(finalamount);
         alert('Discount should not be greater than 100');
       } else {
         let finalamount_discount_cal=Number(finalamount * Number((discount/100)))
         let percentage_discount = finalamount - finalamount_discount_cal;
       
         $('#total_amount').val(Math.round(percentage_discount));
        }//end discount > 100  
     }
     // if percentage end
   }
 

   function changedate(validdays, validity) {
       console.log(validdays, validity);
       var x = $("#startingdate").val();

       var date = new Date(x);

       var days = validdays;
       date.setDate(date.getDate(x) + parseInt(days));

       var month = date.getUTCMonth() + 1; //months from 1-12
       var day = date.getUTCDate();
       var year = date.getUTCFullYear();
       if (day.toString().length <= 1) {
           day = "0" + day;
       }
       if (month.toString().length <= 1) {
           month = "0" + month;
       }
       newdate = day + "-" + month + "-" + year;
       
       $("#finishdate").val("");
       $("#finishdate").val(newdate);
   }
   