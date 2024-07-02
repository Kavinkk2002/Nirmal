
console.log("CFunctions!");

var GRHdr = ""; var GSP = ""; var GQry = ""; var GRCond = ""; var GUserid = ""; var GMnuNo = ""; var GRole = ""; var GEmpid = ""; var GDTS = ""; var GBranch = ""; var GTotRows = ""; var GRht = "";

var GTab = null; var GPageDiv = null; var GFrame = null; var GPage = null; var GPageid = null;

var num = 1;
function addCookie() { document.cookie = num + " = " + num; num++; removeCookies(); }
function removeCookies() { var res = document.cookie; var multiple = res.split(";"); for (var i = 0; i < multiple.length; i++) { var key = multiple[i].split("="); document.cookie = key[0] + " =; expires = Thu, 01 Jan 1970 00:00:00 UTC"; } }

function GetHdr(vObj, variable, con) {

    var Fid = "";
    var Sel = 0;
    try {
        var tObj = form1.elements[vObj];
        if (tObj != null) {
            Fid = variable + "  [";

            if (tObj.length > 0) {
                for (var i = 0; i <= tObj.length - 1; i++) {
                    if (tObj[i].parentNode.className == "FSelect") {
                        Fid += tObj[i].parentNode.innerText + ",";
                        Sel = 1;
                    }
                }
            }
            else {
                if (tObj.parentNode.className == "FSelect") {
                    Fid += tObj.parentNode.innerText + ",";
                    Sel = 1;
                }
            }
            if (Sel == 1)
                Fid = Fid.substring(0, Fid.length - 1) + "]"
            else
                Fid = "";
        }
    }
    catch (e) {
    }
    return Fid;
}

function GetIDS(vObj, variable, con) {

    var Fid = "";
    var Sel = 0;
    try {
        var tObj = form1.elements[vObj];
        if (tObj != null) {
            Fid = con + ' ' + variable + " in(";

            if (tObj.length > 0) {
                for (var i = 0; i <= tObj.length - 1; i++) {
                    if (tObj[i].parentNode.className == "FSelect") {
                        Fid += tObj[i].value + ",";
                        Sel = 1;
                    }
                }
            }
            else {
                if (tObj.parentNode.className == "FSelect") {
                    Fid += tObj.value + ",";
                    Sel = 1;
                }
            }
            if (Sel == 1)
                Fid = Fid.substring(0, Fid.length - 1) + ")"
            else
                Fid = "";
        }
    }
    catch (e) {
    }
    return Fid;
}




function fnGetRoles(Userid, Roles, Types, Auth) {
    var whr = "";
    if (Roles == "HOB")
        whr += " and ev.nBranch_id in(select nBranch_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
    else if (Roles == "HOCT")
        whr += " and ev.nCat_id in(select nCat_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
    else if (Roles == "HODV")
        whr += " and ev.nDivision_id in(select nDivision_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
    else if (Roles == "HOD")
        whr += " and (ev.nDept_id in(select nDept_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + " union All "
			+ " select nDept_id from eadmin..DepartmentAccess where nUser_id=" + Userid + ") or "
				+ "ev.nEmp_id in (select nEmp_id from eadmin..eEmpAccess where nUser_id=" + Userid + "))";
    else if (Roles == "EMP")
        whr += " and ev.nemp_id in (select nemp_id from eAdmin..Users where nUser_id=" + Userid + ")";
    if (Types == "SELF" && Roles != 'HOC') {
        whr += " and ev.nBranch_id in(select nBranch_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
        if (Roles == "HOS")
            whr += " and ev.nDept_id in(select nDept_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
        if (Roles == "HOS")
            whr += " and ev.nSection_id in(select nSection_id from Employeecompany ec inner join eAdmin..users u on u.nEmp_id=ec.nEmp_id and ec.RLive=1 where nUser_id=" + Userid + ")";
    }
    return whr;
}

var ObjDate = ""; var DirectPage = "";

function fOpenMPage(Obj, Page, pageid, SP, MnuNo, PageType, Direct, HeadSP, Rptid) {
   

    var PageName = "";
    if (typeof Direct != "undefined" && Direct != "0") {
        PageName = Direct;
    }
    else {
        if (DirectPage != "" || Obj == null)
            PageName = DirectPage;
        else
            PageName = Obj.innerText;
    }

    //value=\"" + GQry + "^" + GDTS + "^" + GRHdr + "^" + GUserid + "^" + Page + "^" + SP + "^" + MnuNo + "^" + PageType + "\"

   

    /*if (MnuNo > 0 && CBOUT.checked == true) {

        var Path = Tab(PageName, Page, SP, MnuNo, PageType, HeadSP, Rptid);
        window.open(Path); Path = "";
    }
    else {*/
        var x = trtab.insertCell(trtab.cells.length);
 

        x.innerHTML = PageName + "&nbsp;&nbsp;&nbsp;<input type=hidden class=PageName value='" + Page + "'><input type=hidden class=Pageid value=" + pageid + ">"
    		+ "<input type=text style='display:none;' size=30 class=hDetails value=''>"
   		+ "<u><span class='delete' onmousemove='fCheckSpanIn(this);'  onmouseout='fCheckSpanOut(this);' "
			+ "style='cursor:hand;display:none;'>"
		+ "<img onclick='fClosePageTab(this);'  src='close.png' style='width:15px;height:15px;'>";

      //  &nbsp;&nbsp;<img src=iSet/108.gif style='width:20px;height:20px;' onclick='fRefreshs(this);' ></span></u>

     

        //   + "<u><span class='refresh' onmousemove='fCheckSpanIn(this);' onmouseout='fCheckSpanOut(this);' onclick='fRefresh(this);' style='cursor:hand;padding:10px;  background-color: #99FF33;display:none;'>R</span></u>";

        GTab = x;
        var Path = Tab(PageName, Page, SP, MnuNo, PageType, HeadSP, Rptid);

        x.style.height = "20px"; x.className = "Tabselect Tab"; x.style.cursor = "pointer"; x.align = "center";
        x.style.width="120px";
        

        var y = trFPage.insertCell(trFPage.cells.length);
        y.innerHTML = "<iframe class='Frames' src=\"" + Path + "\" frameborder=no scrolling=yes marginheight=0 marginwidth=0 style='height:100%;width:100%;'></iframe>";
        y.className = "tdPage";
        y.style.width = "100%";
    //}
    GPage = Page;
    GPageid = pageid; 
    ObjDate = PageName;
    fActivatePageTab(x);
    AddTabEvent(x);
    IndexObj.fCloseBoxes();
}

var TabMove = 0;

function fRefreshs(Obj) {
    var GT = Obj.parentNode.parentNode.parentNode;
    var spl = GT.querySelectorAll(".hDetails")[0].value.split("^");
    var Path = Tab(GT.innerText, spl[4], spl[5], spl[6], spl[7], spl[8], spl[9]);
    fActivatePageTab(GT);
    GFrame.src = Path;
}


function fCheckSpanIn(Obj) { Obj.style.display = ""; }

function fCheckSpanOut(Obj) { }

function AddTabEvent(e) {


    e.addEventListener("click", function (e) { if (e.target.tagName == "TD") { fActivatePageTab(e.target); } });
    e.addEventListener("mousemove", function (e) { var Obj = e.target; TabMove = 1; Obj.querySelector(".Delete").style.display = ""; });
    e.addEventListener("mouseout", function (e) { var Obj = e.target; TabMove = 0; Obj.querySelector(".Delete").style.display = "none"; });
}

function fClosePageTab(Obj) { var TabObj = Obj.parentNode.parentNode.parentNode; var cindex = TabObj.cellIndex; trtab.deleteCell(cindex); trFPage.deleteCell(cindex); }


/*function fdisprefresh(Obj){
if(Obj.querySelector(".delete").style.display == "")
Obj.querySelector(".refresh").style.display = "";
else
Obj.querySelector(".refresh").style.display = "none";
}*/

function fActivatePageTab(e) {
    var xobj = document.querySelectorAll(".Tab");
    var yobj = document.querySelectorAll(".tdPage");

    GTab = null; GPageDiv = null; GFrame = null; GPage = ""; GPageid = 0;

    for (var j = 0; j < xobj.length; j++) {
        xobj[j].className = "Tabselect Tab";
        yobj[j].style.display = "none";
    }

    for (var j = 0; j < xobj.length; j++) {

        if (xobj[j] == e) {
            GTab = xobj[j];

            xobj[j].className = "TabActive Tab";
            GPageDiv = yobj[j];
            GFrame = GPageDiv.children[0];
            ObjDate = GTab.innerText;
            GPage = GTab.querySelector(".PageName").value;
            GPageid = GTab.querySelector(".Pageid").value;
            yobj[j].style.display = "";
            break;
        }
    }
}

function fExportPDF() {
    GFrame.focus();
    try { GFrame.contentWindow.generatePDF(); } catch (e) { alert(e); }

    /*            alert(GTab);
    var PrintName=GTab.id;
    alert(PrintName);

    const element = GFrame.contentDocument.getElementById("invoice");
     
    var opt = {
    margin:       [0.4, 0, 0.2, 0], 
    filename:     'Sample.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
    */
}




function fPrintFile() {
    //https: //stackoverflow.com/questions/217776/how-to-apply-css-to-iframe
    //alert(GFrame);
    //alert(GPage);
    //alert(GPageid);
    //alert(GTab);
    GFrame.focus();
    var style = document.createElement('style');
    style.textContent = '@media print{@page {size: portrait;  width: auto; height: auto; overflow: visible; display: block !important;position: relative !important; width: auto !important;height: auto !important;overflow: visible !important;margin-left: 0 !important; }} ';
    //GFrame.contentDocument.head.appendChild(style);
    GFrame.contentWindow.print();


}


function Tab(MnuName, Path, SP, MnuNo, PageType, HeadSP, Rptid) {

    if (PSGrade != "0" && Rptid == "223") {
        SP = "[TPaySlipsNewEGrade]"; Path = "ePayslipNewEGgrade.aspx";
    }
    //if (Rptid == 0)
        //dLoading.style.display = "";

    RHdr = "";
    Userid = form1.hUserid.value;
 var   Qry = fnFilt();
    var srch = window.parent.tsearch.value;

  
    if (srch != "" && srch != "Search") Qry = Qry + "  and (cast(ev.vEmpno as varchar) like ''" + srch + "%'' or ev.vname like ''%" + srch + "%'') ";
    Qry = Qry + fnOthers();
    RCond = "";
    DTS = "@DF='" + window.parent.tFrm.value + "',@DT='" + window.parent.tTo.value + "'";

    RHdr = fnHdr(MnuName, MnuNo);


    if (RHdr.includes("Daily")) { RHdr += " For the Date=" + window.parent.tFrm.value; }
    else if (window.parent.tFrm.value != "" && window.parent.tTo.value) { RHdr += " Period Between " + window.parent.tFrm.value + " and " + window.parent.tTo.value; }

    if (GTab)
        GTab.querySelector(".hDetails").value = Qry + "^" + DTS + "^" + RHdr + "^" + Userid + "^" + Path + "^" + SP + "^" + MnuNo + "^" + PageType + "^" + HeadSP + "^" + Rptid;

    var QString = "Hdr=" + RHdr + "&"
        + "SP=" + SP + "&"
        + "HeadSP=" + HeadSP + " &"
        + "Whr= " + Qry + "&"
    // + "RCond=" + RCond + "&"
        + "Lid=" + Userid + "&"
        + "MnuNo=" + MnuNo + "&"
        + "Role=" + form1.hRole.value + "&"
        + "Eid=" + form1.hEmpid.value + "&"
        + "DTS=@DF='" + window.parent.tFrm.value + "',@DT='" + window.parent.tTo.value + "'&"
    // + "BranchAccess=&"
        + "Rows=50000&"
        + "Rht=20px&RWidth=100";

    //------------For Pages
    QString = QString + "&PageType=" + PageType

    //------------For Reports
    var RptQString = "Hdr=" + RHdr + "&SP=" + SP + "&Lid=" + Userid + "&HeadSP=" + HeadSP + "&Role=" + form1.hRole.value + "&"
        + "Eid=" + form1.hEmpid.value + "&Rows=50000&Rht=20px&RWidth=100";

    var WhrQString = "";
    if (Path == "RTreeReport.aspx" || Path == "MRRPT.aspx")
        WhrQString = fOldParam(Userid);
    else
        WhrQString = "@NWhr= '" + Qry + "',@Userid=" + Userid + ",@MnuNo=" + MnuNo + ",@DF='" + window.parent.tFrm.value + "',@DT='" + window.parent.tTo.value + "'";

    var OldQString = "@Userid=" + Userid + ",@DF='" + window.parent.tFrm.value + "',@DT='" + window.parent.tTo.value + "'";

    RptQString = RptQString + "&PageType=" + PageType + "&WhrQString=" + WhrQString + "&Grpid=" + window.parent.selGroup.value + "&Divid=" + window.parent.selDivision.value + "&Branchid=" + window.parent.selBranch.value + "&RPTID=" + Rptid + "&MnuNo=" + MnuNo + "";

    //--------------------------------------------
    var Newpath = "";
    if (parseInt(MnuNo) > 0) {      //------------For Reports
        if (Path.includes("?")) { Newpath = Path + "&" + RptQString; } else Newpath = Path + "?" + RptQString;
    }
    else {       //------------For Pages
        if (Path.includes("?")) { Newpath = Path + "&" + QString; } else Newpath = Path + "?" + QString;
    }
    var RNo = Math.floor((Math.random() * 10) + 1);
    Newpath = Newpath + "&RNo=" + RNo;

    return Newpath;
}

function fOldParam(Userid) {
    var st = ""; var srch = "";
    if (window.parent.tsearch.value != "Search")
        srch = window.parent.tsearch.value;

    st += "@Code='" + srch + "',@Name='" + srch + "',"
        + "@DFrm='" + window.parent.tFrm.value + "',"
        + "@DTo='" + window.parent.tTo.value + "',"
        + "@Monthid=" + window.parent.selMonths.value + ","
        + "@YR=" + window.parent.selYr.value + ","
        + "@Catid=" + window.parent.selCat.value + ","
        + "@Desigid=" + window.parent.selDesig.value + ","
        + "@Branchid=" + window.parent.selBranch.value + ","
        + "@Deptid=" + window.parent.selDept.value + ","
        + "@Divsionid=" + window.parent.selDivision.value + ","
        + "@Grpid=" + window.parent.selGroup.value + ","
        + "@Divid=" + window.parent.selDivision.value + ","
        + "@Userid=" + Userid + "";

    //+"@Typeid=" + window.parent.SelEmpType.value + ","
    return st;

}

var Filt = "";
function fnFilt() {
    var whr = "";

    if (window.parent.selGroup && window.parent.selGroup.value > 0) whr += ' and ev.nGroup_id=' + window.parent.selGroup.value;
    if (window.parent.selDivision && window.parent.selDivision.value > 0) whr += ' and ev.nDivision_id=' + window.parent.selDivision.value;
    if (window.parent.selBranch && window.parent.selBranch.value > 0) whr += ' and ev.nBranch_id=' + window.parent.selBranch.value;
    if (window.parent.selDept && window.parent.selDept.value > 0) whr += ' and ev.nDept_id=' + window.parent.selDept.value;
    if (window.parent.selSection && window.parent.selSection.value > 0) whr += ' and ev.nSection_id=' + window.parent.selSection.value;

    if (window.parent.SelEmpType && window.parent.SelEmpType.value > 0) whr += ' and ev.ETypeid=' + window.parent.SelEmpType.value;

    if (window.parent.selCat && window.parent.selCat.value > 0) whr += ' and ev.nCat_id=' + window.parent.selCat.value;
    if (window.parent.selDesig && window.parent.selDesig.value > 0) whr += ' and ev.nDesig_id=' + window.parent.selDesig.value;
    if (window.parent.selGrade && window.parent.selGrade.value > 0) whr += ' and ev.nGrade_id=' + window.parent.selGrade.value;



    return whr;
}

function fnFiltParent() {
    var whr = "";
    if (window.parent.parent.selGroup && window.parent.parent.selGroup.value > 0) whr += ' and ev.nGroup_id=' + window.parent.parent.selGroup.value;
    if (window.parent.parent.selDivision && window.parent.parent.selDivision.value > 0) whr += ' and ev.nDivision_id=' + window.parent.parent.selDivision.value;
    if (window.parent.parent.selBranch && window.parent.parent.selBranch.value > 0) whr += ' and ev.nBranch_id=' + window.parent.parent.selBranch.value;
    if (window.parent.parent.selDept && window.parent.parent.selDept.value > 0) whr += ' and ev.nDept_id=' + window.parent.parent.selDept.value;
    if (window.parent.parent.selSection && window.parent.parent.selSection.value > 0) whr += ' and ev.nSection_id=' + window.parent.parent.selSection.value;

    if (window.parent.parent.SelEmpType && window.parent.parent.SelEmpType.value > 0) whr += ' and ev.ETypeid=' + window.parent.parent.SelEmpType.value;

    if (window.parent.parent.selCat && window.parent.parent.selCat.value > 0) whr += ' and ev.nCat_id=' + window.parent.parent.selCat.value;
    if (window.parent.parent.selDesig && window.parent.parent.selDesig.value > 0) whr += ' and ev.nDesig_id=' + window.parent.parent.selDesig.value;
    if (window.parent.parent.selGrade && window.parent.parent.selGrade.value > 0) whr += ' and ev.nGrade_id=' + window.parent.parent.selGrade.value;


    var srch = window.parent.parent.tsearch.value;
    if (srch != "" && srch != "Search") whr = whr + "  and (cast(ev.vEmpno as varchar) like ''" + srch + "%'' or ev.vname like ''%" + srch + "%'') ";


    var s = window.parent.parent.taFilters.value;
    if (s.trim() != "") {
        var sp = s.split("\n");
        var mFlt = ""
        for (var i = 0; i < sp.length; i++) {
            mFlt += "''" + sp[i] + "'',";
        }
        mFlt = mFlt.substring(0, mFlt.length - 1);
        whr += " and ( ev.vEmpno in(" + mFlt + ")  or ev.vName in(" + mFlt + ")) ";

    }

    return whr;
}


var Hdr = "";
function fnHdr(GridBackPage, Mnuno) {
    var Hdr = "";
    if (parseInt(Mnuno) > 0) Hdr = GridBackPage + " ";
    if (window.parent.selGroup && window.parent.selGroup.value > 0) Hdr += ' , Group=' + window.parent.selGroup.value;
    if (window.parent.selDivision && window.parent.selDivision.value > 0) Hdr += ' , Division=' + window.parent.selDivision.value;
    if (window.parent.selBranch && window.parent.selBranch.value > 0) Hdr += ' ,Branch =' + window.parent.selBranch.value;
    if (window.parent.selDept && window.parent.selDept.value > 0) Hdr += ' , Department=' + window.parent.selDept.value;
    if (window.parent.SelEmpType && window.parent.SelEmpType.value > 0) Hdr += ' , Employee Type=' + window.parent.SelEmpType.value;
    return Hdr;
}

function fnOthers() {
    var whr = "";
    whr += GetBaseFilters(window.parent.selBasFilter.value, form1.hDate.value, window.parent.tFrm.value, window.parent.tTo.value);
//    whr += GetOthers("hBasic", form1.hDate.value, form1.hDF.value, form1.hDT.value);
    return whr;
}

function GetBaseFilters(val, Dot, DF, DT) {
    var Fid = "";
    DF = fymd(DF);
    DT = fymd(DT);
    //Dot = fymd(Dot);

    switch (val) {
        case "ALL": break;
        case "Salary": Fid += " and DOJ<=''" + DT + "'' and (isnull(DOLI,''1900-01-01'') >=''" + DF + "'' or  isnull(DOLI,''1900-01-01'')=''1900-01-01'')"; break;
        case "Active": Fid += " and DOJ<=''" + DF + "'' and (isnull(DOLI,''1900-01-01'') >=''" + DF + "'' or  isnull(DOLI,''1900-01-01'')=''1900-01-01'')"; break;
        case "New": Fid += " and DOJ between ''" + DF + "'' and ''" + DT + "''"; break;
        case "LeftInd": Fid += " and isnull(DOLI,''1900-01-01'') between ''" + DF + "'' and ''" + DT + "''"; break;
        case "Resigned": Fid += " and isnull(DOL,''1900-01-01'') between ''" + DF + "'' and ''" + DT + "'' "; break;
    }

    return Fid;

}

function GetOthers(vObj, Dot, DF, DT) {
    var Fid = "";
    try {
        var tObj = form1.elements["hBasic"];
        var Current = 0;
        var NormalFlag = 1;

        /*if (tObj[1].parentNode.className == "tdBlueSel") {       // Current Employees on the Particular Current Date  only
        Fid += " and DOJ<=''" + Dot + "'' and (isnull(DOLI,''1900-01-01'') >=''" + Dot + "'' or  isnull(DOLI,''1900-01-01'')=''1900-01-01'') and (isnull(DOL,''1900-01-01'') >=''" + Dot + "'' or  isnull(DOL,''1900-01-01'')=''1900-01-01'')"
        Current = 1;
        NormalFlag = 0;
        }
        if (tObj[2].parentNode.className == "tdBlueSel") {       // New Joined 
        if (Current == 1) {
        Fid += " and DOJ=''" + Dot + "''"
        }
        else {
        Fid += " and DOJ between ''" + DF + "'' and ''" + DT + "''";
        }
        NormalFlag = 0;
        }
        if (tObj[3].parentNode.className == "tdBlueSel") {      // Left Indicate 
        if (Current == 1) {
        Fid += " and isnull(DOLI,''1900-01-01'')=''" + Dot + "''"
        }
        else {
        Fid += " and isnull(DOLI,''1900-01-01'') between ''" + DF + "'' and ''" + DT + "'' ";
        }
        NormalFlag = 0;
        }
        if (tObj[4].parentNode.className == "tdBlueSel") {
        Fid += " and isnull(DOL,''1900-01-01'') between ''" + DF + "'' and ''" + DT + "'' "
        NormalFlag = 0;
        }

        if (NormalFlag == 1) {                                      // Current  Employees  between the Period                    
        Fid += " and DOJ<=''" + DT + "'' and (isnull(DOLI,''1900-01-01'') >=''" + DF + "'' or  isnull(DOLI,''1900-01-01'')=''1900-01-01'') and (isnull(DOL,''1900-01-01'') >=''" + DF + "'' or  isnull(DOL,''1900-01-01'')=''1900-01-01'') ";
        }*/



        if (tObj[5].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nConpf,0)=2"
        }
        if (tObj[6].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nConpf,0)<>2"
        }
        if (tObj[7].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nConESI,0)=2"
        }
        if (tObj[8].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nConESI,0)<>2"
        }

        if (tObj[9].parentNode.className == "tdBlueSel") {
            Fid += " and ev.nEmp_id in (select nEmp_id from EProofnos where isnull(vAcno,'''') not in ('''',''0'')) "
        }
        if (tObj[10].parentNode.className == "tdBlueSel") {
            Fid += " and ev.nEmp_id in (select nEmp_id from EProofnos where isnull(vAcno,'''') in ('''',''0'')) "
        }
        if (tObj[11].parentNode.className == "tdBlueSel") {
            Fid += " and ev.nEmp_id in (select nEmp_id from CurrentSalary where Salary>0) "
        }
        if (tObj[12].parentNode.className == "tdBlueSel") {
            Fid += " and ev.nEmp_id not in (select nEmp_id from CurrentSalary where Salary>0) "
        }
        if (tObj[13].parentNode.className == "tdBlueSel") {
            Fid += " and ev.nEmp_id not in (select nEmp_id from eloan ) "
        }
        if (tObj[14].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nLock,0)=1 "
        }
        if (tObj[15].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nLock,0)=2 "
        }
        if (tObj[16].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.nLock,0)=0 "
        }
        if (tObj[17].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.Confirm,0)=1 "
        }
        if (tObj[18].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.Confirm,0)=0 "
        }
        if (tObj[10].parentNode.className == "tdBlueSel") {
            Fid += " and isnull(ev.Confirm,0)=0 "
        }
    }
    catch (e) {
    }
    return Fid;

}




function fCheckTab() {
    var xobj = document.querySelectorAll(".Tab");
    var yobj = document.querySelectorAll(".tdPage");


    for (var j = 0; j < xobj.length; j++) {
        if (xobj[j].className == "TabActive Tab") {

            GTab = xobj[j];
            GPageDiv = yobj[j];
            GFrame = GPageDiv.children[0];
            ObjDate = GTab.innerText;
            GPage = GTab.querySelector(".PageName").value;
            GPageid = GTab.querySelector(".Pageid").value;
            //fSplitDetails(GTab);

        }
    }

}


function LoadDisable() {
    window.parent.dLoading.style.display = "none";
}


function LoadEnable() {
    window.parent.dLoading.style.display = "";

}

//function fHideMenus();

var pMenuObjClass="";

function fOpenMenus(Obj){
    var Class=Obj.innerText;
    
    if(pMenuObjClass!=""){
        var y=document.querySelectorAll("."+ pMenuObjClass +"");
        for(var i=0;i<y.length;i++){
                y[i].parentNode.style.display="none";
        }
    }

    
    var x=document.querySelectorAll("."+ Class +"");
    for(var i=0;i<x.length;i++){
            if(x[i].parentNode.style.display=="none")
                x[i].parentNode.style.display="";
            else
             x[i].parentNode.style.display="none";
            
    }

    pMenuObjClass=Class;



}

function fFormMenuVertical(Mnus){
    var Tab = document.querySelector(".TabMenus");
    if (Tab) {
       var GT = Mnus.split("!!"); var PMenu = ""; var x = null; var st = "";
       var k=1;
       for (var i = 1; i < GT.length-1; i++) {
            var sp = GT[i].split("~");
            var menu = sp[4];
            var tr=Tab.insertRow(Tab.rows.length);
            x = tr.insertCell(tr.cells.length);
            tr.style.height="20px";
            tr.style.verticalAlign ="top";
            
            if (PMenu != menu || i==1) {
                
                x.innerHTML= menu ;
                x.parentNode.style.height="20px"; 
                //setAttribute("style", " font-size: 14px;");
                AddMenuEvents(x);

                tr=Tab.insertRow(Tab.rows.length);
                tr.style.height="20px";
                tr.style.verticalAlign ="top";
                x = tr.insertCell(tr.cells.length);
                
                k=1;
            }

            x.innerHTML= capitalizeFirstLetter(sp[2]) ;
            AddPageEvents(x,sp);


            x.className=menu;
            x.style.background="-webkit-gradient(linear, left top, left bottom, color-stop(0.0, #B7C9A0), color-stop(1.0, #a1bd7f))";
            
            tr.style.display="none";
            PMenu = menu;
            k=k + 1;
        }

        var tr=Tab.insertRow(Tab.rows.length);
        x = tr.insertCell(tr.cells.length);
        x.innerHTML="";
        tr.style.height="30%";


        //    alert(Tab.innerHTML);
        
        
        
    }

}

 

function AddPageEvents(e,sp){
    e.addEventListener("click", function (e) {
        var Obj=e.target;
          window.frames[0].fOpenMPage(Obj, sp[3] , sp[1] , sp[5] , sp[6] ,sp[9] ,0, sp[10] , sp[11] );

    });

}

function AddMenuEvents(e) {
    e.addEventListener("click", function (e) {
          var Obj=e.target;
        fOpenMenus(Obj);

    });
}


function fFormMenusHOR(Mnus) {
    var Tab = document.querySelector(".Menus");

    if (Tab) {
        var tr = Tab.rows[0];
        tr.innerHTML = "";

        var GT = Mnus.split("!!"); var PMenu = ""; var x = null; var st = "";
        for (var i = 1; i < GT.length; i++) {
            var sp = GT[i].split("~");
            var menu = sp[4];
            if (PMenu != menu) {
                if (x != null) {
                    st += "</table></div></div>"
                    x.innerHTML = st;
                }
                x = tr.insertCell(tr.cells.length);
                //x.style.width = "100px";
                st = "<div class='dropdown' style='z-index: 10;'>"
                            + "<span   class='dropbtn' style='z-index: 10;' /> " + capitalizeFirstLetter(menu) + "</span>"
                            + "<div class='dropdown-content' style='z-index: 10;'>"
                            + "<table cellspacing=0 align=left>"
            }

            
            st += "<tr><td onclick=\"window.frames[0].fOpenMPage(this,'" + sp[3] + "'," + sp[1] + ",'" + sp[5] + "','" + sp[6] + "','" + sp[9] + "',0,'" + sp[10] + "'," + sp[11] + ");\">";
            if (sp[5] != "") { st += "<img src='iset/120.gif' style='width:10px;height:10px;'>"; }
            
            st += capitalizeFirstLetter(sp[2]) + "";

            st += "</td></tr>";
            DirectPage = "";


            /*if (sp[2].trim() == "My Portal") {
            DirectPage = sp[2].trim();
            try { fOpenMPage(null, sp[3], sp[1], sp[5], sp[6], sp[9]); } catch (e) {
            //    alert(e); 
            }
            }*/

            PMenu = menu;

        }
        if (x != null) {
            st += "</table></div>ssss<br><br><br><br></div>"
            x.innerHTML = st;
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);


}


function fnIn(Obj) { if (Obj.className != "tdBlueSel") Obj.className = "OnMove"; }
function fnOut(Obj) { if (Obj.className != "tdBlueSel") Obj.className = "gColor"; }

/*var GLoad = 0;
function fLoadDatas(Opt, Obj) {
if (GLoad == 0) {
GLoad = 1;
return false;
}
else {
GLoad = 1;
var RObj;
var Options = "";
switch (Opt) {
case 1: st = "exec FilterGroup @Groupid=" + Obj.value + ",@Opt=1"; RObj = form1.selDivision; Options = "Division"; form1.selBranch.length = 0; form1.selDept.length = 0; break;
case 2: st = "exec FilterGroup @Groupid=" + form1.selGroup.value + ",@Divisionid=" + Obj.value + ",@Opt=2"; RObj = form1.selBranch; Options = "Branch"; form1.selDept.length = 0; break;
case 3: st = "exec FilterGroup @Groupid=" + form1.selGroup.value + ",@Divisionid=" + form1.selDivision.value + ",@Branchid=" + Obj.value + ",@Opt=3"; RObj = form1.selDept; Options = "Department"; break;
}
var res = MakeGrid.GRec(st);
var DT = res.value;
RObj.length = 0;

RObj.options[0] = new Option(Options, 0);

for (var i = 0; i <= DT.Rows.length - 1; i++) {
RObj.options[i + 1] = new Option(DT.Rows[i]["TEXTS"], DT.Rows[i]["IDD"]);
}
RObj.selectedIndex = 0;
}

             
}*/




