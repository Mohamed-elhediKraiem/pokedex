import {Directive, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[pokemonBorderCard]'
})
export class BorderCardDirective {
  initialColor = '#f5f5f5';
  defaultColor= '#009688';
  defaultHeight =180;
  constructor(private el : ElementRef) {
    this.setHeight(this.defaultHeight);
    this.setBorder(this.initialColor)
  }
  @Input('pokemonBorderCard') borderColor: string;
  setHeight(height: number){
    this.el.nativeElement.style.height = `${height}px`;
  }
  setBorder(color: string) {
    this.el.nativeElement.style.border = `solid 4px ${color}`;
  }
  @HostListener('mouseenter') onMouseEnter(){
    this.setBorder(this.borderColor || this.defaultColor);
  }
  @HostListener('mouseleave') onMouseLeave(){
    this.setBorder('#f5f5f5');
  }

}
