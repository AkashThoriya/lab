var url = $('#url').val();
var token = $('input[name="_token"]').val();
var clientpackage = '';
var clientservice = '';
var grpCount = 1;
var total = [];
var count = 0;
var confirmcount = 0;
var servicearray = [];

//////////////// client change start /////////////////////

function clientselected(){
    $('#clientps').hide();
	let client = $('#client').val();

	if(client){

		$.ajax({

			type : 'POST',
			url : url+'/appointment/getpackageandservice',
			data : { client:client, _token: token },
			success : function(res){

				$('#clientpackage').empty();
				$('#clientservices').empty();
                $(".attachSchemes").empty();

				clientpackage = res[0];
				clientservice = res[1];

				//// Client package drop start
				var packageselect = '';
				if(clientpackage.length > 0){
					packageselect += '<option value="">Select Package</option>';
					$.each(clientpackage, function(index, packagedata){
                        let packagedate = packagedata.purchasedate;
                        let splitdatepackage = packagedate.toString().split('-');
                        let year = splitdatepackage[0];
                        let month = splitdatepackage[1];
                        let date = splitdatepackage[2];
                        let purchasedatepackage = date+'-'+month+'-'+year;
						packageselect += '<option value="'+packagedata.packageid+','+packagedata.groupid+','+packagedata.package.packagename+'">'+packagedata.package.packagename+'('+purchasedatepackage+')</option>'; 

					});

				}else{
					packageselect += '<option value="">No Package Available</option>';
				}
				//// Client package drop end //////////////

				$('#clientpackage').append(packageselect);

				//// Client service drop start /////////////////
				var serviceselect = '';
				if(clientservice.length > 0){
					serviceselect += '<option value="">Select Service</option>';
					$.each(clientservice, function(index, servicedata){
                        console.log(servicedata);
                        let servicedate = servicedata.purchasedate;
                        console.log(servicedate);
                        let invoiceno = servicedata.invoiceid;
                        let splitdate = servicedate.toString().split('-');
                        let year = splitdate[0];
                        let month = splitdate[1];
                        let date = splitdate[2];
                        let purchasedateservice = date+'-'+month+'-'+year;
						serviceselect += '<option value="'+servicedata.servicename+','+servicedata.serviceid+','+invoiceno+'">'+servicedata.servicename+'('+purchasedateservice+')</option>'; 

					});
				}else{
					serviceselect += '<option value="">No Service Available</option>';
				}

				$('#clientservices').append(serviceselect);

				//// Client service drop end
				$('#clientps').show();
				
			},
			error : function(err){

				toastr.error('Something wrong occure');
				return;
			}




		});

	}else{
		$('#clientps').hide();
		$('#clientpackage').empty();
		$('#clientservices').empty();
	}



}




//////////////// client change end  /////////////////////

/////////////// btnaction start /////////////////////////

function btnaction(){

	let package = $('#clientpackage').val();
	let service = $('#multipleservices tbody tr').length;
    

	if(package || service > 0){
		$('#next_btn').removeAttr('disabled');
	}else{
		$('#next_btn').attr('disabled', 'true');

	}


}


/////////////// btnaction end  /////////////////////////


////////////////// client package show start //////////////////

$('#clientpackage').change(function(){
    $(".attachSchemes").empty();
    let package = $(this).val();
    let splitvalues = package.split(',');
    let packageid = splitvalues[0];
    let invoiceid = splitvalues[1];
    let packagenames = splitvalues[2];
    let memberid = $('#client').val();
    var packageidrepeat = packageid;

     $.ajax({
                url: url+'/appointment/selectedpackageajax',
                method: "POST",
                data: {invoiceid: invoiceid, packageid: packageid, memberid: memberid, _token: token},

                success: function (data) {

                    var count = 0;
                    var totalGroupslen = data.length;
                    var totalGroupsappend = '<input type="hidden" name="groups" id="groups" value="' + totalGroupslen + '">' +
                        '<div style="text-align:center; font-size:25px; font-weight:550;">' + packagenames + '</div>';

                    $(".attachSchemes").append(totalGroupsappend);

                    $.each(data, function (i, item) {
                        console.log('count'+count);
                        count++;
                        var subcount = 0;
                        var subGroupslen = parseInt(item.services.length) - 1;


                        var schemeData =
                            ' <input type="hidden" name="packageName" value="' + packageidrepeat + '">' +
                            '<div class="row">' +
                            '<input type="hidden" name="subgroups' + count + '" id="subgroups' + count + '" value="' + subGroupslen + '">' +
                            '<div class="mainbox-layout col-md-12 col-lg-12 col-sm-12  mainLayout" value="" id="mainLayout' + count + '">' +

                            // -------------------------------------------------mainlayout-------------------------
                            '<div class="col-sm col-md col-lg">' +
                            '<div class="card">' +
                            '<div class="card-header seperate">' +
                            '<h4 class="card-title">Used Credits : <p id="usedcredits' + count + '" value="" style="display:inline; font-size:20px;"></p><p style="display:inline; font-size:20px;">/</p><p id="usablecredits' + count + '" style="display:inline; font-size:20px;">' + item.maingrpusablecredit + '</p></h4>' +
                            '</div>' +
                            '<div class="card-body">' +
                            '<div class="row mainrow' + count + '">' +
                            '<div class="col-md-12 col-lg-12 col-sm-12 displaycard grp' + count + '">' +
                            '<div class="card card-widget widget-user subgroups">' +
                            '<div class="card-body">' +
                            '<div class="table-responsive">' +
                            '<table class="table table-bordered">' +
                            '<div class="table-fontcolor">' +
                            '<h3 style="center">' + item.maingrpname + '<h3/>' +
                            '<thead>' +
                            '<tr class="table-fontcolor">' +
                            '<th>Services</th>' +
                            '<th>Credits</th>' +
                            '<th>Used</th>' +
                            '</tr>' +
                            '</thead>' +
                            '<tbody id="service' + i + '"class="selectCheckbox' + count + '"></tbody>' +
                            '</div>' +
                            '</table>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        // ------still continuing main layout in next so don't close remaining two div tags here bcauz they are closed after sublayout------------------------

                        $(".attachSchemes").append(schemeData);


                        //  --------------------------------------------main services---------------------------------
                        if (item.services[0]) {
                            console.log(item.services[0]);
                            var sum = 0;

                            // -------------------------------------- Main Layout start -----------------------------------
                            for (var j = 0; j < item.services[0].length; j++) {
                                subcount++;
                                if (item.services[0][j].status == "Occupied" || item.services[0][j].status == "Deactive") {
                                    sum = sum + item.services[0][j].usedcredits;
                                }
                                console.log(sum);
                                $('#usedcredits' + count).text(sum);

                                var row = '<tr class="table-fontcolor " id="subTableRow' + item.services[0][j].packageclaimtableId + '">' +
                                    '<td id="services' + item.services[0][j].packageclaimtableId + '">' + item.services[0][j].servicename + '</td>' +
                                    '<td id="credits' + item.services[0][j].packageclaimtableId + '" value=' + item.services[0][j].mainGrpCredits + ">" + item.services[0][j].mainGrpCredits + '</td>';

                                if (item.services[0][j].claimedstatus == 'claimed' && item.services[0][j].status == 'Deactive') {
                                    row += '<td><input type="checkbox" name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[0][j].packageclaimtableId + '" checked disabled/></td></tr>';
                                } else if (item.services[0][j].claimedstatus == 'Active' && item.services[0][j].status == 'Active') {
                                    row += '<td><input type="checkbox" onclick="selectService(' + item.services[0][j].packageclaimtableId + "," + count + "," + count + "," + item.services[0][j].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[0][j].packageclaimtableId + ');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[0][j].packageclaimtableId + '"/></td></tr>';
                                } else if (item.services[0][j].claimedstatus == 'Reactive' && item.services[0][j].status == 'Occupied') {
                                    row += '<td><input type="checkbox" onclick="selectService(' + item.services[0][j].packageclaimtableId + "," + count + "," + count + "," + item.services[0][j].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[0][j].packageclaimtableId + ');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[0][j].packageclaimtableId + '" checked disabled/></td></tr>';
                                } else if (item.services[0][j].claimedstatus == 'Active' && item.services[0][j].status == 'Occupied') {
                                    row += '<td><input type="checkbox" onclick="selectService(' + item.services[0][j].packageclaimtableId + "," + count + "," + count + "," + item.services[0][j].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[0][j].packageclaimtableId + ');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[0][j].packageclaimtableId + '" checked disabled/></td></tr>';
                                } else {
                                    row += '<td><input type="checkbox" name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[0][j].packageclaimtableId + '" disabled/></td></tr>';
                                }
                                $("#service" + i).append(row);


                            }
                            // -------------------------------------- Main Layout End -----------------------------------


                            //-------------------------------------------------sublayout-----------------------------------------
                            var p = 0;
                            var subgrpcount = 0;
                            for (var m = 0; m < item.services.length; m++) {

                                if (m != 0) {

                                    subgrpcount++;
                                    var subservicecount = 0;

                                    var schemeSubData =
                                        '<div class="col-md-6 col-lg-4 col-sm-12 displaycard grp' + count + subgrpcount + '">' +
                                        '<div class="card card-widget widget-user subgroups">' +
                                        '<div class="card-body ">' +
                                        '<div class="table-responsive">' +
                                        '<table class="table table-bordered">' +
                                        '<div class="table-fontcolor">' +
                                        '<h3 style="center">' + item.maingrpname + '<h3/>' +
                                        '<thead>' +
                                        '<tr class="table-fontcolor">' +
                                        '<th>Services</th>' +
                                        '<th>Credits</th>' +
                                        '<th>Used</th>' +
                                        '</tr>' +
                                        '</thead>' +
                                        '<tbody id="service' + i + p + '" class="selectCheckbox' + count + subgrpcount + '"></tbody>' +
                                        '</div>' +
                                        '</table>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        // -----------------remaining two open divs of mainlayout are closed here-----------------------
                                        '</div>' +
                                        '</div>';
                                    // --------------------------------------------------------------------------------------------

                                    $(".mainrow" + count).append(schemeSubData);


                                    // -----------------------------------------------------subservices--------------------------------------

                                    for (var k = 0; k < item.services[m].length; k++) {
                                        subservicecount++;

                                        if (item.services[m][k].status == "Occupied" || item.services[m][k].status == "Active") {
                                            sum = sum + item.services[m][k].usedcredits;
                                        }

                                        $('#usedcredits' + count).text(sum);
                                        var row = '<tr class="table-fontcolor " id="subTableRow' + item.services[m][k].packageclaimtableId + '">' +
                                            '<td id="services' + item.services[m][k].packageclaimtableId + '" value="">' + item.services[m][k].servicename + '</td>' +
                                            '<td id="credits' + item.services[m][k].packageclaimtableId + '">' + item.services[m][k].mainGrpCredits + '</td>';

                                        if (item.services[m][k].claimedstatus == 'claimed' && item.services[m][k].status == 'Active') {
                                            row += '<td><input type="checkbox" name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[m][k].packageclaimtableId + '" checked disabled/></td></tr>';
                                        } else if (item.services[m][k].claimedstatus == 'Active' && item.services[m][k].status == 'Active') {
                                            row += '<td><input type="checkbox" onclick="selectService(' + item.services[m][k].packageclaimtableId + "," + count + subgrpcount + "," + count + "," + item.services[m][k].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[m][k].packageclaimtableId +');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[m][k].packageclaimtableId + '"/></td></tr>';
                                        } else if (item.services[m][k].claimedstatus == 'Reactive' && item.services[m][k].status == 'Occupied') {
                                            row += '<td><input type="checkbox" onclick="selectService(' + item.services[m][k].packageclaimtableId + "," + count + "," + count + "," + item.services[m][k].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[m][k].packageclaimtableId +');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[m][k].packageclaimtableId + '" checked disabled/></td></tr>';
                                        } else if (item.services[m][k].claimedstatus == 'Active' && item.services[m][k].status == 'Occupied') {
                                            row += '<td><input type="checkbox" onclick="selectService(' + item.services[m][k].packageclaimtableId + "," + count + subgrpcount + "," + count + "," + item.services[m][k].serviceid + "," + invoiceid + "," + packageid + "," + memberid + "," + item.services[m][k].packageclaimtableId +');"  name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[m][k].packageclaimtableId + '" checked disabled/></td></tr>';
                                        } else {
                                            row += '<td><input type="checkbox" name="case' + count + subgrpcount + '[]" id="checkbox' + item.services[m][k].packageclaimtableId + '" disabled/></td></tr>';
                                        }
                                        $("#service" + i + p + "").append(row);
                                    }
                                }
                                p++;
                            }
                        }
                    });
                },
                dataType: "json"
            });
});


function selectService(cnt, cnt1, mainGrpcnt, serviceID, invoiceid, packageid, memberid) {

            if ($("#checkbox" + cnt + "").is(":checked")) {
                $("#checkbox" + cnt + "").attr("checked", true);

                addTotal(cnt, cnt1, mainGrpcnt, serviceID, invoiceid, packageid, memberid);

                $("#mainLayout" + mainGrpcnt)
                    .find($(".grp" + cnt1))
                    .siblings()
                    .addClass("disable_group");
            } else {
                var totalSelectedCheckbox = $(".selectCheckbox" + cnt1).find(
                    "input[name='case" + cnt1 + "[]']:checked"
                ).length;
                subTotal(cnt, cnt1, mainGrpcnt, serviceID, invoiceid, packageid, memberid);
                if (totalSelectedCheckbox == 0) {
                    $("#checkbox" + cnt + "").attr("checked", false);

                    $("#mainLayout" + mainGrpcnt)
                        .find($(".grp" + cnt1))
                        .siblings()
                        .removeClass("disable_group");
                }
            }
        }

        function addTotal(cnt, cnt1, mainGrpcnt, serviceID, invoiceid, packageid, memberid) {
            var usablecredit = $('#usablecredits' + mainGrpcnt + "").text();

            var usedcredits = $('#usedcredits' + mainGrpcnt + "").text();

            var value1 = $("#credits" + cnt).text();
            var sum = parseInt(usedcredits) + parseInt(value1);

            if (sum > usablecredit) {
                alert("No more credits left!!");
                $('#checkbox'+cnt).prop('checked', false);
                return false; 
            } else {
                $('#usedcredits' + mainGrpcnt + "").text(sum);
            }


            var temp4 = {
                invoice: invoiceid,
                packageid: packageid,
                position: cnt,
                serviceId: serviceID,
                clientid: memberid,
                credits: value1
            };

            total.push(temp4);
            
            $("#checklistArray").val(JSON.stringify(total));

        }

        function subTotal(cnt, cnt1, mainGrpcnt, serviceID, invoiceid, packageid) {
            var usedcredits = $('#usedcredits' + mainGrpcnt + "").text();
            var value1 = $("#credits" + cnt).text();

            
            for (let i = 0; i < total.length; i++) {
                if (total[i].position == cnt) {
                    total.splice(i, 1);
                    var sum = parseInt(usedcredits) - parseInt(value1);
                    $('#usedcredits' + mainGrpcnt + "").text(sum);
                }
            }


            $("#checklistArray").val(JSON.stringify(total));

        }

        function selectmultipleservices() {

            var selectedservice = $('#clientservices').val();
            
            try{
                if(selectedservice){
                    
                    var servicedata = selectedservice.split(',');
                    if(servicedata.length > 0){
                        var servicename = servicedata[0];
                        var invoiceid = servicedata[2];
                        var serviceid = servicedata[1];
                        var isselected = servicearray.includes(Number(serviceid));
                        if(isselected == false){
                            servicearray.push(Number(serviceid));
                            count++;
                            confirmcount++;
                            $('#confirmcount').val(confirmcount);
                            
                            ////////////// Generate Service Row Start ///////////////////////
                            var multipleservicestr = '<tr id="serviceselected' + count + '">' +
                            '<input type="hidden" name="multipleserviceID' + count + '"  value="' + serviceid + '">' +
                            '<input type="hidden" name="serviceinvoice' + count + '"  value="' + invoiceid + '">' +
                            '<td><input type="text" class="form-control" name="multipleservice' + count + '" id="multipleservice' + count + '" value="' + servicename + '" readonly=""><span class="fa fa-times removeserviceicon" id="remove' + count + '" onclick="removeservice('+count+','+serviceid+');"></span></td>' +
                            '</tr>';
                            ////////////// Generate Service Row End  ///////////////////////

                            $('#clientservices').val('').trigger('change');

                            ////////////// Append Row Start ////////////////////
                            $('#multipleservices tbody').append(multipleservicestr);                        
                            ////////////// Append Row End  ////////////////////

                            //////////////// Update Count /////////////////////
                            $('#totalserviceselected').val(count);

                            btnaction();
                        }else{
                            toastr.error('Service is already selected!');
                        }
                        

                    }else{
                        toastr.error('Something wrong occure!');
                    }
                }
            } catch(err) {
                toastr.error('Something wrong occure!');
            }
            
        }

        function removeservice(count, serviceid) {
            var confirmservicecount = Number($('#confirmservicecount').val());
            confirmservicecount--;
            $('#confirmservicecount').val(confirmservicecount);
            
                var index = servicearray.indexOf(Number(serviceid));
                
                if(index != -1){
                    servicearray.splice(index, 1);
                }
                $("#serviceselected" + count + "").remove();

                btnaction();
            
        }


////////////////// client package show end  //////////////////