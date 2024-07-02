var itime=0;

document.addEventListener("mousemove", function (e) {
    itime=0;
    
});



function myTimers() {
    const d = new Date();
    if(lLoginTime.innerHTML=="")
            IndexObj.lLoginTime.innerHTML=d.toLocaleTimeString();
            IndexObj.lRunningTime.innerHTML = d.toLocaleTimeString();
            itime =itime  +1;

    if(itime>10){
        IndexObj.dUserLog.style.display="";
    }

}



function fTimings(){


    myTimer();


}


console.log("Common!");

var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);

var Mode = urlParams.get("Mode");
var Empid = urlParams.get("Empid"); //"487";
var IDD = urlParams.get("IDD");
var Userid = urlParams.get("Lid"); //"74";

console.log("PageLoad Userid" + Userid);
console.log("PageLoad Empid" + Empid);


var CompletedLevel = 0;
var UserLevel = 0;
var isFinalLevel = 0;
var UserType = "";

var GLoginUserid = 0;

var GAppLock = urlParams.get("AppLock");
var GAprLock = urlParams.get("AprLock");

//var isFinalLevel = 0;
var CurLevel = 0;


var DF = "";
var DT = "";
var GYR = "";


if (Mode == null)
    Mode = "Apply";
if (GAppLock == null)
    GAppLock = '2022-01-01'

if (GAprLock == null)
    GAprLock = '2022-01-01'

try {

    var FileObj = window.parent;
	//GYR = window.parent.parent.selYr.value;

    if (FileObj.parent.tFrm) {
        DF = FileObj.parent.tFrm.value;
        DT = FileObj.parent.tTo.value;
        GYR = FileObj.parent.selYr.value;
    }
    
    var FileLoc = String(FileObj.location);
    FileLoc = FileLoc.toUpperCase();
    var result = FileLoc.includes("INDEX.HTM");
    var IndexObj = null;
    var iloc = 0;

    while (!FileLoc.toUpperCase().includes("INDEX.HTM") && iloc < 5) {
        FileObj = FileObj.parent;
        FileLoc = String(FileObj.location);
        iloc++;
    }

    IndexObj = FileObj;


    var EditorObj = null;


    if (FileObj.document.getElementById("DFrame"))
        FileObj = FileObj.document.getElementById("DFrame").contentWindow;

    
}
catch (e) { }

if (IDD == null)
    IDD = 0;
if (Mode == null)
    Mode = "Apply";

if (Empid == null)
    Empid = FileObj.GEmpid;
GLoginUserid = IndexObj.LoginUserid;


var GWhr = "";
var GDTS = "";
var GHDR = "";
var GCond = "";

function GetLists() {
    fSplitDetails(window.parent.GTab);
 }

function fSplitDetails(Obj) {
    if (Obj.querySelector(".hDetails")) {
        var sp = Obj.querySelector(".hDetails").value.split("^");
        GWhr = sp[0];
        GDTS = sp[1];
        GHDR = sp[2];
        Userid = sp[3];
        GCond = "";
    }
}

console.log("GetLists :Userid" + Userid);
console.log("GetLists :Empid" + Empid);


//---------------------------Heading

function fFormHeading(Heading, PageName, Refresh, CloseIcon) {

    var st = "<table cellspacing=0 width=100%>"
                + "<tr>"
                + "<td  width=50%><label class=gHeader><font size=3px>" + Heading + "</font></label><label id=lHeading class=FilterHeading></label></td>"
                + "<td  align=right class=Icons>";


    if (typeof Refresh == "undefined")
        st += "&nbsp;<img class='Refresh' src='actions/Cancel.Png' id=iRefresh style='width:30px;height:30px;'  title='Refresh' onclick=\"window.location.href='" + PageName + "'\">";
    if (typeof CloseIcon != "undefined") {
        st += "&nbsp;<img src='icons/Close.Png' id=iRefresh style='width:30px;height:30px;'  onclick='fnclose()'>";
    }
    st += "</td></tr></table>";

    document.querySelector(".Heading").innerHTML = st;

    return st;

}


//---------------------------


//------------------------- Apply Approval Parameters with Group ------------------------------------------------------


function fCommon(G, portal) {


    if (Empid == null) {
        Empid = window.parent.GEmpid;
    }

    console.log("UserID:" + Userid);
    console.log("GEmpid:" + Empid);
 
    if (UserLevel == null || UserLevel == 0) {
        UserLevel = window.parent.GLvl;
        if (UserLevel == null || UserLevel == 0)
            UserLevel = FileObj.fGetVal("exec TransPage @Opt=19,@Empid=" + Empid + ",@Userid=" + Userid + ",@TransGrpid=" + G + "");

    }
    alert(UserLevel);
    console.log("UserLevel:" + UserLevel);

    isFinalLevel = FileObj.fGetVal("exec TransPage @Opt=20,@Empid=" + Empid + ",@ULevel=" + UserLevel + ",@Userid=" + Userid + ",@TransGrpid=" + G + "");

    console.log(" isFinalLevel   :" + isFinalLevel);

    UserType = FileObj.fGetString("exec [TransPage] @Opt=21,@Empid=" + Empid + ",@ULevel=" + UserLevel + ",@Userid=" + Userid + ",@TransGrpid=" + G + "");

    console.log("UserType:" + UserType);
    console.log("Mode:" + Mode);

    //LFooters.appendChild(FileObj.fDirectFooter(Empid, G, IDD, UserLevel, Userid, 1, 0));


    if (LFooters) {
        LFooters.innerHTML = "";
        //if (G == 9 || G == 1 || portal == 1 || G == 18 || G==19 || G == 5) {
        LFooters.appendChild(fnFooters(Empid, G, IDD, UserLevel, Userid, 1, 0));
        //}
        //else
        //		LFooters.appendChild(FileObj.fDirectFooter(Empid, G, IDD, UserLevel, Userid, 0, 0));
    }

    tdButtons.innerHTML = fCreateApplyApproveButtons();

    // alert(10);
    //try { fLoadApproves(G); } catch (e) { }
    // try { fCalendar(); } catch (e) { }



}


function fCommonNew(G, portal) {
    
    if (Empid == null) {
        Empid = window.parent.GEmpid;
    }
    
    
    isFinalLevel = 0;
    
    LFooters.innerHTML = "";
    LFooters.appendChild(fnFooters(Empid, G, IDD, UserLevel, Userid, 1, 0));
    tdButtons.innerHTML = fCreateApplyApproveButtons();
    
    fISFinalLevel();

        
    console.log("UserID:" + Userid);
    console.log("GEmpid:" + Empid);
    console.log("UserLevel:" + UserLevel);
    console.log(" isFinalLevel   :" + isFinalLevel);
    //UserType = "Employee";

    LUserType.innerHTML= UserType;

    console.log("UserType:" + UserType);

    console.log("Mode:" + Mode);

}

function fnFooters(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print) {
    var st = "exec [TPage] @Opt=16,@Empid=" + Empid + ",@TransGrpid=" + TransGrpid + ",@USerid=" + Userid + ",@IDD=" + IDD + ",@Print=" + Print + "";

    console.log("Footer:" + st);
    var res1 = FileObj.fQry(st);
    var FString = res1;
    return fnFooter_HR(FString, Lvl, HR, Print);

}





function fCreateApplyApproveButtons() {
    console.log("Buttons");
    var st = "<input class='btnApply' type='button' style='display:none;height: 30px; font-size: 12px;  border: 1px solid #CFCFCF;' id='btnApply' name='btnApply' value=' Apply ' onclick='fnSave(1);' >"
            + "&nbsp;&nbsp;<input class='btnCancel' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnEditApply' name='btnEditApply' value=' Edit Request ' onclick='fnSave(10);' >"
            + "&nbsp;&nbsp;<input class='btnCancel' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnCancel' name='btnCancel' value=' Cancel Apply ' onclick='fnSave(3);' >"
            + "&nbsp;&nbsp;<input class='btnForward' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnForward' name='btnForward' value=' Approve and Forward ' onclick='fnSave(5);' >"
            + "&nbsp;&nbsp;<input class='btnApprove' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnApprove' name='btnApprove' value=' Approve ' onclick='fnSave(2);' >"
            + "&nbsp;&nbsp;<input class='btnReturn' type='button' style='display:none;height: 30px; font-size: 12px;' id='bReturn' name='bReturn' value=' Return ' onclick='fnSave(6);' >"
            + "&nbsp;&nbsp;<select style='width:90%;display:none;height: 30px; font-size: 12px;' id='SelApprovers' name='SelApprovers'></select>"
            + "&nbsp;&nbsp;<input class='btnReturn' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnReturn' name='btnReturn' value=' Return ' onclick='fnSave(6);' >"
             + "&nbsp;&nbsp;<input class='bCancelReturn' type='button' style='display:none;height: 30px; font-size: 12px;' id='bCancelReturn' name='bCancelReturn' value=' Cancel Return ' onclick='fCancelReturn();' >"
            + "&nbsp;&nbsp;<input class='btnReject' type='button' style='display:none;height: 30px; font-size: 12px;' id='btnReject' name='btnReject' value=' Reject ' onclick='fnSave(4);' >";
    return st;
}


function fLoadApproves(Grpid) {
    with (form1) {
        var GT = FileObj.fQry("exec TransPage @Opt=22,@Userid=" + Userid + ",@Empid=" + Empid + ",@TransGrpid=" + Grpid + "");
        var GT1 = fDistinctCols(GT.split("!!"), "Userid~Approver");
        window.parent.fCombo(SelApprovers, GT1, "A-Approvers");
        SelApprovers.value = 0;
    }
}


function fReturnTo() {
    SelApprovers.style.display = "";
    btnReturn.style.display = "";
    bCancelReturn.style.display = "";
}

function fCancelReturn() {
    SelApprovers.style.display = "none";
    btnReturn.style.display = "none";
    bCancelReturn.style.display = "none";
}


function fHideButtons() {
    if (btnApply) { btnApply.style.display = "none"; btnApply.style.background = "#FF9999"; btnApply.style.color = "#000000"; }
    if (btnCancel) { btnCancel.style.display = "none"; btnCancel.style.background = "#FF71FF"; btnCancel.style.color = "#000000"; }
    if (btnForward) { btnForward.style.display = "none"; btnForward.style.background = "#FFC66F"; btnForward.style.color = "#000000"; }
    if (btnApprove) { btnApprove.style.display = "none"; btnApprove.style.background = "#8BE28B"; btnApprove.style.color = "#000000"; btnApprove.value = "Final Approve"; }
    if (bReturn) { bReturn.style.display = "none"; bReturn.style.background = "#FFC66F"; bReturn.style.color = "#000000"; }
    if (btnReject) { btnReject.style.display = "none"; btnReject.style.background = "#FF6600"; btnReject.style.color = "#000000"; }


} 

function fEnableButtons(IDD, Status, Mode, ULevel, CompletedLevel, Edit) {
    //      alert(Status);
    //alert(IDD);

    with (form1) {

        console.log("Button Enableing Process");

        fHideButtons();


        if (form1.tRemark) form1.tRemark.readOnly = false;
         
        if (Status == "Approved" || Status == "Cancelled" || Status == "Rejected") {
        }
        else {
            switch (Mode.trim()) {
                case "Apply":
                    if (IDD > 0) {
                        if (Status == "Applied" || Status == "Returned") {
                            btnCancel.style.display = "";
                            if (Status == "Returned") btnApply.style.display = "";

                            if (typeof Edit != "undefined" && Edit == 1) btnEditApply.style.display = "";

                        }
                        else if (IDD > 0 && Status == "Saved") { btnApply.style.display = ""; }

                    }
                    else { //alert(1);
                        btnApply.style.display = "";
                    }
                    if (form1.tRemark) form1.tRemark.readOnly = true;
                    break;
                case "Forward":
                    if (IDD > 0 && ULevel > CompletedLevel) {
                        btnApprove.style.display = "";
                        btnForward.style.display = "";
                        bReturn.style.display = "";
                        btnReject.style.display = "";


                    } break;

                case "Approve":
                    if (IDD > 0 && ULevel > CompletedLevel) {
                        if (Status == "Forwarded")
                            btnApprove.style.display = "";
                        bReturn.style.display = "";
                        btnReject.style.display = "";
                    }
                    break;
            }
        }

        //alert("ISFinal Level :" +  isFinalLevel);

        if (Status == "Approved" || Status == "Cancelled" || Status == "Rejected") {
        }
        else{
            if (isFinalLevel == 1) {
                btnForward.style.display = "none";
                btnApprove.style.display = "";
            }
            else {
                if (Mode != "Apply")
                    if (ULevel > CompletedLevel)
                        btnForward.style.display = "";
                btnApprove.style.display = "none";

            }
        }

        LSTS.innerHTML=Status;
        if (lStatus) lStatus.innerHTML = "<font color=red >Mode:&nbsp;" + Mode + "</font>,<br>"
                        + "<font color=Blue >CurrentLevel:&nbsp;" + ULevel + "</font>,<br>"
                    + "<font color=red >Last Status:&nbsp;" + Status + "</font>,<br>"
                    + "<font color=Blue >Last Completed Level:&nbsp;" + CompletedLevel + "</font>";


            lStatus.style.display="none";

        //  Apply User Can only view the Approver Remark  
        if (Mode == "Apply") {

            if (ApproverRM)
                ApproverRM.style.display = "none";
            if (trRej)
                trRej.style.display = "none";
        }

        if (CurLevel > CompletedLevel) {
            if (tRemark)
                tRemark.value = "";
            if (tReject)
                tReject.value = ""
        }

    }
}


//---------------------------------------------------Footer Details and Log Details--------------------------------------------------------------

//function fnFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print) {
//    var st = "exec [TransPage] @Opt=16,@Empid=" + Empid + ",@TransGrpid=" + TransGrpid + ",@USerid=" + Userid + ",@IDD=" + IDD + ",@Print=" + Print + "";
//    console.log("Footer:" + st);

//    var res1 = MakeGrid.GetLists(st);
//    var FString = res1.value;
//    return fnFooter_HR(FString, Lvl, HR, Print);

//}

function fISFinalLevel(){
    var x=document.querySelectorAll(".Levels");
    isFinalLevel=0;
    if(UserLevel==x.length)
        isFinalLevel=1;

    for(var i=0;i<x.length;i++){
        if(x[i].className=="Levels Current"){
            if(UserLevel==(i+1)){
                    UserType=x[i].querySelector(".UserTypes").innerText;
                    break;       
                }
        }    
       
    }
    

}
function fnFooter_HR(FString, Lvl, HR, Print) {
    var t = document.createElement("table"); t.className = "GridBack Footers", t.style.height = "100%";
    if (Print == 1)
        t.style.width = "100%";

    var FGT = FString.split("!!");
    var Tr;

    if (HR == 1) {
        Tr = t.insertRow(t.rows.length);
        Tr.style.height = "20px";
        Tr.style.verticalAlign = "top";
    }

    for (var i = 1; i < FGT.length-1; i++) {

        if (HR == 0 || typeof HR == "undefined") {
            Tr = t.insertRow(t.rows.length);
            Tr.style.height = "20px";
            Tr.style.verticalAlign = "top";
        }

        var x = Tr.insertCell(Tr.cells.length);
        var Fsp = FGT[i].split("~");

        if (i == Lvl) x.className = "Levels Current";
        else {
            x.className = "Levels L" + i;
            x.style.backgroundColor = "#d1e1bf";
        }
        x.style.textAlign = "center";


        if (Fsp[0]) x.innerHTML += Fsp[0];

        if (Print == 0 || typeof Print == "undefined") {
            if (Fsp[2])
                x.innerHTML += "<br>" + fLogDetails(Fsp[2]);
        }

    }
    return t;
}

function fLogDetails(d) {
    var st = "";
    if (d != "") {
        var sp = d.split(",");
        st = "<table cellspacing=1 width=100% class=RLog>"
        st += "<tr height='20px' valign=middle><td colspan=2 align=center onclick='fOpenLogDetails(this);' style='cursor:hand;'><font color=black>Details</font></td></tr>";
        for (var i = 0; i < sp.length; i++) {
            var s = sp[i].split(":");
            var display = "";
            // if (s[0].includes("hid"))
            display = "style='display:none;'";
            st += "<tr " + display + " class=LogRows><td _class=DContent ><font color=black>" + s[0] + "</font</td><td _class=DContent>:<font color=black>" + s[1] + "</font></td><tr>";
        }
        st += "</table>";
    }
    return st;
}


function fOpenLogDetails(Obj) {
    var Tab = fGetObj(Obj, "RLog");
    if (Tab) {
        var rows = Tab.querySelectorAll(".LogRows");
        if (rows) {
            for (var i = 0; i < rows.length; i++) {
                var x = rows[i];
                if (!x.cells[0].innerText.includes("hid")) {
                    if (x.style.display == "none")
                        x.style.display = "";
                    else
                        x.style.display = "none";
                }
            }

        }
    }
}





//--------------------Save Functions -----------------

function fSaveStr(str) {

    var Res = MakeGrid.saveRec(str);
    try {
        if (parseInt(Res.value) > 0) {
            alert("Record Updated");
        }
        else {
            alert("Record Duplication");
        }
    } catch (e) { alert(e) }

}
function fSaveDisplay(str) {

    var Res = MakeGrid.saveRec(str);
    try {
        if (parseInt(Res.value) > 0) {
            alert("Record Updated");
            fNew(); List();
        }
        else {
            alert("Record Duplication");
        }
    } catch (e) { alert(e) }

}

function fCheckDel(str) {
    if (confirm("Delete The Record?")) {
        var Res = MakeGrid.DelRec(str);
        alert(Res.value);
        fNew();
        List();
    }
}

function CVal(Obj, Msg) {
    if (Obj.value == "") {
        alert("Enter " + Msg);
        Obj.focus();
        return false;
    }
}

function SVal(Obj, Msg) {
    if (Obj.value == 0) {
        alert("Select " + Msg);
        Obj.focus();
        return false;
    }
}


//------------------------------------------------------- 


//------------------------------------------------------------------------------------Employee Base Details-----------------------------------------------------------------------------------------------------------------------


function fnGetEmpDetails(Empid) {
    var st = "exec [Notifications] @Opt=10,@Empid='" + Empid + "'";
    var res = MakeGrid.getEDetails(st);
    tEDetails.innerHTML = res.value;
}

function fnGetEmpDetailshtm(Empid) {
    var st = "exec [Notifications] @Opt=10,@Empid='" + Empid + "'";
    //alert(st);
    var res = MakeGrid.getEDetails(st);
    return res.value;

}



//----------------------

function fCalendar() {
    //alert(dCalendar);
    if (dCalendar) {
        var GT1 = FileObj.fQry(" exec [Pofiles] @Opt=11,@Empid=" + Empid + ",@DF='" + fymd(DF) + "',@DT='" + fymd(DT) + "'");
        if (GT1.length > 1) { dCalendar.innerHTML = fnLoadCal_S(GT1, fymd(DF), fymd(DT)); }
    }
}




/////////////////////--------------------------------------------------



var disp = 0;
var j = 0;
var right_now = new Date();
var month_num = right_now.getMonth();
j = month_num;
var right_year = right_now.getYear();
var gCDate;
var thedate = right_now.getDate()
gCDate = thedate;
var endofmonth = 30;
var hdsplit;
var kstart = new Array(12);
var kk = 1;


function CheckMonth_S() {
    //alert(month_num);

    if (month_num == 0 || month_num == 2 || month_num == 4 || month_num == 6 || month_num == 7 || month_num == 9 || month_num == 11)
        endofmonth = 31;
    if (month_num == 3 || month_num == 5 || month_num == 8 || month_num == 10)
        endofmonth = 30;

    if (month_num == 1) {
        right_year_divided = right_year / 4;
        right_year_divided_string = new String(right_year_divided);
        var is_decimal = right_year_divided_string.indexOf('.');
        if (is_decimal != -1)
        { endofmonth = 28; }
        else
        { endofmonth = 29; }

        right_year_string = new String(right_year);
        var the_century = new String(right_year_string.charAt(2))
        the_century = the_century + new String(right_year_string.charAt(3));
        if (the_century == "00") {
            right_year_divided = right_year / 400;
            right_year_divided_string = new String(right_year_divided);
            var is_decimal = right_year_divided_string.indexOf('.');
            if (is_decimal != -1)
            { endofmonth = 28; }
            else
            { endofmonth = 29; }
        }
    }

}


function fnLoadCal_S(GT) {

    //  tdCalendar.innerHTML = "";

    kk = 1;
    hdsplit = GT.split("!!");
    var str = "<table  cellspacing=1 _class=RCal align=center  height=100% width=100%>";
    str += "<tr height=100px valign=middle>";
    for (var i = 1; i <= 12; i++) {
        kstart[i - 1] = kk;
        if (i == 5 || i == 9) {
            str += "</tr>";
            str += "<tr height=100px valign=middle >";
        }
        str += "<td  style='cursor:hand;' align=center width=20% ><br><br>" + BuildCal_S(sYear.value, i) + "</td>";
    }
    str += "</tr></table>";
    return str;
    //tdCalendar.innerHTML = str;

}

function BuildCal_S(yr, mn) {

    var month_name = new Array("January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December ");
    theday = 0;
    right_year = yr;
    month_num = mn - 1;
    CheckMonth_S();
    var strr = "";
    strr += "<table border=0 class=Cal cellspacing=1 align=center width=90%>";

    strr += "<tr height=20px><td  colspan=7 align=center style='cursor:hand;' onclick='LoadMatrix_S(" + yr + "," + mn + ");'>"
    + "<u class=LayerName style='cursor:hand;padding:10px;'>" + month_name[month_num] + "-" + yr + "</u><BR><BR></td></tr>";

    strr += "<tr class=DCalendarHead height=20px align=center><td >S</td><td  >M</td><td  >T</td><td  >W</td>";
    strr += "<td  >T</td><td  >F</td><td  >S</td></tr>"
    + "<tr  height=25px align=center>";


    first_day = new Date(right_year, month_num, 1)

    for (var counter = 0; counter < 7; counter++) {
        if (counter >= first_day.getDay()) {
            theday = theday + 1;
            var gsplit = hdsplit[kk].split("~");
            console.log(gsplit);

            var Aflg = "";
            var cls = "";
            if (theday == gsplit[2]) {
                Aflg = gsplit[4];
                cls = gsplit[6];
                //console.log(theday);
                // console.log(cls);

                kk++;
            }
            strr += "<td _style='cursor:hand;color:" + cls + "' class=DContent id=td" + theday + " width=14% >" + theday + "<br>" + Aflg + "</td>";
        }
        else { strr += "<td class=DContent></td>"; }
    }
    strr += "</tr>";



    for (var weeks = 0; weeks < 5; weeks++) {
        strr += "<tr  align=center height=25px>";
        for (week = 0; week < 7; week++) {
            theday = theday + 1

            if (theday > endofmonth)
            { strr += "<td >&nbsp;</td>"; }
            else {

                var gsplit = hdsplit[kk].split("~");
                console.log(gsplit);

                var Aflg = "";
                var cls = "";
                if (theday == gsplit[2]) {
                    Aflg = gsplit[4];
                    cls = gsplit[6];
                    //console.log(theday);

                    //console.log(cls);

                    kk++;
                }
                strr += "<td _style='cursor:hand;color:" + cls + ";' class='DContent' id=td" + theday + " width=14% >" + theday + "<br>"
                + "<div style='padding:5px;background-color:" + Aflg + "'>" + Aflg + "</div></td>";
            }

        }
        strr += "</tr>";
    }
    strr += "</table>";
    return strr;
}




function checkNumber(x) {
    // check if the passed value is a number
    if (typeof x == 'number' && !isNaN(x)) {
        var type = "";
        if (Number.isInteger(x))
            type = "integer";
        else
            type = "float";

    } else {
        type = "not a number";
    }
    return type;
}





function IsVal(val) {
    if (val == "0" || val == "0.00" || val == "00:00")
        return "";
    else
        return val;

}


// --------------------- IS Null Function 

function fisNull0(Txt) { if (Txt == "") Txt = 0; return Txt; }

//-----------------------Round Function 

function gr(X) { return Math.round(X * 100) / 100 }


// IS numneric

function isNumeric(num) { return !isNaN(num) }


//------------------------------------------------------ Drop Down List ----------------------------------------------

var LObj = null;
function fGetList(Obj, Query,whr) {
    LObj = Obj;

    DropDown.innerHTML = fFormQrys(Query,whr);

    
    DropDown.style.display = "";
    DropDown.style.zIndex = "10";
    RDropPlace(Obj, DropDown);
}
var DropObj=null;

function fSearchClick(Obj, Query) {
    DropObj=Obj;
    var t=Obj.parentNode.title.split(",")[5].split("@@");
    var divObj = Obj.nextElementSibling;
    var whr=fgetParentTab(Obj,t[0],t[1]);

    fGetList(Obj, Query,whr);
}

function fgetParentTab(Obj,val,Flds){
    var whr ="";
    var k=val.replace("FK","PK");
    var Tab=fGetObj(Obj,"RCal Tables");
    var x = Tab.querySelectorAll(".Entry");
    for (var i = 0; i < x.length; i++) {
        var t;
        if (x[i].title != "") {
            t = x[i].title.split(",");
            if(k==t[5]){
                    if(x[i].querySelector(".compval")){
                       
                        if(x[i].querySelector(".comp").tagName=="SELECT"){
                            x[i].querySelector(".compval").value=x[i].querySelector(".comp").value;
                            whr += " and "+ Flds +"=" + x[i].querySelector(".comp").value;
                        }
                        else
                        whr += " and "+ Flds + "=" + x[i].querySelector(".compval").value;

                    }
                    else
                        whr += " and "+ Flds +"=" + x[i].querySelector(".comp").value;
                       
                        break;
            }
            
        }
    }
        
    return whr;

}

function fSearchDrop(Obj, Query) {
    var divObj = Obj.nextElementSibling;

    if (Obj.value != "" && window.event.keyCode == 13) {
        
        DropObj=Obj;
        var whr="";

        try{
                var t=Obj.parentNode.title.split(",")[5].split("@@");
                if(t.length>0){
                    var whr=fgetParentTab(Obj,t[0],t[1]);
                }
         }
      catch(e){}

        fGetList(Obj, Query,whr);

    }
    else {
        DropDown.style.display = "none";
    }
}

function fSearchClickss(Obj, Query) {
    var divObj = Obj.nextElementSibling;
    DropObj=Obj;
    var whr="";

    try{
            var t=Obj.parentNode.title.split(",")[5].split("@@");
            if(t.length>0){
                var whr=fgetParentTab(Obj,t[0],t[1]);
            }
    }
    catch(e){}

    if (Obj.value != "") {
        fGetList(Obj, Query,whr);

    }
    else {
        DropDown.style.display = "none";
    }
}






function fFormQrys(query,whr) {

    var q = query.split("@@");
    var p = q[0] + " as IDD,"
    
    var r = q[1].replaceAll("#",",");

    var t = r.split("from");
    
    var l = t[1].indexOf(" ")
    
    var Tab = "";
    if (l == 0) Tab = t[1].trim();
    else Tab = t[1].substring(0, l).trim();
    
    
    var f = r.substring(0, r.indexOf(" ")).trim();

    var o=f.split(",");

    r = r.substring(r.indexOf(" ") + 1, r.length);
    
    f = o[0] + " as TEXT ";
    var OtherText="";

    for(var k=1;k<o.length;k++){
        f += "," + o[k] ;
        OtherText += "," + o[k] ;
    }
    

    r = f + r;
    p = p + r;
    if (typeof whr != "undefined")
    p  += " where 1=1 " + whr;


    p = " select IDD,TEXT "+ OtherText + " from (" + p + ") as d1 where TEXT LIKE '%" + LObj.value + "%'";

        console.log("Query="+ p);

    var G = window.parent.fQry(p).split("!!");

    var Table = "<table class=DGridTable  cellspacing=1 border=0 align=center>"
    var HSP = G[0].split("~");

    try {
        Table += "<tr class=DFldHead valign=middle height='18px;'>";
        Table += "<td class=DContent style='display:none;'>" + HSP[0] + "</td>";

        for (var j = 1; j < HSP.length; j++) {
            Table += "<td class=DFldHead>" + HSP[j] + "</td>";
        }
        Table += "</tr>";
    }
    catch (e) { }

    try {
        for (var i = 1; i < G.length; i++) {
            var DSP = G[i].split("~");
            Table += "<tr class=DContent valign=middle height='18px;'>";

            Table += "<td class=DContent style='display:none;'>" + DSP[0] + "</td>";
            for (var j = 1; j < DSP.length; j++) {
                if (j == 1)
                    Table += "<td class=DContent onclick=fnGetObj1(this.parentNode) ><input type=text style='width:0%' id=hids name=hids	 onkeyup=fnCtrlDown(this); onkeypress=fnGetObj(this.parentNode.parentNode);  onblur=fngetOut(this); onfocus=fnGetInn(this)>" + DSP[j] + "</td>";
                else
                    Table += "<td class=DContent width=15%>" + DSP[j] + "</td>";


            }
            Table += "</tr>";
        }
    }
    catch (e) { }
    Table += "</table>";
    return Table;

}

function fnGetObj1(Obj) {

    var hidObj = LObj.parentNode.querySelector(".compval");
    if (hidObj) hidObj.value = Obj.cells[0].innerText;

    LObj.value = Obj.cells[1].innerText;

   // if(Obj.cells[2].innerText)
    
    
    try{
    var t=DropObj.parentNode.title.split(",")[5].split("@@");
    fnPlaceOthers(Obj,t[0]); } catch(e){}
    

    DropDown.innerHTML = "";
    DropDown.style.display = "none";
}

function fnPlaceOthers(Obj,val){
    
    var k=val.replace("FK","DP");
    
    var scount=2;

    var Tab=fGetObj(DropObj,"RCal Tables");
    var x = Tab.querySelectorAll(".Entry");
    for (var i = 0; i < x.length; i++) {
        var t;
        if (x[i].title != "") {
            t = x[i].title.split(",");
            if(typeof  t[5] != "undefined"){
                if(k==t[5]){
                    x[i].innerText= Obj.cells[scount].innerText;
                    scount++;
                }   
            }
               
        }

    }

}

function fnGetObj(Obj) {

    if (window.event.keyCode == 13) {
        var hidObj = LObj.parentNode.querySelector(".compval");

        if (hidObj) hidObj.value = Obj.cells[0].innerText;
        LObj.value = Obj.cells[1].innerText;
        DropDown.innerHTML = "";
        DropDown.style.display = "none";

    }
}

function fCloseDrop() {

    if (window.event.keyCode == 27)
        DropDown.style.display = "none";

}


function fcp(Obj, Query, Fld1, Fld2, Heading) {

    var GT = window.frames[0].fQry(Query);
    var GT1 = fDistinctCols(GT.split("!!"), "" + Fld1 + "~" + Fld2 + "");

    window.frames[0].fCombo(Obj, GT1, "A-" + Heading + "");
    window.frames[0].sortSelect(Obj); Obj.value = 0;

}




function fc(Obj, Query, Fld1, Fld2, Heading) {
    var GT = FileObj.fQry(Query);

    var GT1 = fDistinctCols(GT.split("!!"), "" + Fld1 + "~" + Fld2 + "");

    FileObj.fCombo(Obj, GT1, "A-" + Heading + "");
    FileObj.sortSelect(Obj); Obj.value = 0;

}





//Validations


function vINT(field) {

    var valid = "\'1234567890*" // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }





}


function vCHAR(field) {

    var valid = "\' abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@-.," // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }




}


function vFLOAT(field) {

    var valid = "\'0123456789-." // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }




}

function vASCII(field) {

    var valid = "\' *!@^%$&+=-|#." // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }




}


function vINTCHAR(field) {

    var valid = "\' abcdefghijklnmopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789._@" // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }




}


function vSYMB(field) {

    var valid = "\' .+-*/(){}[]=^%,<>&" // ALL OTHER CHARACTERS ARE INVALID

    var ok = "yes";
    var temp;
    var temp1 = "";
    for (var i = 0; i < field.value.length; i++) {
        temp = "" + field.value.substring(i, i + 1);
        if (valid.indexOf(temp) == "-1")
        { ok = "no"; } else { temp1 += temp; }
    }
    if (ok == "no") {
        alert("Invalid entry!");
        field.value = temp1;
        field.focus();

    }




}


function vICaps() {


}



function fGetFilter(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }
function fGetBox(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }
function fGetObj(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }

//function fDellBox(TabObj) { try { var len = TabObj.rows.length; var i = 0; while (i <= len) { TabObj.deleteRow(TabObj.rows.length - 1); i++; } } catch (e) { } }

function fDellRec(TabObj) { try { var len = TabObj.rows.length - 2; var i = 0; while (i < len) { TabObj.deleteRow(TabObj.rows.length - 1); i++; } } catch (e) { } }



function fCreateNote(idd, Name, Notes, height, width, top, left, D, T) {
    var Editboxheight = "200px";
    var t = document.createElement("div");
    t.style.top = "" + top + "px",
    t.style.left = "" + left + "px",
    t.className = "Notes",
    t.style.position = "absolute",
    t.style.height = "" + height + "px",
    t.style.width = "" + width + "px",
    t.style.zIndex = "10";
    t.style.id = "Notes";
    Editboxheight = (height-35) + "px";
    dHeader.appendChild(t);

    t.innerHTML = " <table  align=center   width=100%>"
    + " <tr><td align=center  class=StickyHead contentEditable=true width=80%>" + Name + "</td>"
    + "<td align=center align=right><input type=hidden class=Notesid value=" + idd + "> <img src='actions/Save.png' style='width:25px;height:25px;' title=Update onclick='fUpdateNotes(this);'>"
    + "<img src='actions/DeleteRec.png' style='width:25px;height:25px;' title=Update onclick='fDeleteNotes(this);'>"
    + "<img src='icons/Close.png' style='width:25px;height:25px;' onclick=\"fCloseMultiDiv(this,'Notes');\"></td></tr>"
    + "<tr style='height:" + Editboxheight + ";width:98%' valign=top><td class=StickyNotes contentEditable=true colspan=2>" + Notes + "</td></tr>"
    + "</table>";

    fAddDragEvent(t);

}


var HE = null;

function fCreateHelp(idd, Name, Notes, height, width, top, left, D, T) {

    width = 30;


    if (!document.querySelector(".HELP")) {
        var t = document.createElement("div");
        t.style.top = "" + top + "%",
            t.style.left = "" + 100 - (width + 2) + "%",
            t.className = "HELP",
            t.style.position = "absolute",
            t.style.height = "" + height + "%",
            t.style.width = "" + width + "%",
            t.style.zIndex = "10",
            t.style.display = "none",
            t.id = "dHelp";
        dHeader.appendChild(t);
        HE = t;



        t.innerHTML = " <table  align=center  height='100%'  width=100%>"
            + " <tr height='10px'><td align=left  class=BoxHead  width=80%><h2><img src='icons/Help.png' style='width:30px;height:30px;'/>Help and Conditions</h2></td>"
            + "<td align=center align=right><input type=hidden class=Editorid value=" + idd + "> "
           + " <img src='icons/Reload.png' style='width:25px;height:25px;' onclick='fReloadHelp();' />"
            + "<img src='icons/Close.png' style='width:25px;height:25px;' onclick=\"fCloseDiv('dHelp');\"></td></tr>"
            + "<tr style='height:98%;width:98%' valign=top>"
            + " <td  colspan=2>"
            + " <iframe class='Helps' id=iHelp src='Help.htm' frameborder=0 scrolling=no marginheight=0 marginwidth=0 style='height:100%;width:100%'></iframe> "
            + "</td></tr>"
            + "</table>";

        fAddDragEvent(t);

    }

}

function fReloadHelp() {
    iHelp.src = "Help.htm";
}
function fOpenHelp() {
    alert(document.getElementById("DFrame").GTab);

    alert(window.parent.GTab.innerHTML);

    HE.style.display = "";

}

var GE = null;
function fCreateEditor(idd, Name, Notes, height, width, top, left, D, T) {

    console.log("Creating HTML Editor");

    if (!document.querySelector(".EditorHTML")) {
        var t = document.createElement("div");
        t.style.top = "" + top + "px",
            t.style.left = "" + left + "px",
            t.className = "EditorHTML",
            t.style.position = "absolute",
            t.style.height = "" + height + "%",
            t.style.width = "" + width + "%",
            t.style.zIndex = "15",
            t.style.display = "none",
            t.style.id = "EHTML";
        dHeader.appendChild(t);


        console.log("Created HTML Editor");



        GE = t;

        t.innerHTML = " <table  align=center  height='100%'  width=100%>"
            + " <tr height='10px'><td align=center  class=StickyHead  width=80%>" + Name + "</td>"
            + "<td align=center align=right><input type=hidden class=Editorid value=" + idd + "> "
            + "<img src='actions/Save.png' style='width:20px;height:20px;' title=Update onclick='fUpdateEditor(this);'>"
            + "<img src='actions/DeleteRec.png' style='width:25px;height:25px;' title=Update onclick='fDeleteEditor(this);'>"
            + "<img src='icons/Close.png' style='width:25px;height:25px;' onclick=\"fCloseMultiDiv(this,'EditorHTML');\"></td></tr>"
            + "<tr style='height:98%;width:98%' valign=top><td class=HTMLEditor contentEditable=true colspan=2>"
            + " <iframe class='Frames' id=HTMLEdit src='HTMLDoc.htm' frameborder=2 scrolling=no marginheight=0 marginwidth=0 style='height:100%;width:100%'></iframe> "
            + "</td></tr>"
            + "<tr style='height:20px;width:98%' valign=top><td class=HTMLEditor contentEditable=true colspan=2 align=right><input type=button value=Apply onclick='fApplyEditor();'></td></tr>"
            + "</table>";
        fAddDragEvent(t);
    }

}



function fOpenEditor(Obj) {

    GE.style.display = "";
    var f = document.getElementById("HTMLEdit").contentWindow.document.getElementById("text-input");
    EditorObj = Obj;
    f.innerHTML = Obj.innerHTML;

}


function fApplyEditor(Obj) {
    var f = document.getElementById("HTMLEdit").contentWindow.document.getElementById("text-input");
    EditorObj.innerHTML = f.innerHTML;
    GE.style.display = "none";

}





function fAddDragEvent(e) {
    e.addEventListener("mousedown", function (e) {
        var Obj = e.target;
        fnDGStart(Obj);
    });
    e.addEventListener("dblclick", function (e) {
        var Obj = e.target;
        fResizeBox(Obj);
    });



}



function fCloseMultiDiv(Obj, val) {

    var N = fGetObj(Obj, val);
    N.style.display = "none";
}

var GHeader = ""; var GSP = "";

function fGetNotes() {

    if (GUserid != "0") {
        var dt = "exec SaveHelpers @Opt=3,@Userid=" + GUserid + "";
        var res = document.getElementById("DFrame").contentWindow.fQry(dt);
        var GT = res.split("!!");
        for (var i = 1; i < GT.length - 1; i++) {
            GHeader = GT[0].split("~");
            GSP = GT[i].split("~");
            fCreateNote(fGetColVal("IDD"), fGetColVal("NotesName"), fGetColVal("Editor"), fGetColVal("nHeight"), fGetColVal("nWidth"), fGetColVal("nTop"), fGetColVal("nleft"), fGetColVal("D"), fGetColVal("T"));
        }
    }

}
function fUpdateNotes(Obj) {
    if (GUserid != "0") {
        var IDD = 0;
        var N = fGetObj(Obj, "Notes");
        var IDD = N.querySelector(".Notesid").value;
        var Name = N.querySelector(".StickyHead").innerText;
        var Notes = N.querySelector(".StickyNotes").innerHTML;

        var dt = "exec SaveHelpers @Opt=4,"
            + " @Name='" + Name + "',"
            + " @Notes='" + Notes + "',"
            + " @Userid=" + GUserid + ","
            + " @Height=" + parseInt(N.style.height) + ","
            + " @Width=" + parseInt(N.style.width) + ","
            + " @Top=" + parseInt(N.style.top) + ","
            + " @Left=" + parseInt(N.style.left) + ","
            + " @IDD=" + IDD + "";

        alert(document.getElementById("DFrame").contentWindow.fSaveCmd(dt));
    }
}

function fDeleteNotes(Obj) {
    if (GUserid != "0") {
        if (confirm("Delete Note")) {
            var IDD = 0;
            var N = fGetObj(Obj, "Notes");
            var IDD = N.querySelector(".Notesid").value;
            var dt = "exec SaveHelpers @Opt=5,@IDD=" + IDD;


            alert(document.getElementById("DFrame").contentWindow.fSaveCmd(dt));
            N.remove();
        }
    }
}

function fRemoveNotes() {
    var N = document.querySelectorAll(".Notes");
    for (var i = 0; i < N.length; i++) {
        N[i].remove();
    }
}

function fMakeGTVal(Obj) {

}


var x = document.getElementsByTagName("INPUT")

if (x.length > 1) {
    for (var i = 0; i < x.length; i++) {
        x[i].autocomplete = false;
    }
}
else {
    x.autocomplete = false;
}


function fOpenHTMLEditor(Obj) {
    IndexObj.fOpenEditor(Obj);
}



function fOpenTab(Obj){
    if(Obj.style.display=="none")
        Obj.style.display="";
    else
        Obj.style.display="none";
        fCDV
}



const frc = (salt, text) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
  
    return text
      .split("")
      .map(textToChars)
      .map(applySaltToChar)
      .map(byteHex)
      .join("");
  };
 

  
  const frd = (salt, encoded) => {
    const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
    const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
    return encoded
      .match(/.{1,2}/g)
      .map((hex) => parseInt(hex, 16))
      .map(applySaltToChar)
      .map((charCode) => String.fromCharCode(charCode))
      .join("");
  };


/*

window.addEventListener('contextmenu', function (e) {
// do something here... 
e.preventDefault();
}, false);

*/


function fCDV(Obj){
    eval(Obj).style.display="none";


}



