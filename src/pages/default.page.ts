import { LitElement, html, css, unsafeCSS } from 'lit';
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

  private counterStore = useCounterStore(pinia);
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = this.counterStore.$subscribe(() => {
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
      <div class="flex flex-column items-start grow p-12">
        <p>Count: ${this.counterStore.count}</p>
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
