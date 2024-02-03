import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';
import { AuthorizationService } from './authorization.service';
import { SessionType } from '../types/session.type';
import { UserType } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isUserLoggedIn$: Observable<boolean> = this.auth.isUserLoggedIn$;

  constructor(private session: SessionService, private auth: AuthorizationService) { }

  async getUser(): Promise<UserType> {
    const user: string = await this.session.get(SessionType.USER.toString())
    return JSON.parse(user) as UserType;
  }

  setUser(user: UserType) {
    this.session.set(SessionType.USER.toString(), JSON.stringify(user));
  }

  logout() {
    this.auth.logout();
  }

  hasUserCorrectLogin(): boolean {
    return this.auth.hasUserCorrectLogin();
  }

  getRoles(): string[] {
    return this.auth.getUserRoles();
  }
}
