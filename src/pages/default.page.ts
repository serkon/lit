import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';
import common from '@/assets/styles/_common.scss?inline';

class PageDefault extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(common)}
      :host {
        --grow: 1;
        --direction: column;
      }
    `,
    css``,
  ];
  render() {
    return html`<div class="flex flex-column grow bg-secondary">
      <srknc-header></srknc-header>
      <div class="flex flex-col grow p-12">
        <slot></slot>
      </div>

      <srknc-table></srknc-table>

      <button @click=${() => this.redirect('/contact')}>Contact</button>
      <div id="products-outlet">srknc</div>
      <div></div>
    </div>`;
  }

  public redirect(path: string) {
    Router.go(path);
  }
}
customElements.define('default-page', PageDefault);
