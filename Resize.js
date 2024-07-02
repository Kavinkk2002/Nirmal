
var ReizeObj;
var GTableResizeOn = 0;

function fAddResizeTable(Obj) {
    var Tabs = Obj;
    fResizeColumnGrid(Tabs);
    //fResizeRowGrid(Tabs);
}

function fAddResize() {
 //   var Tabs = document.querySelectorAll('.DGridTable');
   // for (var k = 0; k < Tabs.length; k++) {
     //   fResizeColumnGrid(Tabs[k]);
    //    fResizeRowGrid(Tabs[k]);
        
    //}
}



function fResizeColumnGrid(e) {

    var t = e.getElementsByTagName("tr")[0],
        n = t ? t.children : void 0;

    //console.log("Column length:" + n);

    if (n) {
   //     e.style.overflow = "hidden";
        var i = e.offsetHeight;
        for (var o = 0; o < n.length; o++) {
            var r = CreateResizeDiv(i);
            //console.log(r);
            n[o].appendChild(r);
              n[o].style.position = "relative";

              //n[o].setAttribute("style", " top: 0;left:0;position: sticky;");
              n[o].style.position = "sticky";
              //n[o].style.top = "stoick";


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
    return t.style.top = 0, t.style.right = 0,
         t.style.width = "5px",
         t.style.position = "absolute",
         t.style.cursor = "col-resize",
         t.style.border = "0px solid #FF0066",
         t.style.userSelect = "none",
         t.className = "columnSelector",
         t.contentEditable = false,
         t.style.height = "50px", t

}

/* creating Row Div */


function CreateResizeRowDiv(e) {

    var t = document.createElement("div");

    return t.style.bottom = 0, t.style.left = 0,
         t.style.height = "2px",
         t.style.position = "absolute",
         t.style.cursor = "row-resize",
         t.style.border = "0px solid #FF0066",
         t.style.userSelect = "none",
        t.className = "columnSelector",
        t.contentEditable = false,
         t.style.width = e + "px", t

}

/* Create Column Events --------------------*/



function AddDivEvents(e) {

    var t, n, i, o, r;
    e.addEventListener("mousedown",
           function (e) {
               //lMousePosition.innerHTML = " On Table Resize  Mouse Down:";

               //console.log(" On Table Resize  Mouse Down:");

               n = e.target.parentElement,
                i = n.nextElementSibling,
                t = e.pageX;

               var d = 0;
               o = n.offsetWidth;
               i && (r = i.offsetWidth - d);
               GTableResizeOn = 1;

           }),


            document.addEventListener("mousemove", function (e) {
                if (n) {
                    //lMousePosition.innerHTML = " On Table Resize  Mouse <color='red'> Move:, Offset Width:" + o + " <br><br><br>";
                    //console.log(" On Table Resize  Mouse Move:");


                    var d = e.pageX - t;

                    i && (i.style.width = r - d + "px");

                    //lMousePosition.innerHTML += " D:" + d + " <br><br><br>";

                    n.style.width = o + d + "px";


                    //lMousePosition.innerHTML += " nWidth:" + n.style.width;




                }
            });


    e.addEventListener("mouseover", function (e) { e.target.style.borderRight = '2px solid #0000ff'; GTableResizeOn = 1; });

    e.addEventListener("mouseout", function (e) { e.target.style.borderRight = ''; GTableResizeOn = 0; });

    document.addEventListener("mouseup", function (e) {
        n = void 0,
                i = void 0,
                t = void 0,
                r = void 0,
                o = void 0,
                GTableResizeOn = 0;
        // fAddSampleResize();
    })

}



/* Create Row Events --------------------*/

function AddResizeRowEvents(e) {
    var t, n, i, o, r;
    e.addEventListener("mousedown",
           function (e) {

               n = e.target.parentElement.parentElement,
                 i = n.nextElementSibling,
                  t = e.pageY;

               var d = 0;
               o = n.offsetHeight;
               i && (r = i.offsetHeight - d);
               GTableResizeOn = 1;


           });

    document.addEventListener("mousemove", function (e) {
        if (n) {
            var d = e.pageY - t;
            //i && (i.style.width = r - d + "px"), 

            n.style.height = o + d + "px";

        }
    });


    //    e.addEventListener("mouseover", function (e) { e.target.style.borderTop = '2px solid #0000ff'; GTableResizeOn = 1; });

    //  e.addEventListener("mouseout", function (e) { e.target.style.borderTop = ''; GTableResizeOn = 0; });


    document.addEventListener("mouseup", function (e) {
        n = void 0,
                i = void 0,
                t = void 0,
                r = void 0,
                o = void 0,
                GTableResizeOn = 0;
    })


}




function l(e, t) {
    return window.getComputedStyle(e, null).getPropertyValue(t);
}




         