import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


/*
  Generated class for the ResultsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ResultsProvider {

  constructor(public http: HttpClient) {
    console.log('Hello ResultsProvider Provider');
    console.log("resultsList", this.resultsList)
  }

  resultsList: any

}
