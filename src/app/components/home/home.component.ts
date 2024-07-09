import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {LocationComponent} from '../location/location.component';
import {ZipComponent} from '../zip/zip.component';
import {LocalStorageService} from '../../shared/services/local-storage.service';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, ZipComponent, LocationComponent, RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private destroyRef = inject(DestroyRef);
  private localStorageService = inject(LocalStorageService);
  protected storedKeys: string[] = this.localStorageService.getStoredZip();

  ngOnInit(): void {
    this.localStorageService.getZip().pipe(
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(result => {
      if (result) {
        this.extractZipFromLocalStorage();
      }
    })
  }

  deleteForecast(zip: string) {
    this.localStorageService.remove(zip);
    this.localStorageService.setZip(zip);
  }

  private extractZipFromLocalStorage() {
    this.storedKeys = this.localStorageService.getStoredZip()
  }
}
