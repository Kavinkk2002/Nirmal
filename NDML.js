

function fNewRec() {
    var Tab = dSource.querySelector(".DGridTable");
    var e = Tab.querySelector(".EntryRow");

    if (Tab && !e) {

        var trhead = Tab.rows[0];
        var tr = Tab.insertRow(1);
        e = tr;
        tr.className = "EntryRow";

        tr.style.height = "25px";

        for (var i = 0; i < trhead.cells.length; i++) {

            var td = tr.insertCell(i);
            td.className = "Entry";
            //&& i > 0
            if (trhead.cells[i].title != "") {
                td.title = trhead.cells[i].title;
                fPComp(td, trhead.cells[i].title);
            }

            if (trhead.cells[i].style.display == "none")
                td.style.display = "none";

        }

    }


    if (e)
        e.style.display = "none";

}

function fClearRec() {
    var Tab = dSource.querySelector(".DGridTable");
    if (Tab) {
        var x = Tab.querySelectorAll(".Entry");
        for (var j = 0; j < x.length; j++) {
            var t = x[j].title.split(",");
            var input = t[0];
            var o = x[j];
            switch (input) {
                case "A": o.children[0].value = 0; break;
                case "T": o.children[0].value = ""; break;
                case "N": o.children[0].value = 0; break;
                case "P": o.children[0].value = "0"; break;
                case "F": o.children[0].value = 0; break;
                case "D": o.children[0].value = ""; break;
                case "S": o.children[0].value = 0; break;
                case "L": o.querySelector(".compval").value = 0; o.children[0].value = ""; break;

            }
        }
    }
}


function fPComp(x, vtitle) {

    var t;
    if (x.title != "") {
        t = x.title.split(",");
    }
    else {
        if (typeof vtitle != "undefined")
            t = vtitle.split(",");
    }

    var input = t[0];
    var Keyids = x.querySelector(".hKeyids");
    var text = "";

    console.log(vtitle);

    if (Keyids) text = Keyids.value;
    else
        text = ft(x.innerText);

    var fld = t[1];

    var query = t[2];
    var ID = 0;


    if (t[4])
        ID = t[4];

    var o = x;
    x.align = "center";

    //------------------- Componenet--------------------------------
    switch (input) {

        
        case "C": o.innerHTML =  text ; break;


        case "A": o.innerHTML = "<input type=text class='comp RunNo' value=" + text + " readonly>"; break;

        case "T": o.innerHTML = "<input type=text class='comp' onkeyup='fMoveRows(this);' value='" + text + "' style='width:90%;'>"; break;

        case "N": o.innerHTML = "<input type=text class='comp' value='" + text + "'>"; break;

        case "P": o.innerHTML = "<input type=text class='comp hKeyids' value='" + text + "' style='background-color: #FD7E00;color:black' disabled>"; break;

        case "F": o.innerHTML = "<input type=text class='comp' value='" + text + "' style='background-color: #6699FF;color:black'  disabled>"; break;

        case "D": o.innerHTML = "<input type=text class='comp' value='" + text + "' style=''><input type=hidden class=hiddens value='" + text + "'>"; break;

        case "S": o.innerHTML = "<select class='comp txtD'></select>"; fSelectCombo(o, query, text); break;

        case "ISave": o.innerHTML = "<img src='actions/Save.png' style='width:25px;height:25px;' onclick=\"fSaveRecord(this,'Insert');\">"; break;

        case "L": o.innerHTML = "<input type=hidden class=compval value=0>"
                    + "<input type=text class='comp' onkeypress='fSearchDrop(this,\"" + query + "\");' onkeyup='try{fnCrtlFocus(this,hids);}catch(e){}'   value='" + text + "'>"
                    + "<img src=\"iset/009.gif\" onclick='fSearchClick(this.previousElementSibling,\"" + query + "\");'>";
            break;

    }

}


function fUpdateRecord(Obj, Mode) {

    var Tab = dSource.querySelector(".DGridTable");
    var trUpdate = Obj.parentNode.parentNode;
    var trhead = Tab.rows[0];
    var TabName = TableName;
    var Update = "Update " + TabName + " set ";
    var UpdateWhr = " where 1=1 ";
    //alert(trUpdate.innerHTML);

    var x = trUpdate.querySelectorAll(".Entry");
       
    for (var j = 0; j < x.length; j++) {

        var t = x[j].title.split(",");
        var input = t[0];
        var o = x[j];
        var text = "";
        console.log("title:" + x[j].title);
        if (t[1]) {
            try {
                if (o.children[0]) {
                    if (o.querySelector(".compval"))
                        text = ft(o.querySelector(".compval").value);
                    else
                        text = ft(o.children[0].value);
                }
                else
                    text = ft(o.innerText);

                var fld = t[1];
                var f = fld.split("-");
                var flds = f[0].split("@");
                var fldName = flds[0];

                switch (input) {
                    case "A": Update += fldName + "=" + text + ","; break;
                    case "T": Update += fldName + "='" + text + "',"; break;
                    case "N": Update += fldName + "=" + text + ","; break;
                    case "P": UpdateWhr += " and " + fldName + " =" + o.querySelector(".hKeyids").value; break;
                    case "F": Update += fldName + "=" + text + ","; break;
                    case "D": Update += fldName + "='" + fymd(text) + "',"; break;
                    case "S": Update += fldName + "=" + text + ","; break;
                    case "L": Update += fldName + "=" + text + ","; break;
                } //Switch
            }
            catch (e) { console.log("Error:" + e); }
        } //if
    } //For
    Update = fSliceLast(Update);
    
    //alert(UpdateWhr);
    
    Update += UpdateWhr;
    
    //alert(Update);
    

    Update += ";  select 'Updated'";
    console.log("Update Log : " + Update);
    var st = "";
    try { st = window.parent.fSaveCmd(Update); alert(st); } catch (e) { st = e; alert(st); }
    if (st == "Updated") {

        ListWithSearch();
        //List();
    }

}




function fSaveRecord(Obj, Mode) {
    var Tab = dSource.querySelector(".DGridTable");
    var tr = Obj.parentNode.parentNode;
    var trhead = Tab.rows[0];
    var TabName = TableName;
    var Insert = " insert into " + TabName + "(";
    var Vals = "(";
    var x = tr.querySelectorAll(".Entry");

    console.log(x.length);

    for (var j = 0; j < x.length; j++) {
        var t = x[j].title.split(",");
        var input = t[0];
        var o = x[j];
        var text = "";

        console.log("title:" + x[j].title);

        if (t[1]) {
            try {

                if (o.children[0]) {
                    if (o.querySelector(".compval"))
                        text = ft(o.querySelector(".compval").value);
                    else
                        text = ft(o.children[0].value);
                }
                else
                    text = ft(o.innerText);

                var fld = t[1];
                var f = fld.split("-");
                var flds = f[0].split("@");
                var fldName = flds[0];


                switch (input) {
                    case "A":
                        Insert += fldName + ","; Vals += text + ",";
                        SMax = "select isnull((select max(" + fldName + ")  from " + TabName + "),0) + 1";
                        text = window.parent.fGetVal(SMax); // Getting Value for Max Number Auto Generation Number
                        break;
                    case "T": Insert += fldName + ","; Vals += "'" + text + "',"; break;
                    case "N": Insert += fldName + ","; Vals += "" + text + ","; break;
                    case "F": Insert += fldName + ","; Vals += text + ","; break;
                    case "D": Insert += fldName + ","; Vals += "'" + fymd(text) + "',"; break;
                    case "S": Insert += fldName + ","; Vals += text + ","; break;
                    case "L": Insert += fldName + ","; Vals += text + ","; break;
                } //switch
            }
            catch (e) { }
        } // if t[1] 
    } //For  
    Insert = fSliceLast(Insert);
    Vals = fSliceLast(Vals);
    Insert += ") values " + Vals + "); select 'updated~' + cast(SCOPE_IDENTITY() as varchar);";
    console.log(Insert);
    var st = "";
    try { st = window.parent.fSaveCmd(Insert); alert(st); } catch (e) { st = e; alert(st); }
    fNewRec();
    ListWithSearch();

}

var oldtr;
var GMode = "Insert";

function fEditRec(Obj) {

    var Tab = dSource.querySelector(".DGridTable");
    var tr = Obj.parentNode;
    var cindex = Obj.cellIndex;

    //var tr = Obj.parentNode.parentNode;
    var trEntry = Tab.rows[1];         //New Entry Row
    var index = tr.rowIndex;       // clicking Row Index


    if (Tab) {
        var trhead = Tab.rows[0];      //Header Row

        for (var i = 0; i < trhead.cells.length; i++) {

            var td = tr.cells[i];      //Click Row tds
            var t;
            t = trhead.cells[i].title.split(",");
            var input = t[0];
            //if Old TR already Clicked Restore from HTML to Content
            if (oldtr) {
                var oldtd = oldtr.cells[i];
                oldtd.className = "DContent";
                var c = oldtd.querySelector(".comp");
                var cv = oldtd.querySelector(".compval");

                switch (input) {
                    case "A": oldtd.innerHTML = c.value; break;
                    case "T": oldtd.innerHTML = c.value; break;
                    case "N": oldtd.innerHTML = c.value; break;
                    case "P": oldtd.innerHTML = "<input type=hidden size=5 class=hKeyids value=" + oldtd.querySelector(".hKeyids").value + ">"; break;
                    case "F": oldtd.innerHTML = c.value; break;
                    case "D": oldtd.innerHTML = c.value; break;
                    case "S": if (c.value > 0) { oldtd.innerHTML = c.options[c.selectedIndex].text; } else { oldtd.innerHTML = ""; } break;
                    case "L": oldtd.innerHTML = "<input type=hidden class=hiddenVals value=" + cv.value + ">" + c.value; break;
                    case "ISave": oldtd.innerHTML = "<img src='actions/UpdateRec.png'  class='Saves' style='width:20px;height:20px;' onclick=\"fEditRec(this,'Update');\">"; break;
                    case "IDel": oldtd.innerHTML = "<img src='actions/DeleteRec.png'  style='cursor:hand;width:20px;20px;' onclick='fDelRec(this);'>"; break;
                    //default: oldtd;  
                }
                //if (oldtd.querySelector(".hiddens"))
                //  oldtd.innerText = oldtd.querySelector(".hiddens").value;
            }


            td.className = "Entry";                               //Make Current td Entry Mode

            var text = "";
            var textval = 0;

            if (td.querySelector(".hKeyids")) { text = td.querySelector(".hKeyids").value; }
            else if (td.querySelector(".hiddenVals")) { textval = td.querySelector(".hiddenVals").value; text = td.innerText; }
            else text = td.innerText;


            td.innerHTML = trEntry.cells[i].innerHTML;                         // Replace to HTML from Entry Row Point of view
            //td.title = trhead.cells[i].title;                              //Put the Title over Here
            var Comp = td.querySelector(".comp");
            var Hidd = td.querySelector(".compval");
            switch (input) {
                case "A": Comp.value = text; break;
                case "T": Comp.value = text; break;
                case "P": Comp.value = text; break;
                case "N": Comp.value = text; break;
                case "F": Comp.value = text; break;
                case "D": Comp.value = text; break;
                case "S": 
                alert(Comp.outerHTML);
                    
                fGetComboVal(text, Comp);
                Comp.value = fGetComboVal(text, Comp); 
                break;
                case "L": Comp.value = text; Hidd.value = textval; break;
                case "ISave": td.innerHTML = "<img src='actions/Update.png' style='width:25px;height:25px;' onclick=\"fUpdateRecord(this,'Update');\">"; break;
            }

        }
    }
    GMode = "Update";
    oldtr = tr;

    tr.cells[cindex].querySelector(".comp").focus();

}


function fDelRec(Obj) {
    Obj = Obj.parentNode;
    var Tab = dSource.querySelector(".DGridTable");
    var tr = Obj.parentNode;
    var cindex = Obj.cellIndex;
    var trhead = Tab.rows[0];
    var TabName = TableName;
    var c = tr.querySelector(".hKeyids");
    if (c) {

        var x = c.parentNode;
        var t = x.title.split(",");
        var input = t[0];
        var fld = t[1];
        var PK = parseInt(c.value);
        var dt = " delete " + TabName + " where " + fld + "=" + PK;
        var st = "";
        try { st = window.parent.fSaveCmd(dt); alert(st); } catch (e) { st = e; alert(st); }
        ListWithSearch();
    }

}
/*

function fSaveRecord(Obj, Mode) {

var Tab = dSource.querySelector(".DGridTable");

var tr = Obj.parentNode.parentNode;

var trhead = Tab.rows[0];
var TabName = Tab.title;

var Insert = " insert into " + TabName + "(";
var Vals = "(";
var Update = "Update " + TabName + " set ";
var UpdateWhr = " where 1=1 ";
var x = tr.querySelectorAll(".Entry");

for (var j = 0; j < x.length; j++) {
var t = x[j].title.split(",");
var input = t[0];
var o = x[j];
var text = "";

if (t[1]) {
try {

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
SMax = "select isnull((select max(" + fldName + ")  from " + TabName + "),0) + 1"; text = window.parent.fGetVal(SMax); // Getting Value for Max Number Auto Generation Number
if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
else { Update += fldName + "=" + text + ","; }
break;

case "T":
Insert += fldName + ",";
Vals += "'" + text + "',";

if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "='" + text + "' where 1=1" + getIDWhere(STab); k++; }
else { Update += fldName + "='" + text + "',"; }
break;

case "N":
Insert += fldName + ",";
Vals += "" + text + ",";
if (STab != "") { Updates[k] = "Update " + STab + " set " + fldName + "=" + text + " where 1=1" + getIDWhere(STab); k++; }
else { Update += fldName + "=" + text + ","; }
break;

case "P": if (parseInt(text) > 0 || text != "") { Mode = "Update"; UpdateWhr += " and " + fldName + " =" + text; }
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
catch (e) { alert(e); }
}

}


Insert = fSliceLast(Insert);
Vals = fSliceLast(Vals);
Update = fSliceLast(Update);


if (Mode == "Insert") {

Insert += ") values " + Vals + "); select 'updated~' + cast(SCOPE_IDENTITY() as varchar);";
var st = "";
try { st = window.parent.fSaveCmd(Insert); alert(st); } catch (e) { st = e; alert(st); }
List();

}
else if (Mode == "Update") {
Update += UpdateWhr;

alert(Update);
//window.parent.fSaveCmd(Update);
//alert(Update);
}

}


*/

function fC(val) { return val.toUpperCase().trim(); }
