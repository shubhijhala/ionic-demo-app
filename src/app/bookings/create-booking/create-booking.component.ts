import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Place } from 'src/app/places/place.module';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPalce: Place;
  @Input() selectedMode: 'select' | 'random';
  @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;

  constructor(private modelCtrl: ModalController) { }

  ngOnInit() {
    const avaiableFrom = new Date(this.selectedPalce.avaibleForm);
    const avaiableTo = new Date(this.selectedPalce.avaiableTo);
    if (this.selectedMode == 'random') {
      this.startDate = new Date(avaiableFrom.getTime() + Math.random() * (avaiableTo.getTime()
        - 7 * 24 * 60 * 60 * 1000 - avaiableFrom.getTime())).toISOString();

      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() *
        (new Date(this.startDate).getTime() + 6 * 24 * 60 * 60 * 1000 -
          new Date(this.startDate).getTime())).toISOString();
    }
  }

  onCancle() {
    this.modelCtrl.dismiss(null, 'cancel');
  }
  onBookPlace() {
    if (!this.form.valid || !this.dateValid) {
      return;
    }
    this.modelCtrl.dismiss({
      bookingData: {
        firstName: this.form.value['firstName'],
        lastName: this.form.value['lastName'],
        guestNumber: +this.form.value['guestnumber'],
        startDate: new Date(this.form.value['date-from']),
        enddate: new Date(this.form.value['date-to'])

      }
    }, 'confirm');
  }

  dateValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);

    return endDate > startDate;

  }

}
