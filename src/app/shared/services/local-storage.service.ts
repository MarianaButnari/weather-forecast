import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
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
