import {Injectable, Signal, signal} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private zip$ = new Subject<string>();

  setZip(zip: string) {
    this.zip$.next(zip);
  }

  getZip(): Observable<string> {
    return this.zip$.asObservable();
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
