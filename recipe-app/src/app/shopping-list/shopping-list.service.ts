import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient("Tomato", 10),
    new Ingredient("Carrot", 3),
    new Ingredient("Potato", 5),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    var i = 0;
    while (i < this.ingredients.length) {
        if (this.ingredients[i].name == ingredient.name)
            break;
        i++;
    }

    if (i == this.ingredients.length)
        this.ingredients.push(ingredient);
    else {
        this.ingredients[i].amount += parseInt(ingredient.amount.toString());
    }

    this.ingredientsChanged.emit(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addIngredient(ingredient);
    }
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
