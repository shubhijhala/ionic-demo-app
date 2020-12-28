import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Place } from './place.module'

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  _palces: Place[];

  fillPlace(): Place[] {
    if (localStorage.getItem('palces') != undefined && localStorage.getItem('palces') != null) {
      this._palces = JSON.parse(localStorage.getItem('palces'));
    } else {
      this._palces = [
        new Place('p1', 'ABCS', 'In Heart of Udaipur City', 'https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg',
          200, new Date('2019-01-01'), new Date('2029-12-31'), 'xyz'),
        new Place('p2', 'ABCS', 'In Heart of Udaipur City', 'https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg',
          200, new Date('2019-01-01'), new Date('2029-12-31'), 'abc'),
        new Place('p3', 'Udaipur', 'In Heart of City', 'https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg',
          122, new Date('2019-01-01'), new Date('2029-12-31'), 'abc')
      ];
    }
    return this._palces;
  }

  get palces() {
    return [...this.fillPlace()]
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  getPlace(id: string) {
    return {
      ...this._palces.find(
        p => p.id === id)
    };
  }


  deletePlace(id: string) {
    let obj: Place[] = [];
    for (let i = 0; i < this._palces.length; i++) {
      if (this._palces[i].id != id) {
        obj.push(this._palces[i]);
      }
    }
    this._palces = obj;
    localStorage.setItem('palces', JSON.stringify(obj));
  }


  getAllPlaces() {
    return this.fillPlace();
  }
  addPlace(title: string, description: string, price: number, dateFrom: Date, dateTo: Date) {
    const newPlace = new Place(Math.random().toString(), title, description,
      'https://image.shutterstock.com/image-photo/ancient-temple-ruins-gadi-sagar-260nw-786126286.jpg',
      price, dateFrom, dateTo, this.authService.userId);

    // return this.http.post<{ name: string }>('https://ionic-project-demo-shubhu-default-rtdb.firebaseio.com/offered-places.json',
    //   { ...newPlace, id: null }).pipe(
    //     switchMap(resData => {
    //       return this.palces;
    //     }), take(1),
    //     tap(places => {
    //       //this._palces.next(this.palces.concat())
    //     })
    //   );

    // // .pipe(tap(resData => {
    // //   debugger;
    // //   console.log(resData);
    // // }));
    this._palces.push(newPlace);
    localStorage.setItem('palces', JSON.stringify(this._palces));
    this._palces = JSON.parse(localStorage.getItem('palces'));
  }
}
