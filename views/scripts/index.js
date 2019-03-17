let markers, circle;

const success = position => {
    const user = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    }

    mymap.flyTo([user.lat, user.lng], 5);
    const usersPositionMarker = L.marker([user.lat, user.lng]).addTo(mymap);

    const postPosition = async () => {
        await user.lat;
        await user.lng;

        const year = new Date().getFullYear();
        const lastMonth = new Date().getMonth();
        const currentMonth = new Date().getMonth() + 1;

        const startTime = `${year}-${lastMonth}-01`;
        const endTime = `${year}-${currentMonth}-01`;

        $.ajax({
            type: 'GET',
            url: `https://earthquake.usgs.gov/fdsnws/event/1/query?starttime=${startTime}&endtime=${endTime}&format=geojson&latitude=${user.lat}&longitude=${user.lng}&maxradiuskm=500`,
            success: data => {
                if (data) {
                    const features = data.features;
                    let items = [usersPositionMarker];

                    features.map(feature => {
                        items.push(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]));
                    });

                    markers = L.layerGroup(items).addTo(mymap);
                }
            }
        });

        circle = L.circle([user.lat, user.lng], {
            color: 'orange',
            radius: 500000
        }).addTo(mymap);
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
    mymap.removeLayer(markers);
    mymap.removeLayer(circle);

    const clickedPoint = {
        lat: e.latlng.lat,
        lng: e.latlng.lng
    }

    mymap.flyTo([clickedPoint.lat, clickedPoint.lng], 5);
    const clickedPositionMarker = L.marker([clickedPoint.lat, clickedPoint.lng]).addTo(mymap);

    const postPosition = async () => {
        await clickedPoint.lat;
        await clickedPoint.lng;

        const year = new Date().getFullYear();
        const lastMonth = new Date().getMonth();
        const currentMonth = new Date().getMonth() + 1;

        const startTime = `${year}-${lastMonth}-01`;
        const endTime = `${year}-${currentMonth}-01`;

        $.ajax({
            type: 'GET',
            url: `https://earthquake.usgs.gov/fdsnws/event/1/query?starttime=${startTime}&endtime=${endTime}&format=geojson&latitude=${clickedPoint.lat}&longitude=${clickedPoint.lng}&maxradiuskm=500`,
            success: data => {
                if (data) {
                    const features = data.features;
                    let items = [clickedPositionMarker];

                    features.map(feature => {
                        items.push(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]]));
                    });

                    markers = L.layerGroup(items).addTo(mymap);
                }
            }
        });

        circle = L.circle([clickedPoint.lat, clickedPoint.lng], {
            color: 'orange',
            radius: 500000
        }).addTo(mymap);
    }
    postPosition();
});