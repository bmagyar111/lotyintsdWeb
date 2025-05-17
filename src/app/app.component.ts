import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { User } from 'firebase/auth';

@Component({
  standalone: false,
  selector: 'app-root',
  templateUrl: "app.component.html",
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'lotyintsd';
  page='';
  userActive?: User | true;


  @Input() currentPage: string = '';
  @Input() loggedInUser?: User | true;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  close(logout?: boolean) {
    this.onCloseSidenav.emit(true);
    if (logout === true) {
      this.onLogout.emit(logout);
    }
  }


  constructor(private router: Router, private auth: AuthService){
  }

  ngOnInit(){
    this.auth.isUserLoggedIn().subscribe(user => {
      this.userActive = true;
      localStorage.setItem('user',JSON.stringify(this.userActive));
    }, error => {
      console.error(error);
      localStorage.setItem('user',JSON.stringify('null'));
    });
  }

  logout(_?: boolean){
    this.auth.logout().then(() =>{
      this.router.navigateByUrl('/login');
    }).catch(error =>{
      console.log(error);
    });
  }



  onToggleSidenav(sidenav: MatSidenav) {
    sidenav.toggle();
  }

  changePage(selectedPage: string) {
    this.router.navigateByUrl(selectedPage);
  }

  onClose(event: any, sidenav: MatSidenav) {
    if (event === true) {
      sidenav.close();
    }
  }

}

