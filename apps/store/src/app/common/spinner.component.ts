import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ngrx-nx-spinner',
  template: `<mat-spinner></mat-spinner>`,
  styles: [
    `
      :host {
        position: fixed;
        margin: 40vh 45vw;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {}
