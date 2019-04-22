import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  constructor(private serviceRecipe: RecipeService) { }

  ngOnInit() {
  }

  @Input() recipe: Recipe;    // in order that may be set from outside

  onAddToShoppingList() {
    this.serviceRecipe.addIngredientsToShoppingList(this.recipe.ingredients);
  }
}
