import { Component, OnInit } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { Place } from '../place.module';
import { PlacesService } from '../places.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.page.html',
  styleUrls: ['./offer.page.scss'],
})
export class OfferPage implements OnInit {
  offers: Place[];

  constructor(private placeService: PlacesService, private router: Router) { }

  ngOnInit() {
    this.offers = this.placeService.getAllPlaces();
  }

  onEdit(offerId: string, itemSliding: IonItemSliding) {
    itemSliding.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', offerId]);
    console.log("Editing Offer", offerId);
  }
  onDelete(offerId: string, itemSliding: IonItemSliding) {
    this.placeService.deletePlace(offerId);
    this.offers = this.placeService.getAllPlaces();
    itemSliding.close();

    console.log("Editing Offer", offerId);
  }

}
