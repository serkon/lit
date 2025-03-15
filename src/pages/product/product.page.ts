import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('product-page')
export class ProductPage extends LitElement {
  static route = {
    path: '/product',
    children: [
      {
        path: 'list',
        component: 'product-list'
      },
    ]
  };

  render() {
    return html`<div>
      <h1>sad</h1>
      <div><slot /></div>
    </div>`;
  }
}
