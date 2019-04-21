import { Directive, ElementRef, OnInit, Renderer2, HostListener, HostBinding, Input } from "@angular/core";

@Directive({
    selector: '[appBetterHighlight]'
})

export class BetterHighlightDirective implements OnInit{
    @Input() defaultColor: string = 'transparent';
    @Input() highlightColor: string = 'blue';   
    @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

    constructor(private elRef: ElementRef, private render: Renderer2) {

    }

    ngOnInit() {
        this.render.setStyle(this.elRef.nativeElement, 'background-color', 'orange');
    }
    
    @HostListener('mouseover') mouseover(eventData: Event) {
    //    this.render.setStyle(this.elRef.nativeElement, 'background-color', 'blue');
        this.backgroundColor = this.highlightColor;
    }

    @HostListener('mouseleave') mouseleave(eventData: Event) {
    //    this.render.setStyle(this.elRef.nativeElement, 'background-color', 'transparent');
        this.backgroundColor = this.defaultColor;
    }
}