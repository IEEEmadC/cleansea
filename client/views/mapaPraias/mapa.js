var changeNames = new ReactiveVar();
function removeAcento (text){                                                                  
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;               
}
function pinMap(instance, map){

    let iconImg,
        infowindow = new google.maps.InfoWindow({
            content: "Empty"
        }),
        arrayToSet = []; 

    instance.data.praias.forEach(function(item){
            // console.log("Quali", item)
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
                    praia: item.praia,
                    codigo: item.codigo
                });
            arrayToSet.push(marker);
            instance.data.markerArray.set(arrayToSet);
            // console.log("marker", marker);

            marker.addListener('click', function() {
                infowindow.open(map, marker);

                if (Session.get('englishSet')) {
                    if (item.qualidade === 'Imprópria') {
                        item.qualidade = 'Unsuitable';
                    }
                    else{
                        item.qualidade = 'Suitable';
                    }
                    infowindow.setContent('<h4>Name: '+ item.praia + '<br> Quality: ' + item.qualidade + '</h4>');
                }
                else{
                    infowindow.setContent('<h4>Nome: '+ item.praia + '<br> Qualidade: ' + item.qualidade + '</h4>');
                }

            });

        });
}

Template.mapaTemplate.onRendered(function() {
	 GoogleMaps.load();

});

Template.mapaTemplate.events({
    'click .closebtn':function(){
        $('.list-section').css('width', '0');
    },
    'click .side-menu-item':function(e, t){

        let codigoClick = e.currentTarget.attributes[1].value;

        t.data.markerArray.get().forEach(function(item){
            if (item.codigo === codigoClick) {
                item.map.setCenter({
                    lat : item.position.lat(),
                    lng : item.position.lng()
                });
                item.map.setZoom(12);

                $('.list-section').css('width', '0');
                $('.btn-mapa-interaction').addClass('btn-search');
                $('.btn-mapa-interaction').removeClass('closebtn');
            }
        });

    },
    'keyup #search-bar':function(e, t){
        console.log("e", e.currentTarget.value);
        let valueToFind = removeAcento(e.currentTarget.value.toLowerCase()),
            regexMatch = new RegExp(valueToFind, 'g'),
            testeItem;
        t.data.markerArray.get().forEach(function(item){
            if (e.currentTarget.value === '') {
                item.setVisible(true);
                changeNames.set(true);
                changeNames.set(false);
                item.map.setZoom(11);
                item.map.setCenter({
                    lat: -12.894012,
                    lng: -38.429101
                });
            }
            testeItem = removeAcento(item.praia.toLowerCase());
            if ( testeItem.match(regexMatch) ) {
                console.log('itempraia', item.praia);
                item.setVisible(true);
                changeNames.set(true);
            }
            else{
                item.setVisible(false);
                changeNames.set(false);
            }
        });
    },
})

Template.mapaTemplate.helpers({  
    codeFormat:function(codigo){
        console.log("codigo", codigo);
        if (codigo.indexOf('200') !== -1 && codigo.indexOf('CO') === -1 
            && codigo.indexOf('AR') === -1 && codigo.indexOf('BO') === -1
             && codigo.indexOf('PR') === -1) {
            return '2';
        }
        return;
    },
    markersGet:function(){
        changeNames.get();

        let markers = Template.instance().data.markerArray.get();

        console.log("markerArray", markers);
        
        let newMarkers = markers.filter(function(item){
            if (item.getVisible()) {
                return item;
            }
        });
        
        console.log('markers', newMarkers);
        
        return newMarkers;
    },
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
    let instance = this;

    console.log('instance', instance);

    GoogleMaps.ready('map', function(map) {
        console.log("I'm ready!");  

        instance.data.globalMap = map;
        
        pinMap(instance, map);  

    console.log('instance', instance);
        
  });
});