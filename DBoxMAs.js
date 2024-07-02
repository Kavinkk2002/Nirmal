

var rws = 50; var SRec = 1; var ERec = rws; var CurPage = 1; var GRows = rws;var GTot = 0;
function fGetFilter(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }
function fGetBox(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }
function fGetObj(Obj, Clss) { while (Obj.className != Clss) { Obj = Obj.parentNode; if (Obj.className == Clss) break; } return Obj; }
//function fDellBox(TabObj) { try { var len = TabObj.rows.length; var i = 0; while (i <= len) { TabObj.deleteRow(TabObj.rows.length - 1); i++; } } catch (e) { } }
function fDellRec(TabObj) { try { var len = TabObj.rows.length-2; var i = 0; while (i < len) { TabObj.deleteRow(TabObj.rows.length - 1); i++; } } catch (e) { } }

  var CurrentSearchObj=null;

//NDCPT

function fDellBox(TabObj, val) {
    try {
        var len = TabObj.rows.length;
        var i = 0; 
        var ln = len;
     
         console.log("length:"  + ln);

        while (i < ln) {
                
                var r=TabObj.rows[TabObj.rows.length-1];
                
                console.log("i:" + i);
                console.log("r=" + r.className);
                
                if(r.className=="Search") break;
              
                if(r.className=="DContent" || r.className=="TotalRow"){
                   r.remove();
                }
              
              
             i++; 
        }
    } catch (e) { }
}

function fClearRecs(Obj){
    var Tab=Obj.querySelector(".DGridTable");
    fDellBox(Tab,1);
}   

//-----------------------------


var fObj = null;
function fSelectFld(Obj) {
    if (fObj) fObj.className = "DContent";
    if(Obj.className != "DropSelect")
        Obj.className = "DropSelect";
    else
        Obj.className = "DContent";
    fObj = Obj;
}

var GSelDG=null;
function fSelectGrid(Obj) {
    if (GSelDG) {
        GSelDG.className = "DSource";
    }
    var DG = fGetObj(Obj, "DSource");
    if (DG != GSelDG) {
      
        DG.className = "DSourceSelect";
        GSelDG = DG;
    }
    else
        GSelDG = null;
    //  alert(Obj);
}

var GPaging = 1;
var CurGrid = null;
var RowChange = 0;


// NCDP-----------------------

    var GDesgin = "";
    var GLP = "";
    
    var GPivotDetails = "";
    var GChartAxis = "";
    var GChartType = "";
    var GGridVals = "";

    var GLayerid = "0";
    var GLayerName = "";
    var GLayerOrder = 0;
    var GLayerProp = "";

    var GQuery = "";
    var GEditor = "";

    var GIsTable = "0";
    var GTabName = "";

    var GHeight = "";
    var GWidth = "";
    var GLeft = "";
    var GTop = "";
    var GQuery = "";
    var GDisplays="";

    var GHeaders = "";
    var GFooters = "";




//-------------------------------



function fCheckGridVal(Obj) {
    var t = document.createElement("div"); t.className = "RCal", t.style.height = "300px", t.style.width = "400px", t.style.top = "100px", t.style.left = "100px", t.style.overflow = "auto";
  
    document.appendChild(t);
    t.style.display = "";
    
    var d = fGetBox(Obj, "DGreen");
    t.innerHTML = d.innerText;

}


function fSaveGrid(Obj) {
        
        if(confirm("Allow to Save the Design of Grid")){
            if(PrvIcon) PrvIcon.className="G";
    Obj.className="H";
    PrvIcon=Obj;
    var Grid = fGetBox(Obj, "DSource");
    
            var LayerOrder = 0;
            var LayerProp = "";
            var LayerName = Grid.querySelector(".GridHeading").innerText;
            var Layerid = Grid.querySelector(".Layerids").value; ;
   
            var IsTable = 0;
            var TabName="";

            var Query = "";
            var Editor = "";
            var Header = "";
            var Footer = "";
            var pivotvals = "";
            var ChartVals = "";
            var ChartType = "";
            var LP = "";
            

            var HeaderHTML = "";
            var EntryHTML = "";
            var Formula = "";
            var Widths = "";
            var DTypes = "";
            var Totals = "";
            var HeaderStyle = "";
            var ItemStyle = "";
            var ColTypes = "";
            var Querys = "";
            var Displays = "";
          

            var Tab = Grid.querySelector(".DGridTable");

            var row1 = null; var x = null; var y = null;

            if (Tab) x = Tab.querySelectorAll(".DFldHead");

            if (Tab.rows.length > 0) row1 = Tab.rows[1];

            if (row1) y = row1.querySelectorAll(".DContent");

            try {
                if (row1 && x) {
                    for (var i = 0; i < x.length; i++) {
                        var h=x[i].style.cssText.replace("display: none;","");
                        h=h.replace("width: 3%; position: relative;","");

                        HeaderStyle += h + "^";
                        HeaderHTML += x[i].innerText.trim() + "^";

                        var CellFormula = x[i].querySelector(".hFormulas").value.split("@");

                        //console.log(CellFormula);

                        if (CellFormula.toString() != "") {

                            Formula = Formula +  fUd(CellFormula[1]) + "^";
                            DTypes = DTypes + fUd(CellFormula[2]) + "^";
                            Totals = Totals + fUd(CellFormula[3]) + "^";
                            ColTypes = ColTypes + fUd(CellFormula[4]) + "^";
                            Querys = Querys + fUd(CellFormula[5]) + "^";
                            Displays = Displays + fUd(CellFormula[6]) + "^";
                        
                        }
                        else {
                            Formula = Formula + "^";
                            DTypes = DTypes + "^";
                            Totals = Totals + "^";
                            ColTypes = ColTypes + "^";
                            Querys = Querys + "^";
                            Displays= Displays + "^";
                        }
                          //console.log(Totals);
                        //console.log(Displays);


                        if (y)
                         {
                         var g=y[i].style.cssText.replace("display: none;","");

                         ItemStyle += g + "^";

                        }
                    }
                }
            }
            catch (e) { }

        
                ItemStyle = ItemStyle.substring(0, ItemStyle.length - 1);
                HeaderHTML = HeaderHTML.substring(0, HeaderHTML.length - 1);
                HeaderStyle = HeaderStyle.substring(0, HeaderStyle.length - 1);

                Formula = Formula.substring(0, Formula.length - 1);
                DTypes = DTypes.substring(0, DTypes.length - 1);
                Totals = Totals.substring(0, Totals.length - 1);
                ColTypes = ColTypes.substring(0, ColTypes.length - 1);
                Querys = Querys.substring(0, Querys.length - 1);
                Displays= Displays.substring(0, Displays.length - 1);

                //--------------------------------Griding -------------------------------------
                
            var st = "exec SaveForm @Opt=2,@Formid=1000,@LayerName='" + LayerName + "',@LayerOrder=" + LayerOrder + ","
            + "@IsTable=" + IsTable + ",@Query='" + Query + "',@Editor='" + Editor + "',@Header='" + Header + "',@Footer='" + Footer + "',"
            + "@pivotvals='" + pivotvals + "',@ChartType='" + ChartType + "',@ChartVals='" + ChartVals + "',@LayerProp='" + LP + "',"
            + "@Left='0'," + " @Width='0'," + " @Top='0'," + " @Height='0',"
            + "@HeaderHTML='" + HeaderHTML + "',@EntryHTML='',@Formula='" + Formula + "',@Widths='',@Totals='" + Totals + "',"
            + "@DTypes='" + DTypes + "',@HeaderStyle='" + HeaderStyle + "',@ItemStyle='" + ItemStyle + "',@ColTypes='" + ColTypes + "',"
            +" @Querys='" + Querys + "',@Displays='"+ Displays +"',"
            + "@Layerid=" + Layerid + "";


                //console.log(st);

                //alert(st);

                alert(FileObj.fSaveCmd(st));
    }
}

function fUd(val){
        if(val=="undefined" || typeof val=="undefined")
            val="";
        return val;
}

//var GHeader = "";
//var GSP = "";
function fLoadGridVal(LayerHeading) {
    var Qry = "select nLayer_id,vLayerName as LayerName,Query,Editor,PivotDetails,ChartType,ChartAxis,IsTable,vTabName as TabName,"
    + " isnull(nHeight,120) as nHeight,isnull(nWidth,120) as nWidth,isnull(nleft,10) as nleft,isnull(nTop,10) as nTop,isnull(vHTMLHeader,'') as HDRS,"
    + " isnull(vHTMLFooter,'') as GFooter,LayerProp,isnull(HeaderHTML,'') as HeaderHTML,isnull(EntryHTML,'') as EntryHTML,isnull(Formula,'') as Formula,isnull(Widths,'') as Widths,"
    + " isnull(Totals,'') as Totals,isnull(HeaderStyle,'') as HeaderStyle,isnull(Itemstyle,'') as Itemstyle,isnull(DTypes,'') as DTypes,isnull(Comps,'') as ColTypes,isnull(Display,'') as Displays "
    + " from DynLayers where rLive=1 and vLayerName='" + LayerHeading + "'";

    //console.log(Qry);
    var GTVal = FileObj.fQry(Qry); //  document.getElementById("DFrame").contentWindow.fQry("");
    var GT = GTVal.split("!!");

    var str = "";
  
    if (GT.length > 2) {
        

        GHeader = GT[0].split("~");
        GSP = GT[1].split("~");
        
        GLayerid = fGetColVal("nLayer_id");
        GLayerName = fGetColVal("LayerName");
        GQuery = fGetColVal("Query");
        GEditor = fGetColVal("Editor");

        GIsTable = fGetColVal("IsTable");
        GTabName = fGetColVal("TabName");

        GHeight = fGetColVal("nHeight");
        GWidth = fGetColVal("nWidth");
        GLeft = fGetColVal("nleft");
        GTop = fGetColVal("nTop");

        GHeaders = fGetColVal("HDRS");
        GFooters = fGetColVal("GFooter");

        GLP = fGetColVal("LayerProp");
        GPivotDetails = fGetColVal("PivotDetails");
        GChartAxis = fGetColVal("ChartAxis");
        GChartType = fGetColVal("ChartType");

        GGridVals = fGetColVal("HeaderHTML") + "@" + 
                    fGetColVal("EntryHTML") + "@" + 
                    fGetColVal("Formula")   + "@" + 
                    fGetColVal("Totals")    + "@" + 
                    fGetColVal("HeaderStyle") + "@" + 
                    fGetColVal("ItemStyle") + "@" + 
                    fGetColVal("DTypes")    + "@" + 
                    fGetColVal("ColTypes")  + "@" + 
                    fGetColVal("Querys")    + "@"  + 
                    fGetColVal("Displays");
  
    }
    else {
        GLayerid = "0";
        GLayerName = "";
        GQuery = "";
        GEditor = "";
        GIsTable = "0";
        GTabName = "";
      
        GHeight = "";
        GWidth = "";
        GTop = "";
        GHeaders = "";
        GFooters = "";
        GLP = "";
        GPivotDetails = "";
        GChartAxis = "";
        GChartType = "";
        GGridVals = "@@@@@@@@";
    }  
}


function fDataGrid(dBox, Type, IDD, Heading, Paging) {
    dBox.innerHTML = "";
    var Class = "DGreen";
    var t = document.createElement("div"); 
    t.id = IDD,t.Name=dBox, t.className = Type, 
    t.style.height = "100%", t.style.width = "100%"; t.style.overflow = "auto";
    dBox.appendChild(t);

    try{ fLoadGridVal(Heading); } catch(e){}
    
    var Widths = "";
    var Qry = "";
    
    if (GLoadType == "Edit")    Widths = "width:1350px;";
    
    var st = "<table  align=center style='height:100%;width:100%;border-collapse:collapse;' class='HeadTab' border=0 >"
        + " <tr height=2% class=fHeadRow >"
        + "<td  class='SourceHead Heading'  ondblclick='fSelectGrid(this);' oncontextmenu='fGridProp(this);' align=center width=30%><span class='GridHeading'>" + Heading + " </span>,"
        +" <b>:<label class=Records></label></b><input type=hidden class=HeadClass value='" + Class + "'></td>"
        + "<td width=40% class=Filters><table border=0><tr class=FHead style='display:none'></tr><tr class=FCont></tr></table></td>"
        + "<td width=20% align=right><select  class='PageCombo' onchange='fPage(this);'>"
        +"<option value=0>No Page</option>"
         +"<option value=5>5</option>"
        +"<option value=10 selected>10</option>"
        +"<option value=20>20</option>"
        +"<option value=25>25</option>"
        +"<option value=30>30</option>"
        +"<option value=50>50</option>"
        +"<option value=100>100</option>"
        +"<option value=200>200</option>"
        + "</select>&nbsp;&nbsp;&nbsp;&nbsp;<img   src=\"actions/search.png\" onclick='fOpenSearchRow(this);' style=\"width:30px;height:30px;cursor:hand; position: relative;top: 10;left: 0;\">"
        +"</td></tr>"
        + "<tr height='90%' class='fContentRow'>"
        + "<td  colspan=4 align=center>"
        + "<div style='overflow: auto;width:100%;height:100%;postion:relative;white-space: nowrap;' class='Container'>"
        + "<table  class=\"DGridTable\" cellspacing=1 style='width:100%;'></table></div>"
        + "<input type=hidden class=Sources value=''>"
        +"<input type=hidden class=Keys value=''>"
         +"<input type=hidden class=pivots value=''></td></tr>";

    if (typeof Paging == "undefined") { st += "<tr height='5%' class='fPageRow'><td  class='Paging' colspan=3 align=center>" + fCreatePaging() + "</td></tr>"; }

    //NCDP-------------

    st += "<tr _style='display:none;'><td><input type=hidden id=hLayerids class='Layerids'  value=" + GLayerid + ">"
    + "<input type=hidden class='Tabvals'  value='0'>"
    + "<input type=hidden class='LP'  value='" + GLP + "'>"
    + "<input type=hidden class='Grids' value=''>"
    + "<input type=hidden class='pivotvals' value='" + GPivotDetails + "'>"
    + "<input type=hidden class='ChartVals' value='" + GChartAxis + "'>"
    + "<input type=hidden class='ChartType' value='" + GChartType + "'>"
    + "<label class=lforHtmlGrid id=lforHtmlGrid></label></td></tr>";
    //    st += "</table>";
    st += "</table>";
    //-----------------------
    
    t.innerHTML = st;
    t.querySelector(".Grids").value = GGridVals;

}

function fOpenSearchRow(Obj){

  var G=fGetObj(Obj, "DSource");
    var s= G.querySelector(".Search");
    if(s){
        
        if(s.style.display=="")
            s.style.display="none";
        else
        s.style.display="";
    }    
}

function fOpenType(Obj){
    preventDefault();
}

function fCreatePaging() {

        return "<table height=20px class=GridPage width=40% align=center  _style='display:none;'>"
        + "<tr height=20px>"
        + "<td class=Pages width='10px;' style='cursor:pointer;' onclick=\"fGOPostion(this,'First');\">&nbsp;<<</td>"
        + "<td class=Pages width='10px;' style='cursor:pointer;' onclick=\"fGOPostion(this,'Previous');\">&nbsp;<&nbsp;</td>"
        + "<td align=center class='PageDisplay'>paging</td>"
        + "<td class=Pages width='10px;' style='cursor:pointer;' onclick=\"fGOPostion(this,'Next');\">&nbsp;>&nbsp;</b></td>"
        + "<td class=Pages width='10px;' style='cursor:pointer;' onclick=\"fGOPostion(this,'Last');\">&nbsp;>> </td>"
        + "<td _style='display:none;cursor:pointer;'>"
        + "<input type=hidden class='PageCount' value=0>"
        + "<input type=hidden  class='RangeFrom'  value=1>"
        + "<input type=hidden class='RangeTo' value=10>"
        + "<input type=hidden class='RowsPerPage' value=" + rws + ">"
        + "<input type=hidden  class='HidelCols'  ></td>"
        + "</tr></table>";

}




var PrvIcon="";

function fDesign(Obj){
    if(PrvIcon) PrvIcon.className="G";
    Obj.className="H";
    PrvIcon=Obj;
    var DG = fGetBox(Obj, "DSource");
    var DS = DG.querySelector(".Sources");
    var Heading = DG.querySelector(".GridHeading").innerText;
    DesignType=1;
	fFillBox(DG, DS.value, Heading, 1,0,"");

}

function fAuto(Obj){
     if(PrvIcon) PrvIcon.className="G";
    Obj.className="H";
    PrvIcon=Obj;
      var DG = fGetBox(Obj, "DSource");
    var DS = DG.querySelector(".Sources");
    var Heading = DG.querySelector(".GridHeading").innerText;
    DesignType=0;
	fFillBox(DG, DS.value, Heading, 1,0,"");

}


function fUnHide(Obj){
        if(Obj.className=="G"){
                Obj.className="H";
                UnHide=1;
	
                }
        else{
                Obj.className="G";
                UnHide=0;
	
                }
      var DG = fGetBox(Obj, "DSource");
    var DS = DG.querySelector(".Sources");
    var Heading = DG.querySelector(".GridHeading").innerText;
    fFillBox(DG, DS.value, Heading, 1,0,"");
}


var GLoadType = "";
var HeaderHTML = "", EntryHTML = "", Formula = "", Totals = "", HeaderStyle = "", ItemStyle = "", DTypes = "", ColTypes = "", Querys = "";      //New Design Concept
var IsDesign = 0; var indx = 0;     //NDCP      From Design and index Starts
var DesignType=-1;
var UnHide=0;

  var QFlds = "";
  var GObj=null;

//GHead   From Auto MAster Concept

function fFillBox(Obj, GTVal, HeadString, val, Tot,LoadType) {
        GObj=Obj;
    ////New Design Concept
        HeaderHTML = "", EntryHTML = "", Formula = "", Totals = "", HeaderStyle = "", ItemStyle = "", DTypes = "", ColTypes = "", Querys = "";Displays="";  //New Design Concept
        
        GGridVals=Obj.querySelector(".Grids").value;
        var d =GGridVals.split("@");   
        if (d[0]) HeaderHTML = d[0].trim().split("^");
        if (d[1]) EntryHTML = d[1].split("^");
        if (d[2]) Formula = d[2].split("^");
        if (d[3]) Totals = d[3].split("^");
        if (d[4]) HeaderStyle = d[4].split("^");
        if (d[5]) ItemStyle = d[5].split("^");
        if (d[6]) DTypes = d[6].split("^");
        if (d[7]) ColTypes = d[7].split("^");
        if (d[8]) Querys = d[8].split("^");
        if (d[9]) Displays= d[9].split("^");

        // ------------------------------End New Design Concept

        var GT = GTVal.split("!!");
        var Tab = Obj.querySelector(".DGridTable");
        fDellBox(Tab, val);
        var sourceDataObj;

        if (val == 1) { //First Time Data Load 
            sourceDataObj = Obj.querySelector(".Sources"); 
            if (sourceDataObj) sourceDataObj.value = GTVal;
        }

        var RecObj = Obj.querySelector(".Records"); 
        if (RecObj) RecObj.innerHTML = (GT.length - 2);
        
        var Flds = "";  QFlds = GT[0].split("~");
        
        if(DesignType==0){     HeaderHTML="";  Displays=""; IsDesign=0; }

        
        if (HeaderHTML != "undefined" && HeaderHTML != "" || DesignType==1)         {//Saved Design 
            Flds = HeaderHTML; 
            IsDesign = 1; 
            indx = 0; 
        } 
        else {  //Automatic 
            Flds = GT[0].split("~"); 
            indx = 0;
            IsDesign = 0; 
        }
       
        var h=Tab.querySelector(".HeaderRow");

            if(val==1 && !h){
            
                var HeadTr; 
                var x;  
                HeadTr = Tab.insertRow(0);  
                HeadTr.style.height = "25px";   
                var Hindx = indx;  
                HeadTr.className="HeaderRow";

                var G = ""; if (GHead != "") { G = GHead.split("!!")[1].split("~"); }   // Edit Header Area---------------

                if (GTabName != "") { Tab.className = "Tables DGridTable"; Tab.title = GTabName; } // Data base Table Name ---------------------
                
                //-----------------------Header Area ----------------------------------------------------------------
        
                if(QFlds.length !=Flds.length && DesignType==0){ IsDesign=0;     Flds = GT[0].split("~");    }

                for (var i = 0; i < Flds.length; i++) {
                      
                        var Fld = Flds[i];
                        x = HeadTr.insertCell(i);  
                        x.innerHTML = Fld;
                        x.className = "DFldHead"; 
                
                        // Currently not For Design concept------------
                        try {
                            if (GHead != "") {
                                x.className = "DFldHead Entry";
                                if (MGrid == 1)
                                    x.title = G[i];
                            }
                            else {
                                if (GLoadType == "Edit")
                                    x.className = "DFldHead EditHead"; 
                                else
                                    x.className = "DFldHead"; 
                            }
                        }
                        catch (e) {
                        }
                
                        //----------------------------------
                        x.align = "center";
                        
                        if (HeaderStyle[i] != "") x.setAttribute("style", HeaderStyle[i]);
                        
                        if (Flds[i].includes("hid") || Displays[i]=="Hide") { 
                            if(UnHide==0) x.style.display = "none"; 
                        }
                
                        switch (Flds[i]) 
                        {
                            case "Shift": x.style.width = "20px"; x.style.contentEditable="true"; break;
                            case "Keyid": x.style.width = "3%"; x.style.display = "none"; 
                              break;
                            case "Sel": x.innerHTML = "<input type=checkbox  onclick=fSelAll(this);>"; break;
                            case "DelRec":  x.style.width="5%"; break;
                            case "SaveRec":  x.style.width="5%"; break;
                            case "Edit": x.style.width = "5%"; break;
                            case "AddRec": x.style.width = "5%"; break;
                        }
                
                        if (GIdentity == Flds[i]) {
                            x.style.color = "red";
                        }
                
                        var cellval = "@@@@@@";
                
                        //---------------------NCDP------------------------------
                            if (IsDesign == 1) {
                                if (HeaderHTML[i])
                                    cellval = HeaderHTML[i] + "@" + Formula[i] + "@" + DTypes[i] + "@" + Totals[i] + "@" + ColTypes[i] + "@" + Querys[i] + "@" + Displays[i];
                            }

                             x.innerHTML += "<br><input type=hidden  size=5 class=hFormulas value='" + cellval + "'>";
                        //-----------------------------------
                            AddHeaderEvents(x, GTVal);
                    }
            }

    //--------------------------- Data Types and Auto Aligns--------------------------------------
      
                var DTypes = []; var Aligns = []; var Tots = []; var FVals = GT[1].split("~");
    
                for (var j = 0; j < FVals.length; j++) {
                    try {
                        var s = isNumeric(FVals[j]);
                        if (s) { DTypes[j] = "N"; Aligns[j] = "right"; } else { DTypes[j] = "S"; Aligns[j] = "left"; }
                        Tots[j] = 0;
                    } catch (e) { }
                }

        

    //--------------------------------- if Paging--------------------------
            
            var rcount = 1;
            if (Tab.querySelector(".Search")) rcount++;

           
            //Check Paging 
                var Page = Obj.querySelector(".Paging"); 
                if (!Page) { SRec = 1; ERec = GT.length; }

            
    
    //----------------- Data Table Area-------------------------------

        for (var r = SRec; r <= ERec; r++) {
            if (GT[r] == "") break;
            fCreateRow(Tab, GT[r], rcount, r, Flds, Aligns, 0, 0); 
            rcount++; 
        }


    //--------------------------------Total Area-------------------------------------------------//-------------- Generate Total----------------
        

        for (var i = 1; i < GT.length; i++) {
            var sp = GT[i].split("~");
            for (var j = 0; j < sp.length; j++) {
                if (DTypes[j] == "N") {
                    if (sp[j].trim() != "")
                        Tots[j] = parseFloat(Tots[j]) + parseFloat(sp[j]);
                }
            }
        }
        
        //----------------------Create Total Row and Display ---------------------
        
        //console.log("Flds.length in Total:" + Flds.length);
        
        if(IsDesign==1 || IsDesign==0){
            var Tr = Tab.insertRow(Tab.rows.length);
            Tr.style.height="25px;"
            Tr.className="TotalRow";

            for (var i = 0; i < Flds.length-1; i++) {
                var x = Tr.insertCell(0);
                    x.className = "DTotal";
                    x.align = "right";
                    x.innerHTML="&nbsp;";

                    //if( Displays[i]=="Hide") {     if(UnHide==0)  x.style.display = "none"; }
                
                /*if( Totals[i]=="Total"){
                    if (DTypes[i] == "N") {
                        x.innerHTML = Math.round(Tots[i]);
                    }
                }*/


            }
        }


        if(val==1 || val==3)
            Obj.querySelector(".PageDisplay").innerHTML = Paging(Obj, GT);

        if(val==1){
            fCreateSearchRow(Tab);
        }     
    
    
    try { fEventAssing(); } catch (e) { }
    try { fAddResizeTable(Tab); } catch(e){}

}

    
    function fCreateRow(Tab, GT, rcount, r, Flds, Aligns, Empty, ERecid) {
        var GRec = GT;
        var Vals = GT.split("~");
        
        var TotRow=Tab.querySelector(".TotalRow");
        
        rcount=Tab.rows.length;
        if(TotRow)rcount--;
        
        var Tr = Tab.insertRow(rcount);
        Tr.className = "DContent";
      
        Tr.style.height="25px";
        if (GHead == "") AddRowEvents(Tr);
        var x ;
        
        //= Tr.insertCell(0); x.align = "center"; x.style.width = "3%"; x.innerHTML = "<div class=DFlip>" + r + "</div>"; x.innerHTML = r; x.className = "Sno"; //SNo Column

        var G = ""; if (GHead != "") { G = GHead.split("!!")[1].split("~"); }       //---For Attributes
        
        var Design = HeaderHTML;
        
        var l = Vals.length;
        if (IsDesign == 1) l = Design.length;

        
         for (var i = 0; i < l; i++) {
            x = Tr.insertCell(i);
            x.align = Aligns[i];
            x.className = "DContent";
            var GetVal = Vals[i];
            
            //NCDP
            
            if (IsDesign == 1) {
                for (var j = 0; j < Flds.length; j++) {
                    if (Flds[i].trim() == QFlds[j].trim()) {
                        GetVal = Vals[j];
                       // console.log("inDesign :"  + Flds[i] + " ,vals[j] ="+ GetVal);
                         break;
                    }
                }
            }
            else {
                GetVal = Vals[i];
            }
            
            if (GHead != "") {  x.className = "DContent Entry"; x.title = G[i]; }   // Attributes Title 
            
            if (Flds[i].includes("hid")) { x.style.display = "none"; }
            
            // -------------------------------Department_id##DepartmentNAme    -- Drop downlist Box
            if (GetVal.includes("##")) {
                var s = GetVal.split("##");
                if (s[0])
                    s[0] = "<input type=hidden value='" + s[0] + "' class=hiddenVals>";
                GetVal = s[0] + s[1];
            }

            
            //----------------------------create and Empty Row ----------------------------------------------
            
            if (typeof Empty != "undefined" && Empty) { GetVal = ""; }
            
            switch (Flds[i]) {
                    
                    case "SNO":   x.innerHTML = r; x.align = "center"; x.style.width = "3%"; break;
                    
                    case "Keyid":
                        if (GHead != "") {
                            if (GetVal == "") {
                                if (ERecid < -1000)
                                    GetVal = ERecid;
                                else
                                    GetVal = 0;
                            }
                            x.innerHTML = "<input type=hidden size=5 class=hKeyids value=" + GetVal + ">"; AddKeyEvents(x);
                        }
                        else {
                            x.innerHTML = "<input type=hidden size=5 class=hKeyids value=" + GetVal + "><img src='iset/013.gif' onclick=\"fGet(this," + GetVal + ");\">";
                        }
                        x.style.display = "none";
                        break;
                        
                        case "Sel": if (!Vals[i].includes("checkbox")) x.innerHTML = "<input type=checkbox value='"+ GetVal +"'  title='"+ GetVal +"' class=cBoxes onclick=fselRow(this);>"; else x.innerHTML = GetVal; break;
                        case "DelRec": x.innerHTML = "<img src='actions/DeleteRec.png'  style='cursor:hand;width:20px;20px;' onclick='fDelRec(this);'>"; x.align = "center"; break;
                        case "SaveRec": x.innerHTML = "<img src='actions/UpdateRec.png' class='Saves' style='cursor:hand;width:20px;20px;' onclick='fEditRec(this);'>"; x.align = "center"; break;
                        case "Edit": x.innerHTML = "<img src='actions/UpdateRec.png' class='Saves' style='cursor:hand;width:20px;20px;' onclick='fEditRec(this);'>"; x.align = "center"; break;
                        case "AddRec": x.innerHTML = "<input type=button value='add' style='cursor:hand;'" + "  onclick=\"fAddRecord(this,'" + Tab + "', '" + GRec + "', " + rcount + ", " + r + ", '" + Flds + "', '" + Aligns + "', '" + Empty + "', '" + ERecid + "','" + GHead + "');\">"; x.align = "center"; break;
                        
                        default: x.innerHTML = GetVal;
                            if (GLoadType == "Edit") {
                                var s = "";
                                var r = "";
                                if (GIdentity == Flds[i]) {
                                    s = " background-color:#CECECE;";
                                    r = "readonly";
                                }
                                x.innerHTML = "<input type=text value='" + GetVal + "' class='EditText' onkeyup='fMoveCells(this); fUpdateTableRecord(this);' style='width:98%;height:98%;border:none;" + s + "'>";
                            }
                            else {
                                x.innerHTML = GetVal;
                                var f = parseFloat(x.innerHTML);
                                var cn = checkNumber(f);
                                x.className = "DContent " + cn + "";
                            }
                           
                        AddKeyEvents(x);
                }

                 x.contentEditable=true; 
                
                //Style type--------------------------------NCDP
                if (IsDesign == 1) {
                        if (ItemStyle[i] && ItemStyle[i] != "")     x.setAttribute("style", ItemStyle[i]);
                            if(Displays[i] && Displays[i]=="Hide") {  
                            if(UnHide==0)   {x.style.display="none";}
                                else x.className="UnHide";
                            }
                }
        
        }

    }
    

    
function fSearchGrids(Obj,c){


 	   var DG = fGetObj(Obj, "DSource");
            var DS = DG.querySelector(".Sources").value;
            var Tab=DG.querySelector(".DGridTable");
            var GTVal=DS;
            var tr1=Tab.rows[0];
            var tr2=Tab.querySelector(".Search");
            
            for(var i=0;i<tr1.cells.length;i++){
                var t=tr2.cells[i].querySelector(".tSearches");
                if(t && t.value!=""){
                        var columnname=tr1.cells[i].innerText;
                        var condition="Like";
                        var s=t.value;

                        if(s.includes(">=")){
                            condition=">=";
                              s=s.replace(">=","");
                        }
                        else if(s.includes("<=")){
                            condition="<=";
                             s=s.replace("<=","");
                        }
                        else if(s.includes(">")){
                            condition=">";
                            s=s.replace(">","");
                        }
                        else if(s.includes("<")){
                            condition="<";
                             s=s.replace("<","");
                        }
                        else if(s.includes("=")){
                            condition="=";
                              s=s.replace("=","");
                        }
                        GTVal= fWhere(GTVal,columnname,s,condition);
                }
            }
         
	return GTVal;
            
	}
  
    function fSearchGridList(Obj,c){
        if (window.event.keyCode==13){

	      var DG = fGetObj(Obj, "DSource");
          CurrentSearchObj=Obj;

          var GTVal =  fSearchGrids(Obj,c);
             fFillBox(DG, GTVal, "", 3);
        }
    }




function fCreateSearchRow(Tab){
        
        var s=Tab.querySelector(".Search")
        if(!s){
            var Tr = Tab.insertRow(1); 
            Tr.style.height = "15px";
            var tr1=Tab.rows[0];
            Tr.className="Search";
            for(var i=0; i<tr1.cells.length;i++){
                var x = Tr.insertCell(i); 
                if(tr1.cells[i].style.display=="none")
                    x.style.display="none";
                    var t=tr1.cells[i].innerText;
                x.innerHTML = "<input type=text  style='width:90%; "
                +"background: -webkit-gradient(linear, left top, left bottom, color-stop(0.0, #b4c9d0), color-stop(1.0, #8FAEBA)); "
                +" background-color: #8FAEBA; border: 1px solid #8C8C8C;' onkeyup=\"fSearchGridList(this,"+ i +");\" class='tSearches' >"; 
                x.align = "center"; 
                x.className = "Searches";
            }

        }


}


function fHS(Obj){
    alert(Obj.querySelector(".Search"));
        Obj.querySelector(".Search").style.display="none";
}

var GPageCount = 0;
function Paging(Tab, GDT) {
    var tabl = ""; var PageCount = 0;
    if (GDT != null) {
        var RowsPerPage = parseInt(Tab.querySelector(".RowsPerPage").value);
        
        PageCount = parseInt((parseInt(GDT.length - 1) / RowsPerPage));
        
        var GMod = 0; if (parseInt(GDT.length - 1) % RowsPerPage > 0) GMod = 1;
        
        PageCount = parseInt(PageCount) + GMod;

        Tab.querySelector(".PageCount").value = PageCount; Tab.querySelector(".RangeFrom").value = 1;
        
        if (PageCount > 10) Tab.querySelector(".RangeTo").value = 10; else Tab.querySelector(".RangeTo").value = PageCount;
        
        tabl += "<table width=100% _class=GridHead align=center><tr height=20px>";
        
        for (var i = 1; i <= PageCount; i++) {
            var style = ""; if (i > 10) { style = "display:none;" }
            tabl += "<td width=5px align=center class='PageNo PagesNos' style='cursor:pointer;" + style + "' id='Page_" + i + "'  onclick='fOpenPage(this," + i + ");'>" + i + "</td>";
        }
        tabl += "</tr></table>";

    }
    return tabl;
}




var PPageObj = "";
function fOpenPage(Obj, cpage) {
    CurPage = cpage; PPageObj.className = ""; Obj.className = "PageSelect Pages"; PPageObj = Obj;

    var Tab = fGetObj(Obj, "DSource"); var sourceDataObj = Tab.querySelector(".Sources");
    var GTVal = sourceDataObj.value;
    GTVal=fFilterObj(Tab, GTVal);
    GTVal = fSearchGrids(Obj,"");
    var sps = GTVal.split("!!"); 
    var GDT = sps;
    var RowsPerPage = parseInt(Tab.querySelector(".RowsPerPage").value);

    SRec = ((CurPage - 1) * RowsPerPage) + 1; ERec = ((CurPage - 1) * RowsPerPage) + RowsPerPage;
    
    //alert(SRec);
    //alert(ERec);
    
    if (ERec > GDT.length - 1) ERec = GDT.length - 1;
    var divObj = fGetObj(Obj, "DSource");

    fFillBox(divObj, GTVal, "", 2);
}




var pGridObj = null;
function fSelectGrid(Obj) {
    //if (pGridObj) pGridObj.className = "SourceHead Heading";
    var DG = fGetBox(Obj, "DSource");
    if (Obj.className == "SourceHead Heading") {
        Obj.className = "SourceHeadOrange Heading";
        GDG = DG;

        fAddSorting();

    }
    else {
        Obj.className = "SourceHead Heading";
        fRemoveSorting();
        GDG = null;

    }
    pGridObj = Obj;
}


function fAddSorting() {

    if (GDG == null)
        GDG = document.querySelector(".DSource");

    if (GDG) {
        var x = GDG.querySelectorAll(".DFldHead");
        for (var i = 0; i < x.length; i++) {
            x[i].innerHTML += "<br class=brk>";
            x[i].innerHTML += "<img src='actions/MoveLeft.png' onclick='fMoveColumn(this,1);' class=mfilter style='width:14px;height:14px;'>";
           x[i].innerHTML += "<img src='actions/Moveright.png' onclick='fMoveColumn(this,2);' class=mfilter style='width:14px;height:14px;'>";

        }
    }
}



function fMoveColumn(Obj, Type) {
    //var Objs = document.querySelectorAll(".DColumnSelect");
    GColObj = Obj.parentNode;

    var DG = fGetObj(GColObj, "DSource");
    pindex = GColObj.cellIndex;
    nindex = pindex + 1;
    fMovetoTemp();

    //for (var j = 0; j < Objs.length; j++) {
    //  
    //}

}


function fMovetoTemp() {

    if (document.querySelector(".ColBox")) document.querySelector(".ColBox").remove();
    var DG = fGetObj(GColObj, "DSource");

    var t = document.createElement("div");
    t.style.top = "200px", t.style.left = "200px", t.className = "ColBox", t.style.position = "absolute", t.style.height = "300px", t.style.width = "200px", t.style.zIndex = "5";
    DG.appendChild(t);

    AddDropDivEvents(t);


    t.innerHTML = " <table  align=center class='DGridTable Col' cellspacing=1 width=100%></table>";
    DropObjPlace(GColObj, t);
    var Objs = document.querySelectorAll(".DColumnSelect");
    var TempTab = t.querySelector(".Col");
    var Tab = DG.querySelector(".DGridTable");

    var Tr = TempTab.insertRow(0); Tr.style.height = "15px";

    var x = Tr.insertCell(0); x.outerHTML = Tab.rows[0].cells[pindex].outerHTML; //x.align = "center"; x.className = "DFldHead";

    Tab.rows[0].cells[pindex].remove();


    for (var i = 1; i < Tab.rows.length; i++) {
        Tr = TempTab.insertRow(i);
        Tr.style.height = "15px";
        x = Tr.insertCell(0);
        x.outerHTML = Tab.rows[i].cells[pindex].outerHTML;
        Tab.rows[i].cells[pindex].remove();
        //Tab.rows[i].cells[pindex].outerHTML = Tab.rows[i].cells[nindex].outerHTML; 
    }


    for (var i = 1; i < Tab.rows.length; i++) {


    }

}



function fRemoveSorting() {
    if (GDG) {
        var x = GDG.querySelectorAll(".DFldHead");

        for (var i = 0; i < x.length; i++) {
            if (x[i].querySelector(".sort"))
                x[i].querySelector(".sort").remove();

            if (x[i].querySelector(".mfilter"))
                x[i].querySelector(".mfilter").remove();
            if (x[i].querySelector(".brk"))
                x[i].querySelector(".brk").remove();


        }
    }
}


function fPivot(Obj,val) {
    var Pivot = Obj.querySelector(".pivots");
    Pivot.value = val;

}

var Tots = []; 


function fCreateAutoTotal(GT) {

    var DTypes = []; var Aligns = [];var FVals = GT[1].split("~");

    for (var j = 0; j < FVals.length; j++) {
        try {
            var s = isNumeric(FVals[j]);
            if (s) { DTypes[j] = "N"; Aligns[j] = "right"; } else { DTypes[j] = "S"; Aligns[j] = "left"; }
            Tots[j] = 0;

        } catch (e) { }
    }

    for (var i = 1; i < GT.length; i++) {
        var sp = GT[i].split("~");
        for (var j = 0; j < sp.length; j++) {
            if (DTypes[j] == "N") {
                Tots[j] = parseFloat(Tots[j]) + parseFloat(sp[j]);

            }
        }
    }
   
}


function FormGrid(Qry, Obj, Heading, Paging, PRows,Tot) {
    GHead = "";
    var Res = MakeGrid.GetLists(Qry);
    SRec = 1; ERec = PRows; CurPage = 1; GRows = PRows;
    
    Obj.querySelector(".RowsPerPage").value = PRows;
    Obj.querySelector(".PageCombo").value = PRows;

    if(Obj.querySelector(".pivots").value == "")
        fFillBox(Obj, Res.value, Heading, 1, Tot);
    else
        fPivoting(Obj, Res.value, Heading, Obj.querySelector(".pivots").value, 1);
}


function fNGrid(GT, Obj) {
    SRec = 1;
    ERec = GT.length-1;
    CurPage = 1; 
    GRows = ERec;
    fFillRec(GT,Obj);
}

    var GIdentity = ""; var GHead = ""; var GTabName = ""; var MGrid = 0;

    function fGrid(GT, Obj, Heading, Paging, PRows, Tot, LoadType) {
    
    GLoadType=LoadType;
    GHead = "";
    GTabName = "";
    MGrid = 0;
    
    if (typeof LoadType == "undefined")
        LoadType = "F";
    else {
            var GTlength = GT.split("!!").length;
            if (PRows > GTlength) PRows = GTlength - 2;
        }
      
        SRec = 1; ERec = PRows; CurPage = 1; GRows = PRows;


        if(Obj.querySelector(".RowsPerPage")) Obj.querySelector(".RowsPerPage").value = PRows;
        if (Obj.querySelector(".PageCombo")) Obj.querySelector(".PageCombo").value = PRows;
       
        fFillBox(Obj, GT, Heading, 1, Tot, LoadType);


    }


     function fMGrid(GT, GTHead, TabName, Obj, Heading, Paging, PRows, Tot, LoadType) {
        GHead = GTHead;
        GTabName = TabName;
        MGrid = 1;
            
        if(Paging>0){
            var GTlength = GT.split("!!").length;
            if (PRows > GTlength) PRows = GTlength - 2;
            SRec = 1; ERec = PRows; CurPage = 1; GRows = PRows;
            if(Obj.querySelector(".RowsPerPage")) Obj.querySelector(".RowsPerPage").value = PRows;
            if (Obj.querySelector(".PageCombo")) Obj.querySelector(".PageCombo").value = PRows;
       
        }


        fFillBox(Obj, GT, Heading, 1, Tot, LoadType);
    }     

    //var Avail = fGroup(form1.hAllocatedList.value, "Branch~Department", "EmpNo as Available~(Float(WHrs)/2)*2 as Worked", "Count~AggSum");

function fGetData(Qry) { var Res = MakeGrid.GetLists(Qry); return Res.value; }


function fFillRec(GTVal, Obj) {
    
    var sourceDataObj = Obj.querySelector(".Sources"); if (sourceDataObj) sourceDataObj.value = GTVal;
    var GT = GTVal.split("!!");
    var Tab = Obj.querySelector(".DGridTable");
    fDellRec(Tab);
    var Flds = ""; Flds = GT[0].split("~");
    var DTypes = []; 
    var Aligns = []; 
    var Tots = []; 
    var FVals = GT[1].split("~");
    
        for (var j = 0; j < FVals.length; j++) {
            try {
                var s = isNumeric(FVals[j]);
                if (s) { DTypes[j] = "N"; Aligns[j] = "right"; } else { DTypes[j] = "S"; Aligns[j] = "left"; }
                Tots[j] = 0;
            } catch (e) { }
        }
        var rcount = 1;

        for (var r = 1; r <= ERec; r++) { if (GT[r] == "") break; fCreateRow(Tab, GT[r], rcount+1, r, Flds, Aligns); rcount++; }
    }




function fApplyProp(Obj){
    var c= selObj.querySelector(".hFormulas").value.split("@");
    c[3]=selTotal.value;
    c[6]=selDisplay.value;
    
    selObj.querySelector(".hFormulas").value= c[0] + "@" + c[1] +"@" + c[2] +"@" + c[3] +"@" + c[4] +"@" + c[5] +"@" + c[6];
     if (document.querySelector(".ContextBox")) document.querySelector(".ContextBox").remove();
  

}



function fSelAll(Obj) {
    var DG = fGetObj(Obj, "DGridTable");
    var cs = DG.querySelectorAll(".cBoxes");
    if (cs) {

        for (var i = 0; i < cs.length; i++) {
            if (Obj.checked)
                cs[i].checked = true;
            else
                cs[i].checked = false;
                
                var Tr = cs[i].parentNode.parentNode;
                if(cs[i].checked){
                     Tr.className = "DSelect";
                }
                 else {
                    Tr.className = "DContent";
                }
        }
    }

    }

    function fselRow(Obj) {
        var Tr = Obj.parentNode.parentNode;
        if (Obj.checked)
            Tr.className = "DSelect";
        else
            Tr.className = "DContent";
    }

    function fAddRecord(Obj, Tab, GT, rcount, r, Flds, Aligns, Empty, ERecid, G) {
        
        GHead = G;
        rcount++; 
        fCreateRow(Tab, GT, rcount, r, Flds, Aligns, 1, -1001)
    }




function fTotalGrid(GTVal,Flds) {
    var GT = GTVal.split("!!");
    var HeadSp = GT[0].split("~");
    
    for (var i = 1; i < GT.length - 1; i++) {
        
    }

}

function fTotal(GTVal, Fld) {
    var GT = GTVal.split("!!");

   var HeadSp = GT[0].split("~");
    var val = 0;
    for (var i = 1; i < GT.length - 1; i++) {
        var sp = GT[i].split("~");
        var Lindex = 0; while (Lindex < HeadSp.length) { if (Fld.trim() == HeadSp[Lindex].trim()) val = val + parseFloat(sp[Lindex]); Lindex++; }
    }
    return val;
}




function fPage(Obj) {
    var DG = fGetBox(Obj, "DSource");
    var DS = DG.querySelector(".Sources");

    if (Obj.value == 0) {
        DG.querySelector(".Paging").style.display = "none";
        rws = DS.value.split("!!").length - 1;
        SRec = 1; ERec = rws; CurPage = 1; GRows = rws;
        DG.querySelector(".RowsPerPage").value = rws;
        fFillBox(DG, DS.value, "", 2);
    
    }
    else {
        DG.querySelector(".Paging").style.display = "";
        rws = Obj.value;
        SRec = 1; ERec = rws; CurPage = 1; GRows = rws;
        DG.querySelector(".RowsPerPage").value = rws;
        
        fFillBox(DG, DS.value, "", 2);


        //Obj.querySelector(".PageDisplay").innerHTML =  Paging(DG, DS.value.split("!!"));
        

    }
}





function fApplyPivot(Obj) {
    GDG.querySelector(".pivots").value = tdRowFld.innerText + "~" + tdColFld.innerText + "~" + form1.tValFld.value + "~" + form1.selgrpType.value;
    if (tdDesign.querySelector(".PivotBox")) tdDesign.querySelector(".PivotBox").remove();
    fPivoting(GDG, GDG.querySelector(".Sources").value, "Heading", GDG.querySelector(".pivots").value, 2);

}
var GDG = null;

function fOpenPivoitBox(Obj) {

    var DG = fGetObj(Obj, "DBox");
    GDG = DG;
    if (tdDesign.querySelector(".PivotBox")) tdDesign.querySelector(".PivotBox").remove();
    var sourceDataObj = DG.querySelector(".Sources");

    //alert(sourceDataObj);
    // var GTVal = sourceDataObj.split("!!");
    //var hsp = GTVal[0].split("~");

    var sp = GDG.querySelector(".pivots").value.split("~");


    var t = document.createElement("div");
    t.style.top = "200px", t.style.left = "200px", t.className = "PivotBox", t.style.position = "absolute", t.style.height = "300px", t.style.width = "300px", t.style.zIndex = "5";

    tdDesign.appendChild(t);

    //t.innerHTML = "<table width=100%><tr><td align=right>" + fCloseBox(); +"</td><tr><tr height=100%><td> <table  align=center class='DGridTable' cellspacing=1 width=100%></table></td></tr>";

    var tdRow = "", tdCol = "", tdVal = "", grptype = 1;

    if (sp.length > 0) {
        tdRow = sp[0], tdCol = sp[1], tdVal = sp[2], grptype = sp[3];

    }
    t.innerHTML = " <table  align=center class='DGridTable' cellspacing=1 width=100%>"
    + "<tr height=30px><td class=cellHeader align=center colspan=2>Pivoting</td></tr>"
    + "<tr height=50px><td   class=Dcontent width='30%'>Row Field</td><td class='RowField Dcontent' id=tdRowFld onclick='fSelectFld(this);'>" + tdRow + "</td></tr>"
    + "<tr height=50px><td   class=Dcontent>Column Field</td><td class='ColField Dcontent' id=tdColFld onclick='fSelectFld(this);'>" + tdCol + "</td></tr>"
    + "<tr height=50px><td   class=Dcontent>Type</td><td class='ColField Dcontent' onclick='fSelectFld(this);'>"
    + "<select id=selgrpType><option value=1>Normal</option><option value=1>Group</option></select></td></tr>"
    + "<tr height=35px><td  class=Dcontent>Value Field</td><td class='ValField Dcontent' onclick='fSelectFld(this);'><input type=text class='ValFld' id=tValFld value=\"" + tdVal + "\"></td></tr>"
    + "<tr height=35px><td  class=Dcontent colspan=2><input type=button value=Apply onclick='fApplyPivot(this);'></td></tr>"
    + "</table>";

    form1.selgrpType.value = grptype;

    DropObjPlace(Obj, t);

}

function fPivoting(Obj, GTVal, HeadString, Pivotval, val) {

    if (val == 1) var sourceDataObj = Obj.querySelector(".Sources"); if (sourceDataObj) sourceDataObj.value = GTVal;

    var sp = Pivotval.split("~");
    var vRow = sp[0].replace(/,/g, "~");
    var rheadersp = vRow.split("~");


    var vCol = sp[1].split("#")[0];

    var vColType = sp[1].split("#")[1];

    vType = sp[2],
    sum = sp[3];
    var Grp = GTVal;

    if (vType == 2) { Grp = fGroup(GTVal, vRow + "~" + vCol, sum, "AggSum").replace(/~!!/g, "!!"); }


    //----Pivoting -----------
    // var RowName = []; RowName = fDistinct(Grp.split("!!"), vRow);
    //alert(vRow);

    var RowName = []; RowName = fDistinctCols(Grp.split("!!"), vRow);
    //  alert(RowName);
    var ColName = []; ColName = fDistinctType(Grp.split("!!"), vCol, vColType);


    // Form Empty Table Row /Column Matrix

    var NGTVal = vRow + "~" + "Headers" + "~";

    for (var j = 0; j < ColName.length; j++) { NGTVal += ColName[j] + "~"; } NGTVal += "Total Vertical"; NGTVal += "!!";
    // alert(NGTVal);

    var fsp = sum.split(",");
    for (var i = 0; i < RowName.length; i++) {
        NGTVal += RowName[i] + "~";         // Row Records  Branch~Division
        for (var l = 0; l < fsp.length; l++) { NGTVal += "<br><span class='HMatrix H" + fsp[l] + "'>" + fsp[l] + "</span><br>"; } NGTVal += "~";     // Header Name
        for (var j = 0; j < ColName.length; j++) { NGTVal += "~"; }
        for (var l = 0; l < fsp.length; l++) { NGTVal += "<br><span class='RMatrix R" + fsp[l] + "'>0</span><br>"; } NGTVal += "~";  //Vertical Total Row Total
        NGTVal = NGTVal.substring(0, NGTVal.length - 1); NGTVal += "!!";
    }

    for (var o = 0; o < rheadersp.length; o++) {
        if (o == 0)
            NGTVal += "Total";
        NGTVal += "~";
    }

    NGTVal += "~";

    //NGTVal += "Total Horizanal" + "~" + " " + "~";

    for (var j = 0; j < ColName.length; j++) {
        for (var l = 0; l < fsp.length; l++)
        { NGTVal += "<br><span class='CMatrix C" + fsp[l] + "'>0</span><br>"; }      //Horizantal Total
        NGTVal += "~";
    }

    NGTVal += " "; NGTVal += "!!";

    // alert(NGTVal);    

    // ------------------------------------------

    var GT = NGTVal.split("!!");
    var ngt = Grp.split("!!");
    var hsp = ngt[0].split("~");


    for (var i = 1; i < GT.length; i++) {
        var sp = GT[i].split("~");

        var rw = RowName[i - 1];

        for (var j = 0; j < ColName.length; j++) {
            var cl = ColName[j];

            for (var r = 1; r < ngt.length; r++) {
                var nsp = ngt[r].split("~");
                var getRow = "";

                for (var o = 0; o < rheadersp.length; o++) {
                    for (var p = 0; p < hsp.length; p++) {
                        if (rheadersp[o] == hsp[p]) {
                            getRow = getRow + nsp[p] + "~";
                        }
                    }
                }

                getRow = getRow.substring(0, getRow.length - 1);

                var getCol = "";
                for (var p = 0; p < hsp.length; p++) {
                    if (vCol == hsp[p]) {
                        getCol = nsp[p];
                    }
                }

                if (rw == getRow && cl == getCol) {
                    for (var l = 0; l < fsp.length; l++) {
                        for (var k = 0; k < nsp.length; k++) {
                            if (hsp[k] == fsp[l]) {
                                sp[j + (rheadersp.length) + 1] += "<br><span class='Matrix V" + fsp[l] + "'>" + nsp[k] + "</span><br>"; break;        // cell Matrix
                            }
                        }
                    }
                }


            }

        }
        var nsp = "";
        for (var k = 0; k < sp.length; k++) {
            nsp += sp[k] + "~";
        }
        nsp = nsp.substring(0, nsp.length - 1);
        GT[i] = nsp;

    }
    //alert(GT);
    NGTVal = "";
    for (var i = 0; i < GT.length; i++) {
        NGTVal += GT[i] + "!!";
    }

    // ------------------------------------------

    fFillBox(Obj, NGTVal, HeadString, 2);
    fMatrixTotal(Obj);
}

function fMatrixTotal(Obj) {
    var Grid = Obj.querySelector(".DGridTable");

    var tr0 = Grid.rows[0];
    var tr1 = Grid.rows[1];
    var Headerindex = 0;
    var fclass = [];
    var k = 0;

    for (var j = 0; j < tr0.cells.length; j++) {
        if (tr0.cells[j].innerText == "Headers") {
            Headerindex = j;
            var mObj = tr1.querySelectorAll(".HMatrix");
            for (var k = 0; k < mObj.length; k++) {
                fclass[k] = mObj[k].innerText;
            }
            break;
        }
    }

    for (var k = 0; k < fclass.length; k++) {
        var hdr = fclass[k];
        //alert(hdr);
        var TotRow = Grid.rows[Grid.rows.length - 1];
        if (TotRow)
            TotRow.style.display = "none";

        //alert(TotRow.innerHTML);
        var CTot = TotRow.querySelectorAll(".C" + hdr);
        //alert(CTot.length);

        for (var i = 1; i < Grid.rows.length; i++) {

            var vals = Grid.rows[i].querySelectorAll(".V" + hdr);

            //alert(CTot.length);
            var RTot = Grid.rows[i].querySelector(".R" + hdr);

            //var CTot = Grid.rows[Grid.rows.length - 1].querySelector(".C" + hdr);
            for (var j = 0; j < vals.length; j++) {
                RTot.innerText = parseFloat(RTot.innerText) + parseFloat(vals[j].innerText);

                if (CTot[j]) CTot[j].innerText = parseFloat(CTot[j].innerText) + parseFloat(vals[j].innerText);


            }
        }

        //var tr = Grid.rows[Grid.rows.length - 1];


        /*for (var i = 1; i < ; i++) {
        var CTot = 
        var vals = Grid.rows[i].querySelectorAll(".V" + hdr);
        var RTot = Grid.rows[i].querySelector(".R" + hdr);
        }*/

    }

}


function fMultiColFilter(Obj) {

    var divObj = fGetObj(Obj, "DSource");
    var sourceDataObj = divObj.querySelector(".Sources");
    var GTVal = sourceDataObj.value;
    var ObjHead = Obj.querySelector(".FHead");
    var ObjCont = Obj.querySelector(".FCont");

    if (ObjCont.cells.length > 0) {
        for (var i = 0; i < ObjCont.cells.length; i++) {
            var FType = ObjCont.cells[i].querySelector(".FTypes").value;

            // alert(FType);
            //  alert(ObjCont.cells[i].innerText.trim());

            GTVal = fWhere(GTVal, ObjHead.cells[i].innerText.trim(), ObjCont.cells[i].innerText.trim(), FType);
        }
    }
    fFillBox(divObj, GTVal, "", 2);
}

function fFilterObj(Obj,GTVal) {
    
    var ObjHead = Obj.querySelector(".FHead");
    var ObjCont = Obj.querySelector(".FCont");
    
    if (ObjCont.cells.length > 0) {
        for (var i = 0; i < ObjCont.cells.length; i++) {
            GTVal = fWhere(GTVal, ObjHead.cells[i].innerText.trim(), ObjCont.cells[i].innerText.trim(), "=");
        }
    }
    return GTVal;
}

 function fMoveCell1(Obj) {
        var c1 = window.event.keyCode;
        var td = Obj;
        var tr = td.parentNode;
        var ptr = tr.previousElementSibling;
        var ntr = tr.nextElementSibling;
        var cindex = Obj.cellIndex;
        try {
            switch (c1) {
                case 37: td.previousElementSibling.focus(); break;
                case 38: if (ptr) ptr.cells[cindex].focus(); break;
                case 39: td.nextElementSibling.focus(); break;
                case 192: td.nextElementSibling.focus(); break;
                case 40: if (ntr) ntr.cells[cindex].focus(); break;
                case 13: td.nextElementSibling.focus(); break;
            }
        } catch (e) { }
    }


function AddKeyEvents(e) {
    e.addEventListener("dblclick", function (e) {
        fEditRec(e.target);
    });
     e.addEventListener("keyup", function (e) {
        fMoveCell(e.target);
    });
     e.addEventListener("blur", function (e) {
        fnBlur(e.target);
    });
    
     e.addEventListener("focus", function (e) {
        fnFocus(e.target);
    });

}

/*

function AddKeyEvents(e) {
    e.addEventListener("dblclick1", function (e) {
        var Td = e.target; if (Td.className == "tdUser") Td.className = "DContent"; else Td.className = "tdUser";
        if (document.querySelector(".rowkey")) {
            document.querySelector(".rowkey").remove();
        }
        
        Td.innerHTML = "<input type=text class=rowkey size=1 onkeyup='fRowChange();'>";
        if (document.querySelector(".rowkey")) {
            document.querySelector(".rowkey").focus();
        }

        RowChange = 1;
    });

    e.addEventListener("dblclick", function (e) {
        fEditRec(e.target);
    });



}*/




function RemoveRowEvents(dLists) {
    ///dLists.

    //myDIV.removeEventListener("mousemove", myFunction);

}

function AddRowEvents(e) {
    e.addEventListener("click", function (e) {
        var Tr = e.target.parentNode;
        var Td = e.target;
       // if (Tr.className == "DSelect") Tr.className = "DContent"; else Tr.className = "DSelect";

        try {
            var DG = fGetObj(Tr, "DSource");
            var ID = DG.parentNode.id;
           
            try {
                fSelectCell(Td, DG, ID);
            } catch (e) { }
            try {
                fSelectRow(Tr, DG, ID);
            } catch (e) { }

        } catch (e) { }
    });

   
 //   e.addEventListener("mousemove", function (e) { var Tr = e.target.parentNode; if (Tr.className != "DSelect") Tr.className = "DMove"; });
   // e.addEventListener("mouseout", function (e) { var Tr = e.target.parentNode; if (Tr.className != "DSelect")  Tr.className = "DContent"; });
}


function fGridProp(Obj){
   event.preventDefault();
   
 if (document.querySelector(".ContextBox")) document.querySelector(".ContextBox").remove();
 if (document.querySelector(".GridBox")) document.querySelector(".GridBox").remove();
 
    var DG = fGetObj(Obj, "DSource");
     var t = document.createElement("div");
    t.style.top = "200px", 
    t.style.left = "200px",
    t.className = "GridBox", 
    t.style.position = "absolute", 
    t.style.height = "400px", 
    t.style.width = "200px", 
    t.style.zIndex = "5";
    DG.appendChild(t);

    var st = " <table  align=center class='DGridTable' cellspacing=1 width=100%>";
    st += "<tr  align=center>"
     +"<td class=DFLDHead colspan=2><b>Properties</b></td>"
     +"</tr>";
    

    st += "<tr>"
    +"<td width=40% class=DContent>Page Total</td>"
    +"<td class=DContent>"
    +"<select id=selPageTot>"
    +"<option value='NT' selected>Yes</option>"
    +"<option value='Total'>No</option>"
    +"</select></td></tr>";

     st += "<tr>"
    +"<td width=40% class=DContent>Grand Total</td>"
    +"<td class=DContent>"
    +"<select id=selPageTot>"
    +"<option value='NT' selected>Yes</option>"
    +"<option value='Total'>No</option>"
    +"</select></td></tr>";

    t.innerHTML=st;


     DropObjPlace(Obj, t);

}

function fGridHeader(){
    var st="exec [CompanyHDR] @Opt=3";
        
}

function fCompanyHeader(Header){
    var st="exec [CompanyHDR] @Opt=3";
        
    var st="<h4>"+ Header +"</h4>";
        
        return st;

}


 function AddHeaderEvents(e, GTVal) {
    e.addEventListener("dblclick", function (e) {
        //if (PHeaderObj) PHeaderObj.className = "DFldHead";
        //e.target.className = "DropSelect";
        PHeaderObj = e.target;
        fCreateDropBox(this);
        var List = fDistinct(GTVal.split("!!"), PHeaderObj.innerText);
        fFillDropBox(List, PHeaderObj.innerText);
        fSelectColumn(e.target);

        try { fOpenFilterList(e.target); } catch(e){}


    });

    e.addEventListener("contextmenu", (e) => {e.preventDefault();
    
    var Obj=e.target;
    fSelectColumn(e.target);
    selObj=Obj;

   if (document.querySelector(".ContextBox")) document.querySelector(".ContextBox").remove();
   
 if (document.querySelector(".GridBox")) document.querySelector(".GridBox").remove();

    var DG = fGetObj(Obj, "DSource");
   
    var t = document.createElement("div");
    t.style.top = "200px", 
    t.style.left = "200px",
    t.className = "ContextBox", 
    t.style.position = "absolute", 
    t.style.height = "400px", 
    t.style.width = "200px", 
    t.style.zIndex = "5";
    DG.appendChild(t);

    //t.innerHTML = "<table width=100%><tr><td align=right>" + fCloseBox(); +"</td><tr><tr height=100%><td> <table  align=center class='DGridTable' cellspacing=1 width=100%></table></td></tr>";
    var st = " <table  align=center class='DGridTable' cellspacing=1 width=100%>";
     st += "<tr  align=center>"
     +"<td class=DFLDHead colspan=2><b>Properties</b></td>"
     +"</tr>";
    st += "<tr>"
    +"<td width=30% class=DContent>Total</td>"
    +"<td class=DContent>"
    +"<select id=selTotal>"
    +"<option value='NT' selected>NoFunction</option>"
    +"<option value='Total'>Total</option>"
    +"<option value='Average'>Average</option>"
    +"</select></td></tr>";
     
    st += "<tr  >"
    +"<td class=DContent>Display</td>"
    +"<td class=DContent>"
     +"<select id=selDisplay><option value='Display' selected>Display</option>"
    +"<option value='Hide' >HideMode</option>"
    +"</select></td></tr>";

    st += "<tr  >"
     +"<td class=DContent>ColumnType</td>"
    +"<td class=DContent>"
    +"<select id=selColumnType><option value='Normal'>Normal Column</option>"
    +"<option value='Fixed' selected>Fixed Column</option>"
    +"</select>"
    +"</td></tr>";

   
     st += "<tr><td colspan=2><br><h3><i>Formating<i></h3><br>  <table style='width:100%; class=RCal>"+ fIcons(); + "</table></td></tr>";
    st += "</table>";
      st += "<tr  >"
     +"<td class=DContent align=right colspan=2><input type=button value='Apply' onclick='fApplyProp(this);'></td>"
     +"</tr>";

    t.innerHTML=st;

 

    fFillFormats();
    DropObjPlace(Obj, t);

    }
    
        
    );


    e.addEventListener("click", function (e) {
        var Obj = e.target;
        if (fObj) {
            if (fObj.querySelector(".ValFld"))
                fObj.querySelector(".ValFld").value = Obj.innerText;
            else
                fObj.innerHTML = Obj.innerText;

        }
        //alert(Obj.innerText);
    });

}

var pindex = -1; var nindex = -1;

var ColSelectedIndex = -1;
var GColObj = "";

function fSelectColumn(Obj) {
    GColObj = Obj;

    var DG = fGetObj(Obj, "DSource");
    var Tab = DG.querySelector(".DGridTable");
    var cindex = Obj.cellIndex;

    //    alert(cindex);
    for (var i = 1; i < Tab.rows.length; i++) {

        /*if (i == 0) {
            Tab.rows[i].cells[cindex].className = "DFldHead DColumnSelect";
            if (pindex >= 0)
                Tab.rows[i].cells[pindex].className = "DFldHead";
        }*/
                
        Tab.rows[i].cells[cindex].className = "DContent DColumnSelect";
        if (pindex >= 0)
            Tab.rows[i].cells[pindex].className = "DContent";

    }
    pindex = cindex;
}




function fCreateDropBox(Obj) {

    if (document.querySelector(".DropBox")) document.querySelector(".DropBox").remove();
    var DG = fGetObj(Obj, "DSource");

    var t = document.createElement("div");
    t.style.top = "200px", t.style.left = "200px", t.className = "DropBox", t.style.position = "absolute", t.style.height = "300px", t.style.width = "200px", t.style.zIndex = "5";
    DG.appendChild(t);
    //t.innerHTML = "<table width=100%><tr><td align=right>" + fCloseBox(); +"</td><tr><tr height=100%><td> <table  align=center class='DGridTable' cellspacing=1 width=100%></table></td></tr>";
    t.innerHTML = " <table  align=center class='DGridTable' cellspacing=1 width=100%>";
   
    DropObjPlace(Obj, t);

}

function fMakeGTVal(Obj) {
    
}


function DropObjPlace(Objct, divObj) {


    var objleft = Objct.offsetLeft;
    var objTop = Objct.offsetTop;
    var Objparent = Objct.offsetParent;

    while (Objparent.tagName != "BODY") {
        objleft += Objparent.offsetLeft;
        objTop += Objparent.offsetTop;
        try { Objparent = Objparent.offsetParent } catch (e1) { alert(e1); }
    }

    objleft = objleft + 30;
    objTop = objTop + 20;

    divObj.style.left = objleft + "px";
    divObj.style.top = objTop + "px";
    divObj.style.display = "";
}



function fFillDropBox(List, Heading) {
    var dv = document.querySelector(".DropBox");
    if (dv) {
        var Tab = dv.querySelector(".DGridTable");
        if (Tab) {
            var Tr = Tab.insertRow(0); Tr.style.height = "15px";
            var x = Tr.insertCell(0); x.innerHTML = Heading; x.align = "center"; x.className = "DropHeader";

            Tr = Tab.insertRow(1); Tr.style.height = "15px";
            
            x = Tr.insertCell(0); x.innerHTML = "<input type=text class=tDrops value=1  style='display:none;'>"
            + "<select class='txtD fLogics' style='width:30%'>"
            + "<option value='='>=</option><option value='>'>Greater</option><option value='<'>Lesser</option>"
            + "<option value='>='>Greater Equalto</option><option value='<='>Lesser Equalto</option>"
            + "<option value='Like' selected>Like</option></select><input type=text class=ts onkeyup='fCheckFilter(this);'>";
            x.align = "center"; 
            x.className = "";

            for (var r = 0; r < List.length - 1; r++) {

                Tr = Tab.insertRow(r + 2); Tr.style.height = "15px"; x = Tr.insertCell(0); 
                x.innerHTML = List[r]; x.className = "gFilters";
                AddFilterEvents(x);
            }
        }
    }

}



function fCheckFilter(Obj) {
    if (window.event.keyCode == 13) {
        if (Obj.value != "") {
            //   alert(Obj.parentNode.querySelector(".fLogics").value);
            fFormFilter(Obj.value, Obj.parentNode.querySelector(".fLogics").value);

        }
    }

}

function AddKeyFilterEvents(e) {
    e.addEventListener("keyup", function (e) {
        var Obj = e.target;
        if (window.event.keyCode == 13) {
            if (Obj.value != "") {
                fFormFilter(Obj.value, "=");
            }
        }
    });
}




var PFilterObj = null;
function AddFilterEvents(e) {

    e.addEventListener("click", function (e) {
        if (PFilterObj) PFilterObj.className = "DropContent";
        e.target.className = "DOrange";
        PFilterObj = e.target;
        fFormFilter(PFilterObj.innerText, "=");
    });
}



function fFormFilter(FilterValue, FType) {

    var FObj = fGetFilter(PHeaderObj, "HeadTab");
    var Obj = FObj.querySelector(".Filters");
    var ObjHead = Obj.querySelector(".FHead"); 
    var ObjCont = Obj.querySelector(".FCont");
    var ExFlag = 0;
    var icon = 0;

    if (ObjHead.cells.length > 0) {
        for (var i = 0; i < ObjHead.cells.length; i++) {
            icon = icon + 1;
            if (ObjHead.cells[i].innerText.trim() == PHeaderObj.innerText.trim()) {
                ObjCont.cells[i].innerHTML = "<table style='width:90%'><tr valign=middle><td witdh='100%' class=FFilter>" + FilterValue + "<input type=hidden class=FTypes value='" + FType + "'>&nbsp;&nbsp;<img src='icons/R" + icon + ".png' style='height:15px;width;10px;cursor:hand;' onclick='fCloseFilter(this);' ></td></tr></table>";
                ExFlag = 1;
                break;

            }
        }
    }

    icon = icon + 1;
    if (ExFlag == 0) {

        var x = ObjHead.insertCell(ObjHead.cells.length);
        var y = ObjCont.insertCell(ObjCont.cells.length);
        y.style.width = "120px";
        x.innerText = PHeaderObj.innerText;
        y.innerHTML = "<table style='width:90%'><tr valign=middle><td witdh='100%' class=FFilter>" + FilterValue + "<input type=hidden class=FTypes value='" + FType + "'>&nbsp;&nbsp;<img src='icons/R" + icon + ".png' style='height:15px;width;10px;cursor:hand;' onclick='fCloseFilter(this);' ></td></tr></table>";
    }
    var dv = document.querySelector(".DropBox");
    if (dv) dv.style.display = "none";
    fMultiColFilter(Obj);


}





function fCloseFilter(Obj) {
    var td = Obj.parentNode; var indx = Obj.parentNode.cellIndex; Obj = fGetObj(Obj, "Filters"); var ObjHead = Obj.querySelector(".FHead"); var ObjCont = Obj.querySelector(".FCont");
    for (var i = 0; i < ObjHead.cells.length; i++) {
        if (td.innerText.trim() == ObjCont.cells[i].innerText.trim()) {
            ObjHead.deleteCell(i);
            ObjCont.deleteCell(i);
            break;
        }
    }
    fMultiColFilter(Obj);
}



var GComp = null;

    //  --------------------------------------------------------------------------------------------Data Source Area ------------------------------------------------------------------------------------------------------------------------------------------

    var pTabLogObj = null;
    function fOpenSource(Obj, TabVal) {
        var RS = Obj.parentNode.querySelector(".Recs");

        if (pTabLogObj) pTabLogObj.className = "TabLog";
        Obj.className = "TabLogActive"; pTabLogObj = Obj;
        SRec = 1; ERec = rws; CurPage = 1;

        //alert(RS.value);
        fFillBox(dSourceList, RS.value, "", 1);
    }

    function fGOPostion(Obj, val) {

        var Tab = fGetObj(Obj, "DSource");
        var RangeFrom = 0; var RangeTo = 0;
        var PageCount = parseInt(Tab.querySelector(".PageCount").value);
        var CurRangeFrom = parseInt(Tab.querySelector(".RangeFrom").value);
        var CurRangeTo = parseInt(Tab.querySelector(".RangeTo").value);

        switch (val) {
            case "First": RangeFrom = 1; if (PageCount < 10) { RangeTo = PageCount; } else RangeTo = 10; break;
            case "Next": RangeFrom = CurRangeTo + 1; if (PageCount < (CurRangeTo + 10)) { RangeTo = PageCount; } else RangeTo = CurRangeTo + 10; break;
            case "Previous": RangeTo = CurRangeTo - 10; RangeFrom = RangeFrom - 10; break;
            case "Last": RangeTo = PageCount; var GMod = parseInt(PageCount) % 10; if (GMod > 0) RangeFrom = RangeTo - (GMod - 1); else RangeFrom = RangeTo - 9; break;
        }
        
        Tab.querySelector(".RangeFrom").value = RangeFrom;
        Tab.querySelector(".RangeTo").value = RangeTo;
        
        DisplayPage(Tab, RangeFrom, RangeTo, PageCount);
    }

    function DisplayPage(Tab, RFrom, RTo, PageCount) {

        try {
            var Objs = Tab.querySelectorAll(".PagesNos")
            for (var i = 0; i < Objs.length; i++) {
                if (i >= RFrom && i <= RTo)
                    Objs[i].style.display = "";
                else
                Objs[i].style.display = "none";
            }
        }
        catch (e) { }
    }


    
    var GSource = "";
    function fCreateSourceBoxes() {
        fSourceList("DSource", "dSourceList", 170, 40, 650, 1100, "DataSource", "0");

    }




function AddDivEvents(e) {
    e.addEventListener("mouseup", fnDGStop());
    e.addEventListener("mousedown", function (e) { fnDGStart(this) });
    e.addEventListener("dblclick", function (e) { fResizeBoard(this) });

}


function fSaveDesigns() { fSaveBoxes("DBoxW"); fSaveBoxes("DTime"); }


function fSaveBoxes(clssName) {

    var xObj = document.querySelectorAll("." + clssName);

    var Query = "";
    for (var i = 0; i < xObj.length; i++) {
        var Heading = xObj[i].querySelector(".Heading"); var Header = ""; if (Heading !== null) Header = Heading.innerText;
        var HeadClass = xObj[i].querySelector(".HeadClass"); var Class = ""; if (HeadClass !== null) Class = HeadClass.value;
        
        Query += "exec Ges @Opt=5, @IDD='" + xObj[i].id + "',"
        +" @top=" + parseInt(xObj[i].style.top) + ",@left=" + parseInt(xObj[i].style.left) + ","
        +"@height=" + parseInt(xObj[i].style.height) + ",@width=" + parseInt(xObj[i].style.width) + ",";
        Query += " @Heading='" + Header + "',@Content='',@Class='" + Class + "',@Mnuno=1!";
    }

    
    var Res = iDashTime.SaveRECS(Query);
    alert(Res.value);

}



function fLoadBoxes() {
    
    var GT = form1.hDesign.value.split("!");
    try {
        for (var i = 1; i < GT.length - 1; i++) {
            var sp = GT[i].split("~");
            var t = document.getElementById(sp[2]);            
            if (t) {
                t.style.top = sp[4] + "px", t.style.left = sp[3] + "px", t.style.position = "absolute",
                    t.style.height = sp[5] + "px", t.style.width = sp[6] + "px";
            }

        }
    } catch (e) { }

}



function fCloseBox() { return "<u><span class='delete' onclick='fCloseBox(this);' style='cursor:hand;'>X</span></u>";   }


function fGetIndex(FldName, HeaderRecord) {
    var HeaderSp = HeaderRecord.split("~"); var HIndex = 0; for (var k = 0; k <= HeaderSp.length; k++) { if (HeaderSp[k].toLowerCase().trim() == FldName.toLowerCase()) { HIndex = k; break; } }
    return HIndex;

}


function fCreateTreeList(Source, Heading, GTVal, TreeHeader, TreeFlds) {

    var t = document.createElement("div");
    t.className = "DContent", t.style.height = "100%", t.style.width = "100%", 
    t.style.overflow="auto";
    Source.appendChild(t);

    t.innerHTML = "<table cellspacing=0  align=center width=100% style='display:none;' ><tr height='20PX'><td width=5% ></td>"
    + "<td class=TreeHeader align=center>" + Heading + " LISTS</td>"
    + "<td  width=40% align=right>"
    + "<img src='icons/R1.png' style='width:16px;height:16px;cursor:pointer;' onclick='fExpandTree();'>&nbsp;"
    + "<img src='icons/Sample1.png' style='width:16px;height:16px;cursor:pointer;' onclick='fHideTree();'>&nbsp;"
    + "<img src='icons/Close.png' style='width:16px;height:16px;cursor:pointer;' onclick='fCloseTree(this);' accesskey='t' ></td></tr></table> "
    + "<table cellspacing=0 class='DLists'  _style='border-collapse: collapse;'  id=lUsers width=100% ></table>";
    
    fFillTreeList(Source, GTVal, TreeHeader, TreeFlds);

}
function fFillTreeList(Tab, GTVal, TreeHeader, TreeFlds) {

    //var Tab = lUsers;
    Tab = Tab.querySelector(".DLists");
    //alert(Tab);

    var GT = GTVal.split("!!");
    var PVal = ""; var x = null; var tr = null; var st = ""; var ht = 0; var rc = 0;
    var Flds = TreeFlds.split("~");


    for (var i = 1; i < GT.length - 1; i++) {
        var sp = GT[i].split("~"); var Val = sp[fGetIndex(TreeHeader, GT[0])];
        
        if (PVal != Val) {
            
            if (x != null) {
                st += "</table></div>";
                st = st.replace("DIVHGT", ht);
                x.innerHTML = st;
                var htd = x.parentNode.previousElementSibling.querySelector(".caret").querySelector(".CTreeHeader");
                if (htd) {
                    htd.innerText = htd.innerText.replace("COUNT", rc);
                    htd.className = "CTreeHeader";
                }
            }

            tr = Tab.insertRow(Tab.rows.length); tr.height = "25px"; 
            x = tr.insertCell(0); 
            x.className = "caret"; 
            x.style.cursor = "Pointer";
            x.innerHTML = "<label class='CTreeHeader'>" + Val + " <b>[ COUNT ]</b></label>";
            
            tr = Tab.insertRow(Tab.rows.length);
            tr.height = "25px"; x = tr.insertCell(0); //x.className = "Dcontent"; 
            x.style.cursor = "Pointer";
            ht = 0; rc = 0;
            
            st = "<div style='height:DIVHGTpx;width:210px;overflow:auto;' class='nested' >"
            st += "<table cellspacing=1 class=DGridTable align=center width=100%>";
        }

        ht = ht + 35; if (ht > 300) ht = 300;
        rc = rc + 1;
        //st += "<tr height=20px onclick='fOpenDetails(this,\"" + GT[0] + "\",\"" + GT[i] + "\");'>"
        st += "<tr height=20px onclick='fOpenDetails(this," + i + ");'>"
        for (var k = 0; k < Flds.length; k++) { st += "<td class=DContentSmall >"+  sp[fGetIndex(Flds[k],GT[0])] + "</td>";  }

        st += "<tr>";
        PVal = Val;
    }

    if (x != null) {
        st += "</table></div>";


        x.innerHTML = st.replace("DIVHGT", ht);
        var htd = x.parentNode.previousElementSibling.querySelector(".caret").querySelector(".CTreeHeader");
        if (htd) {
            htd.innerText = htd.innerText.replace("COUNT", rc);
            htd.className = "CTreeHeader";
        }

    }

    //-------------------------------------

    
    var toggler = Tab.getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
                
        toggler[i].addEventListener("click", function () {
            fHideTree();
            this.children[0].classList.toggle("DTreeSelect");
            var tr = this.parentElement.nextElementSibling;
            tr.querySelector(".nested").classList.toggle("active");
        });

    }


}

function fHideTree() {
    var toggler = document.getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
        var tr = toggler[i].parentElement.nextElementSibling;
        if (toggler[i].children[0].className == "CTreeHeader DTreeSelect") {
            tr.querySelector(".nested").classList.toggle("active");
        }
        toggler[i].children[0].className = "CTreeHeader";
    }
}

function fExpandTree() {
    fHideTree();
    var toggler = document.getElementsByClassName("caret");
    for (var i = 0; i < toggler.length; i++) {
        var tr = toggler[i].parentElement.nextElementSibling;
        tr.querySelector(".nested").classList.toggle("active");
        toggler[i].children[0].classList.toggle("DTreeSelect");
    }
}
function fOpenTree() {
    var tdObj = document.querySelector(".Lists")
    if (tdObj) tdObj.style.display = "";
        

}
function fCloseTree(Obj) {
    var tdObj = fGetObj(Obj, "Lists")
    fDisplay(tdObj);
    //tdObj.style.display = "none";

}
function Gettoggle(Obj, c1, c2) {
    if (Obj.className == c1)
        Obj.className = c2;
    else
        Obj.className = c1;
}

function GetCls(Obj, PObj, c1, c2) {
    if(PTObj)
    PObj.className = c2;
    Obj.className = c1;

}

        function fDisplay(Obj) {
            if (Obj.style.display == "none")
                Obj.style.display = "";
            else
                Obj.style.display = "none";
        }


        function fGetColVal(HeaderName) {
            var val = "";
            for (var j = 0; j < GHeader.length; j++) {
                if (HeaderName.toLowerCase() == GHeader[j].toLowerCase()) {
                    val = GSP[j];
                    break;
                }
            }
            return val;

        }

        function fGetGridRow(Obj, DG, ID) {
           //  alert(1);
            var Keyid = Obj.querySelector(".hKeyids");
           
           
            if (RselObj) RselObj.className = "DContent";
            RselObj = Obj;
            
            if (Keyid) GIDD = Keyid.value;

            var Tab = fGetObj(Obj, "DSource");
            var sourceDataObj = Tab.querySelector(".Sources");
            var GT = sourceDataObj.value.split("!!");
            var i = fGetRecCount(sourceDataObj, GIDD);
            
            GHeader = GT[0].split("~");
            GSP = GT[i].split("~");
            
            try {
                if (iUpdate) iUpdate.style.display = "";
                if (iSave) iSave.style.display = "none";
                if (iDelete) iDelete.style.display = "";
            }
            catch (e) { }
        }

        function fGetRecCount(GTVal, GIDD) {
          
            var GT = GTVal.value.split("!!");
            Header = GT[0].split("~");
            
            var j = 0;
            for (j = 0; j < Header.length; j++) {
                if (Header[j] == "Keyid") {
                    break;
                }
            }
            var i = 0;
            for (i = 1; i < GT.length; i++) {
                var sp = GT[i].split("~");
                if (GIDD == parseInt(sp[j])) {
                    break;
                }
            }
            return i;
        }



        function fGetRec(GTval) {
            var GT = GTval.split("!!");
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


      

        function fnclose() {
            try {
                window.parent.divApply.style.display = "none";
            }
            catch (e) { }

        }



        function LoadDisable() {
            window.parent.parent.dLoading.style.display = "none";
        }

        function fSaveRec(dta) {
            var Res = MakeGrid.saveRec(dta);
            List();
            try {
                if (parseInt(Res.value) > 0) {
                    alert("Record Updated");
                    fNew();
                    List();
                }
                else {
                    alert("Record Duplication");
                }
            } catch (e) { alert(e) }
        }





        document.addEventListener("keyup", function () {

            if (window.event.keyCode == 27) {
                if (document.querySelector(".DropBox")) document.querySelector(".DropBox").remove();
                 if (document.querySelector(".ContextBox")) document.querySelector(".ContextBox").remove();
                 if (document.querySelector(".GridBox")) document.querySelector(".GridBox").remove();
                if (document.getElementById("divData")) document.getElementById("divData").style.display = "none";
                if (document.getElementById("dFooters")) document.getElementById("dFooters").style.display = "none";
                if (document.getElementById("dPunch")) document.getElementById("dPunch").style.display = "none";
                if (docment.getElementById("dOpenBox")) document.getElementById("dOpenBox").style.display = "none";
                if (docment.getElementById("divApply")) document.getElementById("divApply").style.display = "none";

                
            }

        });



        var BoxCol = ["#FFC062", "#46A3FF", "#FF4D20", "#99CC00"];

        function fBoxes() {
            var xObj = document.querySelectorAll(".FBoxHead");
            for (var i = 0; i < xObj.length; i++) {
                xObj[i].style.color = BoxCol[i];
            }
        }


        
        function fonlyData(Obj) {
            var HeadRow = Obj.querySelector(".fHeadRow");
            if (HeadRow) HeadRow.style.display = "none";
            var PG = Obj.querySelector(".Paging");
            if (PG) PG.parentNode.style.display = "none";
        }
        function ft(text) {

            if (text.substring(0, 1) == ":")
                text = text.substring(1, text.length);
            return text;

        }
        function fSelectCombo(o, query,ctext) {
            
            var c = o.querySelector(".comp");
            
            if (ctext.substring(0, 1) == ":")
                ctext = ctext.substring(1, ctext.length);
            ctext = ctext.toUpperCase().trim() ;
            
            if (query.includes("select")) {
                var q = query.split("@@");
                p = q[0] + " as IDD,"
                var r = q[1];
                var t = r.split("from");
                var l = t[1].indexOf(" ")
                var Tab = "";
                if (l == 0) Tab = t[1].trim();
                else Tab = t[1].substring(0, l).trim();
                var f = r.substring(0, r.indexOf(" ")).trim();
                r = r.substring(r.indexOf(" ") + 1, r.length);
                f = f + " as TEXT ";
                r = f + r;
                p = p + r;
                fLoadCombo(c, p, "" + Tab + "", 0);
            }
            else {
                var s = query.split("as");
                var q = s[0].trim().split("@@");
                c.length = 0;
                c.options[0] = new Option(s[1], -1);
                for (var i = 0; i < q.length; i++) {
                    var p = q[i].split("-");
                    c.options[i + 1] = new Option(p[1],p[0]);
                }

            }
            //var ctext = c.parentNode.innerText.trim();
        

            if (ctext != "") {
                for (var i = 0; i < c.length; i++) {
                    var text = c.options[i].text.toUpperCase().trim();
                    var val = c.options[i].value;

                    if (ctext == text) {
                        c.value = val;
                        break;
                    }
                }
            }

        }


        function fGetComboIndex(ctext,c) {

            if (ctext != "") {
                for (var i = 0; i < c.length; i++) {
                    var text = c.options[i].text.toUpperCase().trim();
                    if (ctext == text) {
                        c.selectedIndex = i;
                        break;
                    }
                }
            }
        }

        function fGetComboVal(ctext, c) {
            var val = 0;
            ctext = ctext.toUpperCase().trim();
            if (ctext != "") {
                for (var i = 0; i < c.length; i++) {
                    var text = c.options[i].text.toUpperCase().trim();
                    if (ctext == text) {
                        val = c.options[i].value;
                        break;
                    }
                }
            }
            return val;
        }

        function fGetComboText(cVal, c) {
            var text = "";
            cVal = cVal.toUpperCase().trim();
            if (cVal != "") {
                for (var i = 0; i < c.length; i++) {
                    var Val = c.options[i].value.toUpperCase().trim();
                    if (cVal == Val) {
                        text = c.options[i].text;
                       
                        break;
                    }
                }
            }
            return text;
        }





        function fStaticCombo(o, query) {


        }


        function fLoadCombo(Obj, Q, H, V) {
            var GT = window.parent.fQry(Q);

            var GT1 = fDistinctCols(GT.split("!!"), "IDD~TEXT");
            fCombo(Obj, GT1, "A-" + H);
            sortSelect(Obj);
            Obj.value = V;
        }

        function fLoadBox(Obj, Q, H, V) {
            var GT = window.parent.fQry(Q);
            var GT1 = fDistinctCols(GT.split("!!"), "IDD~TEXT");
            fBox(Obj, GT1, "A-" + H);
            sortSelect(Obj);
            Obj.value = V;
        }



        function fCombo(RObj, GT, Header) {
            RObj.length = 0;
            RObj.options[0] = new Option(Header, 0);

            for (var i = 0; i <= GT.length - 1; i++) {
                var sp = GT[i].split("~");
                RObj.options[i + 1] = new Option(sp[1], sp[0]);
            }
            RObj.selectedIndex = 0;

        }


        function sortSelect(selElem) {
            var tmpAry = new Array();
            for (var i = 0; i < selElem.options.length; i++) {
                tmpAry[i] = new Array();
                tmpAry[i][0] = selElem.options[i].text;
                tmpAry[i][1] = selElem.options[i].value;
            }
            tmpAry.sort();
            while (selElem.options.length > 0) {
                selElem.options[0] = null;
            }
            for (var i = 0; i < tmpAry.length; i++) {
                var op = new Option(tmpAry[i][0], tmpAry[i][1]);
                selElem.options[i] = op;
            }
            return;
        }

        function RDropPlace(Objct, divObj) {

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

            if (objTop > 600)
                objTop = 600;
            divObj.style.left = objleft + "px";
            divObj.style.top = objTop + "px";

            divObj.style.display = "";
        }


        function fSliceLast(val) {
            if (val != "")
                return val.substring(0, val.length - 1);
            else
                return "";
                
        }
        var selObj = "";

     

        
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




function fDownRec(Obj) {
    Obj.parentNode.className = "cellHeader";
    var CurTr = Obj.parentNode.parentNode;
    var NextTr = CurTr.nextElementSibling;
    var Temp = CurTr.innerHTML;
    CurTr.innerHTML = NextTr.innerHTML;
    NextTr.innerHTML = Temp;
}





var ifocus=0;
var iCount=100;
var Objj;
var divObj;
var hidObj;


function fnCrtlFocus(Obj,hObj){
try{		
		ifocus=0;		
		if(window.event.keyCode==40){			
				
			Objj=document.all['hids'];	
				
			if(Objj!=null){
				if(Objj.length>0)
					Objj[0].focus();	
				else
					Objj.focus();
			}
		}
				}
			catch(e){
			}
}

function fNumber(Obj){	
	if((window.event.keyCode>=48 && window.event.keyCode<=57) || window.event.keyCode==190)
		return true
	else{			
		Obj.value=Obj.value.substring(0,Obj.value.length-1);
		}
}
		
		
function fnGetInn(Obj){
	Obj.parentNode.className="tdMas";
}
function fngetIn(Obj,Objtxt,Objhtxt){	
	try{
		Objhtxt.value=Obj.parentNode.parentNode.cells[0].innerText;	
		Objtxt.value=Obj.parentNode.parentNode.cells[1].innerText;
	}			
	catch(e){
	}
	Obj.parentNode.className="tdMas";	
}
function fngetOut(Obj){
	Obj.parentNode.className="tdWhite";
}

function fnCtrlDown(Obj){		
	try{
		if(Objj!=null){
			if(window.event.keyCode==40){
				if(ifocus<Objj.length-2)
					ifocus++;									
				else
					ifocus=Objj.length-1;
				Objj[ifocus].focus();				
			}	
			else if(window.event.keyCode==38){
				if(ifocus>0)
					ifocus--;
				else
					ifocus=0;
				Objj[ifocus].focus();			
			}
			else if(window.event.keyCode==27){
			divObj.style.display="none";
			Objct.focus();
			}
		}
	}
	catch(e){
	
	}
}


	var updc="";
	var Objct;


	function fnGData(Obj, icase, hiddenObj, isplit, divObj1, ent1, upd, sp, RCond) {
			    	updc=upd;
					Objct=Obj;
					ic=icase;
					divObj=divObj1;
					hidObj=hiddenObj
					if (window.event.keyCode == 27) {
					    //alert(1);  
                        divObj.style.display="none";
					    Objct.focus();
					}
					
                    if(window.event.keyCode==13){
                        if (ent1 == 1) {
                            if (Obj.value != "") {
                                window.parent.GetData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData);
                            }
                        }
                        else if (ent1 == 0) {
                            window.parent.GetData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData);
                        }
                        else if (ent1 == 2) {
                            var res = window.parent.getDropData(hiddenObj, icase, isplit, upd, sp, RCond);
                            fnResData(res);
                        }
					}
	}
	
	
	function fnResData(Obj){		
			lbldata.innerHTML=Obj.value;				
			 var objleft=Objct.offsetLeft;
			 var objTop=Objct.offsetTop;			 
			 var Objparent=Objct.offsetParent;		 			 
			 
             while(Objparent.tagName != "BODY"){					
				  objleft += Objparent.offsetLeft;
				    objTop += Objparent.offsetTop;
				   try {Objparent = Objparent.offsetParent} catch(e1){alert(e1);}
			}
			divObj.style.left=objleft;

			if (objTop > 400) objTop = 200;
            
            divObj.style.top=objTop+20;
			divObj.style.display="";



		}




        //  ------ Format Icons --------------------

        function fIcons(){
        
            var st="";
            
            st += "<tr><td><button  id='bold' class='Option-button format' accesskey='b' > <img src='icons/BoldBlue.png' style='width:20px;height:20px;' onclick=\"FPickStyles('font-weight','Bold','Normal');\" /></button>&nbsp;"
            st += "<button id='italic' class='Option-button format' accesskey='i'><img src='icons/italicGreen.png' style='width:20px;height:20px;' onclick=\"FPickStyles('font-style','Italic','Normal');\" /> </button>&nbsp;"
            st += "<button id='underline' class='Option-button format' accesskey='u'><img src='icons/ULineOrange.png' style='width:20px;height:20px;' onclick=\"FPickStyles('text-decoration','underline','Normal');\" /></button>&nbsp;"
            st += "<button id='strikeThrough' class='Option-button format' accesskey='s'><img src='icons/strikethrough.png' style='width:20px;height:20px;' onclick=\"FPickStyles('text-decoration','line-through;','Normal');\" /> </button>&nbsp;"

            st += "<tr><td><button id='justifyLeft' class='Option-button align'><i class='fa-solid fa-align-left' onclick=\"FPickStyles('text-align','left;','Normal');\"></i></button>&nbsp;"
            st += "<button id='justifyCenter' class='Option-button align'><i class='fa-solid fa-align-center' onclick=\"FPickStyles('text-align','Center;','Normal');\"></i></button>&nbsp;"
            st += "<button id='justifyRight' class='Option-button align'><i class='fa-solid fa-align-right' onclick=\"FPickStyles('text-align','right;','Normal');\"></i></button>&nbsp;"
            st += "<button id='justifyFull' class='Option-button align'><i class='fa-solid fa-align-justify' onclick=\"FPickStyles('text-align','justify;','Normal');\"></i></button></td></tr>"

            st += "<tr><td><select id='fontName' class='adv-option-button' onchange=\"fFontFlamily(this);\"></select>"
            +"<select id='fontSize' class='adv-option-button' onchange=\"fFontSize(this);\"></select></td></tr>";
            
            st += "<tr><td><div class='input-wrapper'><input type=color  id=foreColor class='adv-option-button'  onchange=\"FPickStyles('color',this.value,'Normal');\" /><label for='foreColor'>Font Color</label></div></td></tr>"
            +"<tr><td><div class='input-wrapper'><input type=color  id=backColor class='adv-option-button' onchange=\"FPickStyles('background-color',this.value,'Normal');\"  /><label for='backColor'>Highlight Color</label></div></td></tr>";

            return st;

        }

        function fFontFlamily(Obj) {    FPickStyles('font-family', Obj.options[Obj.selectedIndex].text, '');    }

        function fFontSize(Obj){    FPickStyles('font-size', Obj.options[Obj.selectedIndex].text, '');  }


        function fFillFormats(){
            var fl = ["Arial", "Verdana", "Times New Roman", "Garamond", "Georgia", "Courier New"];
            var fn = document.getElementById("fontName");
            var fs = document.getElementById("fontSize");
        
            for (var i = 0; i < fl.length; i++) {
                fn.options[i] = new Option(fl[i], fl[i]);

            }
            for (var i = 1; i <= 20; i++) {
                var y = String(i) + "px";
                fs.options[i - 1] = new Option(y, y); 
            }

            fs.selectedIndex = 10;
        
        }


  
        function FPickStyles(val, Obj, Alt) {
            
            var Objs = document.querySelectorAll(".DColumnSelect");
            
            for (var j = 0; j < Objs.length; j++) {
                selObj = Objs[j];
                var cstxt = selObj.style.cssText.split(";");
                var Flag = 0;
                for (var i = 0; i < cstxt.length - 1; i++) {
                    
                    var LeftStyle = cstxt[i].split(":")[0];
                    var RightStyle = cstxt[i].split(":")[1];

                    if (LeftStyle.toLowerCase().trim() == val.toLowerCase().trim()) {
                        Flag = 1;
                        cstxt[i] = ""; // val + ": " + Alt;
                    }
                }
                var NewStyle = "";
                if (Flag == 0) { NewStyle = val + ":" + Obj + ";"; }
                var style = cstxt.join(";") + NewStyle;
                
                selObj.setAttribute("style", style);
            
            }
        }




//----------------------------------Resize-----------------------------


var ReizeObj;
var GTableResizeOn = 0;

function fAddResizeTable(Obj) {
    var Tabs = Obj;
    fResizeColumnGrid(Tabs);
    //fResizeRowGrid(Tabs);
}





function fResizeColumnGrid(e) {
    var t = e.getElementsByTagName("tr")[0],
        n = t ? t.children : void 0;

     if (n) {
        e.style.overflow = "hidden";
        var i = e.offsetHeight;
        for (var o = 0; o < n.length; o++) {
            var r = CreateResizeDiv(i);
            //console.log(r);
            n[o].appendChild(r), n[o].style.position = "relative";
            AddDivEvents(r);
        }
    }
}

function fResizeRowGrid(e) {
        
    var c = e.getElementsByTagName("th")[0];
    var i = e.offsetWidth;
    e.style.overflow = "hidden";
    for (var r = 0; r < e.rows.length; r++) {

        var rw = e.rows[r].cells[0];
        var dv = CreateResizeRowDiv(i);
        rw.appendChild(dv),
            rw.style.position = "relative";

    }
    AddResizeRowEvents(e);
}


/* creating Column Div */

function CreateResizeDiv(e) {
    var t = document.createElement("div");
    return t.style.top = 0, t.style.right = 0, t.style.width = "5px",   t.style.position = "absolute",  t.style.cursor = "col-resize",t.style.border = "0px solid #FF0066", t.style.userSelect = "none",    t.className = "columnSelector", t.contentEditable = false,  t.style.height = "50px", t

}

/* creating Row Div */
function CreateResizeRowDiv(e) {
    var t = document.createElement("div");
    return t.style.bottom = 0, t.style.left = 0, t.style.height = "2px",    t.style.position = "absolute",  t.style.cursor = "row-resize",  t.style.border = "0px solid #FF0066",   t.style.userSelect = "none",        t.className = "columnSelector",        t.contentEditable = false,         t.style.width = e + "px", t
}


/* Create Column Events --------------------*/
function AddDivEvents(e) {

    var t, n, i, o, r;
    e.addEventListener("mousedown", function (e) {   n = e.target.parentElement,i = n.nextElementSibling,t = e.pageX;    var d = 0;   o = n.offsetWidth;  i && (r = i.offsetWidth - d);   GTableResizeOn = 1;   }),
    document.addEventListener("mousemove", function (e) {    if (n) { var d = e.pageX - t;    i && (i.style.width = r - d + "px");    n.style.width = o + d + "px";   }  });
    e.addEventListener("mouseover", function (e) { e.target.style.borderRight = '2px solid #0000ff'; GTableResizeOn = 1; });
    e.addEventListener("mouseout", function (e) { e.target.style.borderRight = ''; GTableResizeOn = 0; });
    document.addEventListener("mouseup", function (e) { n = void 0, i = void 0,t = void 0,r = void 0,o = void 0,GTableResizeOn = 0; })

}

/* Create Row Events --------------------*/
function AddResizeRowEvents(e) {
    var t, n, i, o, r;
    e.addEventListener("mousedown",function (e) {   n = e.target.parentElement.parentElement,    i = n.nextElementSibling,t = e.pageY;  var d = 0;   o = n.offsetHeight; i && (r = i.offsetHeight - d);  GTableResizeOn = 1;});
    document.addEventListener("mousemove", function (e) { if (n) {    var d = e.pageY - t;    n.style.height = o + d + "px";    }   });
    document.addEventListener("mouseup", function (e) { n = void 0, i = void 0, t = void 0, r = void 0,o = void 0,  GTableResizeOn = 0; });

}

function l(e, t) {
    return window.getComputedStyle(e, null).getPropertyValue(t);
}




         









