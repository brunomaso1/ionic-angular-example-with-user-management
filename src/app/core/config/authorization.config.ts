import { AuthConfig } from "angular-oauth2-oidc";
import { environment } from "src/environments/environment";
import { AuthorizationService } from "../services/authorization.service";

export const authorizationConfig: AuthConfig = {
    // Url of the Identity Provider
    issuer: environment.authorizationProvider.issuer,

    // URL of the SPA to redirect the user to after login
    redirectUri: environment.authorizationProvider.redirectUri,

    // The SPA's id.
    // The SPA is registerd with this id at the auth-serverß
    clientId: environment.authorizationProvider.clientId,

    responseType: environment.authorizationProvider.responseType,
    // set the scope for the permissions the client should request
    // The first three are defined by OIDC.
    scope: environment.authorizationProvider.scope,
    // Remove the requirement of using Https to simplify the demo
    // THIS SHOULD NOT BE USED IN PRODUCTION
    // USE A CERTIFICATE FOR YOUR IDP
    // IN PRODUCTION
    requireHttps: environment.authorizationProvider.requireHttps,
    // at_hash is not present in JWT token
    showDebugInformation: environment.authorizationProvider.showDebugInformation,
    disableAtHashCheck: environment.authorizationProvider.disableAtHashCheck,
}

export class OAuthModuleConfig {
    resourceServer: OAuthResourceServerConfig = {
        allowedUrls: environment.authorizationProvider.allowedUrls,
        sendAccessToken: environment.authorizationProvider.sendAccessToken,
    };
};

export class OAuthAppinitializer {
    public static initApp(authConfigService: AuthorizationService): () => Promise<void> {
        return () => authConfigService.initAuth();
    }
}

class OAuthResourceServerConfig {
    allowedUrls?: Array<string>;
    sendAccessToken = true;
    customUrlValidation?: (url: string) => boolean;
}