import {Component} from '@angular/core';
import {Alert, NavController, Page, Platform} from 'ionic-angular';
@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private nav: any;
  private platform: any;
  private map: any;
  private marker: any;
  view: String = "map";
 constructor(platform: Platform,private navController: NavController) {
    this.platform = platform;
    this.map = null;
    this.platform.ready().then(() => {
      this.loadMap();
    });
  }
 loadMap(){
  let options = {timeout: 10000, enableHighAccuracy: true};
 
  navigator.geolocation.getCurrentPosition( 
      (position) => {
          let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
          let mapOptions = {
              center: latLng,
              zoom: 12,
              mapTypeId: google.maps.MapTypeId.ROADMAP
          }
          console.log(document.getElementById("map"));
          this.map = new google.maps.Map(document.getElementById("map"), mapOptions);
          this.map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
          var myLocation = new google.maps.Marker({
              position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
              map: this.map,
              title: "My Location"
          });
          this.marker = new google.maps.Marker({
            map: this.map,
            position: this.map.getCenter()
          });
        
        google.maps.event.addListener(this.marker, 'click',() => {
          this.addInfoWindow(this.marker, this.map);
        });
        this.startListening(this.map);
      },
 
      (error) => {
          console.log(error);
      }, options); 
}
addInfoWindow(marker, map){
  let infoWindow = new google.maps.InfoWindow();
  let geocoder  = new google.maps.Geocoder();             // create a geocoder object
  let location  = new google.maps.LatLng(marker.position.lat(), marker.position.lng());    // turn coordinates into an object          
  geocoder.geocode({'location': location}, (results, status) => {
  if(status == google.maps.GeocoderStatus.OK) { 
   let place = results[1];
   infoWindow.setContent('<div>'+place.formatted_address + '</div>');
    infoWindow.open(this.map, marker); 
   }
  }); 
}
startListening(map){

      let input = (<HTMLInputElement>document.getElementById("pac-input"));
      // Create the autocomplete helper, and associate it with
      // an HTML text input box.
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.bindTo('bounds', map);
      google.maps.event.addListener(autocomplete, 'place_changed',() => {
      var place = autocomplete.getPlace();
      if (!place.geometry) {
        let request = {
            location: map.getCenter(),
            radius: 50,
            query: place.name
          };

        let service = new google.maps.places.PlacesService(map);
        service.textSearch(request, (results, status) => {
          console.log(results);
        });
        return;
      }

      if(place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
      } else {
          map.setCenter(place.geometry.location);
      }
      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });
      // Set the position of the marker using the place ID and location.
      marker.setPlace( /** @type {!google.maps.Place} */ ({
          placeId: place.place_id,
          location: place.geometry.location
      }));
      marker.setVisible(true);
      google.maps.event.addListener(marker, 'click',() => {
          this.addInfoWindow(marker, this.map);
      });
      });
}

}
