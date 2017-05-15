Template.mapaTemplate.onRendered(function() {
	 GoogleMaps.load();
});

Template.mapaTemplate.helpers({  
  mapOptions: function() {
    if (GoogleMaps.loaded()) {
      return {
        center: new google.maps.LatLng(-12.974424, -38.465321),
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
                        "color": "#048ba8"
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
     let praias = Praias.find().fetch();

     // var marker = new google.maps.Marker({
     //    position: map.options.center,
     //    map: map.instance,
     //  });


     let iconImg
     praias.forEach(function(item){
        console.log("Quali", item.qualidade)
      if (item.qualidade === 'Própria') {
        console.log("Quali", item.qualidade)
        iconImg = 'img/markerNo.png'; 
      }
      else{
        iconImg = 'img/markerOk.png'; 
      }
     var marker = new google.maps.Marker({
          draggable: false,
          position: new google.maps.LatLng(item.latitude, item.longitude),
          map: map.instance,
          icon: iconImg,
        });

     });
  });
});