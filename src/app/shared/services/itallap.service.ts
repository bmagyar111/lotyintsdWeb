import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import { ItalokFS } from '../../models/ItalokFS';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable, of, switchMap} from "rxjs";
import firebase from 'firebase/compat/app';
import DocumentReference = firebase.firestore.DocumentReference;
import { Italok } from '../../models/Italok';
import {Custom} from "../../models/Custom";

@Injectable({
  providedIn: 'root'
})
export class ItallapService {

  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) { }

  create(ital: Italok){
    return this.firestore.collection<Italok>('Italok').add(ital);
  }


  addToCart(ital: Italok): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert a felhasználó nincs bejelentkezve
        }
        // Felhasználó be van jelentkezve, hozzáadjuk a kosarához az italt
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert hiányzik a felhasználó e-mail címe
        }
        return this.addToCartFirestore(userEmail, ital);
      })
    );
  }

  private addToCartFirestore(userEmail: string, ital: Italok): Observable<ItalokFS> {
    return new Observable<any>(observer => {
      // Generáljuk a italID-t
      const italID = this.firestore.createId();

      // Hozzáadjuk a dokumentumot a Firestore-hoz a megadott italID-vel
      this.firestore.collection(`carts/${userEmail}/cart`).doc(italID).set({ ...ital, italID })
        .then(() => {
          console.log('Pizza hozzáadva a kosárhoz!', italID);
          // Visszaadjuk a hozzáadott italt, hogy a hívó oldalon is elérhető legyen
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt az italok hozzáadása közben:', error);
          observer.next(null); // Nem sikerült hozzáadni az italt a kosárhoz
          observer.complete();
        });
    });
  }


  addToCartCustom(custom : Custom): Observable<any> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert a felhasználó nincs bejelentkezve
        }
        // Felhasználó be van jelentkezve, hozzáadjuk a kosarához az italt
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null); // Nem sikerült hozzáadni a kosárhoz, mert hiányzik a felhasználó e-mail címe
        }
        return this.addToCartFirestoreCustom(userEmail, custom);
      })
    );
  }

  private addToCartFirestoreCustom(userEmail: string, ital: Custom): Observable<ItalokFS> {
    return new Observable<any>(observer => {
      // Generáljuk a italID-t
      const italID = this.firestore.createId();

      // Hozzáadjuk a dokumentumot a Firestore-hoz a megadott italID-vel
      this.firestore.collection(`carts/${userEmail}/cart`).doc(italID).set({ ...ital, italID })
        .then(() => {
          console.log('Pizza hozzáadva a kosárhoz!', italID);
          // Visszaadjuk a hozzáadott italt, hogy a hívó oldalon is elérhető legyen
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt az italok hozzáadása közben:', error);
          observer.next(null); // Nem sikerült hozzáadni az italt a kosárhoz
          observer.complete();
        });
    });
  }


  addItalToFirestore(ital: ItalokFS): Promise<DocumentReference<ItalokFS>> {
    return this.firestore.collection<ItalokFS>('italok').add(ital);
  }

}
