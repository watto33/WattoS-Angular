import { Subject } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {

  onIngredientsAdded = new Subject<Ingredient[]>();
  onStartedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients () {
    return this.ingredients.slice();
  }
  getIngredient (index: number) {
    return this.ingredients[ index ];
  }
  addIngredients (ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientsAdded.next(this.ingredients.slice());
  }

  addIngredietsFromRecipe (ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.onIngredientsAdded.next(this.ingredients.slice());
  }

  updateIngredients (index: number, ingredient: Ingredient) {
    this.ingredients[ index ] = ingredient;
    this.onIngredientsAdded.next(this.ingredients.slice());
  }

  deleteIngredient (index: number) {
    this.ingredients.splice(index, 1);
    this.onIngredientsAdded.next(this.ingredients.slice());
  }
}
