
 
 /*
 if(window.parent.GThemes)
    Themes=window.parent.GThemes;
 else
    Themes=GThemes;

        alert(Themes);
   */ 

        function fcss(PageName) {

            var head = document.getElementsByTagName('HEAD')[0];
        
            // Create new link Element
            var link = document.createElement('link');
            // set the attributes for link element
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = 'WMob.css'; 
            /*
            switch(Themes){
               case 1:  link.href = 'GR.css'; break;
               case 2:  link.href = 'WBlue.css'; break;
               
            }
            alert(link.href); */
        
            // Append link element to HTML head
            head.appendChild(link);
        }
        function f(PageName) {
            // Create the request and the script
            var s = document.createElement('script');
            // Send the request to retrieve custom.js
            var xhr = new XMLHttpRequest();
            xhr.open('GET', PageName, false);
            xhr.send();
            // Listen for onload, and remove the script after execution
            s.addEventListener("load", function (e) {
                s.parentElement.removeChild(s);
            });
            // Load the code inside the script and run it in the head
            s.textContent = xhr.responseText;
            document.head.appendChild(s);
        }
        
        var n = Math.random() * 100;
        n = parseInt(n);
        n = 55;
        console.log("----------------");
         
        fcss("SW.css");
        f("cfunctions.js");
        f("DBox.js");
        f("Common.js");
        f("dScript.js");
        f("DChart.js");
        f("Chart.js");
        f("Drag.js");
        f("NCtrl.js");
        f("NDML.js");
        f("DML.js");
        f("CalMob.js");
        f("chart.min.js");
        f("Resize.js");
        //f("exportToExcel.js");