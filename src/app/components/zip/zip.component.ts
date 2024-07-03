import {Component, inject} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {LocalStorageService} from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-zip',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './zip.component.html',
  styleUrl: './zip.component.css'
})
export class ZipComponent {
  private localStorageService = inject(LocalStorageService);
  protected zipCode = new FormControl<string | null>(null);

  save() {
    this.localStorageService.setItem(this.zipCode.value!);
    this.zipCode.reset();
  }
}
