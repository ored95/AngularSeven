import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',      // type #1: typescript optimal
  //selector: '[app-servers]',  // type #2: name for tag
  //selector:'.app-servers',    // type #3: name for class
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created!";
  serverName = "TestServer";

  constructor() { 
    setTimeout(() => {
      this.allowNewServer = true;   
    }, (2000));
  }

  ngOnInit() {
  }

  onClickServerCreation(){
    this.serverCreationStatus = "Server " + this.serverName + " was created successfully!";
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
