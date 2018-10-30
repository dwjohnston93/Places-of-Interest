import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
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
  search: any; 
 
  constructor(
    public navCtrl: NavController, 
    public geolocation: Geolocation,
    public resultsProv: ResultsProvider,
    public actionSheetCtrl: ActionSheetController) {}
 
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
        type: [this.search]
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
      this.infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
        place.vicinity + '<br>' + '</div>')
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

  //selection menu for nearby search
  openActionSheet() {
    console.log("openActionSheet")
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Search By Type',
      buttons: [
        {
          text: 'ATM',
          role: 'destructive',
          handler: () => {
            this.search = 'atm';
            this.loadMap(); 
          }
        },
        {
          text: 'Bank',
          role: 'destructive',
          handler: () => {
            this.search = 'bank';
            this.loadMap(); 
          }
        },
        {
          text: 'Bar',
          role: 'destructive',
          handler: () => {
            this.search = 'bar';
            this.loadMap();
          }
        }, 
        {
          text: 'Cafe',
          role: 'destructive',
          handler: () => {
            this.search = 'cafe';
            this.loadMap();
          }
        }, 
        {
          text: 'Church',
          role: 'destructive',
          handler: () => {
            console.log('church clicked');
            this.search = 'church';
            this.loadMap();
          }
        },
        {
          text: 'Gas Station',
          role: 'destructive',
          handler: () => {
            this.search = 'gas_station';
            this.loadMap();
          }
        },
        {
          text: 'Hospital',
          role: 'destructive',
          handler: () => {
            this.search = 'hospital';
            this.loadMap();
          }
        },
        {
          text: 'Liquor Store',
          role: 'destructive',
          handler: () => {
            this.search = 'liquor_store';
            this.loadMap();
          }
        },
        {
          text: 'Movie Theater',
          role: 'destructive',
          handler: () => {
            this.search = 'movie_theater';
            this.loadMap();
          }
        },
        {
          text: 'Museum',
          role: 'destructive',
          handler: () => {
            this.search = 'museum';
            this.loadMap();
          }
        },
        {
          text: 'Restaurant',
          role: 'destructive',
          handler: () => {
            this.search = 'restaurant';
            this.loadMap();
          }
        },
        {
          text: 'Supermarket',
          role: 'destructive',
          handler: () => {
            this.search = 'supermarket';
            this.loadMap();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    }); actionSheet.present();
  }  
}