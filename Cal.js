


//f("DChart.js");
//f("Chart.js");
//f("Drag.js");
//f("NCtrl.js");
//f("exportToExcel.js");

/*

(function () {
    // Create the request and the script

    var s = document.createElement('script');

    // Send the request to retrieve custom.js
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'DBox.js', false);
    xhr.send();

    // Listen for onload, and remove the script after execution
    s.addEventListener("load", function (e) {
        s.parentElement.removeChild(s);
    });

    // Load the code inside the script and run it in the head
    s.textContent = xhr.responseText;

    document.head.appendChild(s);
})();

*/

                
                //loadJS("DBox.js?n="+ n,true);

                //loadJS("common.js?n="+ n ,false);
               
                //loadJS("cfunctions.js?n="+ n,true);
                //loadJS("dScript.js?n="+ n ,true);
                //loadJS("DChart.js?n="+ n,true);
                //loadJS("Chart.js?n="+ n ,true);
                //loadJS("Drag.js?n="+ n ,true);
                //loadJS("NCtrl.js?n="+ n,true);
                //loadJS("exportToExcel.js?n="+ n ,true);
                
                //loadJS("https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.5.1/chart.min.js",true);


    
    	var disp=0;
		var j=0;
		var right_now=new Date();
		var month_num = right_now.getMonth();
		j=month_num;
		var right_year=right_now.getYear();
		var lbObj="";
		var divObj="";
		var thObj="";
		var gCDate;
		function GD(thObj1, lbObj1, divObj1) {

			 	
		    var objleft = thObj1.offsetLeft;
		  
			var objTop=thObj1.offsetTop;	
			
			 
            var Objparent=thObj1.offsetParent;
			while(Objparent.tagName != "BODY"){
				  objleft += Objparent.offsetLeft;
				    objTop += Objparent.offsetTop;
				   try {Objparent = Objparent.offsetParent} catch(e1){alert(e1);}				   
			 }
				thObj=thObj1;
				lbObj=lbObj1;
				divObj=divObj1;
				divObj.style.left = objleft + 70;
				
             
				if(parseInt(divObj.style.left)>600){					
					divObj.style.left=600
				}
					
				if(parseInt(objTop)>400)
					objTop=400;

				divObj.style.top=objTop+15;

			 
	     		divObj.style.width="200"
			 
			fnGDate(0);
				
		/*	with(Form1){
			try{
				eval("tDO" + gCDate).parentNode.className="shdr";
				eval("tDO" + gCDate).focus(); 
			}
			catch(e){
			
			}
			}*/
			
		}
		function fCheckDivs(){
			if(window.event.keyCode=="27"){
					divObj.style.display="none";
			}
		}
		
		function fnGetDate(txt,tdObj,dayy){			
			
								
			if(window.event.keyCode==13){				
				fnDate(tdObj);
			}
			
		}
		
		
		function fnfoc(Obj,dayy){							
		
			if(window.event.keyCode==40){
					dayy=dayy+7;
			}
			else if(window.event.keyCode==38){
					dayy=dayy-7;					
			}
			else if(window.event.keyCode==39){
					dayy++;					
			}
			else if(window.event.keyCode==37){
					dayy--;					
			}
			/*try
			{
				with(Form1){
					eval("tDO" + dayy).focus();
				}
			}
			catch(e){
			
			}*/
					
		}		
		
		
		function fnCloseDv(){
		
						divObj.style.display="none";
		}
		function fnGDate(mnflg){			
			if(mnflg==0){
					if(divObj.style.display=="")					
						divObj.style.display="none";
					else
						divObj.style.display="";
				/*	if(disp==0){			
						divObj.style.display="";			
						disp=1;
					}
					else{
						divObj.style.display="none";
						disp=0;
					}
				*/
			}
			
			var strr="";
			/*if(mnflg==1)
				j=j-1;
			if(mnflg==2)
				j=j+1;		*/
			
			/*if(mnflg==3)
				right_year--;
			if(mnflg==4)
				right_year++;
			*/				
			/*if(j>11){
				right_year++;
				j=0;
			}
			if(j<0){
				right_year--;
				j=11;
			 }*/
				
		//month_num=j;		
//			alert(month_num);.
			
			
			
			var thedate=right_now.getDate()			
			gCDate=thedate;
			
			
			var month_name = new Array ("January ","February ","March ","April ","May ","June ","July ","August ","September ","October ","November ","December ");			
			if (right_year < 1900) 
				right_year = right_year + 1900; 				
			var theday = 0;
			if (month_num == 0 || month_num == 2 || month_num == 4 || month_num == 6 || month_num == 7 || month_num == 9 || month_num == 11)
				endofmonth=31;
			if (month_num == 3 || month_num == 5 || month_num == 8 || month_num == 10)
				endofmonth=30;

			if (month_num == 1){
				right_year_divided=right_year/4;
				right_year_divided_string= new String(right_year_divided);
				var is_decimal = right_year_divided_string.indexOf('.');
				if (is_decimal != -1)
				{ endofmonth=28; }
				else
				{ endofmonth=29; }

				right_year_string= new String(right_year);
				var the_century=new String(right_year_string.charAt(2)) 
				the_century= the_century + new String(right_year_string.charAt(3));
				if (the_century == "00"){
					right_year_divided=right_year/400;
					right_year_divided_string= new String(right_year_divided);
					var is_decimal = right_year_divided_string.indexOf('.');
					if (is_decimal != -1)
						{endofmonth=28;}
					else
						{endofmonth=29;}
		}
	}

	// Start building the table
strr += "<table border=0 class=RCal cellspacing=1 align=center width=100%>";
strr += "<tr height=20px><td colspan=6 align=center class=DContent style='cursor:hand'>CALENDER</td><td  class=CellHeader style='Cursor:hand;' align=center onclick='fnCloseDv();'>X</td></tr>";
	strr += "<tr height=20px><td colspan=7 align=center class=DContent style='cursor:hand'><label id=yrback  style='Cusrsor:hand' _onclick='fnGDate(3)'>";
	// Place a caption with the month name and year
//	strr += month_name[month_num];
	//strr += right_year;
	strr += "</label><label id=yrFrnt style='Cusrsor:hand' _onclick=fnGDate(4)>"+ MonthCombo() + "-"+  YearCombo()  +"</label>&nbsp;&nbsp;</td></tr>";
	

	// Write the table header row
	strr += "<tr class=DFldHead><th>S</th><th>M</th><th>T</th><th>W</th>";
	strr += "<th>T</th><th>F</th><th>S</th></tr><tr class=DFldHead>";
	first_day = new Date(right_year,month_num,1)
	for (counter = 0; counter < 7; counter++){ 
	if (counter >= first_day.getDay() ){
		theday=theday+1;
		if (theday == thedate)
		{ strr += "<td id=td" + theday + "  onclick='fnDate(this);' class='DContent' style='cursor:hand'><input type=text  style='width:0%;display:none;' onkeyup='fnfoc(this," + theday + ");'  onkeypress='fnGetDate(this,this.parentNode," + theday + ");' onblur='fngetOut(this);' onfocus='fnGetInn(this);' id=tDO" + theday + "><b>" + theday + "</b></td>"; }
		else
		{ strr += "<td id=td" + theday + " onclick='fnDate(this);'  class='DContent' style='cursor:hand'><input type=text  style='width:0%;display:none;' onkeyup='fnfoc(this," + theday + ");' id=tDO" + theday + "  onkeypress='fnGetDate(this,this.parentNode," + theday + ");'  onblur='fngetOut(this);' onfocus='fnGetInn(this);'>" + theday + "</td>"; }
	}
else { strr += "<td class='DContent'></td>"; }
}
strr += "</tr>";

for (weeks = 0; weeks < 5; weeks++)
{
    strr += "<tr >"; 
	for (week = 0; week < 7; week++){
	theday=theday+1
	if (theday == thedate)
	{ strr += "<td class='DContent' style='cursor:hand' id=td" + theday + " onclick='fnDate(this);'><input type=text  style='width:0%;display:none;' onkeyup='fnfoc(this," + theday + ");' onkeypress='fnGetDate(this,this.parentNode," + theday + ");' onblur='fngetOut(this);' onfocus='fnGetInn(this);' id=tDO" + theday + "><b>" + theday + "</b></td>"; }
	else 
	{ 
		if (theday > endofmonth)
		{ strr += "<td class='DContent'>&nbsp;</td>"; }
		else
		{ strr += "<td  class='DContent' style='cursor:hand' id=td" + theday + " onclick='fnDate(this);'><input type=text width=0%  style='width:0%;display:none;' onkeyup='fnfoc(this," + theday + ");' onkeypress='fnGetDate(this,this.parentNode," + theday + ");' onblur='fngetOut(this);' onfocus='fnGetInn(this);' id=tDO" + theday + ">" + theday + "</td>"; }
	}
}
	strr += "</tr>";
}
strr += "<tr align=center style='display:none;'><td colspan=5 class='DContent'>&nbsp;</td><td onclick=fnGDate(1); style='cursor:hand' class=tdWhite>"
+"<input class='btnSmall' id='bPreviousM' accessKey='P' onclick='fnGDate(1)' type='button' value='<' name='bPreviousM'></td>"
+ "<td style='cursor:hand' onclick=fnGDate(2); class=DContent><input class='btnSmall' id='bNextM' accessKey='N' onclick='fnGDate(2)' type='button' value='>' name='bNextM'></td></tr>";
	strr += "</table>";
	lbObj.innerHTML =strr;	
}
/*function fnDate(Obj){
//alert(month_num);
month_num++;
if(Obj.innerText.length==1)
Obj.innerText = "0" + Obj.innerText;
if(String(month_num).length==1)
month_num= "0" + String(month_num);		
thObj.value=Obj.innerText + "-" + month_num + "-" + right_year ;
divObj.style.display="none";
month_num--;
}*/

function fnDate(Obj) {
    //alert(month_num);
    month_num++;
    var DDay = "";
    var Daylen = String(parseInt(Obj.innerText))
    DDay = String(parseInt(Obj.innerText));
    if (Daylen.length < 2)
        DDay = "0" + String(parseInt(Obj.innerText));
    if (String(month_num).length == 1)
        month_num = "0" + String(month_num);
    thObj.value = DDay + "-" + month_num + "-" + right_year;
    divObj.style.display = "none";
    month_num--;
}
/*

	function gDay(){

	var day_name=new Array(7);
	day_name[0]="Sunday"
	day_name[1]="Monday"
	day_name[2]="Tuesday"
	day_name[3]="Wednesday"
	day_name[4]="Thursday"
	day_name[5]="Friday"
	day_name[6]="Saturday"

	return day_name[my_day.getDay()];
	}


}*/








function fnTimeTex(Obj){	
	//if(window.event.keyCode<48 && window.event.keyCode>58)
	if(window.event.keyCode<48 || window.event.keyCode>58){
		Obj.value=Obj.value.substring(0,Obj.value.length-1)
		return false;
	}
	if(Obj.value.length>8 || window.event.keyCode==8){
		Obj.value= Obj.value.substring(0,Obj.value.length-1)
		return false;
	}
	if(Obj.value.length==2 || Obj.value.length==5){
		Obj.value +=  ":"
	}
	if(Obj.value.length==3){
		var st=Obj.value.substring(0,Obj.value.length-1)
			if(st>24){
			Obj.value="";
			return false;
			}
			else if(st==24){
				Obj.value +="00:00";
			}
	}
	
	
	if(Obj.value.length==6){
			var st=Obj.value.substring(3,Obj.value.length-1)
			if(st>59){	
				Obj.value=Obj.value.substring(0,3)
				return false;
			}
	}	

	if(Obj.value.length==7){
		var st=Obj.value.substring(6,Obj.value.length)
		if(st==6){
			Obj.value=Obj.value.substring(0,Obj.value.length-1)
			//Obj.value +="0";
			return false;
		}
		
	}

	


}



function IsEmpty(Obj,val){
		if(Obj.value=="")
			return val;			
		else
			return Obj.value;
		
	} 



function get_round(X) { return Math.round(X*100)/100 }

function CYear(i){
	right_year=i.value;
	//alert(right_year);
	fnGDate(4);
}

function CMonth(i){
	month_num=i.value;
	//alert(month_num);
	fnGDate(2);
}

function YearCombo(){
    var st = "<select id=cboyr class=txtDropsize name=cboyr onchange='CYear(this);'>"
		for(var i=1920;i<=2050;i++){
			if(right_year==i)
				st += "<option value="+ i +" selected>"+ i + "</option>"
			else
				st += "<option value="+ i +">"+ i + "</option>"
		}
		st +="</select>";
		return st;
}

function MonthCombo(){
//		alert(month_num);
		var mm = new Array ("January ","February ","March ","April ","May ","June ","July ","August ","September ","October ","November ","December ");
		var st = "<select id=cboyr class=txtDropsize name=cboyr onchange='CMonth(this);'>"
		for(var i=0;i<=11;i++){
			if(i==month_num)
				st += "<option value="+ (i) +" selected>"+ mm[i] + "</option>"
			else
				st += "<option value="+ (i) +">"+ mm[i] + "</option>"			
		}
		st +="</select>";
		return st;
}


function fHourCombo(RObj,Header) {
    RObj.length = 0;
    RObj.options[0] = new Option(Header, 0);

    for (var i = 1; i <= 24; i++) {
        var k = "";
        if (i < 10)
            k = "0" + String(i);
        else
            k = String(i);
        RObj.options[i] = new Option(k, k);
    }
}

function fMinuteCombo(RObj, Header) {
    RObj.length = 0;
 //   RObj.options[0] = new Option(Header, 0);

    for (var i = 0; i <= 60; i++) {
        var k = "";
        if (i < 10)
            k = "0" + String(i);
        else
            k = String(i);
        RObj.options[i] = new Option(k, k);
    }
}



function fnCalHrs(fh, fm, th, tm, thrs) {
    var hr;
    var mn
    if (parseInt(fh) > parseInt(th)) {
        th = parseInt(th) + 24;
        thrs.value = get_round(parseFloat((((th * 60) + parseInt(tm)) - ((fh * 60) + parseInt(fm))) / 60));
    }
    else {
        thrs.value = get_round(parseFloat((((th * 60) + parseInt(tm)) - ((fh * 60) + parseInt(fm))) / 60));
    }
}


function fDatedmy(today) {

    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}


function fymd(today) {  
    var dd=today.substring(6,10) + '-' + today.substring(3,5) + '-' + today.substring(0,2) ;
    return (today.substring(6, 10) + '-' + today.substring(3, 5) + '-' + today.substring(0, 2)).trim() ;
}


        
function fgetMonth(today) {  
    return today.substring(3,5);
    
}


function fgetYear(today) {  
    return today.substring(6,10);
 
}

function fgetDay(today) {  
    return today.substring(0,2);
  
}
function fToday(){
		var date = new  Date();
		var day = date.getDate().toString();
		var mm = (date.getMonth() + 1).toString();
		var year = date.getFullYear();

			
		if(day.length==1)
					day="0" + day;
	
		if( mm.length==1)
				mm="0" + mm;
		
	var today= day + '-' +mm +  '-' + year;

		return today;

}

function fGetDate(Obj) {
    var y = parseInt(selYr.value);
    var m = parseInt(selMonths.value);
  
    var firstDay = new Date(y, m-1, 1);

    var lastDay = new Date(y, m, 0);
    tFrm.value = fDatedmy(firstDay);
	 
    tTo.value = fDatedmy(lastDay);
}




var date = new Date();
date.setDate(date.getDate() - 1);
var willCookie = '';
willCookie += 'CookieName=Value';
willCookie += 'expires' + date.toUTCString();
document.cookie = willCookie;


