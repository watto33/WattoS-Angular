import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css' ]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  ingredientsSubscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit () {
    this.ingredients = this.slService.getIngredients();
    this.ingredientsSubscription = this.slService.onIngredientsAdded.subscribe(
      (ingredientsArr: Ingredient[]) =>
        this.ingredients = ingredientsArr
    )
  }

  onEdit (index: number) {
    this.slService.onStartedEditing.next(index);
  }

  ngOnDestroy () {
    this.ingredientsSubscription.unsubscribe();
  }

}
