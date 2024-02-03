import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthConfig, OAuthModule } from 'angular-oauth2-oidc';
import { OAuthAppinitializer, OAuthModuleConfig, authorizationConfig } from './config/authorization.config';
import { AuthorizationService } from './services/authorization.service';
import { IonicStorageModule } from '@ionic/storage-angular';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    OAuthModule.forRoot(new OAuthModuleConfig()),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    AuthorizationService,
    { provide: AuthConfig, useValue: authorizationConfig },
    {
      provide: APP_INITIALIZER,
      useFactory: OAuthAppinitializer.initApp,
      deps: [AuthorizationService],
      multi: true
    }
  ]
})
export class CoreModule { }

