<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ePfile.aspx.cs" Inherits="DS.ePfile" ClassName="ePfile"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<html>
<head id="Head1" runat="server">
        <title>PFile</title>
      
       <script language="javascript" src="Load.js?n=41"></script>
    <script language="javascript">

        var gLink = 0; var gJSONRcds = 0;
     
        var idval = 0; var gSVal = 0; var gSText = 0; var gRpt = 0; var txt = "";
        var Qry = ""; var RCond = ""; var RHdr = ""; var DTS = ""; var Userid = 0;
        var nEmp = 0;
        var gCurrentSp = ""; var gCurrentText = ""; var GRObj = "";
        

        var Direct = 0;

        function fOpenTrans(Obj) {
            Direct = 1;
            fOpenMPage(Obj, "Transactions.aspx", 0, "", 0, 0, "Transactions");

        }

        function PostJSON() {
            alert(gJSONRcds);

            form1.action = "ePfile.aspx?Show=PostjsonQry&JSONRcd=" + gJSONRcds;
            form1.submit();

            /*var res = ePfile.PostjsonQry(gJSONRcds);
            alert(res.value);*/
        }

        function fEmployee(Empno) {

            var xobj = document.querySelectorAll(".Tab"); var yobj = document.querySelectorAll(".tdPage");
            for (var j = 0; j < xobj.length; j++) { xobj[j].className = "Tabselect Tab";    yobj[j].style.display = "none"; }
            
            for (var j = 0; j < xobj.length; j++) {
                if (xobj[j].innerText.trim()=="Profile") {
                    GTab = xobj[j]; GPageDiv = yobj[j]; 
                    GFrame = GPageDiv.children[0];  
                    yobj[j].style.display = "";
                    xobj[j].className = "TabActive Tab";
                    window.frames[j].GetEmployee("0", Empno, 'NORMAL');
                }
            }
        }

       
        function fSTData(Empid, status) {            
            window.open("eSTData.aspx?Empid=" + Empid + "&Status=" + status);
        }

        function fnclose(Obj) { }
      
        var UserType = "";
        
      
        var GLogin="";
        var GPassWord="";
        var GUser = "";
        var GHeader = "";
        var GSP = "";
        var GNotifications = "";
        var GRequests = "";
        var GEmpid = 0;
        var GAdmin = 0;
        var GEmps = "";
        var GRole = "";
        var PSGrade = 0;
        var GAppLock = "";        
        var GAprLock = "";       
        var GTerms = "0";
        var GUSerEmployee = "";
        var GMenus = "";

        var GAccess = 0;

        function fLogin(Userid) {
            var status = 0;
            var sp = "";
          with (form1) {
          
              if (Userid == 0) {
                  GLogin = window.parent.txtUser.value;
                  GPassWord = window.parent.txtPass.value;
                  
                  var Res = ePfile.GetUserDet(GLogin, GPassWord, fymd(form1.hFrm.value), fymd(form1.hTo.value));
                  
                  console.log(sp); 

                  sp = Res.value.split("@@");

               
                  
                  if (sp[0]=="-2000") {
                      alert("Not More than onle login able to use");
                      return false;
                  }
                  status = sp[0];

                  hUserid.value = status;
              }
              else {
                  status = Userid;
                  var Res = ePfile.GetUserwithID(Userid, fymd(form1.hFrm.value), fymd(form1.hTo.value));
                   sp = Res.value.split("@@");
              }
              if (status == 0 || status == -1) {    alert(sp[4]);}
              else {
                      GMenus = sp[1];
                    var s = sp[3].split("!!");
                 	GSession=Userid ;
                    GHeader = s[0].split("~");
                    GSP = s[1].split("~");

                    GUser = fGetColVal("UserDetails");
                   
                    GAdmin = fGetColVal("viewType");
                    GUSerEmployee = fGetColVal("EmpName");
                    GRole = fGetColVal("Role");
                    PSGrade = fGetColVal("PSGrade");
                    
                    //alert(GAppLock);
                    GAppLock = fGetColVal("DOLK");		// Apply on or after DOLK Date		from loads SP users table
			        GAprLock = fGetColVal("DOLKApr"); //	Aprove on or after DOLKApr Date		from loads SP users table
                    GTerms = fGetColVal("GTerms"); //	Terms to load on first login

                    //alert(PSGrade);
                    form1.hRole.value = fGetColVal("Role");

                    if (GRole == "EMP" || GRole == "Employee") {
                        GAccess = 1;

                        //form1.selAccess.value = 1;
                        //form1.selAccess.disabled = true;
                    }
                    else {
                        GAccess = 1;
                        //form1.selAccess.value = 1;
                        //form1.selAccess.disabled = false;
                    }
                    //UserEmployee.innerHTML = "<i>" + fGetColVal("EmpName") + "</i>";
                    form1.hEmpid.value = fGetColVal("Empid");
                    GEmpid = form1.hEmpid.value;
                    GNotifications = sp[5];
                    GRequests = sp[6];
                    GEmps = sp[7];
		//	trperiod.style.display = "";
			//tdlogout.style.display = "";

              }
          }
          return status;
      }

      function fLogout() {
        
          var Res = ePfile.GetLogout(form1.hUserid.value);
          return Res.value;
      }

      function fOpenExcelImport() {
          fOpenMPage(null, "ExcelImport.aspx", 0, "", 0, 0, "Excel Import");
      }

      function fOpenProfile(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "Profile.htm?Mode=Apply&Empid=" + GEmpid + "&Typeid=0&IDD=0&Lid=" + form1.hUserid.value + "", 0, "", 0, 0, "Profile");
      }

      
      function fOpenDash(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "Dashboards.htm?Formid=50", 0, "", 0, 0, "DashBoard");
      }

      function fOpenCalViews(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "EData.htm", 0, "", 0, 0, "CalenderView");
      }

      function fOpenVacancies(val) {
          Direct = 1;
          if(val==0)
              fOpenMPage(null, "eJobVacancyList.aspx?Show=PortalLoad", 0, "", 0, 0, "Vacancies");

          //fOpenMPage(null, "eJobVacancyList.htm", 0, "", 0, 0, "Vacancies");
      }
      
      function fOpenSuggestions(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "eSuggestions.htm", 0, "", 0, 0, "Suggestions");
      }
      function fOpenRequests(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "eRequest.htm", 0, "", 0, 0, "Requests");
      }

      function fOpenBooks(val) {
          Direct = 1;
          if(val==0)
            fOpenMPage(null, "eBook.htm", 0, "", 0, 0, "E-Books");
      }


      function fOpenInterview() {
          Direct = 1;
          fOpenMPage(null, "AppList.htm", 0, "", 0, 0, "Applicant List");
      }

      function fOpenCircular() {
          Direct = 1;
          fOpenMPage(null, "eCircular.aspx", 0, "", 0, 0, "Circular");
      }

	function fOpenCugList() {
          Direct = 1;
          fOpenMPage(null, "eCUGList.htm", 0, "", 0, 0, "CUG List");
      }

      

	function fOpenCanteenBooking() {
          Direct = 1;
          fOpenMPage(null, "CanteenBooking.htm", 0, "", 0, 0, "Canteen Booking");
      }
      


      function fOpenRejoin() {
          Direct = 1;
          fOpenMPage(null, "eRejoin.aspx", 0, "", 0, 0, "Rejoin");
      }
      
      function fOpenTeamProfile(TEmpid,TUserid) {
          Direct = 1;
          fOpenMPage(null, "Profile.htm?Mode=Apply&Empid=" + TEmpid + "&Typeid=0&IDD=0&Lid=" + TUserid + "", 0, "", 0, 0, "Profile");
      }

      function fOpenExitInterview(TEmpid,TUserid) {
          Direct = 1;
          fOpenMPage(null, "EI.htm?Empid=" + TEmpid + "&Typeid=0&IDD=0&Lid=" + TUserid + "", 0, "", 0, 0, "Exit Interview");
      }

      function fOpenFrame(Mode, Empid, Type, IDD, Lid) {
          fOpenMPage(null, "Profile.htm?Mode=" + Mode + "&Empid=" + Empid + "&Typeid=" + Type + "&IDD="+ IDD +"&Lid=" + Lid + "", 0, "", 0, 0, "Profile Approve");
      }   

      function fOpenHR(PV) {
          var Qry = "exec [TransControl] @Opt=7,@Userid=" + form1.hUserid.value + ",@Empid=" + GEmpid + ",@PV=" + PV + "";
          try { FormGrid(Qry, dLists, "", 0, 50); } catch (e) { }
      }
       
        var PObj = "";
        var MPtrr;
        var MPtdd;
        var MPmnuid = 0;

       
 

         function fOpenUser() {
             window.parent.fUserdisp();
         }
         function fDC(Qry){
            var ResVal;
            var q=Qry.split("##");

            Qry= frd("salt", q[0]) + q[1];

            alert(Qry);

             try {
               //  alert(Qry);
                
                 var Res = MakeGrid.GetLists(Qry);
                 ResVal = Res.value;

             }
             catch (e) {
                 //alert(Qry);
                alert(e)
                 ResVal = e;
             }
             return ResVal;

         }
         function fQry(Qry) {
             var ResVal;
             try {
               //  alert(Qry);
                
                 var Res = MakeGrid.GetLists(Qry);
                 ResVal = Res.value;

             }
             catch (e) {
                 //alert(Qry);
                alert(e)
                 ResVal = e;
             }
             return ResVal;
         }
         function fDOC(Qry) {
             var ResVal;
             try {
                 //  alert(Qry);
                 var Res = MakeGrid.GetDocs(Qry);
                 ResVal = Res.value;

             }
             catch (e) {
                 //alert(Qry);
                 alert(e)
                 ResVal = e;
             }
             return ResVal;
         }

         function fSession() {
             var Res = ePfile.CheckSession(form1.hUserid.value);
             var Logout = Res.value;
             if (Logout == "1") {
                 window.parent.fLogout();
             }


         }

         var GSession = "";

         function fGetSession() {
             var session = '<%= Session["userid"] %>';
             GSession = session;
             if (GSession != "") {
             //    fLogin(GSession);
               //  window.parent.fLogin(GSession);
             }
         }

         function fSaveCmd(Qry) {
             var res = MakeGrid.saveRec(Qry);
             return res.value;
         }

         function fSaveCom(Qry) {
             var res = MakeGrid.saveCommon(Qry);
             return res.value;
         }

         function fSaveProc(Qry) {
             var res = MakeGrid.saveProc(Qry);
             return res.value;
         }

         function fSaveCmds(Qry) {
             var res = MakeGrid.SaveRecs(Qry);
             return res.value;
         }

         function fGetVal(Qry) {
             var res = MakeGrid.GIntVal(Qry);
             return res.value;
         }

         function fGetString(Qry) {
             var res = MakeGrid.GStringVal(Qry);

             return res.value;
         }


         function fUserType(Qry) {
             var GT = fQry(Qry);
             var val = "";
             if (GT.split("!!").length > 1) {
                 val = GT[1].split("!!")[1].split("~")[0];
             }
             return val;
         }
         function fEmpDetails(Empid) {  return fnGetEmpDetailshtm(Empid); }

         function fFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print) { 
             window.parent.document.getElementById("Frm3").contentWindow.LFooters.appendChild(fnFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print));
         }

         function fPageFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print) {
             var Obj = GFrame.contentWindow.document.getElementById("Frm3").contentWindow;
             console.log(Obj);
             Obj.LFooters.appendChild(fnFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print));
         }

        function fDirectFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print) {
            return fnFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print);
        }

         function fDFooter(Empid, TransGrpid, IDD, Lvl, Userid,HR,Print) {
             var x = Math.floor((Math.random() * 100) + 1);
             LDScript.src = "dScript.js?n=" + x + "";
             GFrame.contentWindow.LFooters.appendChild(fnFooter(Empid, TransGrpid, IDD, Lvl, Userid, HR, Print));

         }

         function fSelectCombo(Obj) { GLoad = 0; }

         function fLoadPortal() { }

         function getDropData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData) {
             var res=dropdownlist.GetData(hiddenObj, icase, isplit, upd, sp, RCond);
             return res;
         }


         var Gfid = 0;

         function fOpenLetters(Page, IDD, MenuName) {
             Gfid = IDD;
             fOpenMPage(null, Page, 0, "", 0, 0, MenuName);

         }

         function fOpenPage(Page, IDD, MenuName) {
             Gfid = IDD;
             fOpenMPage(null, Page, 0, "", 0, 0, MenuName);

         }



    </script>
</head>
<body >
    <form id="form1" runat="server">
    <div >           
           
           <table  style="height: 100%;width:100%;"  style="border-collapse:collapse;" cellspacing=0 border=0 >
                <tr height=25px id=Header3>
                    <td  > 
                    <table cellspacing=0 border=0 style="height:100%;">   
                                <tr id=trtab> </tr> 
                    </table>    
                    </td>
                </tr>
                <tr height="96%" id="trFPage" _class=GridBack ></tr>

           <tr height=% style="display:none;" >
                 <td colspan=3   class=GridBack style="cursor:hand;" align=left ><b>Settings: Report Format :
                        Rows/Page: <input type=text id=selRpt name=selRpt value="2000" size=5 class=txtSize /> &nbsp;&nbsp;&nbsp;
                        Row Height<input type=text id=selHt name=selHt value="16" size=5 class=txtSize /> &nbsp;&nbsp;&nbsp;
                        Report Width (%): <input type=text id=tRptWidth name=tRptWidth value="90" size=5 class=txtSize /></b></td>

                    </tr>
            </table>
            
            
           
    </div>
    

    <div id=dSourceData style="display:none;height:300px;width:600px;" ></div>
    <div id=dLoading style="display:none; position:absolute;left:30%;top:30%;width:10%;height:110px" > <font size=12px color=black>Loading.....</font></div>
    
    <div id="divDate" style="BORDER-RIGHT: thin; BORDER-TOP: thin; DISPLAY: none; LEFT: 150px; BORDER-LEFT: thin; WIDTH: 150px; BORDER-BOTTOM: thin; POSITION: absolute; TOP: 150px; HEIGHT: 150px"><label id="lblDate"></label></div>
    
        <input type=hidden id=hUserid name=hUserid runat="server" />
        <input type=hidden id=hRole name=hRole runat="server" />
        <input type=hidden id=hType name=hType runat="server" />
        <input type=hidden id=hEmpid name=hEmpid runat="server" />
        <input type=hidden id=hEmpno name=hEmpno runat="server" />
        <input type=hidden id=hFrm name=hFrm runat="server" />
        <input type=hidden id=hTo name=hTo runat="server" />
        <input type=hidden id=hAuth name=hAuth runat="server" />
        <input type=hidden id=hDate name=hDate runat="server" />
        <input type=hidden id=hCanSlab name=hCanSlab value="0" runat="server" />
        <input type=hidden id=hDF name=hDF runat="server" />
        <input type=hidden id=hDT name=hDT runat="server" />
        <input type="hidden" id="hGradeid" name="hGradeid" value="0" runat="server">
        <input type=hidden id=hLLogin name=hLLogin value="0" runat="server" />
        <input type=hidden id=hUsers runat="server" name=hUsers />
        <input type=hidden id=hESTS name=hESTS value="0" runat="server" />
        <input type=hidden id=hEmps runat="server" value="" name=hEmps />
        <input type=hidden id=hTDSEli name=hTDSEli value=0 runat="server" />
        <input type=hidden id=hDOBEli name=hDOBEli runat="server" />
        <input type=hidden id=hDOMEli name=hDOMEli value="0" runat="server" />


    <script language="javascript">
       

        fDataGrid(dSourceData, "DSource", "dLists", "Hierarchy List"); fonlyData(dSourceData);

        // http: //103.225.127.187:98/eHRBeta/ePfile.aspx#no-back-button
        
    </script>

    
     <div id="divData" onkeyup="fHideDropDown();" style="CLEAR: none; BORDER-RIGHT: lavender thin groove; BORDER-TOP: lavender thin groove; DISPLAY: none; 
        LEFT: 20px; OVERFLOW: hidden; BORDER-LEFT: lavender thin groove; BORDER-BOTTOM: lavender thin groove; POSITION: absolute; TOP: 20px; HEIGHT: 35%; width:50%;  BACKGROUND-COLOR: #e6e6e7"
				align="left" ><label id="lbldata" style="CURSOR: hand" runat="server"></label></div>


    <script language="javascript">

        var Users = ""; var LPageid = 1;
        function fLoadUsers() {

            var Qry = "exec TransControl @Opt=6,@Userid=" + form1.hUserid.value + ",@Flt='" + fnFilt() + "'";
            //alert(Qry);
            var Res = MakeGrid.GetLists(Qry);
            form1.hUsers.value = Res.value;
            Users = form1.hUsers.value;
                window.parent.fFormUserLists(0);
        }

        if (form1.hUserid.value != "0" && form1.hUserid.value!="")
            fLoadUsers();
        window.parent.fCheckLogin();


        window.parent.fLoadBaseFilters();

        fGetSession();
    </script>
    
    
    
    
    
    </form>
</body>
</html>