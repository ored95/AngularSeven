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