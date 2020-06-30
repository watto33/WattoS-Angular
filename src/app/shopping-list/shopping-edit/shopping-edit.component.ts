import { Component, OnInit, ViewChild, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [ './shopping-edit.component.css' ]
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slService: ShoppingListService) { }

  ngOnInit () {
    this.subscription = this.slService.onStartedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }
  onSubmit (form: NgForm) {
    const value = form.value;
    if (this.editMode) {
      const editedIngredient = new Ingredient(value.name, value.amount);
      this.slService.updateIngredients(this.editedItemIndex, editedIngredient);
    }
    else {
      const newIngredient = new Ingredient(value.name, value.amount);
      this.slService.addIngredients(newIngredient)
    }
    this.editMode = false;
    form.reset();
  }
  ngOnDestroy () {
    this.subscription.unsubscribe();
  }

  onClear () {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete () {
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }
}
