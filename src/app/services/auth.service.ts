import { Injectable } from "@angular/core";
import { LoginCredenciales } from "../model/loginModel";
import { CLAVEVALIDA, NOMBRELOCALSTORAGE, RUTVALIDO } from "../Common/data";


@Injectable({
    providedIn: "root",
})
export class AuthService {
    
    login(credenciales: LoginCredenciales): boolean {
        if (credenciales.usuarioRut === RUTVALIDO && credenciales.clave === CLAVEVALIDA) {
            localStorage.setItem(NOMBRELOCALSTORAGE, '')
        return true;
        }
        return false;
    }

    logout(): void {
        // localStorage.removeItem(NOMBRELOCALSTORAGE);
    }

    isLogin(): boolean {
        const existeSesion = localStorage.getItem(NOMBRELOCALSTORAGE);

        return existeSesion ? true : false;
    }
}