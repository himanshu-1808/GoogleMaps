//set map options
var mylatlng = {
    lat: 30.7265,
    lng: 76.7589
};
var mapOptions = {
    center: mylatlng,
    zoom: 14,
    mapTypeId: google.maps.MapTypeId.ROADMAP
};

// create map

var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//create directions service object to use route method

var directionsService = new google.maps.DirectionsService();

//create direction render object which will use to display directions

var directionsDisplay = new google.maps.DirectionsRenderer();

// bind directionsRenderer to map

directionsDisplay.setMap(map);

//functipon

function calcRoute() {
    //create a request

    var request = {
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL
    }

    // Pass request to roy=te method

    directionsService.route(request, (result, status) => {
        if (status == google.maps.DirectionsStatus.OK) {
            //get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<div class='alert-info'> from: " + document.getElementById("from").value + ".<br/>To: " + document.getElementById("to").value + ".<br/> Driving distance <i class='fa-solid fa-road'></i>: " + result.routes[0].legs[0].distance.text + ".<br/> Duration <i class='fa-solid fa-hourglass'></i> : " + result.routes[0].legs[0].duration.text + ".</div>";

            //display routes
            directionsDisplay.setDirections(result);

        } else {
            directionsDisplay.setDirections({ routes: [] });
            //center map 

            map.setCenter(mylatlng);

            //show error message
            output.innerHTML = "<div class='alert-danger'><i class='fa-solid fa-circle-exclamation'></i> Could not retreive driving distance.</div>";
        }
    });
}

// create auto complete objects for all inputs

var options={
    types:['(cities']
}
var input1=document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1,options)

var input2=document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2,options)