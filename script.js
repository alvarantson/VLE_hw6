(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
        function hours12(date) { return (date.getHours() + 24) % 12 || 12; }
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = hours12(date);
            var m = date.getMinutes();
            var s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var linn = document.getElementById("linn");
        var kingitus = document.getElementById("v1");
        var kontaktivaba = document.getElementById("v2");
        var price = 0;
        
        if (kingitus.checked) {price += 5;}
        if (kontaktivaba.checked) {price += 1;}

        if (linn.value === "") {
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            
            if (linn.value === "tln") {
                price += 0;
            } else if (linn.value === "trt") {
                price += 2.50;
            } else if (linn.value === "nrv") {
                price += 2.50;
            } else if (linn.value === "prn") {
                price += 3;
            }
            
            
        }        
        e.innerHTML = String(price)+" &euro;";
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var Tartu = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    var new_point = new Microsoft.Maps.Location(
            58.2, 
            26
        );
    var centerPoint = new Microsoft.Maps.Location(
            58.3, 
            26.4
        );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint,
        zoom: 10,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    var pushpin = new Microsoft.Maps.Pushpin(Tartu, {
            title: 'Tartu Ülikool',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });
    var pushpin2 = new Microsoft.Maps.Pushpin(new_point, {
            title: 'Ilus rannajoon',
            //subTitle: 'Hea koht',
            //text: 'UT'
        });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);

    var center = map.getCenter();
    var infoboxTemplate = '<div id="infoboxText" style="background-color:white; min-height:100px; width: 240px;">' +
    '<b id="infoboxTitle" style="">Tore ujumiskoht</b><br>' +
    '<a id="infoboxDescription" style="">Siin on tore ujumas käia!</a></div>';
    var infobox = new Microsoft.Maps.Infobox(new_point, { htmlContent: infoboxTemplate});
    infobox.setMap(map);

}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

