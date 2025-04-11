import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItallapRoutingModule } from './itallap-routing.module';
import { ItallapComponent } from './itallap.component';
import {MatCard, MatCardActions, MatCardContent, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {MatDivider} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ItallapComponent
  ],
  imports: [
    CommonModule,
    ItallapRoutingModule,
    MatCard,
    MatCardSubtitle,
    MatCardTitle,
    MatCardContent,
    MatDivider,
    MatCardActions,
    FormsModule
  ]
})
export class ItallapModule { }
