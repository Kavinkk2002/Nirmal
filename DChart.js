console.log("DChart!");


function fBuildChart(LGT, CType, XDataFld, YDataFld, LayerName) {
    var xArray = []; var yArray = []; var GT = LGT.split("!!");
    var HeadSp = GT[0].split("~"); var yflds = YDataFld.split("~");

    for (var i = 1; i < GT.length - 1; i++) { yArray[i - 1] = ""; }
    try {
        for (var i = 1; i < GT.length - 1; i++) {
            var sp = GT[i].split("~");

            for (var k = 0; k < HeadSp.length; k++) {
                if (HeadSp[k] == XDataFld)
                    xArray[i - 1] = sp[k];
                else {
                    var m = 0;

                    while (m < yflds.length) {
                        if (HeadSp[k] == yflds[m])
                            yArray[i - 1] = yArray[i - 1] + sp[k] + "~";
                        m++;
                    }

                }
            }
        }
    }
    catch (e) { }
    fChart(CType, xArray, YDataFld, yArray, LayerName);
}

//var borderColors = ["red", "blue", "yellow", "orange", "#FF33FF","#FF33FF"];
//var background = ["red", "blue", "yellow", "orange", "#FF33FF","#FF33FF"];

var borderColors = ["red", "blue", "yellow", "orange", "#FF33FF", "#D2691E", "#008B8B", "#006400", "#8B008B", "#FF1493", "#4B0082", "#9932CC", "#8FBC8F",
		'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];



var background = ["red", "blue", "yellow", "orange", "#FF33FF", "#D2691E", "#008B8B", "#006400", "#8B008B", "#FF1493", "#4B0082", "#9932CC", "#8FBC8F",
		'#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
		  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
		  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
		  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
		  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
		  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
		  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
		  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
		  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
		  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];


function fChart(CType, xArray, YDataFld, yArray, LayerName) {
    var ctx = document.getElementById('Chart_' + LayerName);


    //ctx.clearRect(0, 0, 100, 50);

    var DSets = [];

    var val = yArray[0].split("~");
    var yHeader = YDataFld.split("~");

    if (yHeader.length > 1 || CType == "line" || CType == "bar") {
        for (var i = 0; i < yHeader.length; i++) {
            var vals = []; for (var j = 0; j < yArray.length; j++) { vals[j] = yArray[j].split("~")[i]; }   //Data : [1,2,3,4]
            DSets.push({ "label": yHeader[i], borderColor: borderColors[i], backgroundColor: background[i], data: vals, borderWidth: 1 });
        }
    }

    else if (yHeader.length = 1) {
        var backColor = [];
        var vals = []; for (var j = 0; j < yArray.length; j++) {
            vals[j] = yArray[j].split("~")[0];
            backColor[j] = background[j];
        }   //Data : [1,2,3,4]

        DSets.push({ "label": yHeader[0], backgroundColor: backColor, data: vals, borderWidth: 1 });

        //alert(2);
    }

    //  alert(DSets);
    var options = {
        maintainAspectRatio: true,
        animateRotate: true,

        scales: {
            y: {
                grid: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            },
            x: {
                grid: {
                    display: true,
                    color: "rgba(255,99,132,0.2)"
                }
            }
        }
    };

    var chart = new Chart(ctx, {
        type: CType,
        data: {
            labels: xArray,
            datasets: DSets
        },
        options: options

    });



}


function fSlide(Obj, Objval, Objval1) {
    var Obj1 = document.getElementById(Objval);
    var Obj2 = document.getElementById(Objval1);

    //Slidevalue.innerHTML = Slide1.value
    //form1.tSlide.value = Obj.value;
    var timestamp = Obj.value;
    // 2
    var hours = Math.floor(timestamp / 60);
    var minutes = Math.floor(timestamp) - (hours * 60);
    var Type = "AM"; var color = "lime"; // Obj2.className="DBoxW DAM";

    if (timestamp >= 720) {
        if (hours > 12 && hours < 24) {
            hours = hours - 12;
            Type = "PM";
            color = "yellow";
            // Obj2.className = "DBoxW DPM";
        }
        else if (hours >= 24 && hours <= 34) {
            hours = hours - 24;
            Type = "AM";
            color = "red";
            //Obj2.className = "DBoxW";
        }

    }

    var DHours = String(hours); if (DHours.length == 1) { DHours = "0" + DHours; }
    var DMinutes = String(minutes); if (DMinutes.length == 1) { DMinutes = "0" + DMinutes; }

    Obj1.innerHTML = "<font size=2px color=" + color + " >" + DHours + " : " + DMinutes + " " + Type + "</font>";

}




function addData() {
    var ctx = document.getElementById('myChart').getContext('2d');

}

function fGetHMS(timestamp) {
    var hours = Math.floor(timestamp / 60);
    var minutes = Math.floor(timestamp) - (hours * 60);
    if (timestamp >= 720) {
        if (hours > 12 && hours < 24) {
            hours = hours - 12;
            Type = "PM";
            color = "yellow";
            // Obj2.className = "DBoxW DPM";
        }
        else if (hours >= 24 && hours <= 34) {
            hours = hours - 24;
            Type = "AM";
            color = "red";
            //Obj2.className = "DBoxW";
        }

    }

    var DHours = String(hours); if (DHours.length == 1) { DHours = "0" + DHours; }
    var DMinutes = String(minutes); if (DMinutes.length == 1) { DMinutes = "0" + DMinutes; }
    return DHours + " : " + DMinutes;
}










/*var SHr = 6; 
var EHr = SHr + 24;
                
// Range :30                        //360- 390      //390-                      //HR 360/60     //6;00 : 6:30

                
var r = 1; var hours = 0; var Ehours = 0;
var Type = "AM"; var color = "lime";
var SType = "AM"; var Scolor = "lime";
                
for (var Hr = SHr; Hr <= EHr; Hr++) {
hours = Hr; Ehours = Hr + 1;

var RangeFrm = Hr * 60;
if (hours > 12 && hours < 24) { hours = hours - 12; Type = "PM"; color = "yellow"; }
else if (hours >= 24 && hours <= 34) { hours = hours - 24; Type = "AM"; color = "red"; }

if (Ehours > 12 && Ehours < 24) { Ehours = Ehours - 12; SType = "PM"; Scolor = "yellow"; }
else if (Ehours >= 24 && Ehours <= 34) { Ehours = Ehours - 24; SType = "AM"; Scolor = "red"; }

var Tr = Tab.insertRow(r); var x = Tr.insertCell(0);
x.innerHTML = hours  + " To " + Ehours  + "<input type=hidden value=" + RangeFrm + ">"; x.className = "DContent"; x.style.color = color;

for (var j = 1; j < ColName.length - 1; j++) {
var x = Tr.insertCell(j); //x.innerHTML = Vals[i];
x.className = "DContent"; //x.align = Aligns[i];
x.style.color = color;
x.align = "center";
}
r++;
}  */

