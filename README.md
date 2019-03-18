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