import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

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
    // newServerName = ''
    // newServerContent = ''
    @ViewChild('newServerContent') serverContentInput: ElementRef;

    onServerAdded(addedServerName: HTMLInputElement) {
        this.serverCreated.emit({
            serverName: addedServerName.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }

    onBlueprintAdded(addedServerName: HTMLInputElement) {
        this.blueprintCreated.emit({
            serverName: addedServerName.value,
            serverContent: this.serverContentInput.nativeElement.value
        });
    }
}