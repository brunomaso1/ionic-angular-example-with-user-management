import { Injectable } from '@angular/core';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators'
import { SessionType } from '../types/session.type';
import { UserInfoToUserModelMapper } from 'src/app/core/mappers/user-info-to-user-model.mapper';
import { RequestPartyToken } from '../types/rpt.type';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  isUserLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private oauthService: OAuthService, private authConfig: AuthConfig, private session: SessionService) { }

  async initAuth(): Promise<void> {
    return new Promise<void>((resolveFn, rejectFn) => {
      (async () => {
        // setup oauthService
        this.oauthService.configure(this.authConfig);

        // subscribe to token events
        this.oauthService.events
          .pipe(filter((e: any) => e.type === 'token_received'))
          .subscribe();

        const isLoggedIn = await this.oauthService.loadDiscoveryDocumentAndLogin();
        if (isLoggedIn) {
          this.oauthService.setupAutomaticSilentRefresh();
          this.session.set(SessionType.USER.toString(),
            JSON.stringify(UserInfoToUserModelMapper.mapToUserType(this.oauthService.getIdentityClaims() as RequestPartyToken)));
          this.isUserLoggedIn$.next(true);
          resolveFn();
        } else {
          this.oauthService.initCodeFlow();
          rejectFn();
        }
      })();
    })
  }

  logout() {
    this.oauthService.logOut();
    this.session.set(SessionType.USER.toString(), null);
    this.isUserLoggedIn$.next(false);
    this.isUserLoggedIn$.complete();
  }

  hasUserCorrectLogin(): boolean {
    return this.oauthService.hasValidAccessToken() &&
      this.oauthService.hasValidIdToken();
  }

  getUserRoles(): string[] {
    console.log(this.oauthService.getIdentityClaims());
    return (this.oauthService.getIdentityClaims() as RequestPartyToken).groups;
  }
}