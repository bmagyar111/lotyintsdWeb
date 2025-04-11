import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import {FormsModule} from "@angular/forms";
import {DeliveryTimePipe} from "../../pipe/delivery-time.pipe";

@NgModule({
  declarations: [
    CartComponent,
    DeliveryTimePipe
  ],
  imports: [
    CommonModule,
    CartRoutingModule,
    MatCardModule,
    MatDividerModule,
    FormsModule
  ]
})
export class CartModule { }
