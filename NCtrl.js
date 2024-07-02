console.log("NCtrl!");

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
                        divObj.style.display="none";
					    Objct.focus();
					}



					if (ent1 == 3) {
                        
					    var res = FileObj.getDropData(hiddenObj, icase, isplit, upd, sp, RCond);
					    fnResData(res);
					}
					else if (ent1 == 4) {
					    if (Objct.value == "") {
					        alert("enter alteast 2 Letters to Search");
					        divObj.style.display = "none";
					        Objct.focus();
					        return false;

					    }
					}

					else if (window.event.keyCode == 13) {
					    if (ent1 == 1) {
					        if (Obj.value != "") {
					            dropdownlist.GetData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData);
					        }
					    }
					    else if (ent1 == 0) {
					        dropdownlist.GetData(hiddenObj, icase, isplit, upd, sp, RCond, fnResData);
					    }
					    else if (ent1 == 2) {
					        var res = FileObj.getDropData(hiddenObj, icase, isplit, upd, sp, RCond);
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

			//if (objTop > 400) objTop = 200;
            
            divObj.style.top=objTop+20;
			divObj.style.display="";
		}





function fnChk0(TTObj){			
			if(TTObj.value==""){			
				TTObj.value=0;
			}
		}

function fnSaveMasters(Objtxt,icase){
			
			webs.useService("dtctrl.asmx?WSDL","Grm")	
			webs.Grm.callService(fnResData,"GetDataText",icase,Objtxt);
		
		//alert(txts.substring(0,txts.length-1));
		//alert(substring(txts,0,txts.length-1));
	}


function fnUpdateMasters(Objtxt0,Objtxt1,icase){
	webs.useService("dtctrl.asmx?WSDL","Grm")	
			webs.Grm.callService(fnResData,"UpdateText",icase,Objtxt1,Objtxt0);
}

/*
function fnFillBuyer(Obj){
				if(window.event.keyCode==13){
					Objt=Obj;
					if(frmGrm.txtBuyer.value!="")
						webs.Grm.callService(fnResBuyer,"GetBuyer",frmGrm.txtBuyer.value);
				}			
		}
		function fnResBuyer(Obj){
			lbldata.innerHTML=Obj.value;		
			divData.style.left=Objt.parentNode.parentNode.offsetLeft+20;
			divData.style.top=Objt.parentNode.parentNode.offsetTop+60;
			divData.style.display="";		
		}
		*/
		
		
		
		

function fnCal(Obj1,Obj2,Obj3){
			var objleft=Obj1.offsetLeft;
			 var objTop=Obj1.offsetTop;			 
			 var Objparent=Obj1.offsetParent;		 			 
			 while(Objparent.tagName != "BODY"){					
				  objleft += Objparent.offsetLeft;
				    objTop += Objparent.offsetTop;
				   try {Objparent = Objparent.offsetParent} catch(e1){alert(e1);}				   
			 }
			Obj2.style.left=objleft;
			Obj2.style.top=objTop;
			Obj2.style.display="";
			Obj3.focus();
}

function fnMoveVal(ResObj,Obj1,val1,val2,Obj2){
	if(window.event.keyCode==13){
		ResObj.value = val1 + "-" + val2 + "-" + Obj1.value;
		Obj2.style.display="none";
	}
}
function fnHideCal(Obj1){
	if(window.event.keyCode==27)
		Obj1.style.display="none";
}

function CV(SObj,msgObj,msgg){
	if(SObj.value==""){
		msgObj.innerText=msgg;
		SObj.focus();
		return false;
	}
	else 
		return true;



}


var tableToExcel = (function () {
    var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function (s, c) { return s.replace(/{(\w+)}/g, function (m, p) { return c[p]; }) }
    return function (table, name) {
        if (!table.nodeType) table = document.getElementById(table)
        var ctx = { worksheet: name || 'Worksheet', table: table.innerHTML }
        window.location.href = uri + base64(format(template, ctx))
    }
})()
