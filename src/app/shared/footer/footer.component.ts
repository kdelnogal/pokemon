import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="shadow-sm">
      Prueba Front - Karol Del Nogal
  </div>
  `,
  styles: [`
    div {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      text-align: center;
      padding: .5rem;
      background-color: #fff;
      font-size: 12px;
      font-weight: bold;
    }
  `]
})
export class FooterComponent {

}
