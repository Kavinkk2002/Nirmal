
console.log("dScript!");


/*

function fTotal(Tab, Agr, Func) {
    var GT = Tab.split("!!"); var AgrSp = Agr.split("~"); var FuncSp = Func.split("~");
    for (var k = 0; k < AgrSp.length; k++) {
        var p = AgrSp[k].split("as");
        if (p[1]) { LGT = LGT + p[1].trim() + "~"; } else { LGT = LGT + p[0].trim() + "~"; }
    }
    LGT = LGT.substring(0, LGT.length - 1) + "!!";


      try {
        var k = -1;
         for (var i = 1; i < GT.length - 1; i++) {
            var sp = GT[i].split("~");
             var g = 0; var GrpString = ""; var AgrString = "";



}*/




function fGroup(Tab, Grp, Agr, Func) {

    var GT = Tab.split("!!"); var HeadSp = GT[0].split("~");
    var GrpSp = Grp.split("~"); var AgrSp = Agr.split("~"); var FuncSp = Func.split("~");
    var Department = ""; var DArray = []; var SArray = [];
    var LGT = Grp + "~";

    // Form Heading
    for (var k = 0; k < AgrSp.length; k++) {
        var p = AgrSp[k].split("as");  
        if (p[1]) { LGT = LGT + p[1].trim() + "~"; } else { LGT = LGT + p[0].trim() + "~"; }
    }
    LGT = LGT.substring(0, LGT.length - 1) + "!!";

    //-------------------------

    
    try {
        var k = -1;
        for (var i = 1; i < GT.length - 1; i++) {
            var sp = GT[i].split("~");
            var g = 0; var GrpString = ""; var AgrString = "";
            
            //form Grp record string 
            for (var l = 0; l < sp.length - 1; l++) { if (HeadSp[l] == GrpSp[g]) { GrpString += sp[l] + "~"; g++; } }
            GrpString = GrpString.substring(0, GrpString.length - 1);   //Result GrpString-- HeadOffice~Department1

            var ExFlag = 0; var sstring = "";
            
            if (DArray.length > 0) { for (var u = 0; u < DArray.length; u++) { if (GrpString == DArray[u]) { ExFlag = 1; k = u; break; } } }

            if (ExFlag == 0) {
                //For 1st Record Aggregation against the Group ---------------
                sstring = fCalGrp(sp, HeadSp, AgrSp, FuncSp, ExFlag, null);
                k = k + 1;
                DArray[k] = GrpString;
                AgrString = GrpString + "@" + sstring.substring(0, sstring.length - 1);
                
                SArray[k] = AgrString.replace(/~!/g, "!!");

            }
            else {
                var sps = SArray[k].split("@"); var sub = sps[1].split("~");
                sstring = fCalGrp(sp, HeadSp, AgrSp, FuncSp, ExFlag, sub);
                AgrString = sps[0] + "@" + sstring;                
                SArray[k] = AgrString.replace(/~!/g, "!!");
            }
        }
    }
    catch (e) { }

    //alert(SArray);
    SArray = SArray.map(function (x) { return x.replace(/@/g, "~") }); SArray = SArray.sort();
    for (var i = 0; i < SArray.length; i++) { LGT += SArray[i] + "!!"; }
    //alert(LGT);
    return LGT;
}


function fCalGrp(sp, HeadSp, AgrSp, FuncSp, ExFlag, sub) {
    var sstring = ""; var h = 0;
    for (var l = 0; l < sp.length ; l++) {
        if (h >= AgrSp.length) break;
        var p = AgrSp[h].split("as");
        if (HeadSp[l] == p[0].trim() || FuncSp[h].substring(0, 3) == "Agg") {
            var val = 0; var func = "";
            if (FuncSp[h].substring(0, 3) == "Agg") {
                func = FuncSp[h].substring(3, FuncSp[h].length).trim(); 
                val = fSplitAgr(p[0].trim(), sp, HeadSp);
            }
            else { func = FuncSp[h]; val = sp[l]; }
            switch (func) {
                case "Sum": if (sub != null) { sstring = sstring + String(gr(parseFloat(sub[h]) + parseFloat(val))) + "~"; } else { sstring = sstring + val + "~"; } break;
                case "Count": if (sub != null) { sstring = sstring + String(parseInt(sub[h]) + 1) + "~"; } else { sstring = sstring + 1 + "~"; } break;
            }
            h++;
        }
    }
    return sstring;
}

//-------------------------




// Joins


function fFormHeads(LR, GT) {
    var Heading = "";
    var sp = GT.split("~");
    for (var i = 0; i < sp.length; i++) {
        Heading += LR + "." + sp[i] + "~";
    }
    Heading = Heading.substring(0, Heading.length - 1);
    return Heading;
}


function fMatch(Tab1, Tab2, MFlds) {
    var GT1 = Tab1.split("!!");
    var GT2 = Tab2.split("!!");

    var LGT1 = fFormHeads("L", GT1[0]) + "~" + fFormHeads("R", GT2[0]) + "!!";
    var HeadSp1 = GT1[0].split("~"); var HeadSp2 = GT2[0].split("~");

    var Ls = MFlds.split("=");


    for (var i = 1; i < GT1.length - 1; i++) {  // Take                     1 st Record
        var sp1 = GT1[i].split("~");

        // Take the Left Index to determine Which Field;


        var Lindex = 0; var LVal;

        while (Lindex < HeadSp1.length) {
            if (Ls[0] == HeadSp1[Lindex]) {
                LVal = sp1[Lindex];
                break;
            }
            Lindex++;
        }

        for (var j = 1; j < GT2.length - 1; j++) {      // Compare the Field Val LVal to the GT2s Records
            var sp2 = GT2[j].split("~");
            var Rindex = 0; var RVal;
            while (Rindex < HeadSp2.length) {
                if (Ls[1] == HeadSp2[Rindex]) {
                    RVal = sp2[Rindex];
                    break;
                }
                Rindex++;
            }

            if (LVal == RVal) {
                LGT1 += GT1[i] + "~" + GT2[j] + "!!";
            }
        }

    }
    return LGT1;
}

function fMatchNext(GTVal, MFlds) {
    var GT = GTVal.split("!!");
    var Ls = MFlds.split("=");
    var HeadSp = GT[0].split("~");
    var LGT1 = GT[0] + "!!";

    for (var i = 1; i < GT.length - 1; i++) {
        var sp = GT[i].split("~");
        var Lindex = 0; var LVal;
        while (Lindex < HeadSp.length) {
            if (Ls[0] == HeadSp[Lindex]) {
                LVal = sp[Lindex];
                break;
            }
            Lindex++;
        }

        var Rindex = Lindex + 1; var RVal;
        while (Rindex < HeadSp.length) {
            if (Ls[1] == HeadSp[Rindex]) {
                RVal = sp[Rindex];
                break;
            }
            Rindex++;
        }

        if (LVal == RVal) {
            LGT1 += GT[i] + "!!";
        }
    }
    return LGT1;
}

function fGetHeading(Ls) {

    var Heading = "";
    var SplitType = "as"; if (Ls.includes("Agg")) SplitType = "Agg";
    
    var p = Ls.split(SplitType);

    if (p[1]) { Heading = p[1].trim(); } else Heading = p[0].trim();

    return Heading;


}
function fSelectFlds(GTVal, SFlds) {

    var GT = GTVal.split("!!");
    var Ls = SFlds.split(",");
    var HeadSp = GT[0].split("~");


    var LGT1 = ""; for (var i = 0; i < Ls.length; i++) { LGT1 += fGetHeading(Ls[i]) + "~"; }

    LGT1 = LGT1.substring(0, LGT1.length - 1) + "!!";

   // alert(LGT1);
    //alert(HeadSp);


    //return LGT1;
    for (var i = 1; i < GT.length - 1; i++) {
        var sp = GT[i].split("~");
        var m = 0;

        while (m < Ls.length) {
            for (var j = 0; j < HeadSp.length; j++) {
                var SplitType = "as"; if (Ls[m].includes("Agg")) SplitType = "Agg";

                var p = Ls[m].split(SplitType); var RMatch = p[0].trim(); if (p[1]) { RMatch = p[1].trim(); }
                if (HeadSp[j] == RMatch) {
                    if (SplitType == "Agg") {
                        val = fSplitAgr(p[0].trim(), sp, HeadSp);
                    }
                    else val = sp[j];
                    LGT1 += val + "~"; break;
                }
            }
            m++;
        }
        LGT1 = LGT1.substring(0, LGT1.length - 1) + "!!";
    }
    return LGT1;
}



//------------------------- Agrregate with Records


var G = "()*/+-%><={};#";

function fSplitAgr(str, GTRec, GTHead) {
    // var str = "(Float(20)/2)*100"; 
    var str1 = ""; var Ag = []; var s = 0; var k = 0; var i = 0;

    for (i = 0; i < str.length; i++) {
        var l = str.charAt(i);
        if (G.includes(l)) {
            Ag[k] = str.substring(s, i); var ss = str.substring(s, i);
            var sstrim = ss.trim();
            switch (sstrim) {
                case "Float": ss = "parseFloat"; break;
                case "Int": ss = "parseInt"; break;
                default: for (var j = 0; j < GTRec.length; j++) { if (sstrim == GTHead[j]) ss = GTRec[j]; } break;
            }
            str1 += ss + l;
            k = k + 1;
            s = i + 1;
        }
    }

    ss = "";
    var RemainStr = str.substring(s, str.length).trim();
    switch (RemainStr) {
        case "Float": RemainStr = "parseFloat"; break;
        default: for (var j = 0; j < GTRec.length; j++) { if (RemainStr == GTHead[j]) RemainStr = GTRec[j]; } break;

    }
    str1 = str1 + RemainStr;
    str1 = str1.replace(/#/g, "'");

    
    return eval(str1);

}


//----------------------------------

function fDistinctCols(GT, ColumnNames) {
    var DArray = []; var OldData = "";

    var HeadSp = GT[0].split("~");
    var Cols = ColumnNames.split("~");

    //alert(HeadSp);
    //alert(Cols);

    var m = 0; var k = 0;
    try {
        for (var i = 1; i < GT.length-1 ; i++) {
            OldData = "";
            var sp = GT[i].split("~");
            m = 0;


            while (m < Cols.length) {

                for (var j = 0; j < HeadSp.length; j++) {
                    if (Cols[m].trim() == HeadSp[j].trim()) {
                        OldData += sp[j] + "~";
                        break;
                    }
                }
                m++;
            }

            OldData = OldData.substring(0, OldData.length - 1);


            var ExFlag = 0;
            if (DArray.length > 0) { for (var u = 0; u < DArray.length; u++) { if (OldData == DArray[u]) { ExFlag = 1; break; } } }

            // alert(DArray);
            if (ExFlag == 0) {
                DArray[k] = OldData;
                k++;
            }
        }
    } catch (e) {alert(e);}


    //alert(DArray);

    // alert(DArray.sort());

    return DArray.sort();//(sp, ColumnNames);


        

}

function fDistinctKey(HeadSp,sp, ColumnNames) {
    var Cols = ColumnNames.split("~");

    var OldData = "";
    var m = 0;
    while (m < Cols.length) {
        for (var j = 0; j < HeadSp.length; j++) {
            if (Cols[m].trim() == HeadSp[j].trim()) {
                OldData += sp[j] + "~";
                break;
            }
        }
        m++;
    }


    OldData = OldData.substring(0, OldData.length - 1);

    return OldData;
    
}


function fDistinct(GT, ColumnNames) {

    var DArray = []; var OldData = "";
    var HeadSp = GT[0].split("~");
    var m = 0; var k = 0;

    for (var i = 1; i < GT.length ; i++) {

        var sp = GT[i].split("~");
        for (var j = 0; j < HeadSp.length; j++) {
            if (ColumnNames.trim() == HeadSp[j].trim()) {
                OldData = sp[j];
                break;
            }
        }
        var ExFlag = 0;

        if (DArray.length > 0) { for (var u = 0; u < DArray.length; u++) { if (OldData == DArray[u]) { ExFlag = 1; break; } } }
        if (ExFlag == 0) {
            DArray[k] = OldData;
            k++;
        }
    }
     
    return DArray.sort();


}



function fDistinctType(GT, ColumnNames,vType) {
    var DArray = []; var OldData = "";
    var HeadSp = GT[0].split("~");
    var m = 0; var k = 0;

    for (var i = 1; i < GT.length - 1; i++) {

        var sp = GT[i].split("~");
        for (var j = 0; j < HeadSp.length; j++) {
            if (ColumnNames.trim() == HeadSp[j].trim()) {
                OldData = sp[j];
                break;
            }
        }
        var ExFlag = 0;

        if (DArray.length > 0) { for (var u = 0; u < DArray.length; u++) { if (OldData == DArray[u]) { ExFlag = 1; break; } } }
        if (ExFlag == 0) {
            DArray[k] = OldData;
            k++;
        }
    }

 //   alert(vType);
    if (vType == "int") {
        return DArray.sort(function (a, b) { return a - b });
    }
    else
        return DArray.sort();


}

function compareNumbers(a, b) {
  return a - b;
}






function fDistinctAll(Tab) {
    var GT = Tab.split("!!"); var Match = 0; var LGT1 = []; LGT1 = GT[0] + "!!";
   
    for (var i = 1; i < GT.length - 1; i++) {
        var LGTsp = LGT1.split("!!");
        Match = 0;
        for (var ik = 0; ik < LGTsp.length - 1; ik++) {
            if (LGTsp[ik] == GT[i]) {
                Match = 1;
            }
        }
        if (Match == "0") {
            LGT1 += GT[i] + "!!";
        }
    }
    return LGT1;
}



function fWhere(GTVal, ColumnName, FilterString, Type) {

    var GT = GTVal.split("!!");
    var LGT1 = GT[0] + "!!";
    var HeadSp = GT[0].split("~");

    var Ls = FilterString.split("~");

    for (var i = 1; i < GT.length - 1; i++) {
        var sp = GT[i].split("~");
        var k = 0;
        while (k < HeadSp.length) {
            if (HeadSp[k].trim() == ColumnName.trim()) {
                break;
            }
            k++;
        }
        if (k < HeadSp.length) {
            var ExFlag = 0;
            sp[k] = sp[k].toUpperCase();

            for (var l = 0; l < Ls.length; l++) {
                Ls[l] = Ls[l].toUpperCase();
                switch (Type) {
                    case "=": if (sp[k] == Ls[l]) { ExFlag = 1; } break;
                    case "Like": if (sp[k].includes(Ls[l])) { ExFlag = 1; } break;
                    case ">": if (parseFloat(sp[k]) > parseFloat(Ls[l])) { ExFlag = 1; } break;
                    case "<": if (parseFloat(sp[k]) < parseFloat(Ls[l])) { ExFlag = 1; } break;
                    case ">=": if (parseFloat(sp[k]) >= parseFloat(Ls[l])) { ExFlag = 1; } break;
                    case "<=": if (parseFloat(sp[k]) <= parseFloat(Ls[l])) { ExFlag = 1; } break;
                }
                if (ExFlag == 1) {
                    break;
                }
            }
            if (ExFlag == 1) {
                LGT1 += GT[i] + "!!";
            }
        }
    }
    return LGT1;
}




function fGetColName(GT, ColName, indx) {
    var ColName = [];
    for (var i = 1; i < GT.length; i++) { var sp = GT[i].split("~"); ColName[i - 1] = sp[indx]; }
    return ColName;
}



function fSort(Allocated, ColumnName, Type) {
    var Data = []; Data = fDistinct(Allocated.split("!!"), ColumnName);
    Data = Data.sort();
    if (Type == "Desc") Data = Data.reverse();
    var GT = Allocated.split("!!");
    var LGT1 = GT[0] + "!!";
    var k = 0;
    try {
        while (k < Data.length) {
            var GTVal = fWhere(Allocated, ColumnName, Data[k], "=");
            GTVal = GTVal.substring(GTVal.indexOf("!!") + 1, GTVal.length);
            LGT1 = LGT1 + GTVal;
            k++;
        }
    } catch (e) { }
    return LGT1;

}




function fSorting() {
    //var r = 1;
    //while (r < 240000) {
    var GTVal = fSort(form1.hAllocatedList.value, "Department", "Asc");
    //  r++;
    //}
    //alert(1);

    //GTVal = fSort(GTVal, "Division", "Asc");
    fFillBox(tdStrength, GTVal, "");
}










var TabSeq = ["Branch", "Department", "Division", "Section", "ShiftName", "EmpName"];
var TabColor = ["DBlue", "DBlue", "DBlue", "DBlue", "DBlue", "DBlue"];

var GVal="";
function fFillFilters(GTVal) {
    //alert(1);
    var strength = GTVal;
    GVal = GTVal;
    for (var i = 0; i < TabSeq.length; i++) {
        var Data = []; Data = fDistinct(GVal.split("!!"), TabSeq[i]);
        fFillList(document.getElementById("f" + TabSeq[i] + ""), Data, TabColor[i], TabSeq[i], i);

    }
}

function fFillList(Tab, Data, clss, Heading, indx) {
    Tab.style.width = "100%";
    Tab.cellSpacing = "0"
    //Tab.className = clss;

    //   var Tr = Tab.insertRow(0); var x = Tr.insertCell(0); x.className = clss; x.align = "center"; x.innerHTML = Heading; Tr.style.height = "20px"; x.style.width = "100%";

    for (var i = 0; i < Data.length; i++) {
        Tr = Tab.insertRow(i);
        x = Tr.insertCell(0);
        x.innerHTML = Data[i];
        x.className = "DFilters";
        AddEvent(x, Tab, indx);
    }

}


var selObj = null; var selTab = null;
function AddEvent(e, Tab, indx) {
    var st;
    e.addEventListener("click", function (e) {
        if (selTab != Tab) { selObj = null; }
        if (selObj) { selObj.className = "DFilters"; }
        e.target.className = "FilSelect";
        selObj = e.target;
        selTab = Tab;
        var xObj = dFList.querySelectorAll(".DFilter");


        var FString = e.target.innerText;
        xObj[indx].innerText = FString;

        var i = indx + 1;

        while (i < TabSeq.length) {

            var cTab = document.getElementById("f" + TabSeq[i]);
            //alert(form1.hManStrength.value);
            var GTVal = fWhere(GVal, TabSeq[indx].trim(), FString.trim(), "=");
            //alert(GTVal);
            var Data = []; Data = fDistinct(GTVal.split("!!"), TabSeq[i]);
            fDellBox(cTab);
            fFillList(document.getElementById("f" + TabSeq[i] + ""), Data, TabColor[i], TabSeq[i], i);
            i++;
        }

    });
}

function fGetiUser() {
    var GT = form1.hUsers.value.split("!!");
    Header = GT[0].split("~");
    var j = 0;
    for (j = 0; j < Header.length; j++) {
        if (Header[j] == "Userid") {
            break;
        }
    }
    var i = 0;
    for (i = 1; i < GT.length; i++) {
        var sp = GT[i].split("~");
        if (Userid == parseInt(sp[j])) {
            break;
        }
    }
    return i;
}

function fCheckForward(str, Lvl) {
    var Approve = "Approve";
    var kLvl = Lvl + 2;
    var GT = str.split("!!")[1]; 
    var sp = GT.split("~");
    var Empty = 0;
    
    for (var i = kLvl; i < sp.length; i++) {
        if (sp[i] != "") { Empty = 1; break; } 
        else { Empty = 0; } 
    }
    if (Empty==1) Approve="Forward";
    return Approve;
}



  

    function fEnableButtonsList(IDD,Status,Mode) {
        with (form1) {
            btnApply.style.display = "none"; btnApply.style.backgroundColor = "#FFBB55"; btnApply.style.color = "#000000";
            btnCancel.style.display = "none"; btnCancel.style.backgroundColor = "#FF71FF"; btnCancel.style.color = "#000000";
            btnForward.style.display = "none"; btnForward.style.backgroundColor = "#84C1FF"; btnForward.style.color = "#000000";
            btnApprove.style.display = "none"; btnApprove.style.backgroundColor = "#FF7553"; btnApprove.style.color = "#000000";
            btnReject.style.display = "none"; btnReject.style.backgroundColor = "#8BE28B"; btnReject.style.color = "#000000";

            switch (Mode) {
                case "Apply": btnApply.style.display = ""; break;
                case "Approve": btnApprove.style.display = ""; btnForward.style.display = ""; btnReject.style.display = ""; break;
            }
        }

    }


    function fCheckUserLevel() {
        var ULevel = 0;
        var objs = document.querySelectorAll(".Levels")
        for (var i = 0; i < objs.length; i++) {
            if (objs[i].className.includes("Current")) {
                ULevel = (i + 1);
            }
        }
        return ULevel;
    }


       



    function fCreateButtons(Mode) {
        var st = "";
        if (Mode == 1) {
            st = "<img src='actions/N.Png' id=iNew style='width:40px;height:35px;'  title='New Record' onclick='fNew();' />"
            + "<img src='actions/Save.Png' id=iSave style='width:30px;height:30px;'  title='Save Record' onclick='fSave();' />"
            + "<img src='actions/Update.Png' id=iUpdate style='width:40px;height:35px;display:none;'  title='Update Record' onclick='fSave();' />"
            + "<img src='actions/Delete.Png' id=iDelete style='width:30px;height:30px;display:none;'  title='Save Record' onclick='fDel();' />"
            + "<input class='btn' id='bNew'  type='button'  value='  New  ' name='bNew' onclick='fNew();' style='display:none;' accesskey='n'>           "
            + "<input class='btn' id='bSave'  type='button'  value='  Save  ' name='bSave' onclick='fSave();' accesskey='s' style='display:none;'>&nbsp;"
            + "<input class='btn' id='bUpdate'  type='button'  value='  Update  ' name='bUpdate' onclick='fSave();' accesskey='s' style='display:none;'>&nbsp;"
            + "<input class='btn' id='bDelete'  type='button'  value='  Delete  ' name='bDelete' onclick='fDel();' accesskey='' style='display:none;'>&nbsp;";
        }

        document.querySelector(".Buttons").innerHTML = st;

    }


    function fCheckEmp() {
        with (form1) {
            if (window.parent.GPV == 1) {
                btnReject.style.display = "none";
                btnApprove.style.display = "none";
                btnForward.style.display = "none";
                if (window.parent.GLvl == 2) {
                    btnCancel.style.display = "";
                }
            }
        }
    }

    function fCloseDialog() {
        divApply.style.display = "none";
    }





    var GTid = 0;
    var GGrpid = 0;

    function fUpdateLevel(Obj,TGrpid) {
        var tr = Obj.parentNode.parentNode;

        if (tr) {
            var hidid = tr.querySelector(".hidIds");
            var Lvls = tr.querySelector(".Levels");
            var Status = tr.querySelector(".Status");

            if (hidid) {
                var id = hidid.value;


                if (Lvls.value == "")
                    alert("select Levels");

                var Qry = "exec eLists @Opt=10,@userid='" + Userid + "',@IDD=" + id + ",@Lvl=" + Lvls.value + ",@Status=" + Status.value + ",@TransGrpid=" + TGrpid + "";
               // alert(Qry);
                alert(window.parent.fSaveCmd(Qry));
                List();
            }
        }
    }


    function fLog(Obj, TGrpid) {
        var tr = Obj.parentNode.parentNode;
       // alert(tr);
        if (tr) {
            
            var hidid = tr.querySelector(".hidIds");
            GTid = hidid.value;
            GGrpid = TGrpid;
            fLogLists(GTid, TGrpid);
            dLogs.style.display = "";
        }
    }

    function fLogLists(IDD, TGrpid) {
        dLogs.style.display = "";

        var Qry = "exec eLists @Opt=11,@userid='" + Userid + "',@IDD=" + IDD + ",@TransGrpid=" + TGrpid + "";
        console.log(Qry);
        
        var GT = window.parent.fQry(Qry);
        console.log(GT);

        fGrid(GT, dList1, "", 0, 50);

    }

    function fDeleteLog(Obj, Logid, TGrpid) {
        if (confirm("Delete Record")) {
            var Qry = "exec SaveTLogs @Opt=4,@userid='" + Userid + "',@Tid=" + Logid + "";
            alert(window.parent.fSaveCmd(Qry));
            fLogLists(GTid, TGrpid);
        }
    }


    function fCloseBox(ObjText) {
        eval(ObjText).style.display = "none";
    }




    /*
    function fgetWhere() {
        //return @Deptid=" + window.parent.parent.selDept.value + ",@Catid=" + window.parent.parent.selCat.value + ",@Gradeid=" + window.parent.parent.selGrade.value + ",@Branchid=" + window.parent.parent.selBranch.value + "
     return    " and ev.nDept_id = " +window.parent.parent.selDept.value + ""
                " and ev.nCat_id=" + window.parent.parent.selCat.value + ""
                +" and ev.nGarde_id " + window.parent.parent.selGrade.value + ""
                + " and ev.nGroup_id=" + window.parent.parent.selBranch.value + ""
                  + " and ev.Division_id=" + window.parent.parent.selBranch.value + ""

    }

    */