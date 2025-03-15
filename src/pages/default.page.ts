import { LitElement, html, css, unsafeCSS } from 'lit';
import { state } from 'lit/decorators.js';
import { Router } from '@vaadin/router';

import common from '@/assets/styles/_common.scss?inline';
import { pinia } from '@/utils/store-create.util';
import { useCounterStore } from '@/stores/counter.store';

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

  @state() private count = 0;

  private counterStore = useCounterStore(pinia);
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = this.counterStore.$subscribe(() => {
      this.count = this.counterStore.count;
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  render() {
    return html`<div class="flex flex-column grow bg-secondary">
      <srknc-header></srknc-header>
      <div class="flex flex-col grow p-12">
        <p>Count: ${this.count}</p>
        <button @click=${() => this.counterStore.increment()}>Increment</button>
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
