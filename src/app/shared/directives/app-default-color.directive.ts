import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDefaultColor]'
})
export class AppDefaultColorDirective {

  constructor(private el: ElementRef) {
    el.nativeElement.style.color = '#7386D5'
  }
}
