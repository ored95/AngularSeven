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
* Using [Augury](https://augury.rangle.io/) to dive into our Angular Apps.

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