import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[disableControl]'
})
export class DisableControlDirective {

    @HostListener('keydown', ['$event']) handler(event: KeyboardEvent) {
        event.preventDefault();
    }

    constructor(private input: ElementRef) { }

}