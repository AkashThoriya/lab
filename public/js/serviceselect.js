var count = 0;
var subcount = 0;
var maingrpCount = 0;
var grpCount = 0;
var subgrpCount = 0;

function newservicetable() {
    
    if (maingrpCount == 0) {
        maingrpCount++;
        newGroup(maingrpCount);
    } else {
        var data=$("#grp1" + maingrpCount+"").val();
        // console.log(data);
      
        if(data != '1'){
            maingrpCount++;
            newGroup(maingrpCount);
        }else{
            var subtotalcredit = $("#grp" + maingrpCount + "")
            .find(".subGroup")
            .find(".subtotalcredit");

            var usableCredit =$("#grp" + maingrpCount + "")
            .find(".mainGroup")
            .find(".usablecredit")
            .val();

            var totalCredit =$("#grp" + maingrpCount + "")
            .find(".mainGroup")
            .find(".totalCredit")
            .val();
        
            // -----------------------------------check the validations-----------------------
            if (subtotalcredit.length == 0) {
                var groupname = $("#grp" + maingrpCount + "").find(".groupname").val();
                var services = $("#group" + maingrpCount + "").find(".addedcredit").length;

                if (groupname == "") {
                    alert("Please Enter Groupname");
                    return false;
                }

                if (services == "") {
                    alert("Please Enter Services");
                    return false;
                }

                if(usableCredit > totalCredit || usableCredit==0 || totalCredit==0){
                    alert("Check the credits!!");
                    return false;
                }    
                    // ------------grpname readonly-----
                    $("#grp" + maingrpCount + "")
                    .find(".groupname")
                    .attr("readonly", true);

                    $("#group" + maingrpCount + "")
                    .find(".removeservice")
                    .attr("disabled", true);
                    
                    $("#grp" + maingrpCount + "")
                    .find(".mainGroup")
                    .find(".multipleservices")
                    .attr("disabled", true);
    
                     $("#grp" + maingrpCount + "")
                    .find(".mainGroup")
                    .find(".addedcredit")
                    .attr("readonly", true);

                    $("#grp" + maingrpCount + "")
                    .find(".addoption")
                    .attr("disabled",true);

                maingrpCount++;
                newGroup(maingrpCount);

            }else {
            temp = 0;
            for (var i = 0; i < subtotalcredit.length; i++) {
                 console.log($(subtotalcredit[i]).val() + usableCredit);
                $subtotalCredit=parseInt($(subtotalcredit[i]).val());
                if ($subtotalCredit >= usableCredit) {
                    temp++;
                }
                console.log(temp);
            }
            if (temp == subtotalcredit.length) {
                $("#grp" + maingrpCount + "")
                    .find(".subGroup")
                    .find(".multipleservices")
                    .attr("disabled", true);
                $("#grp" + maingrpCount + "")
                    .find(".subGroup")
                    .find(".addedcredit")
                    .attr("readonly", true);
                $("#grp" + maingrpCount + "")
                    .find(".subGroup")
                    .find(".removeSubService")
                    .attr("disabled", true);

                $("#grp" + maingrpCount + "")
                .find(".addoption")
                .attr("disabled",true);

                maingrpCount++;
                newGroup(maingrpCount);
            } else {
                alert("Usable Credits should be less than total credits!!");
            }
            }
        }
    }
}

// -----------------------------------------------------------main group ------------------------------------------------------
function newGroup(maingrpCount) {
    
    var mainlayout =
     "<div class='mainbox-layout col-lg-12 col-sm-12 mainLayout' id='grp" + maingrpCount + "' value=" + maingrpCount +">"+
     "<input type='hidden' name='subGrouplen" + maingrpCount + "' value='0' id='subGrouplen" + maingrpCount + "'>"+
     "<input type='hidden' name='grp1" + maingrpCount + "' value='1' id='grp1" + maingrpCount + "'></div>";
    
    $(".servicetableappend").append(mainlayout);
    // ------------------------------increment hidden values-----------------------------------
    var startElement = $("#mainGrouplen");
    var value = parseInt(startElement.val(), 10);
    startElement.val(value + 1);
    // ------------------------------------------end---------------------------------------------
    count = 0;
    subgrpCount = 0;
    grpCount++;
    var ab =
    '<div class="card specific mb-3">'+
              '<div class="card-body">'+
                '<div class="row">'+
                '<div class="col-lg-12 col-sm-12 mainGroup" name="group' + grpCount + '" id="group' + grpCount + '" value="' + grpCount +'">'+
                '<div class="col-md-12 col-sm-12 col-lg-12">'+

                '<div class="row">'+

                    '<div class="col-md-4 col-lg-4 col-sm-12">'+
                        '<div class="form-group">'+
                            '<label>Group Name</label>'+
                            '<input type="text" class="groupname form-control" placeholder="Enter Group Name" name="groupname' + grpCount + '" id="groupname' + grpCount + '" value="" required maxlength="255">'+
                        '</div>'+
                    '</div>'+

                    '<div class="col-md-4 col-lg-4 col-sm-12">'+
                        '<div class="form-group">'+
                          '<label>Usable Credit</label>'+
                          "<input type='text' class='form-control usablecredit' name='usablecredit" +grpCount +"' id='usablecredit" +grpCount +"' value='0' maxlength='3'/>" +
                        '</div>'+
                    '</div>'+

                    '<div class="col-md-4 col-lg-4 col-sm-12">'+
                        '<div class="form-group">'+
                          '<label>Total Credit</label>'+
                          '<input type="text" class="groupname form-control totalCredit" name="totalcredit' +grpCount +'" id="totalcredit' +grpCount +'" value="0" maxlength="3" readonly="">' +
                       '</div>'+
                    '</div>'+
                '</div>' +

                '<div class="row">'+
                    '<div class="col-12">'+
                    '<select  name="services' +grpCount +'" class="form-control multipleservices" style="margin-top: 20px" width="100%" data-placeholder="Select a Service" id="services' +grpCount +'" onchange="addService(' +grpCount +')">'+
                    '<option value="" id="selectservice' +count +'" selected>Select Service</option></select>'+
                    '</div>'+
                '</div>'+    

                '<div class="row mt-3">'+
                    '<div class="col-md-12 col-sm-12 col-lg-12">'+
                    '<div class="table-responsive">'+
                        '<table class="table table-bordered tableappend" id="serviceTable' +grpCount +'">'+
                        '<thead>'+
                            '<th>Services</th>'+
                            '<th>MSP</th>'+
                            '<th>MRP</th>'+
                            '<th>Credits</th>'+
                            '<th>Remove</th>'+
                        '</thead>'+
                        '<tbody>'+
                            '<input type="hidden" id="serviceMainCount' +grpCount +'" name="serviceMainCount' +grpCount +'" value="00">'+
                        '</tbody>'+
                        '</table>'+
                    '</div>'+
                    '</div>'+
                '</div>'+

                '<div class="row mt-3">'+
                    '<div class="col-md-12" style="float:right;">'+
                        '<button title="Add Option" class="btn add-new btn_add addoption" type="button" id="addoption" name="addoption" onClick="AddOptionTable(' +grpCount +')"><i class="fa fa-plus"></i>Option</button>'+
                    '</div>'+
                '</div>' +
            '</div>'+
            '</div>'+
            '</div>'+
            '</div>'+
    '</div>';
             
        
    $("#grp" + maingrpCount + "").append(ab);

    loadservices.forEach(loadservice => {
        $("#services" + grpCount + "").append(
            "<option value=" +
                loadservice.serviceid +
                ">" +
                loadservice.servicename +
                "</option>"
        );
    });
}
// ------------------------------------------------------------main group end----------------------------------------------------------

// ----------------------------------------------------------mainserviceslayout--------------------------------------------
function addService(currentGrp) {
    // console.log('hello');
    var _token = $('input[name="_token"]').val();
    var selectedservices = $("#services" + currentGrp + "").val();

    $.ajax({
        url: selectedservice_site,
        method: "POST",
        data: { Selectedservice: selectedservices, _token: _token },
        success: function(data) {
            console.log(data);
            if (data.length != 0) {
                count++;
               
                var tr = "";
                // ------------------------------increment hidden values-----------------------------------
                var startElement = $("#serviceMainCount" + currentGrp + "");
                var value = parseInt(startElement.val(), 10);
                //  console.log(value);
                startElement.val(value + 1);
              
                // ------------------------------------------end---------------------------------------------

                tr +=
                    "<tr id='myTableRow" +currentGrp +count +"' class='tableRow'>"+
                        "<td><input class='form-control' name='service" +currentGrp +count +"' id='service" +currentGrp +count +"' value='" + data[0].servicename +"' readonly=''></td>" +
                        "<td><input class='form-control' name='mrp" +currentGrp +count +"' id='mrp" +currentGrp +count +"' value='" +data[0].mrp +"' readonly=''></td>" +
                        "<td><input class='form-control' name='msp" +currentGrp +count +"' id='msp" +currentGrp +count +"' value='" +data[0].msp +"' readonly=''></td>" +
                        "<td><input type='number' class='form-control addedcredit' min='0' max='100' name='credit" +currentGrp +count +"' oninput='calculateMainCredit(" +currentGrp +")' id='credit" +currentGrp +count +"' required placeholder='Add Credits'></td>" +
                        "<td><button class='removeservice' id='removeservice" +currentGrp +count +"' onclick='removeService(" +currentGrp +count +"," +currentGrp +")' aria-hidden='true'><i class='fa fa-remove'></i></button></td>" +
                    "</tr>"+
                    
                    "<input type='hidden' name='servicegrpid" +count +"' id='servicegrpid" +count +"' value=" +currentGrp +">"+
                    "<input type='hidden' name='serviceselectedid" +currentGrp +count +"' id='serviceselectedid" +currentGrp +count +"' value=" +data[0].serviceid+">";

                $("#serviceTable" + currentGrp + "").append(tr);
                $('.select2').val('').trigger('change');
            }
        },
        dataType: "json"
    });
}
// ------------------------------------------------------------mainserviceslayout  end---------------------------------------------
// -----------------------------------------------------option table-------------------------------------------------------
function AddOptionTable(addSubGroup) {
   
    // ------------------------total credit------------------------
    var groupCredit = parseInt($("#totalcredit" + addSubGroup + "").val());
    var usableCredit = parseInt($("#usablecredit" + addSubGroup + "").val());
    var groupname = $("#groupname" + addSubGroup + "").val();
    var services = $("#group" + addSubGroup + "").find(".addedcredit");

    if(usableCredit <= groupCredit && usableCredit!=0 && groupCredit!=0){
     
         // ------------------------------------------disable main grp--------------------------
    if (groupname != "") {
        $("#groupname" + addSubGroup + "").attr("readonly", true);

    if (services.length != "") {
        $("#services" + addSubGroup + "").attr("disabled", true);
        $("#group" + addSubGroup + "")
            .find(".addedcredit")
            .attr("readonly", true);
    
    // -------------------------------------------------end--------------------------------------------

    // ------------------------------increment hidden sub values-----------------------------------
    var startElement = $("#subGrouplen" + addSubGroup + "");
    var value = parseInt(startElement.val(), 10);
    // console.log(value);
    startElement.val(value + 1);
    // ------------------------------------------end---------------------------------------------
    subcount = 0;
    subgrpCount++;
    var ab =
    '<div class="card specific mb-3" id="subgroup'+ addSubGroup +subgrpCount +'" style="background-color: aliceblue">'+
        '<div class="card-body">'+
            '<div class="row">'+
                '<div class="col-lg-12 subGroup mt-2" id="group' +addSubGroup +subgrpCount +'"  value="' + addSubGroup +subgrpCount +'">' +
                    '<div class="col-md-12 col-sm-12 col-lg-12">'+

                        '<div class="row">'+

                            '<div class="col-md-4 col-lg-4 col-sm-12">'+
                                '<div class="form-group">'+
                                    '<label>Group Name</label>'+
                                    '<input type="text" class="groupname form-control" placeholder="Enter Group Name" name="groupname' +  addSubGroup + subgrpCount + '" id="groupname' + addSubGroup + subgrpCount + '" value="" maxlength="255" readonly>'+
                                '</div>'+
                            '</div>'+

                            '<div class="col-md-4 col-lg-4 col-sm-12">'+
                                '<div class="form-group">'+
                                '<label>Usable Credit</label>'+
                                '<input type="text" class="form-control usablecredit" name="usablecredit' + addSubGroup + subgrpCount + '" id="usablecredit' + addSubGroup + subgrpCount +'" value="0" maxlength="3" readonly/>' +
                                '</div>'+
                            '</div>'+

                            '<div class="col-md-4 col-lg-4 col-sm-12">'+
                                '<div class="form-group">'+
                                '<label>Total Credit</label>'+
                                "<input type='text' class=' form-control subtotalcredit' name='subtotalcredit"+ addSubGroup + subgrpCount +"' id='subtotalcredit" +addSubGroup +subgrpCount +"' value='0' maxlength='3' readonly>"+
                            '</div>'+
                            '</div>'+
                        '</div>' +


                        '<div class="row">'+
                            '<div class="col-12">'+
                            '<select  name="services"  class="form-control multipleservices style=margin-top: 20px" width="100%" data-placeholder="Select Services" id="services' + addSubGroup + subgrpCount +'" onchange="addSubService(' +addSubGroup +subgrpCount +')">'+
                            '<option value="" id="selectservice' +subcount +'" selected >Select Service</option></select>' +
                            '</div>'+
                        '</div>'+ 

                        '<div class="row mt-3">'+
                            '<div class="col-md-12 col-sm-12 col-lg-12">'+
                            '<div class="table-responsive">'+
                                '<table class="table table-bordered tableappend" id="serviceTable' + addSubGroup + subgrpCount +'">'+
                                '<thead>'+
                                    '<th>Services</th>'+
                                    '<th>MSP</th>'+
                                    '<th>MRP</th>'+
                                    '<th>Credits</th>'+
                                    '<th>Remove</th>'+
                                '</thead>'+
                                '<tbody>'+
                                '<input type="hidden" id="serviceCount' + addSubGroup + subgrpCount + '" name="serviceCount' +addSubGroup +subgrpCount +'" value="00">'+
                                '</tbody>'+
                                '</table>'+
                            '</div>'+
                            '</div>'+
                        '</div>'+

                        '<div class="row mt-3">'+
                            '<div class="col-md-12" style="float:right;">'+
                                '<button style="float:right;" class="btn add-new btn_add addoption" title="Remove Subgroup" type="button" id="removeGroup' + addSubGroup +subgrpCount +'" name="removeGroup"  onClick="removeSubGroup(' +addSubGroup +subgrpCount +')"><i class="fa fa-trash"></i></button>'+
                            '</div>'+
                        '</div>' +
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'+
    '</div>';

    $("#grp" + maingrpCount + "").append(ab);

    loadservices.forEach(loadservice => {
        $("#services" + addSubGroup + subgrpCount + "").append(
            "<option value=" +
                loadservice.serviceid +
                ">" +
                loadservice.servicename +
                "</option>"
        );
    });

    $("#usablecredit" + addSubGroup + subgrpCount + "").val(usableCredit);


    $("#group" + addSubGroup + "")
        .find(".removeservice")
        .attr("disabled", true);

    $("#group" + addSubGroup + "")
    .find(".usablecredit")
    .attr("readonly", true);


// -------------------------groupname--------------------------
var groupName = $("#groupname" + addSubGroup + "").val();
$("#groupname" + addSubGroup + subgrpCount + "").val(groupName);
} else{
    alert("Please Enter Atleast One Service!!");
}
}else {
    alert("Please Enter Group Name!!");
}   
}else{
    alert("Check Something is remaining!!");
}
}
// ----------------------------------------------------------option table end----------------------------------------------------------

//--------------------------------------------------------option-table-serviceslayout----------------------------------------------
function addSubService(currentSubGrp) {
    var _token = $('input[name="_token"]').val();
    var selectedservices = $("#services" + currentSubGrp + "").val();

    $.ajax({
        url: selectedservice_site,
        method: "POST",

        data: { Selectedservice: selectedservices, _token: _token },
        success: function(data) {
            // console.log(data);

            if (data.length != 0) {
                subcount++;
                var tr = "";
                // ------------------------------increment hidden values-----------------------------------
                var startElement = $("#serviceCount" + currentSubGrp + "");
                var value = parseInt(startElement.val(), 10);
                startElement.val(value + 1);
                var final = parseInt(
                    $("#serviceCount" + currentSubGrp + "").val()
                );
                // ------------------------------------------end---------------------------------------------

                tr +=
                    "<tr id='myTableRow" +currentSubGrp +final +"'>"+
                        "<td><input class='form-control' name='service" +currentSubGrp +subcount +"' id='service" +currentSubGrp +subcount +"' value='" +data[0].servicename +"' readonly=''></td>" +
                        "<td><input class='form-control' name='mrp" +currentSubGrp +subcount +"' id='mrp" +currentSubGrp +subcount +"' value='" +data[0].mrp +"' readonly></td>" +
                        "<td><input class='form-control' name='msp" +currentSubGrp +subcount +"' id='msp" +currentSubGrp +subcount +"' value='" +data[0].msp +"'readonly ></td>" +
                        "<td><input type='number' class='form-control addedcredit' min='0' max='100' name='credit" +currentSubGrp +final +"' oninput='calculateCredit1(" +currentSubGrp +")' id='credit" +currentSubGrp +final +"'   placeholder='Add Credits' required></td>" +
                        "<td><button class='removeSubService' id='removeSubService" +currentSubGrp +final +"' onclick='removeSubService(" +currentSubGrp +"," +currentSubGrp +final +")' aria-hidden='true'><i class='fa fa-remove'></i></td>" +
                    "</tr>"+
                    
                    "<input type='hidden' name='servicegrpid" +currentSubGrp +"' id='servicegrpid" +currentSubGrp +"' value='" +currentSubGrp +"'>"+
                    "<input type='hidden' name='serviceselectedid" +currentSubGrp + subcount + "' id='serviceselectedid" +currentSubGrp+ subcount +"' value=" +data[0].serviceid+">";

                $("#serviceTable" + currentSubGrp + "").append(tr);
               
            }
        },
        dataType: "json"
    });
}
// -------------------------------------------------------option-table-serviceslayout end--------------------------------------------------

function removeGroup() {
    $(".mainLayout")
        .last()
        .remove();
   
}

function removeSubGroup(currentGroup) {
    $("#subgroup" + currentGroup + "").remove();
}



function removeService(serviceId, currentGrpId) {
    if ($("#credit" + serviceId + "").val() != "") {
        var value = $("#credit" + serviceId + "").val();
        if (value != undefined) {
            var temp;
            updateCredit(currentGrpId);
            temp = $("#totalcredit" + currentGrpId + "").val();
            temp = temp - value;
            $("#myTableRow" + serviceId + "").remove();
            $("#totalcredit" + currentGrpId + "").val(temp);
            $("#usablecredit" + currentGrpId + "").val(temp);

        }
    } else {
        $("#myTableRow" + serviceId + "").remove();
    }
}

function removeSubService(serviceSubId, finalValue) {
  
    var changeGrpId = $("#servicegrpid" + serviceSubId + "").val();

    if ($("#credit" + finalValue + "").val() != "") {
        var value = $("#credit" + finalValue + "").val();
  
        if (value != undefined) {
            var temp;
            updateCredit(changeGrpId);
            temp = $("#subtotalcredit" + changeGrpId + "").val();
            temp = temp - value;
            $("#myTableRow" + finalValue + "").remove();
            $("#subtotalcredit" + changeGrpId + "").val(temp);
        }
    } else {
        $("#myTableRow" + finalValue + "").remove();
    }
}

function updateCredit(updatecredit) {
    var sum = 0;
    var currentvalue = $("#group" + updatecredit + "").find(".addedcredit");

    for (var i = 0; i < currentvalue.length; i++) {
        prodprice = parseInt($(currentvalue[i]).val());
        sum += prodprice;
    }

    $("#subtotalcredit" + updatecredit + "").val(sum);
}

function calculateMainCredit(credits) {
    var sum = 0;
    var currentvalue = $("#group" + credits + "").find(".addedcredit");
   
    for (var i = 0; i < currentvalue.length; i++) {
        var cueentcredit = $(currentvalue[i]).val();
        
        if(cueentcredit){
            prodprice = parseInt(cueentcredit);
            console.log('prodprice'+prodprice);
            sum += prodprice;
        }
    }
    
    $("#totalcredit" + credits + "").val(sum);
    $("#usablecredit" + credits + "").val(sum);

}

function calculateCredit1(credits) {
    var creditTotal = parseInt($("#subtotalcredit" + credits + "").val());

    var sum = 0;
    var currentvalue = $("#group" + credits + "").find(".addedcredit");

    for (var i = 0; i < currentvalue.length; i++) {
        prodprice = parseInt($(currentvalue[i]).val());
        sum += prodprice;
    }

    $("#subtotalcredit" + credits + "").val(sum);
    
}

function submit1() {
    var groupname = $("#groupname" + maingrpCount + "")
    .val();

    var services = $("#group" + maingrpCount + "")
    .find(".addedcredit")
    .length;

    var subtotalcredit = $("#grp" + maingrpCount + "")
    .find(".subGroup")
    .find(".subtotalcredit");

    var usableCredit =$("#grp" + maingrpCount + "")
    .find(".mainGroup")
    .find(".usablecredit")
    .val();

    var totalCredit =$("#grp" + maingrpCount + "")
    .find(".mainGroup")
    .find(".totalCredit")
    .val();


    
    if (subtotalcredit.length == 0) {
        if($("#group" + maingrpCount).length != 0) {
            if(groupname == "" ||  services == 0 || usableCredit > totalCredit){
                alert("Verify Details!!");
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
        
    }else{
        temp = 0;
        for (var i = 0; i < subtotalcredit.length; i++) {
            console.log($(subtotalcredit[i]).val() + usableCredit);
            $subtotalCredit=parseInt($(subtotalcredit[i]).val());
            if ($subtotalCredit >= usableCredit) {
                temp++;
            }
        }
            if (groupname == "" ||  services == 0 || temp != subtotalcredit.length) {
                alert("Usable Credits should be less than total credits!!");
                return false;
            } else {
                return true;
            }
    }

  
    
}

function isserviceadded(){

    let length = $('.mainLayout').length;
    var servicelength = $('.tableappend tbody tr').length;
    if(length > 0 && servicelength > 0){
        return true;
        /*var errorarray = [];
        let credits = $('.addedcredit');

        if(credits.length > 0){

            for(var i=1; i<= credits.length; i++){
                if($(credits[i]).val()){

                  
                }else{

                    errorarray.push(1); 
                  
                }
            }

            if(errorarray.length == 0){
                return true;
            }else{
                alert('Please add some credits');
                return false;

            }
        }*/
    }else{

        alert('Please add some Groups or services');
        return false;

    }
}
