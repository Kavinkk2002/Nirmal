/*

function fNormal() {
var Tab = document.querySelectorAll(".Tables");
if (Tab) {
for (var i = 0; i < Tab.length; i++) {


var x = Tab[i].querySelectorAll(".Entry");
for (var j = 0; j < x.length; j++) {
switch (input) {
case "P": x.parent
}
}
}
}
}
*/




function fLayer(Tab) {
    var x = Tab.querySelectorAll(".Entry");
    for (var j = 0; j < x.length; j++) {
        fPComp(x[j]);
    }
}


function fComp() {
    var Tab = document.querySelectorAll(".Tables");
    if (Tab) {
        for (var i = 0; i < Tab.length; i++) {
            var x = Tab[i].querySelectorAll(".Entry");
            for (var j = 0; j < x.length; j++) {
                try { fPComp(x[j]); } catch (e) { }
            }
        }
    }

}



function fCompTab(Tab) {
    if (Tab) {
            var x = Tab.querySelectorAll(".Entry");
            console.log("Total Parameters:" + x.length);
            for (var j = 0; j < x.length; j++) {
                try { fPComp(x[j]); } catch (e) { }
            }
    }

}



function fPComp(x, vtitle) {
    var t;

    console.log(x.innerHTML);

   // return;
    if (x.title != "") {
        t = x.title.split(",");
    }
    else {
        if (typeof vtitle != "undefined")
            t = vtitle.split(",");
    }
    var input = t[0];
    var Keyids = x.querySelector(".hKeyids");
    var old = x.querySelector(".old");
    var tnew = x.querySelector(".new");
    var text = "";

    if (Keyids) 
        text = Keyids.value;
    else if (old)
        text = ft(tnew.innerText);
    else
        text = ft(x.innerText);


    var fld = t[1];          //  L,nQual_id,select nQual_id@@vQualification from Qualification where live=1
    var query = t[2];
    var ID = 0;

    if (t[4]) ID = t[4];

    var o = x;
    var hval = 0;

    var h = o.querySelector(".compval")
    if (h) {hval = h.value; }
    console.log("Title" + x.title);

    // if (typeof vtitle != "undefined")

    if (x.title != "undefined")
        o.innerHTML = "";

    console.log(old);

    if (old) {
        console.log("Entered")
        o.innerHTML = "<span class=old>" + old.innerText  +"</span><br><br>";
    }
    //------------------- Componenet placing Area--------------------------------
    switch (input) {

        case "A": o.innerHTML += "<input type=text class='comp RunNo' value=" + text + " readonly>"; break;
        case "T": o.innerHTML += "<input type=text class='comp' value='" + text + "'>"; break;
        case "N": o.innerHTML += "<input type=text class='comp' value='" + text + "'>"; break;
        case "P": o.innerHTML += "<input type=text class='comp hKeyids' value='" + text + "' style='background-color: #FD7E00;color:black' disabled>"; break;
        case "F": o.innerHTML += "<input type=text class='comp' value='" + text + "' style='background-color: #6699FF;color:black'  disabled>"; break;
        case "D": o.innerHTML += "<input type=text class='comp' onclick='GD(this,lblDate,divDate);'  value='" + text + "' style=''><input type=hidden value='" + text + "'>"; break;
        case "S": o.innerHTML += "<input type=hidden  size=2 class=compval value=0><select class='comp txtD'></select>"; fSelectCombo(o, query, text);    break;
        case "ISave": o.innerHTML = "<img src='actions/Save.png' style='width:25px;height:25px;' onclick=\"fSaveRecord(this,'Insert');\">"; break;

        case "L": o.innerHTML = "<input type=hidden size=2 class=compval value=" + hval + ">"
                    + "<input type=text class='comp' onkeypress='fSearchDrop(this,\"" + query + "\");' onkeyup='try{fnCrtlFocus(this,hids);}catch(e){}'   value='" + text + "' >"
                    + "<img src=\"icons/dropdown1.png\" style='width:25px;height:25px;' onclick='fSearchClickss(this.previousElementSibling,\"" + query + "\");'>"; break;

    }


    if(input=="S"){
        o.querySelector(".compval").value=o.querySelector(".comp").value;
    }

    if (tnew) {
        o.querySelector(".comp").setAttribute("style", "background-color: #37B7C3;");
    }

    o.querySelector(".comp").setAttribute("style", "height:30px;width:90%; background-color: #C9C9C9;color:black;");

    if(input=="L")
                    o.querySelector(".comp").setAttribute("style", "height:30px;width:80%; background-color: #C9C9C9;color:black;");

/*    if(Mobile){
        o.querySelector(".comp").style.fontSize="16px";
    }
    else
           o.querySelector(".comp").style.fontSize="11px";
*/
    // -------------------------Hidden Text ------------------

  /*  var input = document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("value", text);
    input.className = "hiddens";

    if (o.querySelector(".hiddens")) o.remove(o.querySelector(".hiddens"));
    o.appendChild(input);
    */



    //--------------------- Hidden Vals------------------------
   
    /*
    if (!o.querySelector(".hiddenVals")) {
        var input1 = document.createElement("input");
        input1.setAttribute("type", "hidden");
        input1.setAttribute("value", ID);
        input1.className = "hiddenVals";

        if (o.querySelector(".hiddenVals")) o.remove(o.querySelector(".hiddenVals"));
        o.appendChild(input1);
    }
    */


}


function RColon(val){

        if(val.substring(0,1)==":")
            val=val.substring(1,val.length);

    return val;

}

function frval(Obj) {
    var val = "0";
    if (Obj.querySelector(".comp")) {
        val = Obj.querySelector(".comp").value;
        if (val == "")
            val = "0";
    }
    else {
            
        val=Obj.innerText;
        if (val == "")
            val = "0";
    }
    
    
    return RColon(val);
}

function fr(Obj) {
    var val = "";
    if (Obj.querySelector(".comp")) {
        val = Obj.querySelector(".comp").value;
    }
    else 
        val=0;

    return RColon(val);
}

function fkey(Obj) {
    var val = "";
    if (Obj.querySelector(".hKeyids")) {
        val = Obj.querySelector(".hKeyids").value;
    }
    return val;
}

function frCompVal(Obj) {
    var val = "";
    if (Obj.querySelector(".compval")) {
        val = Obj.querySelector(".compval").value;
    }

    return RColon(val);
}




function fGetFVal(pKey) {
    var FVal = 0;
    var Tab = document.querySelectorAll(".Tables");
    if (Tab) {
        for (var i = 0; i < Tab.length; i++) {

            var x = Tab[i].querySelectorAll(".Entry");

            for (var j = 0; j < x.length; j++) {
                try {
                    var t = x[j].title.split(",");
                    var o = x[j];
                    var input = t[0];
                    var comp = o.querySelector(".comp");
                    var fld = t[1];
                    var f = fld.split("-");
                    var flds = f[0].split("@");
                    var fldName = flds[0];
                    if (input == "P") {
                        if (fC(fldName) == fC(pKey)) {
                            var text = ""; if (comp) { text = fts(comp.value); } else text = fts(o.innerText);
                            FVal = text;
                            break;
                        }
                    }
                }
                catch (e) { }
            }

        }
    }

    return FVal;
}

function fInsert(TabName, R, Type) {

    var Insert = " insert into " + TabName + "(";
    var Vals = "(";

    //  var Update = "Update " + TabName + " set "; var UpdateWhr = " where 1=1 ";

    var x = R.querySelectorAll(".Entry");

    for (var j = 0; j < x.length; j++) {

        try {
            var t = x[j].title.split(",");            //  S,nConPF-Employee,2-YES@@1-NO as PFEligible    
            var input = t[0];       //t[0]=S,         
            var o = x[j];

            var text = "";

            var comp = o.querySelector(".comp");
            var hidd = o.querySelector(".hiddens");

            var request = o.querySelector(".requests");
            var requestval = o.querySelector(".RHid");

            var fldcheck = o.querySelector(".FldCheck");


            if (request) text = ft(request.innerText);   // request text if request span 
            if (requestval) {
                if (requestval.value != "0")
                    text = requestval.value;
            }


            var fld = t[1];              //t[1] =nConPF-Employee,  
            var f = fld.split("-");
            var flds = f[0].split("@");
            var fldName = flds[0];          // flds[0] =nConPF
            var sps = "@" + flds[1];        //  flds[1]=Employee
            var STab = ""; if (f[1]) STab = f[1];    //STab    =Employee

            var query = t[2];
            var o = x[j];

            switch (input) {
                case "A":
                    Insert += fldName + ",";
                    Vals += text + ",";
                    SMax = "select isnull((select max(" + fldName + ")  from " + TabName + "),0) + 1";
                    text = window.parent.fGetVal(SMax);

                    //    if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                    //  else { Update += fldName + "=" + text + ","; }

                    break;

                case "F":
                    Insert += fldName + ",";
                    Vals += fGetFVal(fldName) + ",";
                    break;

                case "T":
                    Insert += fldName + ",";
                    Vals += "'" + text + "',";
                    // if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "='" + text + "' where 1=1" + getIDWhere(STab); k++; }
                    //else { Update += fldName + "='" + text + "',"; }
                    break;
                case "P": //if (parseInt(text) > 0 || text != "") { Mode = "Update"; UpdateWhr += " and  fldName=" + text; }
                    break;
                case "F":
                    Insert += fldName + ",";
                    Vals += text + ",";
                    //  if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                    //else { Update += fldName + "=" + text + ","; }
                    break;
                case "D":
                    Insert += fldName + ",";
                    Vals += "'" + fymd(text) + "',";
                    // if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "='" + fymd(text) + "' where 1=1" + getIDWhere(STab); k++; }
                    //else { Update += fldName + "='" + fymd(text) + "',"; }
                    break;

                case "S":
                    Insert += fldName + ",";
                    Vals += text + ",";
                    //if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                    //else { Update += fldName + "=" + text + ","; }
                    break;
                case "L":
                    Insert += fldName + ",";
                    Vals += text + ",";
                    //   if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                    // else { Update += fldName + "=" + text + ","; }
                    break;
            }

        } catch (e) { }

    }



    Insert = fSliceLast(Insert);
    Vals = fSliceLast(Vals);
    //if (Mode == "insert") { 
    Insert += ") values " + Vals + "); select SCOPE_IDENTITY();";

    //}

    //else if (Mode == "update") { Update += UpdateWhr; }

    var ReturnStr = "";

    //if (Type == "I")

    ReturnStr = Insert;

    // else
    //   ReturnStr = Update;

    return ReturnStr;


}



function fnSaveProfile1() {

    var Tab = document.querySelectorAll(".Tables");
    if (Tab) {
        for (var i = 0; i < Tab.length; i++) {
            var Mode = "insert";
            var TabName = Tab[i].title;
            var Insert = " insert into " + TabName + "(";
            var Vals = "(";
            var Update = "Update " + TabName + " set ";
            var UpdateWhr = " where 1=1 ";
            var SP = "";
            var SMax = "";
            var Check = "";
            var Updates = [];
            k = 0;
            var x = Tab[i].querySelectorAll(".Entry");

            for (var j = 0; j < x.length; j++) {
                var t = x[j].title.split(",");
                var input = t[0];
                var o = x[j];
                var text = "";
                if (o.children[0]) { text = ft(o.children[0].value); } else text = ft(o.innerText);

                var fld = t[1];
                var f = fld.split("-");
                var flds = f[0].split("@");
                var fldName = flds[0];
                var sps = "@" + flds[1];

                var STab = ""; if (f[1]) STab = f[1];
                var query = t[2];
                var o = x[j];

                switch (input) {
                    case "A":
                        Insert += fldName + ",";
                        Vals += text + ",";
                        SMax = "select isnull((select max(" + fldName + ")  from " + TabName + "),0) + 1";
                        text = window.parent.fGetVal(SMax);
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "=" + text + ","; }
                        break;

                    case "T":
                        Insert += fldName + ",";
                        Vals += "'" + text + "',";
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "='" + text + "' where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "='" + text + "',"; }
                        break;

                    case "P": if (parseInt(text) > 0 || text != "") { Mode = "Update"; UpdateWhr += " and  fldName=" + text; }
                        break;

                    case "F":
                        Insert += fldName + ","
                        Vals += text + ",";
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "=" + text + ","; }

                        break;

                    case "D":
                        Insert += fldName + ","
                        Vals += "'" + fymd(text) + "',";
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "='" + fymd(text) + "' where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "='" + fymd(text) + "',"; }
                        break;

                    case "S":
                        Insert += fldName + ","
                        Vals += text + ",";
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "=" + text + ","; }
                        break;

                    case "L":
                        Insert += fldName + ","
                        Vals += text + ",";
                        if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
                        else { Update += fldName + "=" + text + ","; }
                        break;
                }

            }


            Insert = fSliceLast(Insert);
            Vals = fSliceLast(Vals);
            Update = fSliceLast(Update);
            if (Mode == "insert") {
                Insert += ") values " + Vals + "); select SCOPE_IDENTITY();";
                if (SMax != "") alert(SMax);

                //   window.parent.fSaveCmd(Insert);
            }
            else if (Mode == "update") {
                window.parent.fSaveCmd(Update);
                Update += UpdateWhr;
                //alert(Update);
            }

            //alert(Updates);

            //alert(Update);
        }
    }



}





function fnSaveProfile() {

    var qry = "if not exists(select * from Department where vDepartment='S') begin  insert into Department(vDepartment) values('S');    select SCOPE_IDENTITY(); end else Select -1";
    alert(window.parent.fSaveCmd(qry));

}



function fgetSplWhere(str) {

    //EX : str= nEmp_id@@nEmp_id-Employee

    var sw = str.split("@@");
    var swf = sw[0];            //nEmp_id
    var TabName = sw[1];        //nEmp_id-Employee
    var pKey = TabName.split("-")[0];   //nEmp_id Parent Table
    var TabName = TabName.split("-")[1];    //Employee 

    var whr = " ";
    var Tab = document.querySelectorAll(".Tables");

    if (Tab) {
        for (var i = 0; i < Tab.length; i++) {

            if (fC(TabName) == fC(Tab[i].title.trim())) {
                var x = Tab[i].querySelectorAll(".Entry");

                for (var j = 0; j < x.length; j++) {
                    var t = x[j].title.split(",");
                    var o = x[j];
                    var comp = o.querySelector(".comp");
                    var hidd = o.querySelector(".hiddens");
                    var fld = t[1];
                    var f = fld.split("-");
                    var flds = f[0].split("@");
                    var fldName = flds[0];
                    if (fC(fldName) == fC(pKey)) {
                        var text = ""; if (comp) { text = fts(comp.value); } else text = fts(o.innerText);
                        whr = " and " + swf + "=" + text;
                        break;
                    }
                }
            }
        }
    }
    return whr;

}

function fts(text) {

    if (text.substring(0, 1) == ":")
        text = text.substring(1, text.length);
    return text;

}


function getIDWhere(TabName) {
    var whr = "";
    var Tab = document.querySelectorAll(".Tables");
    if (Tab) {
        for (var i = 0; i < Tab.length; i++) {
            if (TabName == Tab[i].title.trim()) {
                var x = Tab[i].querySelectorAll(".Entry");
                for (var j = 0; j < x.length; j++) {

                    var t = x[j].title.split(",");
                    var o = x[j];
                    var comp = o.querySelector(".comp");
                    var hidd = o.querySelector(".hiddens");
                    var input = t[0];

                    if (input == "P") {     //Based on the Primary Key
                        var fld = t[1];
                        var f = fld.split("-");
                        var flds = f[0].split("@");
                        var fldName = flds[0];
                        var text = ""; if (comp) text = ft(comp.value);
                        whr += " and " + fldName + "=" + text; break;
                    }
                }
            }
        }
    }
    return whr;
}

function fC(val) { return val.toUpperCase().trim(); }


/*

function fEditQual(Obj, val) {
                
                EditTypes="Q";

                if(EditBox.style.display=="none"){
                    var TR = Obj.parentNode.parentNode;
                    if (Obj.value == "Edit" || Obj.value == "Re-Edit") {
                        sd = 0;
                        if (Obj.value == "Re-Edit") sd = 1;
                        Obj.value = "Apply";

                        try { fCompTab(TR) } catch (e) { };
                        Obj.parentNode.querySelector(".Cancel").style.display = "";
                    }
                    else {
                        fApplyQual(TR);
                    }
                   // EditBox.style.display="";
                    //EditHeader.innerHTML="<font color=white> Qualification </font>  "
                    //fEditBox(tdQualification,TR);

                        
                        TR.remove();
                }
                else{
                        
                    fApplyQual(EditContent);
                }
               

                 //EditContent.innerHTML=Tab.innerHTML ;


            }

            function fEditBox(tdObj,TR){
                      
                        var Tab=tdObj.querySelector(".DGridTable");
                       
                      var tr1=Tab.rows[0];
                        var  st="<table style='width:100%' border=0>";
                        for(var j=0;j<tr1.cells.length;j++){
                                
                            if(tr1.cells[j].innerText.includes("Keyid") || tr1.cells[j].innerText.includes("hid"))
                               st +="<tr style='display:none;'>"
                            else
                                st +="<tr style='height:40px;'>";

                            st +="<td style='width:50%'>"+ tr1.cells[j].innerText +"</td>"
                            +""+ TR.cells[j].outerHTML +"</tr>";
                            
                        }
                        st += "</table>";
                        EditContent.innerHTML=st;
                        
                        console.log(EditContent.innerHTML);
                    }


           function  fClrEditBox(){
                EditBox.style.display="none";
                EditContent.innerHTML="";


            }
            


*/