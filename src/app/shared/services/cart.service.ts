import { Injectable } from '@angular/core';
import { Firestore, collection, doc, deleteDoc, getDocs, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Cart } from "../../models/Cart";
import { Router } from "@angular/router";
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private firestore: Firestore = inject(Firestore); // Az új mód a DI (dependency injection) használatára Angularban.
  private router: Router = inject(Router);

  constructor() { }

  getCartItems(userEmail: string): Observable<Cart[]> {
    const cartRef = collection(this.firestore, `carts/${userEmail}/cart`);
    return collectionData(cartRef, { idField: 'id' }) as Observable<Cart[]>; // `collectionData` a Firestore adatainak nyomon követésére
  }

  deleteItemFromCart(userEmail: string, italID: string): Observable<void> {
    return new Observable<void>(observer => {
      const docRef = doc(this.firestore, `carts/${userEmail}/cart/${italID}`);
      deleteDoc(docRef)
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt az ital törlése közben:', error);
          observer.error(error);
        });
    });
  }

  deleteAllItems(userEmail: string): void {
    const cartRef = collection(this.firestore, `carts/${userEmail}/cart`);
    getDocs(cartRef).then(querySnapshot => {
      querySnapshot.forEach(docSnapshot => {
        deleteDoc(docSnapshot.ref).then(() => {
          console.log('Kosár üresítve');
        }).catch(error => {
          console.error('Hiba történt az italok törlése közben:', error);
        });
      });
      this.router.navigateByUrl('/itallap');
    }).catch(error => {
      console.error('Hiba történt a kosár elemeinek lekérése közben:', error);
    });
  }
}
