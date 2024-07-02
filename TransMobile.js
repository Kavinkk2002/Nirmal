


function fCommonMobile(G, Eid,Uid,IDD,SMode) {
    
    UserType="";
    isFinalLevel = 0;

    var st = "exec [TPageMobile] @Opt=1,@Empid=" + Eid + ",@TransGrpid=" + G + ",@USerid=" + Uid + ",@IDD=" + IDD + ",@Print=0";
    console.log(st);

    var res1 = FileObj.fQry(st).split("!!")[1];
    UserLevel= res1[0];
    var FinalLevel = res1[1];
    
    if(FinalLevel==UserLevel)   
        isFinalLevel=1;
    else
        isFinalLevel=0;
    

        if(SMode!="Apply"){
            if(isFinalLevel==0)
                Mode="Forward";
            else if(isFinalLevel==1)
                Mode="Approve";

        }

            
    

}






function fLoadTransactionMobile(Transid){
    var st="";
        switch(Transid) {
            
           case 5:        
                    var st="exec TransMobile @Opt=5";
                    var GT=FileObj.fQry(st).split("!!");
                    st=GT[1].split("~")[0]; break;
                    break;

            case 6 : 
                    var st="exec TransMobile @Opt=6";
                    var GT=FileObj.fQry(st).split("!!");
                    st=GT[1].split("~")[0]; break;
                    
            case 7 : 
                    var st="exec TransMobile @Opt=7";
                    var GT=FileObj.fQry(st).split("!!");
                    st=GT[1].split("~")[0]; break;
             case 9:
                    var st="exec fTAs @Opt=1";
                    var GT=FileObj.fQry(st).split("!!");
                    var sp=GT[1].split("~");
                    st= sp[0] + sp[1]  + sp[2] + sp[3] + sp[4] + sp[5] + sp[6] + sp[7]; 
                    break;
            
                    case 10:
                        var st="exec TransMobile @Opt=10";
                        var GT=FileObj.fQry(st).split("!!");
                        st=GT[1].split("~")[0]; 
                        break;
            case 13:
                        var st="exec TransMobile @Opt=13";
                        var GT=FileObj.fQry(st).split("!!");
                        st=GT[1].split("~")[0]; 
                        break;
                            
                           
        }

        return st;


}

function fCheckAlign(Tab){
    var tr = Tab.rows[1];
    var x = tr.querySelectorAll(".Entry");
    for (var i = 0; i < x.length; i++) {
        var cName=  x[i].className.replace("Entry ","");
        x[i].autocomplete="off" ;
        switch(cName.trim()){
              case "Number":  
              x[i].value=0; 
              x[i].style.textAlign="right";
              
              break;
        }

        

    }

}

function fCheckValidate(Tab){
    var x = Tab.rows[1].querySelectorAll(".Entry");
        var Flag=0;

    for (var i = 0; i < x.length; i++) {
        var cName=  x[i].className.replace("Entry ","");
        switch(cName.trim()){
              case "Number":    if(x[i].value=="") { Flag=1; alert("Enter Numeric Value"); }  break;
              case "Text":      if(x[i].value=="")  { Flag=1; alert("Enter Text Value"); }  break;
              case "Select":    if(x[i].value==0)  { Flag=1; alert("Select List"); } break;
              
        }

        if( Flag==1){
                x[i].focus();
                return false;
                 
        }

    }
   

}


function fAddItem(Tab,Types,GContent) {
        if(Types==0)
            if(fCheckValidate(Tab)==false) return ;
    
    var tr0 = Tab.rows[1];
    var tr = Tab.insertRow(Tab.rows.length - 2); tr.style.height = "20px";tr.className = "trItems";
    
    var x = tr.insertCell(tr.cells.length); x.className = "Snos";x.align = "center";    x.innerHTML = 1;
    fPostItem(tr);
    x = tr.insertCell(tr.cells.length); x.className = "DContents"; x.align = "center";
    x.innerHTML = "<input type=button value='Del'  class=Dels onclick=\"fRemoveItem(this,'"+ Tab.id +"');\">"; x.align = "center";
    
    if(Types==1){
           
        fFillItem(tr,Tab,GContent)

    }
    fCheckRepeat(Tab);
    fclrItem(Tab);
    fSrno(Tab);
    fItemTotal(Tab);
}
function fFillItem(tr,Tab,C){
    var tr1 = Tab.rows[1];
    var x = tr.querySelectorAll(".Entry");
    var k = 0;
    for (var i = 0; i < x.length; i++) {
            x[i].value=C[i];
    }
    
}
function fPostItem(tr) {
    var Tab = DataHead;
    var tr1 = Tab.rows[1];
    var x = tr1.querySelectorAll(".Entry");
    var k = 1;
    for (var i = 0; i < x.length; i++) {
        var y = tr.insertCell(tr.cells.length); y.className = "DContents"; y.align = "center"; y.innerHTML = tr1.cells[k].innerHTML;
        y.querySelector(".Entry").value = tr1.cells[k].querySelector(".Entry").value;
            
      
        k++;
    }
}

function fclrItem(Tab) {
    var tr0 = Tab.rows[1];
    var x = tr0.querySelectorAll(".Entry");
    for (var i = 0; i < x.length; i++) {
        var cName=  x[i].className.replace("Entry ","");
        switch(cName.trim()){
              case "Number":   x[i].value="0";break;
              case "Text":  x[i].value="";break;
              case "Select":  x[i].value=0;break;
              
        }

    }
    if( x[0])
    x[0].focus();

}

function fResetTotal(Tab){
    var x=Tab.rows[1].querySelectorAll(".Entry");
    for (var i = 0; i < x.length; i++) {
        var cName=  x[i].className.replace("Entry ","");
        var indx=x[i].parentNode.cellIndex;
        var Tot=trTotal.cells[indx];
        switch(cName.trim()){
            case "Number": Tot.innerText=0;break;
        }
    }
}
function fItemTotal(Tab) {
    fResetTotal(Tab);
    var tr0 = Tab.rows[1];
    var x = tr0.querySelectorAll(".Entry");
    var y=Tab.querySelectorAll(".trItems");


    
    for (var k = 0; k < y.length; k++) {
        var t=y[k].querySelectorAll(".Entry");
            for (var i = 0; i < x.length; i++) {
                var cName=  x[i].className.replace("Entry ","");
                var indx=x[i].parentNode.cellIndex;

                var Tot=trTotal.cells[indx];
                   
                 switch(cName.trim()){
                     case "Number" : 
                     if(Tot.innerText.trim()=="")  Tot.innerText=0;
                        Tot.innerText =  parseFloat(Tot.innerText)  + parseFloat(t[i].value) ; 
                        Tot.align="right"; 
                     break;
                 }

                 
            }
    }
}


function fRemoveItem(Obj,Tabid) {
        if(confirm("Want to Delete and Remove from Item List")){
        var Tab=eval(Tabid);
        var tr0 = Tab.rows[0];
    
        var tr = Obj.parentNode.parentNode;
        var td=Obj.parentNode;
        var tdp=td.previousElementSibling;
        var prmt=tr0.cells[tdp.cellIndex].title;

        if(tdp.querySelector(".Entry")  ){
            if(parseInt( tdp.querySelector(".Entry").value)>0)
                fDeleteItem(Tab,tdp.querySelector(".Entry").value,prmt)
        }

        if (tr) { tr.remove(); 
            fSrno(Tab); 
            fItemTotal(Tab);
          }
    }

}

function fDeleteItem(Tab,val,prmt){

    var s=Tab.title.split(",");
    var st="exec " + s[0] + " @Opt=" + s[1] +"," + prmt +"="+ val ;
    console.log(st);
    var Rtn = FileObj.fSaveCmd(st);
    alert(Rtn);
}

function fDelItems(Tab){
    var x=Tab.querySelectorAll(".trItems");
    for(var i=0;i<x.length;i++){
        x[i].remove();
    }

    fResetTotal(Tab);

}
function fSrno(Tab) {
    var x = Tab.querySelectorAll(".trItems");
    for (var i = 0; i < x.length; i++) {
        x[i].cells[0].innerText = i + 1;
    }
}



function fSaveItem(Tab,SP) {
    var h = Tab.rows[0];
    var st="";
    var x = Tab.rows[1].querySelectorAll(".Entry");
    var y=Tab.querySelectorAll(".trItems");
    var dt="";
    
    for (var k = 0; k < y.length; k++) {
        st +=  SP  + " ";
        var t=y[k].querySelectorAll(".Entry");
        try{
         for (var i = 0; i < x.length; i++) {

                var cName=  x[i].className.replace("Entry ","");
                var indx=x[i].parentNode.cellIndex;
                 var lf="";
                
                 if(h.cells[indx].title!="")
                        lf= h.cells[indx].title.replace(" ","");
                 else 
                        lf = "@" + h.cells[indx].innerText.replace(" ","");

                switch(cName.trim()){
                    case "Number" : st += "" + lf + "=" + fNumbers(t[i].value) +",";  break;
                    case "Select" : st += "" + lf + "=" + t[i].value +",";  break;
                    case "Text" :   st += "" + lf + "='" +   t[i].value +"',";break;
                    case "Date" :   st += "" + lf + "='" + fymd(t[i].value) +"',"; break;
                }
          }
        }catch(e){ alert(e);}

          st=st.substring(0,st.length-1);
          st += "!";
    }

    
    return st;
}

function fNumbers(val){
    var n=0;
        if(val=="")
        n=0;
          else 
            n=val;
        return n;

}


function fCheckRepeat(Tab){
   
    var y=Tab.querySelectorAll(".trItems");
    var x=y[y.length-1];
    var p=x.querySelectorAll(".Entry");
    
    for (var k = 0; k < y.length-1; k++) {
            var Flag=1;
            var q=y[k].querySelectorAll(".Entry");
            
            for(var j=0;j<q.length;j++){
                        var cName=  p[j].className.replace("Entry ","");
                        switch(cName.trim()){
                            case "Number" : if(p[j].value==q[j].value) Flag=0; else Flag=1; break;
                            case "Text" :   if(p[j].value==q[j].value) Flag=0; else Flag=1; break;
                            case "Date" :   if(p[j].value==q[j].value) Flag=0; else Flag=1; break;
                        }
    
                        if(Flag==1){
                            Flag=1;
                            break;
                        }
                    
            }
    
            if(Flag==0){
                alert("Repeat Entries");
                   x.remove();
            }
            
    }
    }

    //-------------------------------------Leave Entry-----------------------------------------------------------------------------------------------

    var Leaveid = 0;
    
    function fGetLeaveDetails(Eid, idd) {
        if (idd > 0) {
            var Qry="exec [LeaveEntry_Mobile] @Opt=6,@Empid=" + Eid + ",@IDD=" + idd + "";
            alert(Qry);
            
            console.log(Qry);
            var res = FileObj.fQry(Qry);

            GT = res.split("!!");
            GHeader = GT[0].split("~");
            GSP = GT[1].split("~");
             
                Leaveid = fGetColVal("Leaveid");
                tDOF.value = fGetColVal("DOF");
                tDOT.value = fGetColVal("DOT");
                SelFSess.value = fGetColVal("fSession");
                SelTSess.value = fGetColVal("tSession");
                tPurpose.value = fGetColVal("Purpose");
                tLDays.value = fGetColVal("LDays");
                hTLvDays.value = fGetColVal("TLvDays");
                tPreLDays.value = fGetColVal("PreLdays");
               
                //Normal Procedure
                hStatus.value = fGetColVal("STS");
                //tRemark.value = fGetColVal("Remark");
                CompletedLevel = fGetColVal("Lvl");
                
                               
            
        }
    }



    function fnApplyLeave(Status) {

            var Empid=window.parent.parent.GEmpid;

        if (confirm("Confirm transaction?") == false)
            return false;
 

            if (Empid == "" || Empid == "0") { alert("Invalid Employee"); return false; }
            if (tDOF.value == "") { alert("Enter From Date"); tDOF.focus(); return false; }
            if (tDOT.value == "") { alert("Enter To Date"); tDOT.focus(); return false; }

            if (Status == 1) {
                tPurpose.value = tPurpose.value.trim();
                if (tPurpose.value.length < 4) {
                    alert("Purpose Should be more than 3 Characters"); tPurpose.focus(); return false;
                }
            }
            if (Mode == "Forward" || Mode == "Approve") {
                tRemark.value = tRemark.value.trim();
                if (tRemark.value.length < 2) {
                    alert("Remark Should not be blank"); tRemark.focus(); return false;
                }
            }
            var dt = "exec LeaveEntry_Mobile @Opt=5,"
                 + " @Mode='" + Mode + "',"
                 + " @Status=" + Status + ","
                 + " @Userid=" + window.parent.parent.GUserid + ","
                 + " @Empid=" + Empid + ","
                 + " @DOS='" + tDOF.value + "',"
                 + " @DOC='" + tDOT.value + "',"
                 + " @Purpose='" + tPurpose.value + "',"
                 + " @IDD=" + IDD + ","
                 + " @FSess=" + SelFSess.value + ","
                 + " @Tsess=" + SelTSess.value + ","
                 + " @Leaveid=3,"
                 + " @Remark='" + tRemark.value + "',"
                + " @AppLock='',"
                + " @AprLock='',"
                + " @UserType='" + UserType + "',"
                 + " @Lvl=" + UserLevel + "";

                 console.log(dt);
           
            var Rtn = FileObj.fSaveCmd(dt);
            var Result = Rtn.split("~");
            alert(Result[1]);

                   if(Result[0]=="0"){
                            window.parent.fMyCalendar(2);
                             try{ fCallDetails(Mode,Userid,Empid,IDD,GTransType,GLvl); } catch(e){ }
                    }
         
    }


    //------------------------------On Duty ------------------------------------------------------------------------------------------------

    
    function fnOpenDays(Obj) {
        if (Obj.checked) {
            trDate.style.display = "";
            trTim1.style.display = "none";
            trTim2.style.display = "none";
            trTim3.style.display = "none";
            DutyType.innerHTML = "Duty for a Period";

        }
        else {
            trDate.style.display = "none";
            trTim1.style.display = "";
            trTim2.style.display = "";
            trTim3.style.display = "";
            DutyType.innerHTML = "Timings For Single Date";
        }
    }   

    function fgetONDutyDetails(Eid, idd) {
        if (idd > 0) {
            var Qry="exec [OnDutyEntry_Mobile] @Opt=66,@Empid=" + Eid + ",@IDD=" + idd + "";
            console.log(Qry);
            var res = FileObj.fQry(Qry);

            GT = res.split("!!");
            GHeader = GT[0].split("~");
            GSP = GT[1].split("~");
 

                tDOF.value = fGetColVal("DOF");
                tDOT.value = fGetColVal("DOTO");

                if (fGetColVal("DOF") != fGetColVal("DOTO") || (fGetColVal("vfrm") == "0:00" && fGetColVal("vTo") == "0:00")) {
                    cDays.checked = true;
                }
                else {
                    cDays.checked = false;
                }
                fnOpenDays(cDays);

                var f = fGetColVal("vfrm").split(":")
                STimeFrmHr.value =  f[0];
                STimeFrmMn.value = f[1];

                var t = fGetColVal("vTo").split(":");
                STimeToHr.value = t[0];
                STimeToMn.value = t[1];
                tHrs.value = fGetColVal("ODHours");

                tPurpose.value = fGetColVal("Purpose");
                CompletedLevel = fGetColVal("Lvl");
                //Normal Procedure
                hStatus.value = fGetColVal("STS");
                tRemark.value = fGetColVal("Remark");

                

            
        }
        

    }



    
    function fnApplyOD(Status) {
        
        var Empid=window.parent.parent.GEmpid;


        if (confirm("Confirm transaction?") == false)
            return false;
 
            if (Empid == "" || Empid == "0") { alert("Invalid Employee"); return false; }
            if (tDOF.value == "") { alert("Enter From Date"); tDOF.focus(); return false; }
            if (tDOT.value == "" && cDays.checked) { alert("Enter To Date"); tDOT.focus(); return false; }

            if(Status==1){
                    tPurpose.value=tPurpose.value.trim();
                    if(tPurpose.value.length<4) {
                        alert("Purpose Should be more than 3 Characters"); tPurpose.focus(); return false; 
                    }
            }
            if(Mode == "Forward" || Mode == "Approve"){
                    tRemark.value=tRemark.value.trim();
                    if(tRemark.value.length<2) {
                        alert("Remark Should not be blank"); tRemark.focus(); return false; 
                    }
            }
            var dt = "exec OnDutyEntry_Mobile @Opt=6,"
            + " @Mode='" + Mode + "',"
            + " @Status=" + Status + ","
            + " @Userid=" + window.parent.parent.GUserid + ","
            + " @Empid=" + Empid + ","
            + " @DOS='" + tDOF.value + "',"
            + " @DOC='" + tDOT.value + "',"
            + " @Purpose='" + tPurpose.value + "',"
            + " @IDD=" + IDD + ","
            + " @Ftime='" + STimeFrmHr.value + ":" + STimeFrmMn.value + "',"
            + " @Ttime='" + STimeToHr.value + ":" + STimeToMn.value + "',"
            + " @ShiftHrs=" + tHrs.value + ","
            + " @Remark='" + tRemark.value + "',"
            + " @AppLock='',"
            + " @AprLock='',"    
            + " @UserType='"+ UserType +"',"
            + " @Lvl=" + UserLevel + "";

            console.log(dt);
            var Rtn = FileObj.fSaveCmd(dt);
            var Result = Rtn.split("~");
            alert(Result[1]);
            if(Result[0]=="0"){
                window.parent.fMyCalendar(2);
                 try{ fCallDetails(Mode,Userid,Empid,IDD,GTransType,GLvl); } catch(e){ }
             }
        }
 


      //------------------------------PM---------------------------------------------------------------------------------------------

      function fgetPMDetails(Eid, idd) {
        if (idd > 0) {
            var Qry="exec PMEntry_Mobile @Opt=77,@Empid=" + Eid + ",@IDD=" + idd + "";
            console.log(Qry);
            var res = FileObj.fQry(Qry);
            
            GT = res.split("!!");
            GHeader = GT[0].split("~");
            GSP = GT[1].split("~");

                tDOF.value = fGetColVal("DOF");
                var f = fGetColVal("vfrm").split(":")
                STimeFrmHr.value = f[0];
                STimeFrmMn.value = f[1];

                var t = fGetColVal("vTo").split(":")
                STimeToHr.value = t[0];
                STimeToMn.value = t[1];

                tHrs.value = fGetColVal("PMHours");

                //Normal Procedure
                
                tPurpose.value = fGetColVal("Purpose");
                hStatus.value = fGetColVal("STS");
                //tRemark.value = fGetColVal("Remark");
                CompletedLevel = fGetColVal("Lvl");

                
            
        }
    }


      function fnApplyPM(Status) {
        
        var Empid=window.parent.parent.GEmpid;


        if (confirm("Confirm transaction?") == false)
            return false;

 
            if (Empid == "" || Empid == "0") { alert("Invalid Employee"); return false; }

            if (Mode == "Apply") {
                if (tDOF.value == "") { alert("Enter From Date"); tDOF.focus(); return false; }
                if (STimeFrmHr.value == "0" && STimeToMn.value == "0") { alert("Select From Time"); return false; }
                if (STimeToHr.value == "0" && STimeToMn.value == "0") { alert("Select To Time"); return false; }
                if (tHrs.value > 23) { alert("selected Timing Exceeds 23 Hour"); return false; }
                if (tHrs.value == "0") { alert('select Timings'); return false; }
                if (tHrs.value < "0") { alert('select valid Timings'); return false; }
                if (tPurpose.value == "") { alert("Enter the Purpose"); tPurpose.focus(); return false; }
            }
            else if (Mode == "Forward" || Mode == "Approve") {
                if (tRemark.value == "") { alert("Enter the Forward or Approve Remark"); tRemark.focus(); return false; }
            }
                var dt = "exec PMEntry @Opt=7,"
                + " @Mode='" + Mode + "',"
                + " @Status=" + Status + ","
                + " @Userid=" + window.parent.parent.GUserid + ","
                + " @Empid=" + Empid + ","
                + " @DOS='" + tDOF.value + "',"
                + " @Purpose='" + tPurpose.value + "',"
                + " @IDD=" + IDD + ","
                + " @Ftime='" + STimeFrmHr.value + ":" + STimeFrmMn.value + "',"
                + " @Ttime='" + STimeToHr.value + ":" + STimeToMn.value + "',"
                + " @ShiftHrs=" + tHrs.value + ","
                + " @Remark='" + tRemark.value + "',"
                + " @AppLock='" + FileObj.GAppLock + "',"
                + " @AprLock='" + FileObj.GAprLock + "',"
                + " @UserType='"+ UserType +"',"
                + " @Lvl=" + UserLevel + "";
               // + " @ReturnTo=" + SelApprovers.value + ","
                //+ " @RLevel=" + SelApprovers.value + ","
                
                    console.log(dt);
                    var Rtn = FileObj.fSaveCmd(dt);
                    var Result = Rtn.split("~");
                    alert(Result[1]);

                    if(Result[0]=="0"){
                        window.parent.fMyCalendar(2);
                         try{ fCallDetails(Mode,Userid,Empid,IDD,GTransType,GLvl); } catch(e){ }
                     }
                    //window.parent.fDisplay(window.parent.MyCalendar,7);
    }



  //  --------------------------CO ----------------------------------------------------------
        
  
        var RselObj = null; var Daysid = 0; var DOA = "";
            function fSelectRow(Obj, DG, ID) {
                fGetGridRow(Obj, DG, ID);
                with (form1) {
                    Daysid = fGetColVal("Keyid");
                    IDD = Daysid;
                    SelCurShift.value = fGetColVal("hidShiftid");
                    tShiftHours.value = fGetColVal("hidSHours");
                    
                    selCurFlag.value = fGetColVal("Flag");
                    tDOT.value = fGetColVal("DOT");
                    tLate.value = fGetColVal("hidLate");
                  
                    tFrm.value = fGetColVal("hidFrm");
                    tTo.value = fGetColVal("hidToo");
                    tOT.value = fGetColVal("hidOT");
                    tWHrs.value = fGetColVal("Whrs");
                    tOD.value = fGetColVal("hidOD");

                    tActualStock.value = fGetColVal("ActualStock");


                    RselObj = Obj;
                }
            }
   function fgetCODetails(Eid, idd) {
                if (idd > 0) {
                      
                    var Qry="exec [eAttendList] @func=44,@Empid=" + Eid + ",@IDD=" + idd + "";
                        console.log(Qry);
                    var res = FileObj.fQry(Qry);
                    GT = res.split("!!");
                    GHeader = GT[0].split("~");
                    GSP = GT[1].split("~");
                    with (form1) {
                        
                        Daysid = fGetColVal("Keyid");
                        IDD = Daysid;
                        SelCurShift.value = fGetColVal("hidShiftid");
                        selCurFlag.value = fGetColVal("Flag");
                        tDOT.value = fGetColVal("DOT");
                        tLate.value = fGetColVal("hidLate");

                        tFrm.value = fGetColVal("hidFrm");
                        tTo.value = fGetColVal("hidToo");
                        tOT.value = fGetColVal("hidOTH");
                        tWHrs.value = fGetColVal("hidWhrs");
                        tOD.value = fGetColVal("hidOD");

                        tActualStock.value = fGetColVal("ActualStock");
                        tAppliedStock.value = fGetColVal("ApplyStock");
                        tHODStock.value = fGetColVal("HODStock");
                        tHRDStock.value = fGetColVal("HRStock");
                        tFinalStock.value = fGetColVal("ApproveStock");
                        tPurpose.value = fGetColVal("hidPurPose");

                        //Normal Procedure
                        
                        hStatus.value = fGetColVal("STS");
                        //tRemark.value = fGetColVal("Remark");

                    }
                }
            }


            function fChangeStock(Obj) {
                //    if (Obj.value == 1 || Obj.value == 2)
                //        tActualStock.value = 0.5;
                //    else
                //        tActualStock.value = 1;
                }
    
                function chk() {
                    with (form1) {
                        if (tPurpose.value == "") { alert("Enter Purpose"); return false; }
                        if (tActualStock.value == "0" || tActualStock.value == "") { alert("Enter Stock"); return false; }
    
                    }
                }
    
    
                function fnApplyCO(Status) {
                    if (chk() == false)
                        return false;
                    else {
                        with (form1) {
                            var sp = "exec eAttendList @func=5,"
                            + " @IDD=" + IDD + ","
                            + " @Empid=" + Empid + ","
                            + " @Mode='" + Mode + "',"
                            + " @Status=" + Status + ","
                            + " @TDaysid=" + Daysid + ","
                            + " @DOA='" + fymd(tDOT.value) + "',"
                            + " @ActualStock=" + tActualStock.value + ","
                            + " @AppliedStock=" + tAppliedStock.value + ","
                            + " @HODStock=" + tHODStock.value + ","
                            + " @HRDStock=" +  tHRDStock.value + ","
                            + " @FinalStock=" + tFinalStock.value + ","
                            + " @Reason='" + tPurpose.value + "',"
                            + " @Remark='" + tRemark.value + "',"
                            + " @AppLock='" + FileObj.GAppLock + "',"
                            + " @AprLock='" + FileObj.GAprLock + "',"
                            + " @Userid=" + Userid + ","
                            + " @UserType='"+ UserType +"',"
                            + " @Lvl=" + UserLevel + "";
    
                            console.log(sp);
                            var Rtn = FileObj.fSaveCmd(sp);
                            var Result = Rtn.split("~");
                            alert(Result[1]);

                            if(Result[0]=="0"){
                                window.parent.fMyCalendar(2);
                                 try{ fCallDetails(Mode,Userid,Empid,IDD,GTransType,GLvl); } catch(e){ }
                             }
    
                
            }
            }
        }



        //---------------------------------------------------------------------------------------------


        
        function fnApplyTA(Status) {
            if (confirm("Confirm transaction?") == false)
                return false;

            with (form1) {

                if (Empid == "" || Empid == "0") { alert("Invalid Employee"); return false; }
                if (Mode == "Apply") {
                }
                else if (Mode == "Forward" || Mode == "Approve") {
                    if (tRemark.value == "") { alert("Enter the Forward or Approve Remark"); tRemark.focus(); return false; }
                }
                alert(UserType);
               
               
                /*
                if (UserType == "INTERNAL AUDIT") {
                    var dt1 = "";
                    var RCbox = document.querySelectorAll(".tacb");
                    var RHid = document.querySelectorAll(".hidcb");

                    for (var i = 0; i < RCbox.length; i++) {
                        var RCB = 0;
                        if (RCbox[i].checked == true) { RCB = 1; }
                        dt1 += "exec [eSaveTANew] @Opt=20,@TASid=" + RHid[i].value + ",@Chkd=" + RCB + "!";
                    }
                    var Res = FileObj.fSaveCmds(dt1);
                } */



                var dt = "exec [TAProcess] @Opt=11,"
                    + " @Mode='" + Mode + "',"
                    + " @Status=" + Status + ","
                    + " @Userid=" + Userid + ","
                    + " @Empid=" + Empid + ","
                    + " @Purpose='',"
                    + " @IDD=" + ODid + ","
                    + " @Remark='" + tRemark.value + "',"
                    + " @UserType='" + UserType + "',"
                    + " @Lvl=" + UserLevel + ","
                    + " @ReturnTo='0'";

               
                 // alert(dt);
                alert(FileObj.fSaveCmd(dt));

              

            }

        }


        //--------------------------------Resignation 

        function fSaveCheckList(){
            var x= document.querySelectorAll(".TextLevels");
            var dt="";

          for( var i=0;i<x.length;i++){
            var y=x[i].parentNode.parentNode;
                if(UserLevel==x[i].value)
                {   
                        var Remarks=y.querySelector(".Remarks").value;
                       
                        dt +=" exec [LeftEmpLists] @Opt=14, @Lvl="+ x[i].value +",@Remark='"+ Remarks +"',@Userid=" + Userid +",@Empid="+ Empid  +"!";

                        var CListids=y.querySelectorAll(".CListids");
                        var checks=y.querySelectorAll(".Checks");


                        for(var j=0;j<CListids.length;j++){
                            var ids=CListids[j].value;

                            var check=0;    
                            if(checks[j].checked)
                                check=1;
                                dt +=" exec [LeftEmpLists]  @Opt=13, @CheckLid="+ ids +",@checked="+ check +", @Empid="+ Empid  +"!";
                        }
                    break;
                }
          }
          console.log(dt);
          alert(FileObj.fSaveCmds(dt));
            
        }
          function fnApplyResig(Status) {

                if (UserLevel>1)
                            fSaveCheckList();
            
                         if (Empid == 0) {
                             alert("select Employee For Resignation");
                             return false;
                         }
                         if (tDOR.value == "") {
                             alert("select Date of Request");
                             return false;
                         }
                         if (tNoticeDays.value == "") {
                             alert("Enter Notice Days");
                             return false;
                         }

                         if (tDOLI.value == "") {
                             alert("Select Date of Left Indicate");
                             return false;
                         }

                      /*   if (tRemark.value == "") {
                             alert("Enter Reason or Remark for the Resignation");
                             return false;
                         }
                         */

                     var Qry = "exec [LeftEmpLists]  @Opt=102,"
                        +"@Mode='" + Mode + "',"
                        +"@Status=" + Status + ","
                        +"@Userid="+ Userid +", "
                        +"@Empid=" + Empid + ","
                        +"@IDD=" + IDD +","
                        +"@NDays=" + tNoticeDays.value + ","
                        +"@DOR='" + fymd(tDOR.value) + "',"
                        +"@EDOL='" + fymd(tDOLI.value) + "',"
                        +"@Reason='" + tPurpose.value + "',"
                        +"@UserType='" + UserType + "',"
                        +"@Lvl=" + UserLevel + ","
                        +"@Remark='" + tRemark.value + "'";


                       
                         console.log(Qry);

                         var Rtn = FileObj.fSaveCmd(Qry);
                        var Result = Rtn.split("~");
                        alert(Result[1]);

                         if(Result[0]=="0"){
                            try{
                            fCallDetails(Mode,Userid,Empid,IDD,GTransType,GLvl);
                        }
                        catch(e){}
                        
                         
                         }

                         //alert(window.parent.fSaveCmd(Qry));
                     }  


                     function fgetResigDetails(Eid, idd) {
                        if (idd > 0) {
                            var Qry = "exec  [LeftEmpLists] @Opt=103,@IDD=" + idd + "";
                            console.log(Qry);
                            var res = FileObj.fQry(Qry);
                            GT = res.split("!!");
                            GHeader = GT[0].split("~");
                            GSP = GT[1].split("~");
                            with (form1) {
                                tDOR.value = fGetColVal("DOR");
                                tNoticeDays.value = fGetColVal("NDays");
                                tDOLI.value = fGetColVal("DOLI");
                                hStatus.value = fGetColVal("STS");
                               
                                //tRemark.value = fGetColVal("Remark");
                                CompletedLevel = fGetColVal("Lvl");
                                tPurpose.value = fGetColVal("Purpose");
                                Grpid = fGetColVal("Grpid");
                             
                                if(fGetColVal("STS")=="Approved")
                                    trExit.style.display="";


                            }
                        }
                    }
    

                    function fOpenExitInterViews(){
                        window.parent.parent.fOpenExitInterview( Empid, Userid); 
                        

                    }
        
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

        
        function BuildMonthlyCalendar(yr, mn,Data) {
            
            kk=1;
            var month_name = new Array("January ", "February ", "March ", "April ", "May ", "June ", "July ", "August ", "September ", "October ", "November ", "December ");
            
            theday = 0;
            right_year = yr;
            month_num = mn - 1;
            CheckMonth_S();
            
            var strr = "";
            strr += "<br><br>"
            +"<table _class='DGridTableBlack' cellspacing=1 align=left   style='width:90%; '>";
            
            strr += "<tr height=25px><td  _class=DfldHead colspan=7 align=center style='cursor:hand;' onclick='LoadMatrix_S(" + yr + "," + mn + ");'>"
            + "<span  class=Leave  style='cursor:hand;padding:10px;' onclick=\"fPrvsMonth(this,"+ mn  +","+ yr +");\"><b><</b></span>&nbsp;&nbsp;&nbsp;&nbsp;"
            +"<span style='cursor:hand;padding:10px;'> " + month_name[month_num] + "-" + yr + "</span>"
            +"&nbsp;&nbsp;&nbsp;&nbsp;<span  class=Leave   style='cursor:hand;padding:10px;' onclick='fNextMonth(this,"+ mn +","+ yr +");'><b>></b> </span> </td></tr>";
        
            strr += "<tr class=DCalendarHead height=30px align=center>"
            +"<td>Sun</td><td>Mon</td><td  >Tue</td><td  >Wed</td>";
            strr += "<td  >Thu</td><td  >Fri</td><td  >Sat</td></tr>"
            +"<tr  height=25px align=center>";
        
            
            first_day = new Date(right_year, month_num, 1)
        
            for (var counter = 0; counter < 7; counter++) {
                if (counter >= first_day.getDay()) {
                    theday = theday + 1;
                    var gsplit = Data[kk].split("~");
                    //console.log(gsplit);
        
                    var Aflg = "";
                    var cls = "";
                    
                    if (theday == gsplit[2]) {
                        Aflg = gsplit[4];
                        cls = gsplit[6];
                        //console.log(theday);
                       // console.log(cls);
        
                        kk++;
                    }
                    strr += "<td style='cursor:hand;' class='MContent' id=td" + theday + " width=6% > "+ Aflg +"</td>";
                }
                else { strr += "<td class=MContent></td>"; }
            }
            strr += "</tr>";
        
        
        
            for (var weeks = 0; weeks < 5; weeks++) {
                strr += "<tr  align=center height=25px class='MContent'>";
                for (week = 0; week < 7; week++) {
                    theday = theday + 1
        
                    if (theday > endofmonth)
                    { strr += "<td  class=MContent>&nbsp;</td>"; }
                    else {
        
                        var gsplit = Data[kk].split("~");
                     //   console.log(gsplit);
        
                        var Aflg = "";
                        var cls = "";
                        if (theday == gsplit[2]) {
                            Aflg =  gsplit[4];
                             cls = gsplit[6];
        
                            kk++;
                        }
                        strr += "<td style='cursor:hand;' class='MContent' id=td" + theday + " width=6% >" + Aflg + "</td>";
                    }
        
                }

                strr += "</tr>";
            }
            strr += "</table>";
            return strr;
        }


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


function fSelectLBox(Objct){

   
    var objleft = Objct.offsetLeft;
    var objTop = Objct.offsetTop;
    var Objparent = Objct.offsetParent;
    
    while (Objparent.tagName != "BODY") {
        objleft += Objparent.offsetLeft;
        objTop += Objparent.offsetTop;
        try { Objparent = Objparent.offsetParent } catch (e1) { alert(e1); }
    }
       
    objleft = objleft;
    objTop = objTop + 20;
    
    
    if(objTop>1000)
      objTop=500;
    
    LBox.style.left = objleft + "px";
    LBox.style.top = "300px";
    LBox.style.height= "200px";
    LBox.style.width= "400px";
    LBox.style.display = "";
}



function fSelectBox(Objct,Types){
    dTeam.style.opacity = "0.3";
    
    if(Types==1)        
      BoxContent.innerHTML=  Objct.parentNode.innerHTML;
    else if(Types==2){
        BoxContent.innerHTML=  Objct.parentNode.innerHTML;
        Dates= sBox.querySelector(".Dates").value;
    }

   //sBox.style.display="block";

var objleft = Objct.offsetLeft;
var objTop = Objct.offsetTop;
var Objparent = Objct.offsetParent;

while (Objparent.tagName != "BODY") {
    objleft += Objparent.offsetLeft;
    objTop += Objparent.offsetTop;
    try { Objparent = Objparent.offsetParent } catch (e1) { alert(e1); }
}
   
objleft = objleft;
objTop = objTop + 20;


if(objTop>1000)
  objTop=500;


  
sBox.style.left = objleft + "px";
sBox.style.top = "300px";
sBox.style.height= "300px";
sBox.style.width= "300px";

if(Types==1){
    sBox.querySelector(".Boxes").style.width="90%";
    sBox.querySelector(".Boxes").style.height="90%";
    sBox.querySelector(".Trans").style.display="";
}
else if(Types==2){
    sBox.querySelector(".Trans").style.display="";
    sBox.querySelector(".DCalendarBlack").style.width="90%";
    sBox.querySelector(".DCalendarBlack").style.height="75%";
}

sBox.style.display = "";

}

function fGetEmployeeDetails(Obj,ObjText,Empid,Userids){
    var st = "exec [TransUsers] @Opt=2,@Empid=" + Empid + ",@Userid="+ Userids +"";
    var res =  FileObj.fQry(st).split("!!")[1].split("~")[0];
    if( Obj.querySelector(".Employees"))
    Obj.querySelector(".Employees").innerHTML = "<span class=Head1>"+ ObjText  + " </span></br></br><span class=Head2>" +  res +"</span>";
    else if( Obj.querySelector(".MyApproves"))
        Obj.querySelector(".MyApproves").innerHTML =   res;
    

}
function fCheckLeaveApprove(){
    
    var LDays = parseFloat(tLDays.value);
    
   
    if(Mode.trim() =="Forward" || Mode.trim()=="Approve"){
    //switch (Mode.trim()) {
            //case "Forward":


                
                if (LDays >= 0.5) {
                    if (LDays > 5 && UserType == "HRD") {
                        btnApprove.style.display = "none";
                    }
                    else if (UserType == "HRD") {
                        btnApprove.style.display = "";
                        btnForward.style.display = "none";
                    }
                    if (LDays > 2 && UserType == "REPORTING TO") {
                        btnApprove.style.display = "none";
                    }
                    else if (UserType == "REPORTING TO") {
                        btnApprove.style.display = "";
                        btnForward.style.display = "none";
                    }
                }
            
        }

}