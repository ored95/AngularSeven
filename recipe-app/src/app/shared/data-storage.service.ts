import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) { }

    dbURL: string = 'https://ng-recipe-book-cf1f9.firebaseio.com/recipes.json?auth=';

    /** PUT: update the recipes on the server. Returns the updated recipes upon success. */
    storeRecipes() : Observable<Recipe> {
        const token = this.authService.getIdToken();
        return this.http.put<Recipe>(this.dbURL + token, this.recipeService.getRecipes());
    }

    /** GET: Fetch the recipes on the server. Returns the sync recipes upon success. */
    getRecipes() {
        const token = this.authService.getIdToken();

        this.http.get<Recipe[]>(this.dbURL + token)
            .subscribe(
                (response) => {
                    this.recipeService.setRecipes(response);
                }
            );
    }
}