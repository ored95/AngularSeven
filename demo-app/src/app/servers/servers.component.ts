import { 
  Component, 
  OnInit, 
  Input, 
  ViewEncapsulation, 
  OnChanges, 
  SimpleChanges, 
  OnDestroy, 
  ViewChild,
  ElementRef,
  AfterViewInit,
  ContentChild
} from '@angular/core';

@Component({
  selector: 'app-servers',      // type #1: typescript optimal
  //selector: '[app-servers]',  // type #2: name for tag
  //selector:'.app-servers',    // type #3: name for class
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  encapsulation: ViewEncapsulation.None //Emulated, 
})

export class ServersComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  allowNewServer = false;
  serverCreationStatus = "No server was created!";
  serverName = "TestServer";
  serverCreatedFlag = false;
  servers = ["Server A", "Server B"];

  @Input('srvElement') element : {type: string, name: string, content: string};
  @Input() name: string;
  @ViewChild('heading') header: ElementRef;
  @ContentChild('contentParagraph') contentParagraph: ElementRef;

  constructor() { 
    console.log('constructor is called!');
    setTimeout(() => {
      this.allowNewServer = true;   
    }, (2000));
  }

  ngOnInit() {
    console.log('ngOnInit is called!');
    console.log('TextContent: ' + this.header.nativeElement.textContent);
    console.log('ContentParagraph: ' + this.contentParagraph.nativeElement.textContent);
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit is called');
    console.log('TextContent: ' + this.header.nativeElement.textContent);
    console.log('ContentParagraph: ' + this.contentParagraph.nativeElement.textContent);
  }

  ngOnDestroy() {
    console.log('ngOnDestroy is called!')
  }

  onClickServerCreation(){
    this.serverCreatedFlag = true;
    this.servers.push(this.serverName);
    this.serverCreationStatus = "Server " + this.serverName + " was created successfully!";
  }

  onUpdateServerName(event: Event){
    this.serverName = (<HTMLInputElement>event.target).value;
  }
}
