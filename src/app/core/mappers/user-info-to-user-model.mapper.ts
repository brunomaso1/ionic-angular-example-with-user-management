
// TODO: Una vez que se defina como se devuelve el usuario
import { RequestPartyToken } from "../types/rpt.type";
import { UserType } from "../types/user.type";

/* Clase que permite realizar cambios al usuario que se trae por defecto del
servicio de autenticación. */
export class UserInfoToUserModelMapper {
    static mapToUserType(userIn: RequestPartyToken): UserType {
        // TODO: Cambiar esta sección.
        // userIn.preferred_username = this.mapToPreferred_username(userIn.preferred_username);
        return userIn as UserType;
    }

    static mapToPreferred_username(valueIn: string): string | undefined {
        return RegExp(/(\d+)/).exec(valueIn)?.[0]
    }
}