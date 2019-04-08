import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styles: [`
        .online {
            color: white
        }
    `]
})
export class ServerComponent {
    serverID: number = 10;
    serverStatus: string = 'offline';

    constructor(){
        this.serverStatus = (Math.random() >= 0.5)? "online" : "offline";
    }

    getServerStatus(){
        return this.serverStatus;
    }

    getBackgroundColor(){
        return (this.serverStatus == "online")? "green": "gray";
    }

    ngOnInit() {

    }

    @Output() serverCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    @Output('bpCreated') blueprintCreated = new EventEmitter<{serverName: string, serverContent: string}>();
    newServerName = ''
    newServerContent = ''

    onServerAdded(addedServer: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: addedServer.value,
            serverContent: this.newServerContent
        });
    }

    onBlueprintAdded() {
        this.blueprintCreated.emit({
            serverName: this.newServerName,
            serverContent: this.newServerContent
        });
    }
}