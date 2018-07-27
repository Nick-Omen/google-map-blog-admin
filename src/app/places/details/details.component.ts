import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../places.models';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  place: Place = new Place();

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    if (!id) {
      this.router.navigate(['/']);
      return;
    }
    this.placesService.getOne(id)
      .subscribe(r => this.place = r);
  }
}
