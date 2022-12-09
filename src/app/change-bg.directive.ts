import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appChangeBg]'
})
export class ChangeBgDirective {

  @Input()
  isCorrect: any = false;

  constructor(private el: ElementRef, private render: Renderer2) { }

  @HostListener('click')
  answer() {
    let backgroundcolor: string = 'green';

    if (!this.isCorrect) {
      backgroundcolor = 'red';

    }
    this.render.setStyle(
      this.el.nativeElement, 'background', backgroundcolor);
    this.render.setStyle(
      this.el.nativeElement, 'color', '#fff');
    this.render.setStyle(
      this.el.nativeElement, 'border', '2px solid grey');
  }
}
