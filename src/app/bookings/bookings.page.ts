import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { BookingService } from './booking-service';
import { Booking } from './booking.module';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit, OnDestroy {
  loadedbooking: Booking[];
  private bookingSub: Subscription;
  constructor(private bookingService: BookingService,
    private loading: LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookingService.bookings.subscribe(booking => {
      this.loadedbooking = booking;
    })
  }
  ngOnDestroy() {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe()
    }
  }
  onBooking(bookingId: string, itemSliding: IonItemSliding) {
    itemSliding.close();
    this.loading.create({ message: "cancelling..." }).then(el => {
      el.present();
      this.bookingService.cancelBooking(bookingId).subscribe(() => {
        el.dismiss();
      });
    });
    console.log("Booking", bookingId);
  }

}
