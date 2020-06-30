import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
	providedIn: 'root',
})
export class DataStorageService {
	constructor(
		private http: HttpClient,
		private recipeService: RecipeService,
		private authService: AuthService
	) {}

	saveRecipes() {
		const recipes = this.recipeService.getRecipes();
		this.http
			.put('https://wattos333.firebaseio.com/recipes.json', recipes)
			.subscribe((recipes: []) => {
				if (recipes.length >= 0)
					alert(`You have saved ${recipes.length} recipe(s)`);
			});
	}

	fetchRecipes() {
		return this.http
			.get<Recipe[]>('https://wattos333.firebaseio.com/recipes.json')
			.pipe(
				map(recipes => {
					//if (recipes)
					return recipes.map(recipe => {
						return {
							...recipe,
							ingredients: recipe.ingredients ? recipe.ingredients : [],
						};
					});
					//else {
					//return;
					//}
				}),
				tap(recipes => {
					//          if (recipes) {
					this.recipeService.storeRecipe(recipes);
					//        }
					//			else return;
				})
			);
	}
}
