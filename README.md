# AngularSeven
The Complete Guide to Angular 7

## Part 1. First command to test app
```cmd
    ng serve
```
This command helps testing easily our app locally while developing.
See more about the Angular CLI [here](https://cli.angular.io/).

Import "**Typescript**" form feature to store the input in into the "name" property by using this syntax below:
```html
    [(ngModel)]="name"
```

Install locally bootstrap and make clean start project:
```cmd
    npm install --save bootstrap@3
```
## Part 2. Components
Generate new components:
```cmd
    ng generate component servers
```
After a bit changes, we get these html tag codes like that
```html
<body>
    <app-root>
        ...
        <app-servers>
            <app-server></app-server>
            <app-server></app-server>
        </app-servers>
    </app-root>
    ...
</body
```
Two ways to use data binding:
1. Using *$event*:
```html
    <input
        type="text"
        class="form-control"
        (input)="onUpdateServerName($event)">
```

- And the main script:
```Typescript
    onUpdateServerName(event: Event){
        this.serverName = (<HTMLInputElement>event.target).value;
    }
```
2. Using *ngModel*:
- It should be the better method by it's simplicity. First, we need to add the *FormsModule*:
```Typescript
    //app.module.ts
    import { FormsModule } from '@angular/forms'
```
- Then, easy stuff is remaining like that:
```html
    <input
        type="text"
        class="form-control"
        [(ngModel)]="serverName">
```
If-else statements:
```html
    <p *ngIf="serverCreatedFlag; else noServer">Server {{ serverName }} was created successfully!</p>
    <ng-template #noServer>
        <p>No server was created.</p>
    </ng-template>
```

How to dinamically change style of element:
1. Using *ngStyle*:

    This method allows us to dynamically assign a style itself.
```html
    <p [ngStyle]="{backgroundColor: getBackgroundColor()}"></p>
```
2. Using *ngClass*:
    
    This method allows us to dynamically add or remove CSS-classes.
```html
    <p 
        ...
        [ngClass]="{online: getServerStatus() === 'online'}"
    ></p>
```
3. Using *ngFor*:
    
    It would be nicer to have an array of service which adds them dynamically like that:
```html
    <app-server *ngFor="let server of servers"></app-server>
```

## Part 3. The Basics
Recommend using Bootstrap 3+
* Why Bootstrap 3? See this [issue](https://github.com/angular/angular-cli/issues/3411). 
* Take a look at styling Angular 7 using Bootstrap 4+ [here](https://codeburst.io/getting-started-with-angular-7-and-bootstrap-4-styling-6011b206080)

### Header
+ See more how navigation work [here](https://getbootstrap.com/docs/3.4/examples/navbar-fixed-top/).

### Body
1. Adding styles to gird our body after header
```css
    body {
        min-height: 2000px;
        padding-top: 70px;
    }
    
    .btn-space {
        margin-right: 5px
    }
```
2. Adding Models

    * Recipe (name, description, imagePath)
    * Ingredient (name, amount)

## Part 3. Debugging
0. Using [Augury](https://augury.rangle.io/) to dive into our Angular Apps.

1. Assigning an Alias to custom properties:
```ts
    @Input('srvElement') element : {type: string, name: string, content: string};
```
2. Binding to custom events
```html
    <app-server 
        (serverCreated)="onServerAdded($event)"
        (blueprintCreated)="onBlueprintAdded($event)">
    </app-server>
```
* Now, let's see how to emit an object in Angular

```ts
    import { EventEmitter, Output } from '@angular/core';

    @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    
    newServerName = ''
    newServerContent = ''

    onServerAdded() {
        this.serverCreated.emit({
            serverName: this.newServerName,
            serverContent: this.newServerContent
        });
    }
```
* Here, the method onServerAdded() is also declared in other script file (up/down level)
```ts
    serverElements = [];

    onServerAdded(serverData: {serverName: string, serverContent: string}) {
        this.serverElements.push({
            type: 'server',
            name: serverData.serverName,
            content: serverData.serverContent
        });
    }
```
* How to listen from outside?
```ts
    @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
```
* Using Local References in Templates
```html
    <input
        type="text"
        class="form-control"
        #addedServer>
    <button
        class="btn btn-primary"
        (click)="onServerAdded(addedServer)">Add Server</button>
```
```ts
    onServerAdded(addedServer: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: addedServer.value,
            serverContent: this.newServerContent
        });
    }
```
3. **Lifecycle**
+ **ngOnChanges** - called after a bound input property changes
+ **ngOnInit** - called once the component is initialized
+ **ngDoCheck** - called during every change detection run
+ **ngAfterContentInit** - called after content (ng-content) has been projected into view
+ **ngAfterContentChecked** - called every time the projected content has been checked
+ **ngAfterViewInit** - called after the component's view (and child views) has been initialized
+ **ngAfterViewChecked** - called every time (and child views) have been checked
+ **ngOnDestroy** - Called once the component is about to be destroyed

## Part 4. Services Dependency Injection
1. Setting up the Services
```ts
    // recipe.service.ts
    import { Recipe } from './recipe.model';

    export class RecipeService {
        
        private recipes: Recipe[] = [<recipes>]

        getRecipes() {
            return this.recipes.slice();
        }
    }
```
2. Using a Service for Cross-Component Communication
```ts
    export class RecipeListComponent implements OnInit {
        recipes: Recipe[];

        constructor(private serviceRecipe: RecipeService) { }

        ngOnInit() {
            this.recipes = this.serviceRecipe.getRecipes();
        }
    }
```
3. Using Services for Push Notifications
```ts
    //shopping-list.component.ts
    ingredients: Ingredient[];

    constructor(private serviceSL: ShoppingListService) { }

    ngOnInit() {
        this.ingredients = this.serviceSL.getIngredients();
        this.serviceSL.ingredientChanged.subscribe(
            (ingredients: Ingredient[]) => {
                this.ingredients = ingredients; 
            }
        );
    }
```
4. Passing Ingredients from Recipes to the Shopping List (via a Service)
```ts
    //recipe.service.ts
    import { Recipe } from './recipe.model';
    import { EventEmitter, Injectable } from '@angular/core';
    import { Ingredient } from '../shared/ingredient.model';
    import { ShoppingListService } from '../shopping-list/shopping-list.service';

    @Injectable()
    export class RecipeService {
        // ...
        constructor(private serviceSL: ShoppingListService) {}
        
        getRecipes() {
            return this.recipes.slice();
        }

        addIngredientsToShoppingList(ingredients: Ingredient[]) {
            this.serviceSL.addIngredients(ingredients);
        }
    }
```
## Part 5. Forms, Controls and Validations

Note: See all changes in two previous commits!

## Part 6. Http requests
1. Introduction to [Firebase](https://firebase.google.com/): Store and sync data in real time
2. [Tutorial](https://www.techiediaries.com/angular-by-example-httpclient-get/): Angular 7|6 By Example: HTTP GET Requests with HttpClient (Services, async pipe and Observables)

3. Part of project

* Setting up HttpClient:
```ts
    //app.module.ts
    import { HttpClientModule } from '@angular/common/http';

    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
```
* Sending PUT Requests to Save Data:
```ts
    //data-storage.service.ts
    import { Observable } from 'rxjs';

    /** PUT: update the recipes on the server. Returns the updated recipes upon success. */
    storeRecipes() : Observable<Recipe> {
        return this.http.put<Recipe>(this.dbURL, this.recipeService.getRecipes());
    }
```

* Fetching back our data from [Firebase](https://firebase.google.com/):
```ts
    //data-storage.service.ts
    /** GET: Fetch the recipes on the server. Returns the sync recipes upon success. */
    getRecipes() {
        this.http.get<Recipe[]>(this.dbURL)
            .subscribe(
                (response) => {
                    this.recipeService.setRecipes(response);
                }
            );
    }
```

## Part 7. Authencation
1. Install firebase
```bash
    npm cache clean --force
    npm install --save firebase
```

2. Setting up signin and signup routes
```ts
    //app-routing.module.ts
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
```

3. Authencation

    Let's see an example of sign in authencation

```ts
    signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(
            response => {
            this.router.navigate(['/']);
            firebase.auth().currentUser.getIdToken()
                .then(
                (token: string) => this.token = token
                )
            }
        )
        .catch(
            error => console.log(error)
        );
    }
```

4. Authencation to Route protection
```ts
    import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

    @Injectable()
    export class AuthGuard implements CanActivate {

        constructor(private authService: AuthService) {}

        canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
            return this.authService.isAuthenticated();
        }
    }
```

+ Here, user can only be activated when they have their own token:
```ts
    isAuthenticated() {
        return this.token != null;
    }
```

5. Redirection and Wrap up
```go
    // For a test
    Email: test@test.com
    Password: 123123
```

## Part 8. Optimizations
1. Feature shared module
2. Lazy loading
3. Core module
4. Preloading
5. Fix bug of AoT (issue [#9](https://github.com/Oreder/AngularSeven/issues/9))

## Part 9. Deployment