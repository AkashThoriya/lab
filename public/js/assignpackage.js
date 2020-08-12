var count=1;
var selectid = -1;
var packageNames =
    '<div class="row">' +
    '<div class="mainbox-layout col-12 mainLayout" value="" id="mainLayout">' +   
    '<div class="packages">'+
    '<div class="row prow">'+
    '</div>'+
    '</div>'+
    '</div>' +
    '</div>' ; 

$(".assignPackage").append(packageNames);
var check = 0;
for (let i = 0; i < packagenames.length; i++) {
    var random  =Math.floor(Math.random() * 10);
    const element=packagenames[i];
   var packages = '';
   packages += 
                '<div class="col-md-4 col-lg-4 col-sm-6">';
                    if(random % 2 != 0){
                        packages += '<div class="card card-outline card-primary" onclick="packageDetails('+count+','+element.packageid+',\'' + element.packagename + '\')" id=package'+count+'>';
                    }else if(random % 3 != 0){
                        packages += '<div class="card card-outline card-primary" onclick="packageDetails('+count+','+element.packageid+',\'' + element.packagename + '\')" id=package'+count+'>';
                    }else if(random % 4 != 0){
                        packages += '<div class="card card-outline card-primary" onclick="packageDetails('+count+','+element.packageid+',\'' + element.packagename + '\')" id=package'+count+'>';
                    }else{
                        packages += '<div class="card card-outline card-primary" onclick="packageDetails('+count+','+element.packageid+',\'' + element.packagename + '\')" id=package'+count+'>';
                    }
                        packages +='<div class="card-header">'+
                        '<h3 class="card-title">'+element.packagename+'</h3>'+
                        '</div>'+
                        '<div class="card-body"><spna style="font-size:15px;font-weight:600">Price : </span><span>'+element.actualprice+'</span></div>'+
                    '</div>'+
                '</div>';

                $(".prow").append(packages);
                count++;
}
//$(".packages").append(packages);


function packageDetails(cnt,packageId,pkgname){
    $("#package" + cnt)
    .siblings()
    .addClass("disable_group");

    selectid =  packageId;
    $('#showPackageDetails').empty();
    console.log(pkgname);
    var token = $('input[name="_token"]').val();
    $.ajax({
        url: packageselected_site,
        method: "POST",
        data: { packageId: packageId, _token: token },
        success: function(data) {
            var count = 0;
            $(".showPackageDetails").append('<div>'+
            '<h3 style="text-align:center;" class="card bg-off "><span id="packageList">'+pkgname+'</span></h3>'+
            '</div>');

            $.each(data, function(i, item) {
                console.log(data);
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
                    '<div class="card specific">'+
                    '<div class="card-body">'+
                    '<div class="row mainrow'+count+'"><div class="col-md-4 col-lg-4 col-sm-12"><div class="card card-widget widget-user subgroups grp' +
                    count +
                    '">' +
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

         
                $(".showPackageDetails").append(schemeData);

                //  --------------------------------------------main services---------------------------------
                if (item.services[0]) {
                    for (var j = 0; j < item.services[0].length; j++) {
                        subcount++;
                        //   console.log(item.services[0].length);
                        $("#service" + i + "").append(
                        '<tr class="table-fontcolor" id="myTableRow' +count +subcount +'">'+
                        '<td id="services' +count +subcount +'">' +item.services[0][j].mainGrpServices +'</td>'+
                        '<td id="credits' +count +subcount +'" value=' +item.services[0][j].mainGrpCredits +">" +item.services[0][j].mainGrpCredits +'</td>'+
                        '</tr>'
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
                                '<div class="col-md-4 col-lg-4 col-sm-12"><div class="card card-widget widget-user subgroups grp' +
                                count +
                                subgrpcount +
                                '">' +
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
                                "</table>" + 
                                "</div>" + 
                                "</div>" + 
                                "</div>"+ 
                                "</div>"+ 
                                "</div>"+ 
                                "</div>";

                            $(".mainrow"+count).append(schemeSubData);

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
                                        '</td></tr>'
                                );
                            }
                        }
                        p++;
                    }
                }
            });

        },
        dataType:'json'
    });
}

function enableAllPackage(){
    //console.log('kkkk');
    if ($(".groups").hasClass("disable_group")) {
       $(".groups").removeClass("disable_group");
       $(".showPackageDetails").empty();

     }

}

function checkIfPackageselected(){
   
    if(selectid != -1){
       var selectedId=selectid;
    }
    $('#packageid').val(selectedId);
    return selectedId;
   
}
