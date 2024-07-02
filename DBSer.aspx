<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="DBSer.aspx.cs" Inherits="Masters.DBSer" ClassName="DBSer" %>

<html >
<head runat="server">
    <title></title>
    
    <script language="javascript" src="LoadMB.js?n=41"></script> 
    <script language="javascript" src="CalMob.js"></script>
     <script language="javascript" src="Common.js?n=50"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

  
        <script language="javascript">

            function fQry(Qry) {

                var ResVal;
                try {
               
                    var Res = DBSer.GetLists(Qry);
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
                    var Res = DBSer.GetDocs(Qry);
                    ResVal = Res.value;

                }
                catch (e) {
                    //alert(Qry);
                    alert(e)
                    ResVal = e;
                }
                return ResVal;
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


        function fSaveCmd(Qry) {
                

             var res = DBSer.saveRec(Qry);
             return res.value;
         }

         function fSaveCom(Qry) {
             var res = DBSer.saveCommon(Qry);
             return res.value;
         }

         function fSaveProc(Qry) {
             var res = DBSer.saveProc(Qry);
             return res.value;
         }

         function fSaveCmds(Qry) {
             var res = DBSer.SaveRecs(Qry);
             return res.value;
         }

         function fGetVal(Qry) {
             var res = DBSer.GIntVal(Qry);
             return res.value;
         }

         function fGetString(Qry) {
             var res = DBSer.GStringVal(Qry);
             return res.value;
         }

         function getDropData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData) {

             var res = DBSer.GetData(hiddenObj, icase, isplit, upd, sp, RCond);
             return res;

         }

         function fReloadData() {
             var Flt = "";
             if (window.parent.selBranch && window.parent.selBranch.value > 0) Flt += ' and ev.nBranch_id=' + window.parent.selBranch.value;
             if (window.parent.selDept && window.parent.selDept.value > 0) Flt += ' and ev.nDept_id=' + window.parent.selDept.value;
             var srch = window.parent.tsearch.value;
             if (srch != "" && srch != "Search") Flt = Flt + "  and (cast(ev.nEmpno as varchar) like ''" + srch + "%'' or ev.vname like ''%" + srch + "%'') ";
            var Prms="";
            Prms = "@YR=" + window.parent.selYear.value + ",@Month=" + window.parent.selMonth.value + ",@DF='" + fymd(window.parent.tFrm.value) + "',@DT='" + fymd(window.parent.tTo.value) + "'";
            idFrame.contentWindow.List(Flt, Prms);
        }


         </script>

</head>
<body>
    <form id="form1" runat="server">
        <table border="0" style="width: 100%;height:100%;">

            <tr style=" display:none; height: 5%;">
                <td align="right">
                    
                    
                    <input type="button" value="Header" onclick="fFormHdr();">  
                    <input type="button" value="Menus Alloc" onclick="fOpenPage('MenuAlloc');">  

                    <input type="button" value="Accounts Report" onclick="fOpenPage('AccountsRpt');">  


                    <input type="button" value="Sample Report" onclick="fOpenPage('RTreeRpt');">  

                    <input type="button" value="Credit Note" onclick="fOpenPage('CreditNote');">  



                    <input type="button" value="print" onclick="fPrint();">  
                    <input type="button" value="Export Excel" onclick="fExcel();">  
                    MainPage [server]

                </td>

            </tr>
            <tr style="height:95%;">
                <td>
                    <iframe id=idFrame class="Frames" src="DBSer.aspx" frameborder=no scrolling=yes marginheight=0 marginwidth=0 style='height:100%;width:100%'></iframe>
                </td>
            </tr>
     
        </table>

        <script language="javascript">

        var queryString = window.location.search;
            var urlParams = new URLSearchParams(queryString);
            var PageType = urlParams.get("Page");
            var Formid = urlParams.get("Formid");
            var Empid = urlParams.get("Empid");
            
            var qs="";
          

            if(PageType) qs= PageType + ".htm";
     
            idFrame.src = qs;
 
            
          //  window.parent.LoadDisable();
    
            function fOpenPage(PageName){
                idFrame.src = PageName +".htm";
             }
    
             
             function fExcel(){
                
    idFrame.contentWindow.ExportToExcel(null,"Sample");
               

             }
function fPrint(){
 //   alert(idFrame.contentWindow.dMain);//.print();
   //idFrame.contentWindow.generatePDF();
   idFrame.contentWindow.dSource.print();
   
}

function fFormHdr(){
    idFrame.contentWindow.fHdr();

}


    LoadDisable();
            //window.parent.fLoadParams();
        </script>
        
    </form>
</body>
</html>
