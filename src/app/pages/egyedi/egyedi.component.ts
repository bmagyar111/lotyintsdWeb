import { Component } from '@angular/core';
import {ItallapService} from "../../shared/services/itallap.service";
import {Custom} from "../../models/Custom";

@Component({
  standalone: false,
  selector: 'app-egyedi',
  templateUrl: './egyedi.component.html',
  styleUrl: './egyedi.component.scss'
})
export class EgyediComponent {
  ingredients: string = '';

  constructor(private itallapService: ItallapService) { }

  addToCart(): void {
    // Ellenőrizzük, hogy a beviteli mező üres-e
    if (!this.ingredients.trim()) {
      alert('A beviteli mező nem lehet üres!');
      return;
    }

    const customItal: Custom = {
      nev: 'EGYEDI',
      ar: 2000,
      ertekeles: 0,
      imageUrl: 'null',
      leiras: `Egyedi ital: ${this.ingredients}`
    };


    if(this.ingredients.trim()){
      alert('Sikeresen hozzáadva a kosárhoz!');
    this.itallapService.addToCartCustom(customItal).subscribe(
      () => {

      },
      error => {
        console.error('Hiba történt az ital hozzáadása közben:', error);
      }
    );
    }
  }

}
