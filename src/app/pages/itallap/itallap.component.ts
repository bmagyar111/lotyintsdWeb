import { Component, OnInit } from '@angular/core';
import { ItalokFS } from '../../models/ItalokFS';
import { ItallapService } from "../../shared/services/itallap.service";
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from "../../shared/services/auth.service";


@Component({
  standalone: false,
  selector: 'app-itallap',
  templateUrl: './itallap.component.html',
  styleUrls: ['./itallap.component.scss']
})
export class ItallapComponent implements OnInit {
  email: string = '';
  events: Array<ItalokFS> = [];
  italok: any[] = [];
  sortedItalok: ItalokFS[] = [];

  sortDirection: 'asc' | 'desc' = 'asc';
  limit: number = 10;

  constructor(private firestore: AngularFirestore, private auth: AuthService,
    private itallapService: ItallapService) {}

  ngOnInit(): void {
    this.loadItalDataAndAddToFirestore();
    this.loadItalData();
    
  }

  loadItalData(): void {
    //Firestore adatainak betöltése
    this.firestore.collection<ItalokFS>('italok').valueChanges().subscribe((italok: ItalokFS[]) => {
      this.italok = italok;
      this.sorting();
    });
  }

  addToCart(italfs: ItalokFS) {
    this.email = this.auth.getLoggedInUserEmail();
    window.alert('Az ital hozzáadva a kosárhoz!');
    this.itallapService.addToCart(italfs).subscribe(result => {
      if (result) {
        this.addToCartFirestore(this.email, result);
      } else {
        console.error('Hiba történt az ital kosárhoz adásánál.');
      }
    });
  }

  addToCartFirestore(userEmail: string, ital: ItalokFS) {
    this.firestore.collection(`users/${userEmail}/cart`).add(ital)
    .then(() => {
      console.log('Ital sikeresen hozzáadva a kosárhoz!');
    })
    .catch(error => {
      console.error('Hiba történt az italok hozzáadása közben:', error)
    });
  }

  loadItalDataAndAddToFirestore(): void {
    //Üres-e az ital kollekció
    this.firestore.collection('italok').get().toPromise().then(snapshot => {
      if (snapshot?.empty) {
        const italokToAdd: ItalokFS[] = [
          {
            nev: 'Schweppes',
            ar: 570,
            ertekeles: 4,
            imageUrl: "",
            leiras: 'Narancs üdítőital az igazi ínyencek részére.'
          },
          {
            nev: 'Coca-Cola',
            ar: 960,
            ertekeles: 5,
            imageUrl: "",
            leiras: 'Egy igazi, meghatározó ízvilágú üdítőital.'
          },
          {
            nev: 'Heineken',
            ar: 380,
            ertekeles: 4,
            imageUrl: "",
            leiras: 'Erjesztett sör, ami íze miatt el is nyerte a párizsi világkiállítás nagydíját.'
          },
          {
            nev: 'Kőbányai',
            ar: 320,
            ertekeles: 4.5,
            imageUrl: "",
            leiras: 'Meghatározó ízvilágú, hazai sör.'
          },
          {
            nev: 'Tramini édes fehérbor',
            ar: 1000,
            ertekeles: 4,
            imageUrl: "",
            leiras: 'Édes fehérbor, mely bárkinek elnyeri a tetszését.'
          },
          {
            nev: 'Bloody Mary koktél',
            ar: 1800,
            ertekeles: 4.8,
            imageUrl: "",
            leiras: 'Paradicsomlé, vodka, Worcestershire szósz, Tabasco szósz, citromlé, só, bors, zeller só'
          },
          {
            nev: 'California sunrise koktél',
            ar: 1600,
            ertekeles: 4.2,
            imageUrl: "",
            leiras: 'Narancslé, vodka, grenadine szirup, jégkockák, narancs szelet'
          },
          {
            nev: 'Aperol Spritz koktél',
            ar: 1750,
            ertekeles: 4.7,
            imageUrl: "",
            leiras: 'Aperol, prosecco, szódavíz, jégkockák, narancs szelet'
          }
        ];
        italokToAdd.forEach(ital => {
          this.addItalToFirestore(ital);
        });
      } else {
        console.log('Az ital kollekció már létezik a Firestoreban.');
      }
    }).catch(error => {
      console.error('Hiba történt az ital kollekció ellenőrzése közben:', error);
    });
  }

  addItalToFirestore(ital: ItalokFS) {
    this.itallapService.addItalToFirestore(ital)
    .then(() => {
      console.log('Ital sikeresen hozzáadva a Firestorehoz!');
    })
    .catch(error => {
      console.error('Hiba történt az ital hozzáadása közben:', error);
    });
  }

  sorting(): void {
    //Ital lista másolása
    this.sortedItalok = [...this.italok];

    //Rendezés az áruk alapján
    this.sortedItalok.sort((a, b) => {
      if (this.sortDirection === 'asc') {
        return a.ar - b.ar;
      } else {
        return b.ar - a.ar;
      }
    });

    //Limit
    this.sortedItalok = this.sortedItalok.slice(0, this.limit);
  }
}
