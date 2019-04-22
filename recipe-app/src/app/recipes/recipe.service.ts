import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
    recipeWasSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe(
            'First recipe', 
            'This is a simple test', 
            'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
            [
                new Ingredient('Tomato', 2),
                new Ingredient('Potato', 4)
            ]),
        new Recipe(
            'Second recipe', 
            'This is a simple test', 
            'https://c.pxhere.com/photos/8b/0f/food_meat_recipe_power_pork_dishes-604134.jpg!d',
            [
                new Ingredient('Egg', 10)
            ])
    ]

    constructor(private serviceSL: ShoppingListService) {}
    
    getRecipes() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.serviceSL.addIngredients(ingredients);
    }
}