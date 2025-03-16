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

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  render() {
    return html`<div class="flex flex-column grow bg-alternative">
      <srknc-header></srknc-header>
      <div class="flex flex-column items-start grow p-12">
        <slot></slot>
      </div>
    </div>`;
  }

  public redirect(path: string) {
    Router.go(path);
  }
}
customElements.define('default-page', PageDefault);

/*
  <!--
  <p>Count: ${this.counterStore.count}</p>
  <button @click=${() => this.counterStore.increment()}>Increment</button>
  -->

  <!--<button @click=${() => this.redirect('/contact')}>Contact</button>-->
*/
