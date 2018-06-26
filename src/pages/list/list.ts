import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ResultsProvider } from '../../providers/results/results'; 

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
 
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public resultsProv: ResultsProvider) {} 

  ionViewDidLoad(){
    this.orderList(this.resultsProv.resultsList);
  }
  
  orderList(list){
    list.sort(function (a, b) {
    return b.rating - a.rating;
    }) 
  } 
    

} 