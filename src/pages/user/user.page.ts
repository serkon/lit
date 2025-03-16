import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import common from '@/assets/styles/_common.scss?inline';

@customElement('user-page')
export class UserPage extends LitElement {
  static route = {
    path: '/user',
    children: [
      {
        path: ':id',
        component: 'user-detail-page',
      },
    ],
  };

  static styles = [
    css`
      ${unsafeCSS(common)}
    `,
    css`
      h1 {
        color: blue;
      }
    `,
  ];

  override render() {
    return html`
      <div>
        <h1>Kullanıcı Main</h1>
        <slot></slot>
        <a href="/">Geri Dön</a>
      </div>
    `;
  }
}
