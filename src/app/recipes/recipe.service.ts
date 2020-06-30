import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
	onRecipesChanged = new Subject<Recipe[]>();

	constructor(private slService: ShoppingListService) {}

	private recipes: Recipe[] = [
		// new Recipe(
		// 	"The Biriyani",
		// 	"Best Dish in the World",
		// 	"https://res.cloudinary.com/swiggy/image/upload/f_auto,q_auto,fl_lossy/yot9zfocxiqxeghusxny",
		// 	[new Ingredient("Rice", 1), new Ingredient("Egg", 10)]
		// ),
		// new Recipe(
		// 	"Noodles",
		// 	"My second fav",
		// 	"https://c.ndtvimg.com/mnng9ei8_chowmein_640x480_25_July_18.jpg",
		// 	[new Ingredient("Noodles", 1), new Ingredient("Sause", 4)]
		// ),
	];
	getRecipe(index: number) {
		return this.recipes[index];
	}
	getRecipes() {
		return this.recipes.slice();
	}
	addIngredients(ingredient: Ingredient[]) {
		this.slService.addIngredietsFromRecipe(ingredient);
	}

	addRecipe(recipe: Recipe) {
		this.recipes.push(recipe);
		this.onRecipesChanged.next(this.recipes.slice());
	}
	updateRecipe(index: number, recipe: Recipe) {
		this.recipes[index] = recipe;
		this.onRecipesChanged.next(this.recipes.slice());
	}

	deleteRecipe(index: number) {
		this.recipes.splice(index, 1);
		this.onRecipesChanged.next(this.recipes.slice());
	}

	storeRecipe(recipes: Recipe[]) {
		this.recipes = recipes;
		this.onRecipesChanged.next(this.recipes.slice());
	}
}
