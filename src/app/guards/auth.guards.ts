import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

const autGuards = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isLogin()) {
        return true;
    }

    return router.navigate(['/login']);
}