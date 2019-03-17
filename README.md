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