import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoginModule} from "./pages/login/login.module";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from '../environments/environment.development';
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatListModule, MatNavList} from "@angular/material/list";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatSidenavModule } from '@angular/material/sidenav';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    LoginModule,
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatToolbar
  ],
  providers: [
    AngularFirestore,
    provideAnimationsAsync()
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
