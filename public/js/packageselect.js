// alert("connected");
var grpCount = 1;
var total = [];
var appendData =
    "<div id='packageDetails' class='packageDetails'>" +
    "<div class='row'"+
    "<div class='col-lg-3'></div>" +
    "<div class='col-lg-12 col-sm-12 col-md-12'>" +
    "<div class='form-group'>" +
    "<label for='packageName'>Select Package<span style='color: red'>*</span></label>" +
    "<select name='packageName' class='form-control select2 show-tick' id='packageName' title='--Select Package--' data-live-search='true' data-actions-box='true' data-header='Select packageName' onchange='listSchemes(this)'required>"+
    "<option value='' id='selectpackageName' selected>Select Package</option></select>" +
    "</div>" +
    "</div>" +
    "<div class='attachSchemes' id='attachSchemes'>" +
    "</div>" +
    "</div>";

$("#viewPackages").append(appendData);

packagenames.forEach(pkg => {
    $("#packageName").append(
        "<option value=" + pkg.packageid + ">" + pkg.packagename + "</option>"
    );
});

function listSchemes(packageId) {
    $("#attachSchemes").empty();
    var token = $('input[name="_token"]').val();
    var packageid = packageId.value;

    $.ajax({
        url: selectedpackage_site,
        method: "POST",
        data: { PackageId: packageid, _token: token },

        success: function(data) {
            var count = 0;
            var totalGroupslen = data.length;
            var totalGroupsappend =
                '<input type="hidden" name="groups" id="groups" value="' +
                totalGroupslen +
                '">';
            $(".attachSchemes").append(totalGroupsappend);

            $.each(data, function(i, item) {
                count++;
                var subcount = 0;
                var subGroupslen = parseInt(item.services.length) - 1;
               
                var schemeData =
                    '<div class="row">' +

                    '<input type="hidden" name="subgroups' +
                    count +
                    '" id="subgroups' +
                    count +
                    '" value="' +
                    subGroupslen +
                    '">' +
                    '<div class="mainbox-layout col-md-12 col-lg-12 col-sm-12  mainLayout" value="" id="mainLayout' +
                    count +
                    '">' +
                    '<div class="col-sm col-md col-lg">'+
                    '<div class="card">'+
                    '<div class="card-header seperate">'+
                    '<h4 class="card-title">Used Credits : <p id="usedcredits'+count+'" value="" style="display:inline; font-size:20px;">'+0+'</p><p style="display:inline; font-size:20px;">/</p><p id="usablecredits'+count+'" style="display:inline; font-size:20px;">'+item.maingrpusablecredit+'</p></h4>'+
                    '</div>'+
                    '<div class="card-body">'+
                    '<div class="row mainrow'+count+'"><div class="col-md-6 col-lg-4 col-sm-12 grp'+count+'"><div class="card card-widget widget-user subgroups">' +
                    '<div class="card-body">' +
                    '<div class="table-responsive">'+
                    '<table class="table table-bordered">' +
                    '<div class="table-fontcolor">' +
                    '<h3 style="center">' +
                    item.maingrpname +
                    "<h3/>" +
                    "<thead>" +
                    '<tr class="table-fontcolor">' +
                    "<th>Services</th>" +
                    "<th>Credits</th>" +
                    "<th>Used</th>" +
                    "</tr>" +
                    "</thead>" +
                    '<tbody id="service' +
                    i +
                    '"class="selectCheckbox' +
                    count +
                    '">';
                    "</tbody>" + "</div>";
                    "</table>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>" +
                    "</div>";

                $(".attachSchemes").append(schemeData);

                //  --------------------------------------------main services---------------------------------
                if (item.services[0]) {
                    for (var j = 0; j < item.services[0].length; j++) {
                        subcount++;
                        //   console.log(item.services[0].length);
                        $("#service" + i + "").append(
                            '<tr class="table-fontcolor" id="myTableRow' +
                                count +
                                subcount +
                                '"><td id="services' +
                                count +
                                subcount +
                                '">' +
                                item.services[0][j].mainGrpServices +
                                '</td><td id="credits' +
                                count +
                                subcount +
                                '" value=' +
                                item.services[0][j].mainGrpCredits +
                                ">" +
                                item.services[0][j].mainGrpCredits +
                                '</td><td><input type="checkbox" onclick="selectService(' +
                                count +
                                subcount +
                                "," +
                                count +
                                "," +
                                count +
                                ');"  name="case' +
                                count +
                                '[]" id="checkbox' +
                                count +
                                subcount +
                                '"/></td></td></tr>'
                        );
                    }

                    //-------------------------------------------------subservice-----------------------------------------
                    var p = 0;
                    var subgrpcount = 0;
                    for (var m = 0; m < item.services.length; m++) {
                        //  console.log(item.services.length);

                        if (m != 0) {
                            subgrpcount++;
                            var subservicecount = 0;

                            var schemeSubData =
                                '<div class="col-md-6 col-lg-4 col-sm-12 grp'+count+subgrpcount+'"><div class="card card-widget widget-user subgroups">' +
                                '<div class="card-body ">' +
                                '<div class="table-responsive">'+
                                '<table class="table table-bordered">' +
                                '<div class="table-fontcolor">' +
                                '<h3 style="center">' +
                                item.maingrpname +
                                "<h3/>" +
                                "<thead>" +
                                '<tr class="table-fontcolor">' +
                                "<th>Services</th>" +
                                "<th>Credits</th>" +
                                "<th>Used</th>" +
                                "</tr>" +
                                "</thead>" +
                                '<tbody id="service' +
                                i +
                                p +
                                '" class="selectCheckbox' +
                                count +
                                subgrpcount +
                                '">' +
                                "</tbody>" +
                                "</div>"+
                                "</div>"+
                            "</table>" + "</div>" + "</div>" + "</div>"+"</div>" + "</div>" + "</div>";

                            $(".mainrow"+count).append(schemeSubData);
                            //$(".subgroups:last").after(schemeSubData);

                            for (var k = 0; k < item.services[m].length; k++) {
                                subservicecount++;
                                $("#service" + i + p + "").append(
                                    '<tr class="table-fontcolor " id="subTableRow' +
                                        count +
                                        subgrpcount +
                                        subservicecount +
                                        '"><td id="services' +
                                        count +
                                        subgrpcount +
                                        subservicecount +
                                        '">' +
                                        item.services[m][k].mainGrpServices +
                                        '</td><td id="credits' +
                                        count +
                                        subgrpcount +
                                        subservicecount +
                                        '">' +
                                        item.services[m][k].mainGrpCredits +
                                        '</td><td><input type="checkbox" onclick="selectService(' +
                                        count +
                                        subgrpcount +
                                        subservicecount +
                                        "," +
                                        count +
                                        subgrpcount +
                                        "," +
                                        count +
                                        ');"  name="case' +
                                        count +
                                        subgrpcount +
                                        '[]" id="checkbox' +
                                        count +
                                        subgrpcount +
                                        subservicecount +
                                        '"/></td></td></tr>'
                                );
                            }
                        }
                        p++;
                    }
                }
            });

            checkAjax(packageid);
        },
        dataType: "json"
    });
}

function checkAjax(packageid) {
    var token = $('input[name="_token"]').val();
    $.ajax({
        url: checkedpackage_site,
        method: "POST",
        data: { PackageId: packageid, _token: token },

        success: function(data) {
            console.log('dfdf',data);
            var usedCredits = [];
            var checkArray = [];
            var disabledGrpId = [];
            var usedcreditsGrpId = [];
            data.forEach(element => {
                var id = element.groupId;
                var digits = id.toString().split("");
                var realDigits = digits.map(Number);

                usedcreditsGrpId.push(realDigits[0]);
                disabledGrpId.push(id);
                console.log(disabledGrpId);
                usedCredits.push(element.groupSum);

                var temp = JSON.parse(element.groupcheckList);
                console.log('aaa',temp);
                temp.forEach(element1 => {
                    checkArray.push(element1);
                });
            });
            data.forEach(element => {
                var list = JSON.parse(element.groupcheckList);
                var temp = {
                    groupid: element.groupId,
                    sum: parseInt(element.groupSum),
                    checkId: list
                };
                total.push(temp);
                var demo =
                '<input type="hidden" name="grpid' + element.groupId +  '" id="grpid' + total.length + '" value="' +element.groupId +'">' +
                '<input type="hidden" name="grpsum' + element.groupId +'" id="grpsum' +total.length + '" value="' +element.groupSum +'">';
                $("#grplength").val(total.length);
                $("#inputHiddenFields").append(demo);
            });
            check(checkArray, usedCredits, usedcreditsGrpId, disabledGrpId);
        },
        dataType: "json"
    });
}

function check(checkArray, usedCredits, usedcreditsGrpId, disabledGrpId) {
    console.log(usedCredits);
    checkArray.forEach(element => {
        $("#checkbox" + element + "").attr("checked", true).prop('disabled',true);
    });

    var temp = [];
    usedcreditsGrpId.forEach(element => {
        console.log(element);
        var demo = { usedcreditsGrp: element, usedcredits: 0 };
        temp.push(demo);
        var mainLayout = $("#mainLayout" + element);

        disabledGrpId.forEach(element1 => {
            mainLayout
                .descendants($(".grp" + element1))
                .siblings()
                .addClass("disable_group");
        });
    });

    for (let k = 0; k < usedCredits.length; k++) {
        temp[k].usedcredits = usedCredits[k];
        $("#usedcredits" + temp[k].usedcreditsGrp + "").text(usedCredits[k]);
    }

 
    console.log(temp);
}

function selectService(cnt, cnt1, mainGrpcnt) {
    console.log(cnt, cnt1, mainGrpcnt);

    if ($("#checkbox" + cnt + "").is(":checked")) {
        $("#checkbox" + cnt + "").attr("checked", true);
       
        addTotal(cnt,cnt1,mainGrpcnt);

        $("#mainLayout" + mainGrpcnt)
            .find($(".grp" + cnt1))
            .siblings()
            .addClass("disable_group");
    } else {
        var totalSelectedCheckbox = $(".selectCheckbox" + cnt1).find(
            "input[name='case" + cnt1 + "[]']:checked"
        ).length;
        subTotal(cnt,cnt1,mainGrpcnt);
        if (totalSelectedCheckbox == 0) {
            $("#checkbox" + cnt + "").attr("checked", false);

            $("#mainLayout" + mainGrpcnt)
                .find($(".grp" + cnt1))
                .siblings()
                .removeClass("disable_group");
        }
    }
}

function addTotal(cnt, cnt1,mainGrpcnt) {
  var usablecredit=$('#usablecredits'+mainGrpcnt+"").text();
 // console.log('uc'+usablecredit);
  var usedcredits=$('#usedcredits'+mainGrpcnt+"").text();
  console.log('uc11'+usedcredits);

 console.log('total',total.length);
    for (let i = 0; i < total.length; i++) {
      
        if(usedcredits!=0){
            total[i].sum=usedcredits;
            console.log('sum',total[i].sum);
        }
        if (total[i].groupid == cnt1) {
            var t = total[i].sum;
            // console.log('check'+t);
            var value1 = parseInt($("#credits" + cnt).text());

            var t = parseInt(t) + parseInt(value1);
           
            // console.log(t);
            if(parseInt(t) <= usablecredit){
              var usedcredits=$('#usedcredits'+mainGrpcnt+"").text(t);
            //   console.log('bbbbbb');
              total[i].sum = t;
              var j = i + 1;
              $("#grpsum" + j).val(t);
                console.log('aftertotal',total[i].sum);
              var temp2 = total[i].checkId;
              temp2.push(cnt);
              total[i].checkId = temp2;
             console.log(total);
              $("#checklistArray").val(JSON.stringify(total));
              return;
            }else{
              console.log('sorry');
              $("#checkbox" + cnt + "").prop("checked",false);

              return false;
             // return;
            }
        }
    }
    if(usedcredits==0){
      // total.sum=usedcredits;
  
    var value1 = $("#credits" + cnt).text();
    var usedcredits=$('#usedcredits'+mainGrpcnt+"").text(value1);

    var temp2 = [];
    temp2.push(cnt);
    var temp = {
        groupid: cnt1,
        sum: parseInt(value1),
        checkId: temp2
    };
  
    total.push(temp);
  }
 
    console.log(total);
    
    var demo =
        '<input type="hidden" name="grpid' + cnt1 +  '" id="grpid' + total.length + '" value="' +cnt1 +'">' +
        '<input type="hidden" name="grpsum' + cnt1 +'" id="grpsum' +total.length + '" value="' +value1 +'">';
    $("#grplength").val(total.length);
    $("#checklistArray").val(JSON.stringify(total));
 
    $("#inputHiddenFields").append(demo);

}

function subTotal(cnt, cnt1, mainGrpcnt) {
    console.log(total);
    console.log(total.length);

    var usedcredits=$('#usedcredits'+mainGrpcnt+"").text();
  console.log('uc11'+usedcredits);
  
    for (let i = 0; i < total.length; i++) {
      if(usedcredits!=0){
        total[i].sum=usedcredits;
    }
        if (total[i].groupid == cnt1) {
            var t = total[i].sum;
            var value1 = $("#credits" + cnt).text();
            var t = t - parseInt(value1);
            var usedcredits=$('#usedcredits'+mainGrpcnt+"").text(t);

            total[i].sum = t;
            var j = i + 1;
            $("#grpsum" + j).val(t);
            temp2 = total[i].checkId;
            for (let kl = 0; kl < temp2.length; kl++) {
                if (cnt == temp2[kl]) {
                    temp2.splice(kl, 1);
                }
            }

            total[i].checkId = temp2;
            console.log(total);
            $("#checklistArray").val(JSON.stringify(total));
            return;
        }
    }
    if(usedcredits==0){
      var value1 = $("#credits" + cnt).text();

      var temp = {
          groupid: cnt1,
          sum: parseInt(value1),
          checkId: temp2
      };
      total.push(temp);
    }
    
    var demo =
        '<input type="hidden" name="grpid' +
        cnt1 +
        '" id="grpid' +
        total.length +
        '" value="' +
        cnt1 +
        '">' +
        '<input type="hidden" name="grpsum' +cnt1 +'" id="grpsum' +total.length +'" value="' + value1 +'">';
    $("#grplength").val(total.length);
    $("#checklistArray").val(JSON.stringify(total));
    $("#inputHiddenFields").append(demo);
  
}

function viewpackage(packageid, packagename){

    $("#attachSchemes").empty();
    var token = $('input[name="_token"]').val();

    $.ajax({
        url: selectedpackage_site,
        method: "POST",
        data: { PackageId: packageid, _token: token },

        success: function(data) {
            $('#viewpackagemodal #packagenamemodal').text(packagename);
            var count = 0;
            var totalGroupslen = data.length;
            var totalGroupsappend ='<input type="hidden" name="groups" id="groups" value="' +totalGroupslen +'">'+
            '<div style="text-align:center; font-size:25px; font-weight:550;">'+packagenames+'</div>';
            
            //$(".attachSchemes").append(totalGroupsappend);

            $.each(data, function(i, item) {
                count++;
                var subcount = 0;
                var subGroupslen = parseInt(item.services.length) - 1;
              
              
                var schemeData =
                ' <input type="hidden" name="packageName">'+
                    '<div class="row">' +
                        '<input type="hidden" name="subgroups' +count +'" id="subgroups' +count +'" value="' +subGroupslen +'">' +
                    '<div class="mainbox-layout col-md-12 col-lg-12 col-sm-12  mainLayout" value="" id="mainLayout' +count +'">' +
                    
                    // -------------------------------------------------mainlayout-------------------------
                        '<div class="col-sm col-md col-lg">'+
                            '<div class="card">'+
                                '<div class="card-header seperate">'+
                                '<h4 class="card-title">Credits : <p id="usablecredits'+count+'" style="display:inline; font-size:20px;">'+item.maingrpusablecredit+'</p></h4>'+
                                '</div>'+
                                '<div class="card-body">'+
                                    '<div class="row mainrow'+count+'">'+
                                        '<div class="col-md-6 col-lg-4 col-sm-12 displaycard grp'+count+'">'+
                                            '<div class="card card-widget widget-user subgroups">' +
                                                '<div class="card-body">' +
                                                    '<div class="table-responsive">'+
                                                        '<table class="table table-bordered">' +
                                                            '<div class="table-fontcolor">' +
                                                            '<h3 style="center">'+ item.maingrpname +'<h3/>' +
                                                                '<thead>' +
                                                                    '<tr class="table-fontcolor">' +
                                                                        '<th>Services</th>' +
                                                                        '<th>Credits</th>' +
                                                                    '</tr>' +
                                                                '</thead>' +
                                                            '<tbody id="service' +i +'"class="selectCheckbox' +count +'"></tbody>' +
                                                            '</div>'+
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
                    //console.log(schemeData);
                $(".attachSchemes").append(schemeData);

               

               
                //  --------------------------------------------main services---------------------------------
                if (item.services[0]) {
                    var sum =0;
                    for (var j = 0; j < item.services[0].length; j++) {
                        subcount++;
                        console.log(item.services[0]);
                        $('#usedcredits'+count).text(sum);
                        var row = '<tr class="table-fontcolor " id="subTableRow' + item.services[0][j].serviceposition +'">'+
                                        '<td id="services'+ item.services[0][j].serviceposition +'">' + item.services[0][j].mainGrpServices +'</td>'+
                                        '<td id="credits' +item.services[0][j].serviceposition+'" value=' +item.services[0][j].mainGrpCredits +">" +item.services[0][j].mainGrpCredits +'</td>';
                        $("#service" + i).append(row);

                        
                    }

                    //-------------------------------------------------sublayout-----------------------------------------
                    var p = 0;
                    var subgrpcount = 0;
                    for (var m = 0; m < item.services.length; m++) {
                      
                        if (m != 0) {
                            subgrpcount++;
                            var subservicecount = 0;

                            var schemeSubData =
                                '<div class="col-md-6 col-lg-4 col-sm-12 displaycard grp'+count+subgrpcount+'">'+
                                    '<div class="card card-widget widget-user subgroups">' +
                                        '<div class="card-body ">' +
                                            '<div class="table-responsive">'+
                                                '<table class="table table-bordered">' +
                                                    '<div class="table-fontcolor">' +
                                                    '<h3 style="center">'+item.maingrpname + '<h3/>' +
                                                        '<thead>' +
                                                            '<tr class="table-fontcolor">' +
                                                                '<th>Services</th>' +
                                                                '<th>Credits</th>' +
                                                            '</tr>' +
                                                        '</thead>' +
                                                        '<tbody id="service' +i + p +'" class="selectCheckbox' +count + subgrpcount +'"></tbody>'+
                                                    '</div>' +
                                                '</table>' +
                                            '</div>' + 
                                        '</div>' + 
                                    '</div>' + 
                                '</div>'+
                                // -----------------remaining two open divs of mainlayout are closed here-----------------------
                                '</div>'+
                                '</div>';
                                // --------------------------------------------------------------------------------------------

                            $(".mainrow"+count).append(schemeSubData);
                          

                            // -----------------------------------------------------subservices--------------------------------------
                            
                            for (var k = 0; k < item.services[m].length; k++) {
                                subservicecount++;
                                
                            
                                $('#usedcredits'+count).text(sum);
                                var row = '<tr class="table-fontcolor " id="subTableRow' + item.services[m][k].serviceposition +'">'+
                                        '<td id="services' +item.services[m][k].serviceposition +'" value="">' +item.services[m][k].mainGrpServices +'</td>'+
                                        '<td id="credits' +item.services[m][k].serviceposition +'">' +item.services[m][k].mainGrpCredits +'</td>';
                                $("#service" + i + p + "").append(row);
                            }
                        }
                        p++;
                    }
                }
            });
            
            $('#viewpackagemodal').modal('show');
        },
        dataType: "json"
    });
}

function operationpackage(packageid, packagename, packagestatus){
    console.log(packageid.length,packagename.length,packagestatus.length);
    if(packageid.length > 0 && packagename.length > 0 && packagestatus.length > 0 ){
        console.log('inside');
        $('#operationmodal #opetationpackageid').val(packageid);
        $('#operationmodal #opetationpackagestatus').val(packagestatus);
        $('#operationmodal #btn').removeClass('btn-danger');
        $('#operationmodal #btn').removeClass('btn-success');

        if(packagestatus == 'Deactive'){
            $('#operationmodal #operationmodalname').text('Deactive Package');
            $('#operationmodal #operationbtn').text('Deactive');
            $('#operationmodal #btn').addClass('btn-danger');
            $('#operationmodal #operationmsg').text('Are you sure to deactive '+packagename+' package?');
        }else{
            $('#operationmodal #btn').addClass('btn-success');
            $('#operationmodal #operationmodalname').text('Active Package');
            $('#operationmodal #operationbtn').text('Active');
            $('#operationmodal #operationmsg').text('Are you sure to active '+packagename+' package?');
        }

        $('#operationmodal').modal('show');

    }else{

        $('#operationmodal').modal('hide');
        toastr.error("Something wrong occure!");
    }



}