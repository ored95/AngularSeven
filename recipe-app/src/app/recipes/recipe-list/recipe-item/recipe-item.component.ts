import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  constructor(private serviceRecipe: RecipeService) { }

  ngOnInit() { }

  @Input() recipe: Recipe;
  
  onSelected() {
    this.serviceRecipe.recipeWasSelected.emit(this.recipe);
  }
}
