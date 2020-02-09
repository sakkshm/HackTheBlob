//Calling API Data
const Http = new XMLHttpRequest();
const url = 'https://cors-anywhere.herokuapp.com/https://hacktheblob.herokuapp.com/';
Http.open("GET", url);
Http.send();

var noiseLevel = Array();
var signalStrength = Array();
Http.onreadystatechange = (e) => {
    console.log(Http.responseText)
    var object = JSON.parse(Http.responseText);
    var data = document.getElementById("data");
    for (i = 0; i < object.data.length; i++) {
        noiseLevel[i] = object.data[i].noise_level;
    }
    var lowestNoise = Math.min.apply(null, noiseLevel);
    var lowestNoiseIndex = noiseLevel.indexOf(lowestNoise);
    data.innerHTML = "";
    data.innerHTML = " <h3> The Best place on campus is on the map: <br/>  <iframe src=\"https://maps.google.com/maps?q=" + object.data[lowestNoiseIndex].lat + "," + object.data[lowestNoiseIndex].lng + "&z=15&output=embed\" width=\"70%\" height=\"460\" frameborder=\"0\" style=\"border:1px\" id=\"map\"></iframe> <br/><br/> Some other info:";
    data.innerHTML += " <h3>Temprature: " + object.data[lowestNoiseIndex].temperature + " °C </h3> ";
    data.innerHTML += " <h3>Humidity: " + object.data[lowestNoiseIndex].humidity + "</h3> ";
    for (n = 0; n < object.data[lowestNoiseIndex].wifiAccessPoints.length; n++) {
        signalStrength[n] = object.data[lowestNoiseIndex].wifiAccessPoints[n].signalStrength;
    }
    var fastestWiFI = signalStrength.indexOf(Math.max.apply(null, signalStrength));
    data.innerHTML += " <h3>Fastest Wifi: " + object.data[lowestNoiseIndex].wifiAccessPoints[fastestWiFI].ssid + "</h3> ";
}