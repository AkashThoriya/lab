
	$('#service').select2();
	$('#client').select2();
	var packagedata = JSON.parse($('#packagedata').val());
	var serviceaddarray = [];
	var packagearray = [];
	var productarray = [];
	var paymenttypearray = [];
	var count = $('#length').val();
	var packagecount = $('#packagecount').val();
	var clickedaa = 0;
	var productcount = $('#packagecount').val();
	var disaplycount = $('#length').val();
	var paymentcount = $('#paymentcount').val();
	var advanceamountcount = 0;
	var useadvanceamountcount = 0;
	var clientpaymentcount = 0;
	var paymentcountdisplaycount = $('#paymentcount').val();
	let is_print = 0;
	var sumofpayment = 0;

	$(document).ready(function(){
		
		///// push id to array star  ///////

		$.each(packagedata,function(index, item) {

			////// Package start /////////
			if(item.package){
				packagearray.push(Number(item.package.packageid));
			}
			////// Package end /////////

			////// Service start /////////
			if(item.service){
				serviceaddarray.push(Number(item.service.serviceid));
			}
			////// Service end /////////

			////// Product start /////////
			if(item.product){
				productarray.push(Number(item.product.productid));
			}
			////// Product end /////////
		});

		///// push id to array end  ///////


	});




	$(document).on('keydown', '#selectdropdown .select2-search__field', function (e) {


		if(e.which === 13){

			addservicetotable();
		}

	});

	$('#advanceamountclosebtn').click(function(){
		$('#advanceamount').val('');
		$('#description').val('');
	});

	$(document).on('keydown', '#packagedropdown .select2-search__field', function (e) {


		if(e.which === 13){

			addservicetotable();
		}

	});


	$('#add_service').click(function(){
		addservicetotable();
	});

	$('#discount').on('input', function(){

		$('#paymenttable tbody').empty();
		paymentcount = 0;
		paymenttypearray = [];
		calculateprice();

	});

	$('#modal-service').on('shown.bs.modal', function() {
		$(this).find('[autofocus]').focus();
	});

	$('#submit').click(function(){


		var tbllength = $('#servicetable tbody tr').length;
		
		if(tbllength > 0){
			$('#addserviceform').submit();
			return true;
		}else{
			alert('Please add some Service');
			return false;
		}

	});

	$('.decimaldigit').on('keypress', function(event){
		return isNumber(event, this);
	});



	////////////////////////////////// Get Package detail start //////////////////////////////////////

	$('#add_package').click(function(){

		addpackagetotable();
		
	});

	function addpackagetotable(){

		let packagevalue = $('#packageselect').val();
		var startdate = $('#startdate').val();
		if(!startdate){
			startdate = new Date();
			startdate = startdate.getDate()+'-'+(startdate.getMonth()+1)+'-'+startdate.getFullYear();
		}

		if(packagevalue){

			let package = packagevalue.split(',');
			let packageid = Number(package[0]);
			let packagebaseprice = Number(package[1]);
			let packagename = package[2];
			let packagevaliddays = Number(package[3]);
			
			var checkpackageexist = packagearray.includes(Number(packageid));

			if(checkpackageexist == true){
				alert('Package is already added');
				return;
			}

			// calculate days start

			var startdateoperation = new Date(startdate);
			startdateoperation.setDate(startdateoperation.getDate() + parseInt(packagevaliddays));

			let dd = startdateoperation.getDate();
			let mm = startdateoperation.getMonth() + 1;
			let y = startdateoperation.getFullYear();

			if(dd < 10){
				dd = '0' + dd;
			}

			if(mm < 10){
				mm = '0' + mm;
			}

			let validdatedisplay = dd + '-'+ mm + '-'+ y;




			// calculate days end

			packagearray.push(Number(packageid));
			packagecount++;
			disaplycount++;
			count++;

			var row = '<tr id="servicerow'+count+'" class="rowcount">'+
						'<td>'+
							'<input type="hidden" name="packageid'+packagecount+'" id="packageid'+packagecount+'" value="'+packageid+'">'+
							'<input type="hidden" name="packageprice'+packagecount+'" id="packageprice'+packagecount+'" value="'+packagebaseprice+'">'+
							'<input type="hidden" name="packagename'+packagecount+'" id="packagename'+packagecount+'" value="'+packagename+'">'+
							'<input type="hidden" name="packagevaliddays'+packagecount+'" id="packagevaliddays'+packagecount+'" value="'+packagevaliddays+'">'+
							'<input type="hidden" name="packagestartdate'+packagecount+'" id="packagestartdate'+packagecount+'" value="'+startdate+'">'+
							'<span>'+disaplycount+'</span>'+
						'</td>'+
						'<td>Package</td>'+
						'<td>'+packagename+'</td>'+
						'<td>1</td>'+
						'<td><input type="text" class="form-control" value="'+validdatedisplay+'" readonly></td>'+
						'<td>'+packagebaseprice+'</td>'+
						'<td><a class="btn btn_add" onclick="remove('+count+', '+packageid+', 2)"><i class="fa fa-trash"></i></a></td>'
					  '</tr>';

			$('#servicetable tbody').append(row);

			var tbllength = $('#servicetable tbody tr').length;

			if(tbllength > 0){
				$('#servicediv').show();
			  	$('#checkout').show();
			  	$('#patmentrow').show();
			}

			$('#modal-service #service').val('').trigger('change');

			var row = $('#servicetable tbody tr.rowcount').length;
			$('#length').val(count);
			$('#packagecount').val(packagecount);
			$('#modal-package').modal('hide');

			$('#packageselect').val('').trigger('change');

			$('#modal-advance-amount').hide();

			calculateprice();




		}

	}


	////////////////////////////////// Get Package detail end //////////////////////////////////////

	//////////////////////////////////// Add product start /////////////////////////////////////////

	$('#add_product').click(function(){
		addproducttottable();
	});

	function addproducttottable(){

		let productselect = $('#productselect').val();
		if(productselect){

			let product  = productselect.split(',');
			let productid = Number(product[0]);
			let specialprice = Number(product[1]);
			let retailprice = Number(product[2]);
			let productname = product[3];

			var checkproductexist = productarray.includes(Number(productid));

			if(checkproductexist == true){
				alert('Product is already added');
				return;
			}

			productarray.push(Number(productid));
			productcount++;
			disaplycount++;
			count++;

			var row = '<tr id="servicerow'+count+'" class="rowcount">'+
						'<td>'+
							'<input type="hidden" name="productid'+productcount+'" id="productid'+productcount+'" value="'+productid+'">'+
							'<input type="hidden" name="productprice'+productcount+'" id="productprice'+productcount+'" value="'+retailprice+'">'+
							'<input type="hidden" name="productname'+productcount+'" id="productname'+productcount+'" value="'+productname+'">'+
							'<span>'+disaplycount+'</span>'+
						'</td>'+
						'<td>product</td>'+
						'<td>'+productname+'</td>'+
						'<td><input type="number" min="1" class="form-control" value="1" id="productqty'+productcount+'" name="productqty'+productcount+'" onchange="calculateprice('+productcount+')"></td>'+
						'<td>-</td>'+
						'<td id="productpriceqty'+productcount+'">'+retailprice+'</td>'+
						'<td><a class="btn btn_add" onclick="remove('+count+', '+productid+', 3)"><i class="fa fa-trash"></i></a></td>'
					  '</tr>';

			$('#servicetable tbody').append(row);

			var tbllength = $('#servicetable tbody tr').length;

			if(tbllength > 0){
				$('#servicediv').show();
			  	$('#checkout').show();
			  	$('#patmentrow').show();
			}

			$('#modal-product #productselect').val('').trigger('change');

			var row = $('#servicetable tbody tr.rowcount').length;
			$('#length').val(count);
			$('#packagecount').val(packagecount);
			$('#productcount').val(productcount);
			$('#modal-product').modal('hide');

			$('#packageselect').val('').trigger('change');

			$('#modal-advance-amount').hide();

			$('#modal-advance-amount').hide();

			calculateprice();




		}else{

		}
	}



	//////////////////////////////////// Add product end  /////////////////////////////////////////

	///////////////////////////////////// Add Advance Amount start //////////////////////////////

	$('#advanceamount').on('input', function(){

		let advanceamount = $(this).val();
		if(advanceamount){
			$('#add_advance_amount').removeAttr('disabled', 'true');
		}else{
			$('#add_advance_amount').attr('disabled', 'true');
		}
	});

	$('#add_advance_amount').click(function(){
		let amount = $('#advanceamount').val();
		if(amount){
			addadvanceamounttotable();
		}else{
			alert('Enter Amount');
		}
	});

	function addadvanceamounttotable(){

		var advanceamount = $('#advanceamount').val();
		var description = $('#description').val();
		$('#servicediv').show();

		if(advanceamountcount > 0){

			var addedamount = $('#advanceamounthidden').val();
			var addeddescription = $('#advanceamountdescription').val();

			advanceamount = Number(advanceamount) + Number(addedamount);
			description = description+' , '+addeddescription;

			$('#advanceamounthidden').val(advanceamount);
			$('#advanceamountdescription').val(description);
			$('#advanceamountdisplay').text(advanceamount);
			$('#advanceamountdescriptiondisplay').text(description);

			$('#advanceamount').val('');
			$('#description').val('');
			$('#modal-advanceamount').modal('hide');


			calculateprice();
			return;

		}

		advanceamountcount++;
		$('#addadvanceamountcount').val(advanceamountcount);
		disaplycount++;
		count++;


		var row = '<tr id="servicerow'+count+'" class="rowcount">'+
					'<input type="hidden" name="advanceamount" id="advanceamounthidden" value="'+advanceamount+'">'+
					'<input type="hidden" name="advanceamountdescription" id="advanceamountdescription" value="'+description+'">'+
					'<td>'+disaplycount+'</td>'+
					'<td>Advance Amount</td>'+
					'<td id="advanceamountdescriptiondisplay">'+description+'</td>'+
					'<td>1</td>'+
					'<td></td>'+
					'<td id="advanceamountdisplay">'+advanceamount+'</td>'+
					'<td><a class="btn btn_add" onclick="remove('+count+', '+advanceamountcount+', 4)"><i class="fa fa-trash"></i></a></td>'+
				  '</tr>';

		$('#servicetable tbody').append(row);

		$('#addadvanceamount').val(advanceamount);
		$('#advanceamount').val('');
		$('#description').val('');
		$('#modal-advanceamount').modal('hide');

		$('.triggerblock').hide();

		var tbllength = $('#servicetable tbody tr').length;

		if(tbllength > 0){
			$('#servicediv').show();
			$('#checkout').show();
			$('#patmentrow').show();
		}

		calculateprice();


	}




	///////////////////////////////////// Add Advance Amount end  //////////////////////////////

	function remove(rowcount, serviceid, type){

		$('#servicerow'+rowcount).remove();
		var array;

		if(type == 1){
			array = serviceaddarray;
		}else if(type == 2){
			array = packagearray;

		}else{
			array = productarray;

		}

		paymenttypearray = [];
		paymentcount = 0;
		$('#paymenttable tbody').empty();
		//paymenttypearray.splice(0, paymenttypearray.length);

		var a = array.indexOf(serviceid);

		array.splice(a,1);
		

		disaplycount--;
		

		var row = $('#servicetable tbody tr').length;

		$('#servicetable tbody tr td span').text(function(row){
			return row + 1;
		});

		var tbllength = $('#servicetable tbody tr').length;
					
		if(tbllength <= 0){
			$('#servicediv').hide();
			$('#checkout').hide();
			$('#patmentrow').hide();
		}

		var tbllengthafterdelete = $('#servicetable tbody tr').length;
		if(tbllengthafterdelete == 0){
			$('.triggerblock').show();
		}

		if(type == 4){
			advanceamountcount--;
		}

		calculateprice();



	}

	function addservicetotable(){

		var service = $('#modal-service #service').val();

				if(!service){
					alert('Please select Service');
					return;
				}else{

					

					var currentservice = service.split(",");
					if(currentservice.length > 0){
						var serviceid = currentservice[0];
						var serviceprice = $.trim(currentservice[1]);
						var serviceminute = currentservice[2];
						var servicename = currentservice[3];
						var ckecexist = serviceaddarray.includes(Number(serviceid));

						if(ckecexist == true){
							alert('Service is already added');
							return;
						}



						serviceaddarray.push(Number(serviceid));

						count++;
						disaplycount++;

						var row = '<tr id="servicerow'+count+'" class="rowcount">'+
									'<td>'+
										'<input type="hidden" name="serviceid'+count+'" id="serviceid'+count+'" value="'+serviceid+'">'+
										'<input type="hidden"   value="'+serviceprice+'">'+
										'<input type="hidden" name="serviceminute'+count+'" id="serviceminute'+count+'" value="'+serviceminute+'">'+
										'<input type="hidden" name="servicename'+count+'" id="servicename'+count+'" value="'+servicename+'">'+
										'<span>'+disaplycount+'</span>'+
									'</td>'+
									'<td>Service</td>'+
									'<td>'+servicename+'</td>'+
									'<td><input type="number" min="1" class="form-control" value="1" id="serviceqty'+count+'" name="serviceqty'+count+'" onchange="calculateprice('+count+')"></td>'+
									'<td><input type="number" min="0" name="serviceprice'+count+'" value="'+serviceprice+'" id="serviceprice'+count+'" class="form-control" onchange="calculateprice()" readonly><a onclick="enableditservice('+count+')"><i class="fa fa-edit"></i></a><a class="ml-3" onclick="disenableeditservice('+count+')"><i class="fa fa-check"></i></a></td>'+
									'<td id="servicepriceqty'+count+'">'+serviceprice+'</td>'+
									'<td><a class="btn btn_add" onclick="remove('+count+', '+serviceid+', 1)"><i class="fa fa-trash"></i></a></td>'
								  '</tr>';


						$('#servicetable tbody').append(row);

						var tbllength = $('#servicetable tbody tr').length;
					
						if(tbllength > 0){
							$('#servicediv').show();
							$('#checkout').show();
							$('#patmentrow').show();
						}

						$('#modal-service #service').val('').trigger('change');

						var row = $('#servicetable tbody tr.rowcount').length;
						$('#length').val(count);
						$('#modal-service').modal('hide');

						$('#modal-advance-amount').hide();

						calculateprice();

					}else{
						alert('There is something wrong');
						return;
					}
				}

	}


	function enableditservice(count){

		$('#serviceprice'+count).removeAttr('readonly');
	}

	function disenableeditservice(count){

		$('#serviceprice'+count).attr('readonly', 'true');
	}

	function calculateprice(id){

		var i = 1;
		var total = 0;

		var tax = Number($('#tax').val());
		var discount = Number($('#discount').val());

		///////////////////////// Service start //////////////////////////////////////
		for(i = 1; i <= count; i++){

			var currentprice  = $('#serviceprice'+i).val();
			var currentqty  = $('#serviceqty'+i).val();
			$('#serviceprice'+i).attr('value', Number(currentprice));
			

			if(currentprice != NaN && currentprice >= 0){
				totalqtypriceofservice = Number(currentprice) * Number(currentqty);
				$('#servicepriceqty'+i).text(totalqtypriceofservice.toFixed(2));
				total = total + Number(totalqtypriceofservice);
			}
		}
		///////////////////////// Service end //////////////////////////////////////

		///////////////////////// package start //////////////////////////////////////
		for(j = 1; j <= packagecount; j++){

			var currentpackageprice  = $('#packageprice'+j).val();

			if(currentpackageprice != NaN && currentpackageprice >= 0){
				total = total + Number(currentpackageprice);
			}
		}
		///////////////////////// package end //////////////////////////////////////

		///////////////////////// product start //////////////////////////////////////
		for(k = 1; k <= productcount; k++){

			var currentproductprice  = $('#productprice'+k).val();
			var currentproductqty  = $('#productqty'+k).val();

			if(currentproductprice != NaN && currentproductqty > 0){
				totalqtypriceofproduct = Number(currentproductprice) * Number(currentproductqty);
				$('#productpriceqty'+k).text(totalqtypriceofproduct.toFixed(2));
				total = total + Number(totalqtypriceofproduct);
			}
		}
		///////////////////////// product end //////////////////////////////////////

		///////////////////////// Advance Amount start //////////////////////////////////////
		

			var currentadvanceamount  = $('#advanceamounthidden').val();

			if(currentadvanceamount != NaN && currentadvanceamount > 0){
				total = total + Number(currentadvanceamount);
			}
	
		///////////////////////// Advance Amount end //////////////////////////////////////
	

		$('#subtotal').text(total.toFixed(2));
		$('#subtotalhidden').val(total.toFixed(2));

		var calculate_tax = (calculate_discount/100) * tax; 
		var finalamount = calculate_discount + calculate_tax;

		if(discount > 0){

			if(discount > total){
				alert('Please enter valid discount');
				$('#discount').val(0);
				calculateprice();
			}else{

				var calculate_discount = total - discount;
				var calculate_tax = Number((calculate_discount/100) * tax); 
				var finalamount = calculate_discount + calculate_tax;

				$('#taxamount').text(calculate_tax.toFixed(2));
				$('#taxamounthidden').val(calculate_tax.toFixed(2));

				$('#finalamount').text(finalamount.toFixed(2));
				$('#finalamounthidden').val(finalamount.toFixed(2));
				$('#checkoutamount').val(finalamount.toFixed(2));
				$('#finalpaymentamounthidden').val(finalamount.toFixed(2));

				calculateamount();
			}

		}else{

			var calculate_tax = (total/100) * tax; 
			var finalamount = total + calculate_tax;

			$('#taxamount').text(calculate_tax.toFixed(2));
			$('#taxamounthidden').val(calculate_tax.toFixed(2));

			$('#finalamount').text(finalamount.toFixed(2));
			$('#finalamounthidden').val(finalamount.toFixed(2));
			$('#checkoutamount').val(finalamount.toFixed(2));
			$('#finalpaymentamounthidden').val(finalamount.toFixed(2));

			calculateamount();

		}

	}

	function cal() {

		let sum = 0;
		let total_amount = Number($('#finalamounthidden').val());
		$('.price').each(function() {
			sum += Number($(this).val());
			$('#total_paid').text(sum);

		});
		
		if(Number(sum) == Number(total_amount)){
			$('#save').removeAttr('disabled');
			$('#total_paid').css('color', 'green');
		} else {
			$('#save').attr('disabled', 'true');
			$('#total_paid').css('color', 'red');
		}
	
	}

	function checkpayment(type){

		var paymenttype = $('#paymentype'+type).val();
		var paymenttitle = $('#paymentypetitle'+type).val();
		var checkoutamount = $('#checkoutamount').val();
		var finalamounthidden = $('#finalamounthidden').val();
		var finalpaymentamounthidden = $('#finalpaymentamounthidden').val();

		if(Number(checkoutamount) > Number(finalpaymentamounthidden)){
			alert('Please enter valid amount');
			$('#checkoutamount').val(finalpaymentamounthidden);
			return;
		}

		var ifpaymenttypeexist = paymenttypearray.includes(Number(paymenttype));
		if(Number(checkoutamount) > 0){
			if(ifpaymenttypeexist){

				/*var value = $('.'+paymenttitle).data('count');
				var currentprice = $('#paymentamount'+value).val();
				if(currentprice != NaN && Number(currentprice) > 0){
					var totalprice = Number(checkoutamount) + Number(currentprice);
					$('#paymentamountdisplay'+value).text(Number(totalprice));
					$('#paymentamount'+value).val(totalprice);

					calculateremainingamount();
				}*/

			}else{

				paymentcount++;
				paymentcountdisplaycount++;
				paymenttypearray.push(Number(paymenttype));

				if(type == 5){
					if(clickedaa == 0){
						clickedaa++
						var advanceamount = $('#advanceamountcheckout').val();
						var checkoutamount = $('#checkoutamount').val();						

						var remainingaa = Math.abs(Number(checkoutamount) - Number(advanceamount));
						useadvanceamountcount++;
						$('#advanceamountcheckout').val(remainingaa); 
						$('#checkoutamount').val(remainingaa); 
						$('#useadvanceamountcount').val(useadvanceamountcount);
					} 
				}

				var row = '<tr id="paymentrow'+paymentcount+'" class="paymentrowcount" data-count="'+paymentcount+'">'+
							'<input type="hidden" name="cureentpaymentcount" class="cureentpaymentcount" value="'+paymentcount+'">'+
							'<td>'+
								'<input type="hidden" name="paymenttypeid'+paymentcount+'" id="paymenttypeid'+paymentcount+'" class="paymenttypeid" value="'+paymenttype+'">'+
								'<input type="hidden" name="paymenttitle'+paymentcount+'" id="paymenttitle'+paymentcount+'" value="'+paymenttitle+'" class="'+paymenttitle+'" data-count="'+paymentcount+'" >'+
								'<input type="hidden" name="paymentamount'+paymentcount+'" id="paymentamount'+paymentcount+'" value="'+checkoutamount+'" class="paymentamount">'+
								'<span>'+paymentcountdisplaycount+'</span>'+
							'</td>'+
							'<td>'+paymenttitle+'</td>'+
							'<td id="paymentamountdisplay'+paymentcount+'">'+checkoutamount+'</td>'+
							'<td><input type="text" placeholder="Enter Remarks" maxlength="255" name="paymentremark'+paymentcount+'" class="form-control"></td>'+
							'<td><a class="btn btn_add" onclick="removepayment('+paymentcount+', '+paymenttype+')"><i class="fa fa-trash"></i></a></td>'
						  '</tr>';
				console.log(paymentcount);
				$('#paymenttable tbody').append(row);
				$('#paymentcount').val(paymentcount);

				calculateremainingamount(type);
			}
		}


	}

	

	function removepayment(paymentrow, paymenttype){


		var price = $('#paymentamount'+paymentrow).val();
		
		if(paymenttype == 5){

			var paidamount = $('#paymentamount'+paymentrow).val();
			
			var advanceamount  = $('#advanceamount').val();
			
			var calculateaa = Number(advanceamount) + Number(paidamount);
			console.log('calculateaa'+calculateaa);
			$('#advanceamount').val(calculateaa);


		}

		var finalpaymentamounthidden = $('#finalpaymentamounthidden').val();

		if(finalpaymentamounthidden != NaN){
			var cal = Number(finalpaymentamounthidden) + Number(price);
			$('#finalpaymentamounthidden').val(cal);
		}

		var index = paymenttypearray.indexOf(Number(paymenttype));

		paymenttypearray.splice(index, 1);

		$('#paymentrow'+paymentrow).remove();

		paymentcountdisplaycount--;

		var row = $('#paymenttable tbody tr').length;

		$('#paymenttable tbody tr td span').text(function(row){
			return row + 1;
		});


		calculateremovedamount();
	}

	function calculateremainingamount(type){

		
		var finalpaymentamounthidden = Number($('#finalpaymentamounthidden').val());

		var remainingamountcalculate = 0;

		for(p = 1; p <= paymentcount; p++){

			var currentamount = $('#paymentamount'+p).val();
		

			if(currentamount != NaN){
				remainingamountcalculate = Number(finalpaymentamounthidden) - Number(currentamount);
				$('#checkoutamount').val(remainingamountcalculate.toFixed(2));
				$('#finalpaymentamounthidden').val(remainingamountcalculate.toFixed(2));
			}
		}

		checkbtn();

	}

	function calculateremovedamount(){

		var finalamounthidden = $('#finalamounthidden').val();
		var remainingamountcalculate = 0;
		for(p = 1; p <= paymentcount; p++){

			var currentamount = $('#paymentamount'+p).val();
				

			if(currentamount != NaN && Number(currentamount) > 0 && currentamount != undefined){
				remainingamountcalculate = remainingamountcalculate + Number(currentamount);
			}

		}

		if(remainingamountcalculate != NaN){
			var final = Number(finalamounthidden) - Number(remainingamountcalculate);
			$('#checkoutamount').val(final.toFixed(2));
			$('#finalpaymentamounthidden').val(final.toFixed(2));
		}

		checkbtn();

	}



	function calculateamount(){

		var finalamounthidden = $('#finalamounthidden').val();
		var finalpaymentamounthidden = $('#finalpaymentamounthidden').val();

		var total_amount = 0;

		for(o = 1; o <= paymentcount; o++){

			var currentamount = $('#paymentamount'+o).val();

			if(currentamount != NaN && currentamount != undefined){
				total_amount = total_amount + Number(currentamount);
			}
		}

		var ffff = Number(finalamounthidden) - Number(total_amount);
		$('#checkoutamount').val(Number(ffff.toFixed(2))); 
		$('#finalpaymentamounthidden').val(Number(ffff.toFixed(2))); 

		pricedifference();

		checkbtn();
	}

	$(document).ready(function(){
		let currentbranch = $('#selectbranchforheader').val();
		if(currentbranch == 'all'){
			alert('Please Select Branch');
		}
	});

	function pricedifference(){

		var finalamounthidden = Number($('#finalamounthidden').val());
	
		var paidamount = Number($('#paidamount').text());
		
		let remainingamount = $('#remainingamount').val();
		var pricedifference = paidamount - finalamounthidden;

		$('#returnpaymentrow').hide();

		if(pricedifference < 0){
			
			$('#pricedifference').val(Math.abs((pricedifference.toFixed(2))));
			$('#pricedifferencefinalamount').val(Math.abs((pricedifference.toFixed(2))));
			$('#amounttobepaid').val(Math.abs((pricedifference.toFixed(2))));
			$('#differencestatus').val('Take');
			$('#pricedifference').css('color', 'red');
			$('#pricedifference').removeAttr('readonly');
			$('#pricedifferencehidden').val(Math.abs((pricedifference.toFixed(2))));

		}else{
			
			$('#pricedifference').val(Math.abs((pricedifference)));
			$('#pricedifferencefinalamount').val(Math.abs((pricedifference.toFixed(2))));
			$('#amounttobepaid').val(Math.abs((pricedifference.toFixed(2))));
			$('#differencestatus').val('Give');
			$('#pricedifference').css('color', 'green');
			$('#pricedifference').attr('readonly', 'true');
			$('#pricedifferencehidden').val(Math.abs((pricedifference.toFixed(2))));

			showcashreturn(Math.abs((pricedifference.toFixed(2))));
		}


		if(pricedifference < 0){
			$('#paymentmoderow').show();
		}


	}

	/////////// showcashreturn start ///////////////////

	function showcashreturn(pricedifference){

		$('#returnpaymentrow').show();
		$('#clientpaymentmode').hide();
		$('#paymentmoderow').hide();
		$('#returncashvalue').val(pricedifference);

	}


	/////////// showcashreturn end  ///////////////////

	function checkbtn(){

		
		var paymenttbllength = $('#returnpaymenttbl tbody tr').length;

		var clientpaymentmode = $('#clientpaymentmode tbody tr').length;
		var returnpaymenttbl = $('#returnpaymenttbl tbody tr').length;

		if(clientpaymentmode != 0 || returnpaymenttbl != 0){
			$('.paymentbtn').show();
			$('#unpaidbtn').removeAttr('disabled');
			$('#pay').removeAttr('disabled');
		}else{
			
			$('.paymentbtn').show();
			$('#unpaidbtn').attr('disabled', 'true');
			$('#pay').attr('disabled', 'true');
		}


	}

	function paydifference(mode){

		var mode = $('#paymentypetitle'+mode).val();
		var amount = $('#pricedifference').val();

		if(amount > 0){
			clientpaymentcount++;
			var row = '<tr id="clientpaymentcount'+clientpaymentcount+'">'+
						'<input type="hidden" name="notemptypaymenttbl">'+
						'<input type="hidden" name="finalpaymentmode'+clientpaymentcount+'" id="finalpaymentmode'+clientpaymentcount+'" value="'+mode+'">'+
						'<input type="hidden" name="finalpaymentamount'+clientpaymentcount+'" id="finalpaymentamount'+clientpaymentcount+'"  value="'+amount+'">'+
						'<td>'+mode+'</td>'+
						'<td>'+amount+'</td>'+
						'<td><input type="text" name="clientremark'+clientpaymentcount+'" class="form-control" maxlength="255" placeholder="Enter Remark"></td>'+
						'<td><a class="btn btn_add" onclick="removedifferencepayment('+clientpaymentcount+')"><i class="fa fa-trash"></i></a></td>';
			$('#clientpaymentmode tbody').append(row);

			let finaldifference = $('#pricedifferencehidden').val();

			let modeamountdiff = Number(finaldifference) - Number(amount);
			$('#pricedifference').val(modeamountdiff.toFixed(2));
			$('#pricedifferencehidden').val(modeamountdiff.toFixed(2));
			$('#paymentcount').val(clientpaymentcount);
			checkbtn();
		}
		
	}

	////// remove difference payment start /////////////////

	function removedifferencepayment(clientpaymentcount){

		$('#clientpaymentcount'+clientpaymentcount).remove();

		againcalculateamount();
	}


	////// remove difference payment end  /////////////////


	////// againcalculateamount start //////////////////

	function againcalculateamount(){

		
		let pricedifferencefinalamount = $('#pricedifferencefinalamount').val();
		let paymenttbllength = $('#clientpaymentmode tbody tr').length;

		if(paymenttbllength > 0){

			if(clientpaymentcount > 0){

				for(var k = 1; k <= clientpaymentcount; k++){

					let finalpaymentmode = $('#finalpaymentmode'+k).val();
					let finalpaymentamount = $('#finalpaymentamount'+k).val();

					if(finalpaymentmode != undefined && finalpaymentmode != undefined && finalpaymentamount != undefined && finalpaymentamount != undefined){
						sumofpayment = sumofpayment + Number(finalpaymentamount);

					}
				}

				let remainingamount = $('#remainingamount').val();

				let againcalculatedifference = Number(pricedifferencefinalamount) - Number(sumofpayment);

				$('#pricedifference').val(againcalculatedifference.toFixed(2));
				$('#pricedifferencehidden').val(againcalculatedifference.toFixed(2));
				checkbtn();
			}
		}else{

			$('#pricedifference').val(pricedifferencefinalamount);
			$('#pricedifferencehidden').val(pricedifferencefinalamount);
			checkbtn();

		}


	}



	////// againcalculateamount end  //////////////////

	function checkdifference(){

		let currentprice = $('#pricedifference').val(); 
		
		let finaldifference = $('#pricedifferencehidden').val();

		if(Number(currentprice) > Number(finaldifference)){
			$('#pricedifference').val(finaldifference);
			alert('Please enter valid value');
		}


	}


	function isNumber(event, element) {

		if ((event.which != 46 || $(this).val().indexOf('.') != -1) && (event.which < 48 || event.which > 57)) {
			event.preventDefault();
		}
    }  

    $("#pricedifference").on("input", function(evt) {
    	var self = $(this);
    	self.val(self.val().replace(/[^0-9\.]/g, ''));
    	if ((evt.which != 46 || self.val().indexOf('.') != -1) && (evt.which < 48 || evt.which > 57)) 
    	{
    		evt.preventDefault();
    	}
    });