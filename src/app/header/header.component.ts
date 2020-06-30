import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
	constructor(
		private dsService: DataStorageService,
		private authService: AuthService
	) {}

	userSub: Subscription;
	isAuthenticated = false;
	isNavbarOpen = false;

	ngOnInit() {
		this.userSub = this.authService.user.subscribe(user => {
			this.isAuthenticated = !!user;
		});
	}

	toggleNavbar() {
		this.isNavbarOpen = !this.isNavbarOpen;
	}

	onSaveData() {
		this.dsService.saveRecipes();
	}

	onLogout() {
		this.authService.logout();
	}

	onFetchData() {
		this.dsService.fetchRecipes().subscribe();
	}

	ngOnDestroy() {
		this.userSub.unsubscribe();
	}
}
