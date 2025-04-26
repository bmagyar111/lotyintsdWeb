import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, doc, setDoc, CollectionReference } from '@angular/fire/firestore';
import { Auth, authState } from '@angular/fire/auth';
import { ItalokFS } from '../../models/ItalokFS';
import { Italok } from '../../models/Italok';
import { Custom } from '../../models/Custom';
import { Observable, of, switchMap } from 'rxjs';
import { User } from 'firebase/auth';
import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ItallapService {

  constructor(private firestore: Firestore, private auth: Auth) {}

  create(ital: Italok) {
    const italokRef = collection(this.firestore, 'Italok') as CollectionReference<Italok>;
    return addDoc(italokRef, ital);
  }

  addToCart(ital: Italok): Observable<any> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null);
        }
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null);
        }
        return this.addToCartFirestore(userEmail, ital);
      })
    );
  }

  private addToCartFirestore(userEmail: string, ital: Italok): Observable<any> {
    return new Observable<any>(observer => {
      const italID = this.generateId();
      const cartDocRef = doc(this.firestore, `carts/${userEmail}/cart/${italID}`);

      setDoc(cartDocRef, { ...ital, italID })
        .then(() => {
          console.log('Ital hozzáadva a kosárhoz!', italID);
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt az ital hozzáadásakor:', error);
          observer.next(null);
          observer.complete();
        });
    });
  }

  addToCartCustom(custom: Custom): Observable<any> {
    return authState(this.auth).pipe(
      switchMap(user => {
        if (!user) {
          console.log('Felhasználó nincs bejelentkezve!');
          return of(null);
        }
        const userEmail = user.email;
        if (!userEmail) {
          console.error('Felhasználó e-mail címe nincs megadva!');
          return of(null);
        }
        return this.addToCartFirestoreCustom(userEmail, custom);
      })
    );
  }

  private addToCartFirestoreCustom(userEmail: string, ital: Custom): Observable<any> {
    return new Observable<any>(observer => {
      const italID = this.generateId();
      const cartDocRef = doc(this.firestore, `carts/${userEmail}/cart/${italID}`);

      setDoc(cartDocRef, { ...ital, italID })
        .then(() => {
          console.log('Custom ital hozzáadva a kosárhoz!', italID);
          observer.complete();
        })
        .catch(error => {
          console.error('Hiba történt az custom ital hozzáadása közben:', error);
          observer.next(null);
          observer.complete();
        });
    });
  }

  addItalToFirestore(ital: ItalokFS): Promise<any> {
    const italokRef = collection(this.firestore, 'italok') as CollectionReference<ItalokFS>;
    return addDoc(italokRef, ital);
  }

  private generateId(): string {
    // Új dokumentum ID generálása
    return doc(collection(this.firestore, '_')).id;
  }
}
