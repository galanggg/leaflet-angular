import { Component, OnInit, AfterViewInit } from '@angular/core';
import {MapService} from './map.service'
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map!: L.Map
  state: any
  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxNativeZoom: 19, 
        maxZoom: 20,
        attribution: ""
      })
    ],
    zoom: 30,
    center: L.latLng(-37.5292799, 145.1111215)
  };
  constructor(private http: HttpClient, private mapService: MapService,) { }
  
  ngOnInit() :void {
  }
  
  onEachFeature(feature:any, layer:any) {
    console.log(feature)
    if (feature.properties && feature.properties.persons) {
      const a = 
      `<div class="capital-name">Capital: ${ feature.properties.plot_id }</div>` +
      `<div class="person-name">Name: ${ feature.properties.persons[0]?.first_name || 'No First Name'} ${feature.properties.persons[0]?.last_name || 'No Last Name'}</div>`
      
      layer.bindPopup(a);
    }
  }
  
  onMapReady(map: L.Map) {
    this.mapService.getDataMap().subscribe(data => {
      console.log(data)
      this.state = data.features
      L.geoJSON(this.state, {
        onEachFeature: this.onEachFeature
      }).addTo(map)
    })
  }
}
