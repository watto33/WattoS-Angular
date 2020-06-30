import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [ShoppingListComponent, ShoppingEditComponent],
	imports: [
		CommonModule,
		FormsModule,
		RouterModule.forChild([{ path: '', component: ShoppingListComponent }]),
	],
})
export class ShoppingListModule {}
