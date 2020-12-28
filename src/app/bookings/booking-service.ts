import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Booking } from './booking.module';
import { delay, take, tap } from 'rxjs/operators';
@Injectable({ providedIn: "root" })
export class BookingService {
    private _booking = new BehaviorSubject<Booking[]>([]);

    get bookings() {
        return this._booking.asObservable();
    }

    constructor(private auth: AuthService) {

    }
    addBooking(placeId: string,
        placeTitle: string,
        placeImage: string,
        firstName: string,
        lastName: string,
        guestNumber: number,
        dateFrom: Date,
        dateTo: Date) {
        const newBooking = new Booking(Math.random().toString(), placeId, this.auth.userId, placeTitle, guestNumber,
            placeImage, firstName, lastName, dateFrom, dateTo);
        return this.bookings.pipe(take(1),
            delay(1000),
            tap(booking => {
                this._booking.next(booking.concat(newBooking))
            }))
    }
    cancelBooking(bookingId: string) {
        return this.bookings.pipe(take(1),
            delay(1000),
            tap(booking => {
                this._booking.next(booking.filter(b => b.id !== bookingId))
            }))
    }
}