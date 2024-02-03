import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './core/services/user.service';
import { UserType } from './core/types/user.type';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  isUserLoggedIn$: Observable<boolean> = this.userService.isUserLoggedIn$;
  user: Promise<UserType> = this.userService.getUser();

  constructor(private userService: UserService) { }
}
