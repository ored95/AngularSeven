import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient("Tomato", 10),
    new Ingredient("Carrot", 3),
    new Ingredient("Potato", 5),
  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
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
  }
}
