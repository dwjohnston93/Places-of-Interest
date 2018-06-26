import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { ResultsProvider } from '../../providers/results/results'; 
 
declare var google;
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  infowindow: any;
 
  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation,
    public resultsProv: ResultsProvider) {
  }
 
  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){

    let that = this;

    this.geolocation.getCurrentPosition().then((position) => {
 
      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
 
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
 
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.infowindow = new google.maps.InfoWindow();
      let service = new google.maps.places.PlacesService(this.map);
      service.nearbySearch({
        location: latLng,
        radius: 2000,
        type: ['store']
      }, callback);
 
    }, (err) => {
        console.log(err);
      });
     
      function callback(results, status) {
        that.resultsProv.resultsList = results; 
        console.log(results); 
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            that.createMarker(results[i]);
          }
        }
      }
    

  }

  createMarker(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
      map: this.map,
      position: placeLoc
    });
  
    google.maps.event.addListener(marker, 'click', _ => {
      this.infowindow.setContent(place.name);
      this.infowindow.open(this.map, marker);
    });
}

  addInfoWindow(marker, content){
 
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });
   
    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
   
  }

  addMarker(){
 
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });
   
    let content = "<h4>Information!</h4>";         
   
    this.addInfoWindow(marker, content);
   
  }
 
}