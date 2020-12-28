import { Component, OnInit } from '@angular/core';
import { Place } from '../place.module';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  lodedPlaces: Place[];
  relPlaces: Place[];
  constructor(private placeService: PlacesService,
    private auth: AuthService) { }

  ngOnInit() {
    this.lodedPlaces = this.placeService.palces;
    this.relPlaces = this.lodedPlaces;
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value == 'all') {
      this.lodedPlaces = this.placeService.palces;
      this.relPlaces = this.lodedPlaces;
    } else {
      this.relPlaces = this.lodedPlaces.filter(place => place.userId !== this.auth.userId);
    }

  }

}
