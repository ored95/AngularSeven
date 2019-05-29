import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipeService,
                private authService: AuthService) {
    }

    dbURL: string = 'https://ng-recipe-book-cf1f9.firebaseio.com/recipes.json';

    /** PUT: update the recipes on the server. Returns the updated recipes upon success. */
    storeRecipes() {
        // const headers = new HttpHeaders().set('Authorization', 'Bearer afdklasflaldf');
    
        // return this.httpClient.put('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //   observe: 'body',
        //   params: new HttpParams().set('auth', token)
        //   // headers: headers
        // });
        const req = new HttpRequest('PUT', this.dbURL, this.recipeService.getRecipes(), {reportProgress: true});
        return this.httpClient.request(req);
    }

    /** GET: Fetch the recipes on the server. Returns the sync recipes upon success. */
    getRecipes() {
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-3adbb.firebaseio.com/recipes.json?auth=' + token)
        this.httpClient.get<Recipe[]>(this.dbURL, {
            observe: 'body',
            responseType: 'json'
        })
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}