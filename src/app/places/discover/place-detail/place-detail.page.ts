import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { BookingService } from 'src/app/bookings/booking-service';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';
import { Place } from '../../place.module';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place

  constructor(private navCtrl: NavController,
    private route: ActivatedRoute, private placeService: PlacesService
    , private modelCtrl: ModalController,
    private actionsheetCtrl: ActionSheetController,
    private bookingSer: BookingService,
    private loadingcon: LoadingController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placeService.getPlace(paramMap.get('placeId'));
    });
  }
  onBookPlace() {

    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');

    this.actionsheetCtrl.create({
      header: "Choose an Action",
      buttons: [
        {
          text: 'Select Date',
          handler: () => {
            this.openBookingModel('select');

          }
        },
        {
          text: 'Random Date',
          handler: () => {
            this.openBookingModel('random');
          }
        }, {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    }).then(actionsheetEl => {
      actionsheetEl.present();
    });



  }
  openBookingModel(mode: 'select' | 'random') {
    this.modelCtrl.create({ component: CreateBookingComponent, componentProps: { selectedPalce: this.place, selectedMode: mode } }).then(modelElem => {
      modelElem.present();
      return modelElem.onDidDismiss();
    }).then(resultData => {
      console.log(resultData.data, resultData.role);
      if (resultData.role = "confirm") {
        this.loadingcon.create({ message: "Booking place..." }).then(el => {
          el.present();
          const booking = resultData.data.bookingData;
          this.bookingSer.addBooking(this.place.id, this.place.title,
            this.place.imgUrl, booking.firstName, booking.lastName, booking.guestNumber,
            booking.startDate, booking.enddate).subscribe(() => {
              el.dismiss();
            })
        })
      }
    });
  }

}
