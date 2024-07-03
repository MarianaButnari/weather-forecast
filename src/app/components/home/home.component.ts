import {Component, inject} from '@angular/core';
import {LocationComponent} from '../location/location.component';
import {ZipComponent} from '../zip/zip.component';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, ZipComponent, LocationComponent, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private localStorageService = inject(LocalStorageService);
  protected storedKeys: string[] = this.localStorageService.getStoredZip();

  ngOnInit(): void {
    console.log(this.storedKeys);
  }
  deleteForecast(zip: string) {
    this.localStorageService.remove(zip);
  }
}
