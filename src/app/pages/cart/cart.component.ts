import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { CartService } from "../../shared/services/cart.service";
import { Cart } from "../../models/Cart";
import { inject } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];
  fizetendo: number = 0;
  orderTime: Date = new Date();
  currentEmail: string = '';

  private auth: Auth = inject(Auth);  // Az új mód a DI (dependency injection) használatára Angularban.

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // Felhasználó állapotának figyelése
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        if (userEmail !== this.currentEmail) {
          if (typeof userEmail === "string") {
            this.currentEmail = userEmail;
            this.loadCartItems(userEmail);
          }
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }

  getLoggedInUserEmail(): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        if (typeof userEmail === "string" && userEmail !== this.currentEmail) {
          this.currentEmail = userEmail;
          this.loadCartItems(userEmail);
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }

  loadCartItems(userEmail: string): void {
    this.cartService.getCartItems(userEmail).subscribe(items => {
      this.cartItems = items;
      this.osszar();
    });
  }

  deleteItem(italID: string): void {
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        if (!confirm('Biztosan törölni szeretnéd ezt az italt?')) {
          return;
        }

        if (typeof userEmail === "string") {
          this.cartService.deleteItemFromCart(userEmail, italID).subscribe(() => {
            console.log('Ital törölve a kosárból!');
          });
        }
      }
    });
  }

  osszar(): void { // Fizetendő összeg kiszámítása
    this.fizetendo = this.cartItems.reduce((total, item) => total + item.ar, 0);
  }

  deleteAllItems(): void { // "Megrendelés" - Kosár ürítése
    this.auth.onAuthStateChanged(user => {
      if (user) {
        const userEmail = user.email;
        if (typeof userEmail === "string") {
          this.cartService.deleteAllItems(userEmail);
        }
      } else {
        console.log('Nincs bejelentkezve felhasználó.');
      }
    });
  }
}
