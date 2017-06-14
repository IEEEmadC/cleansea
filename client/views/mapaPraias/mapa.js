Template.mapaTemplate.onRendered(function() {
	 GoogleMaps.load();
});

Template.mapaTemplate.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-12.894012, -38.429101),
        // center: new google.maps.LatLng(-12.974424, -38.465321),
        zoom: 11,
        mapTypeControl: false,
        gestureHandling: 'greedy',
    		mapTypeControl: false,
    		scaleControl: false,
    		streetViewControl: false,
    		rotateControl: false,
    		fullscreenControl: false,
        styles: [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#A3CCFF"
                    },
                    {
                        "lightness": "5"
                    },
                    {
                        "gamma": "1.10"
                    }
                ]
            },
        ]
      };
    }
  }
});
Template.mapaTemplate.onCreated(function() {  
  GoogleMaps.ready('map', function(map) {
     console.log("I'm ready!");
      let praias = Praias.find().fetch(),
          iconImg,
          infowindow = new google.maps.InfoWindow({
              content: "Empty"
          });

     praias.forEach(function(item){
        console.log("Quali", item)
        if (item.qualidade === 'Própria') {
            iconImg = 'img/markerOk.png'; 
        }
        else{
            iconImg = 'img/markerNo.png'; 
        }
        let marker = new google.maps.Marker({
                draggable: false,
                position: new google.maps.LatLng(item.latitude, item.longitude),
                map: map.instance,
                icon: iconImg,
            });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
            infowindow.setContent('<h4>Nome: '+ item.praia + '<br> Qualidade: ' + item.qualidade + '</h4>');
        });

     });
  });
});