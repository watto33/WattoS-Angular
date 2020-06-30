import {
	Component,
	ComponentFactoryResolver,
	ViewChild,
	OnDestroy,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
	isLogin = true;
	isLoading = false;
	error: string = null;
	closeSub: Subscription;
	@ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;

	constructor(
		private authService: AuthService,
		private router: Router,
		private componentFactoryResolver: ComponentFactoryResolver
	) {}

	ngOnDestroy() {
		if (this.closeSub) {
			this.closeSub.unsubscribe();
		}
	}

	onSwitchMode() {
		this.isLogin = !this.isLogin;
	}

	onSubmit(form: NgForm) {
		if (!form.valid) return;
		this.isLoading = true;

		const email = form.value.email;
		const password = form.value.password;
		let authObs: Observable<AuthResponseData>;

		if (this.isLogin) {
			authObs = this.authService.login(email, password);
		} else {
			authObs = this.authService.signUp(email, password);
		}
		authObs.subscribe(
			resData => {
				console.log(resData);
				this.isLoading = false;
				this.router.navigate(['/recipes']);
			},
			error => {
				console.log(error);
				this.error = error;
				this.showErrorAlert(error);
				this.isLoading = false;
			}
		);
		form.reset();
	}

	onClose() {
		this.error = null;
	}

	private showErrorAlert(message: string) {
		const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(
			AlertComponent
		);
		const hostViewContainerRef = this.alertHost.viewContainerRef;
		hostViewContainerRef.clear();
		const alertCmpRef = hostViewContainerRef.createComponent(alertCmpFactory);

		alertCmpRef.instance.message = message;
		this.closeSub = alertCmpRef.instance.handleError.subscribe(() => {
			this.closeSub.unsubscribe();
			hostViewContainerRef.clear();
		});
	}
}
