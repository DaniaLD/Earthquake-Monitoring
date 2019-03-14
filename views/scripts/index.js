const success = position => {
    const user = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }

    mymap.flyTo([user.lat, user.lng], 13);
    L.marker([user.lat, user.lng]).addTo(mymap);

    const postPosition = async () => {
        await user.lat;
        await user.lng;

        $.ajax({
            type: 'GET',
            url: `https://earthquake.usgs.gov/fdsnws/event/1/query?starttime=2018-01-01&endtime=2019-03-01&format=geojson&latitude=${user.lat}&longitude=${user.lng}&maxradiuskm=500`,
            success: data => {
                console.log(data);
            }
        });
    }
    postPosition();
}

const error = error => {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by this browser.');
    }

    switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          console.log("An unknown error occurred.");
          break;
    }
}

navigator.geolocation.getCurrentPosition(success, error);

mymap.on('click', e => {
    console.log(e.latlng);
});