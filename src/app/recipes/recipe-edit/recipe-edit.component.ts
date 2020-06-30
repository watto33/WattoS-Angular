import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: [ './recipe-edit.component.css' ]
})
export class RecipeEditComponent implements OnInit {

  id: number;
  allowEdit = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
  ) { }

  ngOnInit (): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params[ 'id' ];
        this.allowEdit = params[ 'id' ] != null;
        this.initForm();
      }
    )
  }

  onSubmit () {
    if (this.allowEdit) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else {
      this.recipeService.addRecipe(this.recipeForm.value);
      // console.log(this.recipeForm.value);

    }
    this.onCancel();
  }

  onCancel () {
    this.router.navigate([ '../' ], { relativeTo: this.route });
  }
  onDeleteIngredient (index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onAddIngredient () {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9]*/)
      ])
    }));
  }
  private initForm () {
    let name = '';
    let imagePath = '';
    let description = '';
    let ingredients = new FormArray([]);

    if (this.allowEdit) {
      const recipe = this.recipeService.getRecipe(this.id);
      name = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe[ 'ingredients' ]) {
        for (let ingredient of recipe.ingredients) {
          ingredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [
              Validators.required,
              Validators.pattern(/^[0-9]*/)
            ])
          }));
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(imagePath, Validators.required),
      'description': new FormControl(description, Validators.required),
      'ingredients': ingredients
    });
  }

  get controls () {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
}
