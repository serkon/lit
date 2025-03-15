import { LitElement, html, css, unsafeCSS } from 'lit';
import { Router } from '@vaadin/router';

import common from '@/assets/styles/_common.scss?inline';
import { pinia } from '@/utils/store-create.util';
import { useCounterStore } from '@/stores/counter.store';
import { Employee, useEmplooyeeStore } from '@/stores/employee.store';

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
  private data: Employee[] = useEmplooyeeStore(pinia).getAllEmployees();
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
