import { Component, OnInit } from '@angular/core';
import { PlacesService } from './places.service';
import { Place } from './places.models';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: Place[] = [];

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.placesService.getAll()
      .subscribe(r => this.places = r);
  }
}
