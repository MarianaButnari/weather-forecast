import {Injectable, Signal, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private zipSignal = signal<string>('');

  setZip(zip: string): void {
    this.zipSignal.set(zip);
  }

  get zipCode(): Signal<string> {
    return this.zipSignal.asReadonly();
  }


  setItem(newZip: string): void {
    let storedKeys = this.getStoredZip();
    storedKeys.push(newZip);
    localStorage.setItem('storedZips', JSON.stringify(storedKeys));
  }

  getStoredZip(): string[] {
    const storedKeysJson = localStorage.getItem('storedZips');
    return storedKeysJson ? JSON.parse(storedKeysJson) : [];
  }

  remove(zipToRemove: string): void {
    let storedKeys = this.getStoredZip();
    storedKeys = storedKeys.filter(zip => zip !== zipToRemove);
    localStorage.setItem('storedZips', JSON.stringify(storedKeys));
  }
}
