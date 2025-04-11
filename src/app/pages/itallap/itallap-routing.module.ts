import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItallapComponent } from './itallap.component';

const routes: Routes = [{ path: '', component: ItallapComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItallapRoutingModule { }
