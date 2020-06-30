import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

const appRoutes: Routes = [
	{ path: '', redirectTo: '/recipes', pathMatch: 'full' },
	// { path: 'recipes', loadChildren: './recipes/recipe.module#RecipeModule' },
	{
		path: 'recipes',
		loadChildren: () =>
			import('./recipes/recipe.module').then(m => m.RecipeModule),
	},
	{
		path: 'shopping-list',
		loadChildren: () =>
			import('./shopping-list/shopping-list.module').then(
				m => m.ShoppingListModule
			),
	},
	{
		path: 'auth',
		loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
	},
];

@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
