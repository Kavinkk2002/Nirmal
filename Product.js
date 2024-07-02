
function fFullView() {
    if (trHomeHead.style.display == "") {
        trHomeHead.style.display = "none";
        trFullView.style.display = "";
    }
    else {
        trHomeHead.style.display = "";
        trFullView.style.display = "none";
    }
}

function fPanels() {
    var st = " <div style='height:66%;overflow:auto;'>"
    + "<a href='javascript:void(0)' class='closebtn' onclick='closeNav()' style='position:absolute;left:12px'>&times;</a>"
    +"<table > "
        + "<tr align=center height=40px id=TrdFullview><td style='cursor:pointer'  class=TabLog onclick='fFullView();'><img src='actions/Fview.png' style='width:25px;height:25px;'   /><br>FullView</td></tr>"
        + "<tr align=center height=40px id=TrdProfile><td  style='cursor:pointer' class=TabLog onclick='fOpenProfile();'><img src='icons/Tech.png' style='width:25px;height:25px;'   /><br>Profile</td></tr>"
        + "<tr align=center height=40px id=TrdCal><td  style='cursor:pointer' class=TabLog onclick='fOpenCalView();'><img src='actions/DTime.png' style='width:25px;height:25px;'   /><br>Calendar</td></tr>"
        + "<tr align=center height=40px id=TrdDB><td  style='cursor:pointer' class=TabLog onclick='alert(22);fOpenDashBoard();'><img src='actions/Employee.png' style='width:25px;height:25px;'   /><br>Dashboard</td></tr>"
        + "<tr align=center height=40px id=TrdApply style='display:none;'><td  style='cursor:pointer' class=TabLog onclick='fTabLog(this,11);' ><img src='Actions/Apply.png' id=imgapply style='width:25px;height:25px;' title='Open Applys and Requests Pendings'    /><label id=lappcount class=ncount></label><br />Apply</td></tr>"
        + "<tr align=center height=40px id=TrdApprove style='display:none;'><td  style='cursor:pointer' class=TabLog onclick='fTabLog(this,12);'><img src='Actions/Approve.png' id=imgapprove style='width:25px;height:25px;'  title='Open Approvals'    /><label id=laprcount class=ncount></label><br />Approve</td></tr>"
        + "<tr align=center height=40px id=TrdApproves><td  style='cursor:pointer' class=TabLog onclick='fApproves();'><img src='Actions/Employee.png' id=imgapprove style='width:25px;height:25px;'  title='Open Approvals'    /><label id=laprcount class=ncount></label><br />Approve</td></tr>"

        + "<tr align=center height=40px id=TrdIntr><td class=TabLog><img src='icons/EmpSrch.png' style='width:25px;height:25px;cursor:pointer;'  onclick='fInterview();' /><br />Interview</td></tr>"
        + "<tr align=center height=40px id=TrdIntercom><td class=TabLog onclick='fCugList();'><img src='icons/BM1.png' style='width:30px;height:30px;'   /><br />Intercom List</td></tr> "
        + "<tr align=center height=40px id=TrdNote><td style='cursor:pointer' class=TabLog onclick='fOpenNotes();' ><img src='icons/StickNote.png' style='width:25px;height:25px;'   /><br />Sticky Notes</td></tr>"
        + "<tr align=center height=40px id=TrdNote><td style='cursor:pointer' class=TabLog onclick='fOpenCanteen();' ><img src='Canteen.png' style='width:25px;height:25px;'   /><br />Canteen</td></tr>"
        + "<tr align=center height=40px id=TrdTerms style='display:none;'><td style='cursor:pointer' class=TabLog onclick='fnTermsload();' ><img src='icons/Editor.png' style='width:25px;height:25px;'   /><br />Terms</td></tr>"
        + "<tr align=center valign=bottom height=40px id=TrdHelp><td style='cursor:pointer' class=TabLog onclick='fOpenHelp();' ><img src='Actions/Help.png' style='width:35px;height:35px;'   /><br />Help</td></tr>"
        + "<tr align=center valign=bottom height=40px id=TrdVacancy><td style='cursor:pointer' class=TabLog onclick='fOpenVacancy();' ><img src='Actions/Help.png' style='width:35px;height:35px;'   /><br />Vacancies</td></tr>"
        + "<tr align=center valign=bottom height=40px id=TrdSugg><td style='cursor:pointer' class=TabLog onclick='fOpenSuggestion();' ><img src='Actions/Suggestion.png' style='width:40px;height:25px;'   /><br />Suggestions</td></tr>"
        + "<tr align=center valign=bottom height=40px id=TrdReq><td style='cursor:pointer' class=TabLog onclick='fOpenRequest();' ><img src='Actions/Request.png' style='width:50px;height:25px;'   /><br />Requests</td></tr>"
        + "<tr align=center height=40px id=TrdApproves><td  style='cursor:pointer' class=TabLog onclick='fThemes(this);'><img src='Themes.png' id=imgapprove style='width:25px;height:25px;'  title='Open Approvals'    /><label id=laprcount class=ncount></label><br />Themes</td></tr>"

        + "</table></div> ";
    return st;
}

function fBaseFilters() {
    var st = " <div class=PRDS id=divPRDS style='position:absolute;right:5%; display:none;width:200px;height:200px;'>"
    +"<input   type='text' readonly maxLength='10' size='12' name='tFrm' id='tFrm'    onclick='GD(tFrm,lblDate,divDate);'  class='BFlters' style='width:80%;height:40px;'  /><br>"
    +"<input  type='text' readonly  maxLength='10' size='12' name='tTo'   id='tTo'  onclick='GD(tTo,lblDate,divDate);'   class='BFlters' style='width:80%;height:40px;'  /></div>";

    st+= "<div class=Searchs id=divSearch style='display:none;'> <input type=checkbox  class=logins id=CSrch title='Search by drop down' style='display:none;' class=logins />"
    + " </div>"



       /* <table cellspacing=0  _class=RFilter border=0 style='width:100%;'>"
            + " <tr id=trperiod _class=OtherFs _style='display:none;'>"
                + " <td width=10% >&nbsp;</td>"
                + " <td width=1% ><select id=selAccess name=selAccess   style='display:none;' onchange='fGetDate(this);fLoadPortal();'     class='tFlters' _style='background-color: #3E3E3E;  border: 0px ;'  >"
                + " <option value=1>My Record</option>"
                  + "  <option value=2>My Team</option>"
                    + " <option value=3>My Role</option>"
                 + " </select> </td>  "
             + " <td width=13% class=OtherFs ><select id=selYr name=selYr   onchange='fGetDate(this);fLoadPortal();'     class='tFlters'     ></select> </td>  "
             + " <td width=13% class=OtherFs><select id=selMonths name=selMonths onchange='fGetDate(this);fLoadPortal();'    class='tFlters' ></select>   </td>      "
             + " <td width=13% class=OtherFs><input   type='text' readonly maxLength='10' size='12' name='tFrm' id='tFrm'    onclick='GD(tFrm,lblDate,divDate);'  class='tFlters' /></td>"
             + " <td width=13% class=OtherFs><input  type='text' readonly  maxLength='10' size='12' name='tTo'   id='tTo'  onclick='GD(tTo,lblDate,divDate);'   class='tFlters' /></td>"
             + " <td align=center width=5% class=OtherFs><input  title='Reports to Open In New Window' type='checkbox' id=CBOUT></td>"
             + " <td  width=25% id=tdsrchno>"
                             + " <input type=checkbox  class=logins id=CSrch title='Search by drop down' style='display:none;' class=logins />"
                             + " <INPUT id='tsearch'   class='Searchs'   value='Search' tabIndex='1'   type='text'  onfocus='fSearchfocus();'  "
                            + "  onkeyup='fOpenSearch();' "
                            + "  onblur='fSeacrhvalid();' size='10' name='tsearch'  />&nbsp;"
            + "  </td>"
           + "   <td width=5% id=ifilters _class=GridBack>"
               + "   <img src='actions/Srch.Png' id=iReload style='width:20px;height:20px;display:none;'  title='Save Item'  onclick='fOpenSearch();' />"
               + "   <img src='Actions/Filter.png'   style='width:40px;height:40px;' onclick='window.parent.fOpenFilter(this);' />"
                + "  <input class='btn' id='bLoad'  type='button'  value='  Load  ' name='bLoad'  onclick='fReload();' accesskey='r'  style='display:none;'>&nbsp;"
             + " </td>"
        + "  </tr>"
 + " </table>";*/


    return st;
}


/*
function fBaseFilters() {
    var st = " <table cellspacing=0  _class=RFilter border=0 style='width:100%;'>"
            + " <tr id=trperiod _class=OtherFs _style='display:none;'>"
                + " <td width=10% >&nbsp;</td>"
                + " <td width=1% ><select id=selAccess name=selAccess   style='display:none;' onchange='fGetDate(this);fLoadPortal();'     class='tFlters' _style='background-color: #3E3E3E;  border: 0px ;'  >"
                + " <option value=1>My Record</option>"
                  + "  <option value=2>My Team</option>"
                    + " <option value=3>My Role</option>"
                 + " </select> </td>  "
             + " <td width=13% class=OtherFs ><select id=selYr name=selYr   onchange='fGetDate(this);fLoadPortal();'     class='tFlters'     ></select> </td>  "
             + " <td width=13% class=OtherFs><select id=selMonths name=selMonths onchange='fGetDate(this);fLoadPortal();'    class='tFlters' ></select>   </td>      "
             + " <td width=13% class=OtherFs><input   type='text' readonly maxLength='10' size='12' name='tFrm' id='tFrm'    onclick='GD(tFrm,lblDate,divDate);'  class='tFlters' /></td>"
             + " <td width=13% class=OtherFs><input  type='text' readonly  maxLength='10' size='12' name='tTo'   id='tTo'  onclick='GD(tTo,lblDate,divDate);'   class='tFlters' /></td>"
             + " <td align=center width=5% class=OtherFs><input  title='Reports to Open In New Window' type='checkbox' id=CBOUT></td>"
             + " <td  width=25% id=tdsrchno>"
                             + " <input type=checkbox  class=logins id=CSrch title='Search by drop down' style='display:none;' class=logins />"
                             + " <INPUT id='tsearch'   class='Searchs'   value='Search' tabIndex='1'   type='text'  onfocus='fSearchfocus();'  "
                            + "  onkeyup='fOpenSearch();' "
                            + "  onblur='fSeacrhvalid();' size='10' name='tsearch'  />&nbsp;"
            + "  </td>"
           + "   <td width=5% id=ifilters _class=GridBack>"
               + "   <img src='actions/Srch.Png' id=iReload style='width:20px;height:20px;display:none;'  title='Save Item'  onclick='fOpenSearch();' />"
               + "   <img src='Actions/Filter.png'   style='width:40px;height:40px;' onclick='window.parent.fOpenFilter(this);' />"
                + "  <input class='btn' id='bLoad'  type='button'  value='  Load  ' name='bLoad'  onclick='fReload();' accesskey='r'  style='display:none;'>&nbsp;"
             + " </td>"
        + "  </tr>"
 + " </table>";
    return st;
} */


function fOtherFilters() {

    var st = ""
   +" <table cellspacing=0 border=0  width=100% >"
    + " <tr height=10px _style='display:none;'><td  colspan=2 align=right >"
        + " <img style='display:none;' src='actions/Refreshy.png' style='cursor:pointer; width:25px;height:25px;' onclick='fResetFilters(1);'>"
        + " <img style='display:none;' src='icons/Close.png' style='cursor:pointer;width:25px;height:25px;' onclick='fCloseFilters(this);'>"
        +"<a href='javascript:void(0)' class='closeRightbtn' onclick='fCloseFilters(this);' style='position:relative;right:5%'><img src='Cancel.png' style='width:25px;height:25px;cursor:hand;'> </a>"
        +"</td>"
    + " </tr>"
    + " <tr height=20px ><td colspan=2><select class='tFlters' id=selGroup   name=selGroup  _style='color:#FF9933;height:35px;'  onchange='LoadDatas(1,this);'   ><option value=0>Group</option></select></td></tr>"
    + " <tr height=20px><td  colspan=2><select id=selDivision  name=selDivision  _style='color:#00CC66; height:35px;'     onchange='LoadDatas(2,this);' class='tFlters'  ><option value=0>Division</option></select></td> </tr>"
    + " <tr height=20px><td colspan=2><select id=selBranch   name=selBranch   _style='color:#97CBFF; height:35px;'    onchange='LoadDatas(3,this);' class='tFlters'  ><option value=0>Branch</option></select></td></tr>"
    + " <tr height=20px><td colspan=2><select id=selDept  name=selDept   _style='color:#FF4AFF; height:35px;'  onchange='LoadDatas(4,this);' class='tFlters' ><option value=0>Department</option></select></td></tr>"
    + " <tr height=20px><td colspan=2><select id=selSection  name=selSection   _style='color:#FF4AFF; height:35px;'  onchange='LoadDatas(5,this);' class='tFlters' ><option value=0>Section</option></select></td></tr>"
    + " <tr height=40px><td colspan=2>Logical</td></tr>"
    + " <tr height=20px><td colspan=2><select id=selCat  name=selCat   _style='color:#4892FF; height:35px;'  onchange='LoadDatas(6,this);' class='tFlters' ><option value=0>Category</option></select></td></tr>"
    + " <tr height=20px>   <td  colspan=2><select id=selDesig  name=selDesig   _style='color:#FF9933; height:35px;'  onchange='LoadDatas(7,this);' class='tFlters' ><option value=0>Designation</option></select></td></tr>"
    + " <tr height=20px>  <td colspan=2><select id=selGrade  name=selGrade   _style='color:#97CBFF; height:35px;'  onchange='LoadDatas(8,this);' class='tFlters' ><option value=0>Grade</option></select></td></tr>"
        + " <tr height=20px>   "
            + " <td colspan=2>"
                    + " <select class='tFlters'  id=selBasFilter name=selBasFilter       _style='color:#FF4AFF;height:35px;' >"
                       + "  <option value='ALL'>ALL</option>"
                    + " <option value='Salary' selected>Salary</option>"
                    + " <option value='Active'>Active</option>"
                    + " <option value='New'>New</option>"
                    + " <option value='LeftInd'>LeftInd</option>"
                    + " <option value='Resigned'>Resigned</option></select>"
            + " </td>"
    + " </tr>"
    + " <tr height=20px> <td align=center colspan=2><input type=button value=Load onclick='fLoadPageData();' /></td></tr>"
    + " <tr><td style='display:none;' width=90px colspan=2><select class='tFlters' id=SelEmpType name=SelEmpType ></select></td></tr>"
    + " <tr style='height:80%'><td></td></tr>"
    + " </table>";
    return st;
}

function fSearchfocus() { if (tsearch.value == "Search") tsearch.value = ""; }
function fSeacrhvalid() { if (tsearch.value == "") tsearch.value = "Search"; }

function fOpenSearch() {

    if (CSrch.checked) return false;

    if (window.event.keyCode == 13) {
        try { window.frames[0].GFrame.contentWindow.fReloadData(); }
        catch (e) { }
    }
    else {
        fHideDropDown();
    }

}



function fClickSearch() {
    try { window.frames[0].GFrame.contentWindow.fReloadData(); }
    catch (e) { }
}






function fCreateProduct() {

    if (!document.querySelector(".Product")) {
        var t = document.createElement("div");
        t.style.top = "" + top + "px",
            t.style.left = "" + left + "px",
            t.className = "Product",
            t.style.position = "absolute",
            t.style.height = "" + height + "%",
            t.style.width = "" + width + "%",
            t.style.zIndex = "15",
            t.style.display = "none",
            t.style.id = "dProduct";
        dHeader.appendChild(t);
        /*

        t.innerHTML="<table cellspacing=0 id=tabProduct width=100%  align=left  >"
        +" <tr>"
        +"<td>"
        +"<h1>Ramraj Cotton</h1>"
        +"<p class=Company style='line-height:20px;'>Ramraj Cotton, established in 1983 is a pioneer in manufacturing of our traditional Dhoti."
        "Our products are manufactured using the fine artistry of our weavers who produce the most unique and majestic designs that are not available anywhere else.</p>"
        +"</td> "
        +"</tr>"
        +"<tr height=20px><td></td></tr>"
        +"<tr height=20px><td><h1>Modules</h1></td></tr>"
        +"<tr height=40px valign=middle><td class=PBlue>Portal Module</td></tr>"
        +"<tr>"
        +"<td class=HeadCont>"
        +"<table cellspacing=0  width=100%  align=left  _class=PBlue >"
        +"<tr height=20px>  <td  >* New Portal Module</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px> <td  class=HeadCont><p>* My Personal Info </p></td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px>  <td>* Hierarchy Level Apply and Approval Systems</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px> <td >* Time & Attendance </td></tr>"
        +"<tr height=3px><td colspan=2 ></td></tr>"
        +"<tr height=20px>   <td >* Payroll Projection Method</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Yearly Calender Views</td></tr>"
        +"</table >"
        +"</td>"
        +"</tr>"
                    
        +"<tr height=40px valign=middle><td class=PLight>Time Office</td></tr>"
        +"<tr>"
        +"<td class=HeadCont>"
        +"<table cellspacing=0 id=Table14 width=100%  align=left _class=PGreen >"
        +"<tr height=20px> <td  ><p>* Leave Management </p></td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* OnDuty Day/Hour Basics</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Permission with Hours Limited</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Manual Entry Editing</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Extra Working Compoff  Request </td></tr>"
        +"</table>"
        +"</td>"
        +"</tr>"
        +"<tr height=40px valign=middle><td class=POrange>Transactions</td></tr>"
        +"<tr>"
        +"<td>"
        +"<table cellspacing=0 id=Table4 width=100%  align=left _class=POrange >"
        +"<tr height=20px style='display:none;'><td>* Performance Appraisal</td></tr>"
        +"<tr height=3px style='display:none;'><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Travel Claim or Reimbursment</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* TDS Declaration Form</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Resignation Request </td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Promotion or Transfer </td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Employee Rejoin Process</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Approval Remainders</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px>  <td>* Circular Managment</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=40px valign=middle><td class=PGreen style='display:none;'>Onboarding</td></tr>"
        +"<tr  style='display:none;'>"
        +"<td class=HeadCont>"
        +"<table cellspacing=0 id=Table2 width=100%  align=left _class=PGreen >"
        +"<tr height=20px> <td  ><p>* Recruitment </p></td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Onboarding</td></tr>"
        +"<tr height=3px><td colspan=2></td></tr>"
        +"<tr height=20px><td>* Administration</td></tr>"
        +"</table>"
        +"</td>"
        +"</tr>"
        +"</table>"
        +"</td> </tr>"
        +"</table>";

        */


    }
}


/*

var st = " <table style='height:100%' > "
+ "<tr align=center height=50px valign><td style='cursor:pointer'  class=TabLog onclick='fFullView();'><img src='actions/Fview.png' style='width:25px;height:25px;'   /><br>FullView</td></tr>"
+ "<tr align=center height=50px style='display:none;'><td  style='cursor:pointer' class=TabLog onclick='fTabLog(this,3);' ><img src='icons/Query.png' style='width:25px;height:25px;'  /><br>Reload</td></tr>"
+ "<tr align=center height=50px><td  style='cursor:pointer' class=TabLog onclick='fOpenProfile();'><img src='icons/Tech.png' style='width:25px;height:25px;'   /><br>Profile</td></tr>"
+ "<tr align=center height=50px><td  style='cursor:pointer' class=TabLog onclick='fTabLog(this,11);' ><img src='Actions/Apply.png' id=imgapply style='width:25px;height:25px;' title='Open Applys and Requests Pendings'   />"
+ "<label id=lappcount class=ncount></label><br />Apply</td></tr>"
+ "<tr align=center height=50px><td  style='cursor:pointer' class=TabLog onclick='fTabLog(this,12);'><img src='Actions/Approve.png' id=imgapprove style='width:25px;height:25px;'  title='Open Approvals'    />"
+ "<label id=laprcount class=ncount></label><br />Approve</td></tr>"
+ "<tr align=center height=50px><td class=TabLog><img src='icons/EmpSrch.png' style='width:25px;height:25px;'  onclick='fInterview();' /><br />Interview</td></tr>"
+ "<tr align=center height=50px><td class=TabLog onclick='fCugList();'><img src='icons/BM1.png' style='width:30px;height:30px;'   /><br />Intercom List</td></tr> "
+ "<tr align=center height=50px style='display:none;'><td class=TabLog onclick='fCircular();'><img src='icons/Circular.png' style='width:25px;height:25px;'   /><br />Circular</td></tr>"
+ "<tr align=center height=40px style='display:none;'><td style='cursor:pointer' class=TabLog><img src='icons/Sample2.png' style='width:25px;height:25px;'  onclick='fTabLog(this,9);'  /><br />Remainder</td></tr>"
+ "<tr align=center height=50px style='display:none;' id=Tr1><td style='cursor:pointer' class=TabLog onclick='fOpenOtherFilters();' ><img src='icons/Pickers.png' style='width:25px;height:25px;'   /><br />Filter</td></tr>"
+ "<tr align=center height=50px id=Tr2><td style='cursor:pointer' class=TabLog onclick='fOpenHelp();' ><img src='icons/Help.png' style='width:25px;height:25px;'   /><br />Help</td></tr>"
+ "<tr align=center height=50px id=Tr3><td style='cursor:pointer' class=TabLog onclick='fOpenNotes();' ><img src='icons/StickNote.png' style='width:25px;height:25px;'   /><br />Sticky Notes</td></tr>"
+ "<tr align=center height=50px style='display:none;' id=Tr4><td style='cursor:pointer' class=TabLog onclick='fOpenEditor();' ><img src='icons/Editor.png' style='width:25px;height:25px;'   /><br />Editor</td></tr>"
+ "<tr align=center height=50px><td style='cursor:pointer' class=TabLog onclick='fnTermsload();' ><img src='icons/Editor.png' style='width:25px;height:25px;'   /><br />Terms</td></tr>"
+ "<tr align=center height=50px style='display:none;' onclick='fTabLog(this,1);fOpenLogin();'><td style='cursor:pointer' width=100% class=TabLog><img src='icons/east-direction.png' style='width:25px;height:25px;' /></td></tr>"
+ "<tr><td></td></tr>"       
+ "</table>";*/



function fChatUsers(){

    //fc(selFwd, "exec eSuggestionNew @Opt=2,@Userid=" + GLoginUserid + "", "nemp_id", "EmpName", "A-Employees");
}

/*
function fnsaveSuggestion() {
    with (form1) {
        if (txtSuggestion.value == "") {
            alert("Enter Suggestion to save");
            txtSuggestion.focus();
            return false;
        }
        var sp = "exec eSuggestionNew @Opt=6,@Suggestion='" + txtSuggestion.value + "',@Userid=" + GLoginUserid;
        console.log(sp);
        alert(FileObj.fSaveCmd(sp));
    }
}
*/


var PUserObj=null;


function fUsers(Obj,val){
    
    if(PUserObj)
     PUserObj.className="Tabselect";
    Obj.className="TabActive";

    PUserObj=Obj;
    
    var st= "exec ChatUsers @Opt=1,@Authid="+ val +",@Userid=" + GUserid;
    console.log(st);
    var GT=document.getElementById("DFrame").contentWindow.fQry(st);
    fGrid(GT, ULists, "", 0, 50);
    var O= ULists.querySelector(".DGridTable");
    O.cellSpacing=0;

    O.rows[0].style.display="none";

    O.rows[1].className="DContent";
   // O.rows[1].cells[1].children[0].className="DContent";
    
    

}
// -----------------Suggestion Save -------------------------

function fNewSuggestion(){
    
    txtSuggestion.value="";
    txtSuggestion.focus();
    hSuggestID.value=0;
    bSForwardTo.style.display="";
    bSForward.style.display="none";

    txtSuggestion.disabled=false;
    selMsgType.disabled=false;
}


function fInactiveSuggestion(Obj,idd){

        if(confirm("Want to Close the Suggestions or Requests?")){
            hSuggestID.value=idd;
            var sp = "exec ChatUsers @Opt=8, @Suggestid="+ hSuggestID.value +", @Userid=" + GUserid;
            alert(sp);
            console.log(sp);
            alert(document.getElementById("DFrame").contentWindow.fSaveCmd(sp));
         
        }
}

function fEnableSuggestions(){
    fNewSuggestion();

}
function fOpenEditSuggestion(Obj,idd,Typeid,sts){

    fEnableSuggestions();
    txtSuggestion.value = fGetObj(Obj, "HistoryMsg").querySelector(".msgs").innerText;;
    selMsgType.value=Typeid;
   
    if(sts==0){
    

        txtSuggestion.disabled=true;
        selMsgType.disabled=true;

        
        bsaveSuggest.disabled=true;
        bSForwardTo.disabled=true;
        bSForward.disabled=true;

        
    }

    fSuggests(dSuggests,1);
    hSuggestID.value=idd;
    bSForwardTo.style.display="";
    bSForward.style.display="none";
    
}
function fnsaveSuggestion() {
        if (txtSuggestion.value == "") {
            alert("Enter Suggestion to save");
            txtSuggestion.focus();
            return false;
        }
        var sp = "exec ChatUsers @Opt=4,@Suggestion='" + txtSuggestion.value + "',@MsgTypeid="+ selMsgType.value +", @Suggestid="+ hSuggestID.value +", @Userid=" + GUserid;
        console.log(sp);
        alert(document.getElementById("DFrame").contentWindow.fSaveCmd(sp));
     
}

function fForwardReply(Obj,idd){
   var O= Obj.parentNode.querySelector(".DB");
   hSuggestID.value=idd;
   fForward(O,1);


}


function fForward(Obj,Rply){
if( ReplyUser==0){
        var x=document.querySelectorAll(".hUserids");

        for(var i=0;i<x.length;i++){
            var sp = "exec ChatUsers @Opt=5,@Reply="+ Rply +",@ReplyType="+ ReplyType  +", @Suggestion='" + Obj.value + "',@Rcvid="+  x[i].value +",@Suggestid="+ hSuggestID.value +", @Userid=" + GUserid;
            //alert(sp);
            console.log(sp);
        document.getElementById("DFrame").contentWindow.fSaveCmd(sp);
        }
        alert("Message Sent");
}
else{

    var sp = "exec ChatUsers @Opt=5,@Reply="+ Rply +", @ReplyType="+ ReplyType  +",@Suggestion='" + Obj.value + "',@Rcvid="+  ReplyUser +",@Suggestid="+ hSuggestID.value +", @Userid=" + GUserid;
    
            alert(sp);
            console.log(sp);
        document.getElementById("DFrame").contentWindow.fSaveCmd(sp);
        alert("Message Replied");
}


}


// -----------------Reviced Suggestions -------------------------

function fRecievedSuggestions(){
    var sp = "exec ChatUsers @Opt=6, @Userid=" + GUserid;
    var n = document.getElementById("DFrame").contentWindow.fQry(sp);

    if(n.split("!!").length>2){
        fOpenChat();

        //dRecivedList.style.display="";
        
        fGrid(n, SRList, "", 0, 50);

        var O= dRecivedList.querySelector(".DGridTable")
        O.cellSpacing=0;
        O.rows[0].style.display="none";
        O.rows[1].style.display="none";
        O.rows[1].className="DContent";
        fSuggests(dSReceived,3);
        

    }
        
}

//--------------------- Forward and Reply Box ------------------


function fForwardSuggest(Obj){
    ReplyUser=0;
    ReplyType=0;

    Obj.className="Clicked";
    var o= fGetObj(Obj, "outerMsg").querySelector(".Reply")
    o.style.display="";
    fOpenUserChat();
}

var ReplyUser=0;
var ReplyType=0;


function fReplySuggest(Obj){
ReplyUser=0;
ReplyType=1;

    Obj.className="Clicked";
    var o= fGetObj(Obj, "outerMsg").querySelector(".Reply");
    o.style.display="";

    ReplyUser=fGetObj(Obj, "outerMsg").querySelector(".hForwardUsers").value;
    
    //fOpenUserChat();
}

var ptrObr=null;
var ptdObj=null;

function fSugesstionHistory(Obj,idd){
    var obr= fGetObj(Obj, "HistoryMsg").querySelector(".trHistory");
    var ob= fGetObj(Obj, "HistoryMsg").querySelector(".tdHistory");

        if(ptrObr){
            
            ptrObr.style.display="none";
            ptdObj.innerHTML="";

            if(ptrObr==obr){
                ptrObr=null;
                ptdObj=null;
                return ;
    
    
            }

             
        }
       
            
            
            obr.style.display="";
           
           
            fDataGrid(ob, "DSource", "HL", "HistoryLists"); fonlyData(ob);
            var sp = "exec ChatUsers @Opt=7, @Suggestid=" + idd;
            var n = document.getElementById("DFrame").contentWindow.fQry(sp);
            

                fGrid(n, HL, "", 0, 50);

                var O= ob.querySelector(".DGridTable");

                O.cellSpacing=0;
                 
                O.rows[0].style.display="none";
                O.rows[1].style.display="none";
                O.rows[1].className="DContent";
                ptdObj=ob;
                ptrObr=obr;

                

}
//----------------------------------

var PSuggestBox=null;


function fSuggests(Obj,val){
    if(PSuggestBox)
      PSuggestBox.className="Tabselect";
   Obj.className="TabActive";
    dSuggestBox.style.display="none";
    dMySuggestList.style.display="none";
    dRecivedList.style.display="none";


    PSuggestBox=Obj;
   switch(val){
        case 1 :    dSuggestBox.style.display=""; break;
        case 2 :    dMySuggestList.style.display="";  Qry = "exec ChatUsers @Opt=3,@val=1,@Userid=" + GUserid + "";
                    var n = document.getElementById("DFrame").contentWindow.fQry(Qry);
                    fGrid(n, SuggestLists, "", 0, 50);
                    var O= dMySuggestList.querySelector(".DGridTable")
                    O.cellSpacing=0;
                    O.rows[0].style.display="none";
                    O.rows[1].style.display="none";
                    O.rows[1].className="DContent";
                     break;
                  


        
        case 3 :    
                dRecivedList.style.display="";
                var n = document.getElementById("DFrame").contentWindow.fQry(Qry);
                fGrid(n, SuggestLists, "", 0, 50);

                var O= dRecivedList.querySelector(".DGridTable")
                O.cellSpacing=0;

                O.rows[0].style.display="none";
                O.rows[1].style.display="none";
                O.rows[1].className="DContent";

        
                    break;


   }
   



}



function fRemoveUser(Obj){
    Obj.parentNode.remove();
    

}
function fOpenUserChat(Obj,UserIDS,Uids){

    if(typeof Obj !="undefined"){   // clicked from User IDs 
        document.querySelector(".UserID").innerHTML += "<span class=UIDS style='padding:4px;'>" + UserIDS + "<input type=hidden value='"+ Uids + "'  class=hUserids>"
        +"&nbsp;&nbsp;<img src='close.png' onclick='fRemoveUser(this);' style='cursor:pointer;width:15px;height:15px;'> </span>&nbsp;&nbsp;  ";
    }
    bSForward.style.display="";
    fOpenChat();

    dUserLists.style.display="";
    dUserLists.style.right="22%";
    
        
}
  


function fCheckSuggestions(Obj,Uid){
   
    GUserid=Uid;

    
    fRecievedSuggestions();

}


function fOpenViewLetter(Obj,Empid){


}