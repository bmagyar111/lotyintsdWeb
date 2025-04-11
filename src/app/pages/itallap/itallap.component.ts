import { Component, OnInit } from '@angular/core';
import { ItalokFS } from '../../models/ItalokFS';
import { ItallapService } from "../../shared/services/itallap.service";

@Component({
  standalone: false,
  selector: 'app-itallap',
  templateUrl: './itallap.component.html',
  styleUrls: ['./itallap.component.scss']
})
export class ItallapComponent implements OnInit {

  sortedItalok: ItalokFS[] = [];
  sortDirection: 'asc' | 'desc' = 'asc';
  limit: number = 10;

  private italokToAdd: ItalokFS[] = [
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
    },
  ];

  constructor(private itallapService: ItallapService) {}

  ngOnInit(): void {
    this.loadItalokLocally();
  }

  loadItalokLocally(): void {
    this.sortedItalok = [...this.italokToAdd];
    this.sorting();
  }

  sorting(): void {
    this.sortedItalok.sort((a, b) => {
      return this.sortDirection === 'asc' ? a.ar - b.ar : b.ar - a.ar;
    });
    this.sortedItalok = this.sortedItalok.slice(0, this.limit);
  }
}
