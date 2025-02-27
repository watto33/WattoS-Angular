import {
	CanActivate,
	UrlTree,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService, private router: Router) {}
	canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot) {
		return this.authService.user.pipe(
			take(1),
			map(user => {
				const isAuth = !!user;
				if (isAuth) {
					return true;
				}
				return this.router.createUrlTree(['/auth']);
			})
			// tap(isAuth => {
			// 	if (!isAuth) {
			// 		this.router.navigate(['/auth']);
			// 	}
			// })
		);
	}
}
