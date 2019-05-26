import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService) { }

    dbURL: string = 'https://ng-recipe-book-cf1f9.firebaseio.com/recipes.json';

    /** PUT: update the recipes on the server. Returns the updated recipes upon success. */
    storeRecipes() : Observable<Recipe> {
        return this.http.put<Recipe>(this.dbURL, this.recipeService.getRecipes());
    }

    /** GET: Fetch the recipes on the server. Returns the sync recipes upon success. */
    getRecipes() {
        this.http.get<Recipe[]>(this.dbURL)
            .subscribe(
                (response) => {
                    this.recipeService.setRecipes(response);
                }
            );
    }
}