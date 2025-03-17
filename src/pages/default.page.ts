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
      <div class="flex flex-column items-start grow p-12 page">
        <section class="section">
          <div class="section-header">
            <h1 class="mb-4">Project Summary</h1>
          </div>

          <p>
            This project is a scalable and sustainable web application developed using modern web technologies. With a LitElement-based component architecture, TypeScript's type
            safety, and Pinia state management, it delivers a robust frontend experience. The route-auto-loader.util.ts file under the utils directory provides automatic route
            generation, while the employee-generator.util.ts file enables automatic employee creation. I built a Tailwind-like structure from scratch using Sass.
          </p>

          <p class="mt-3 text-xs">
            A total of 2 days were spent on this project. The provided lit-starter package was not used; instead, it was built from scratch. I chose Pinia over Redux for state
            management and Vite over Rollup as the package bundler.
          </p>

          <h3 class="mt-4">Used Libraries</h3>
          <div class="flex gap-8">
            <ul>
              <li>lit</li>
              <li>pinia</li>
              <li>@vaadin/router</li>
            </ul>
            <ul>
              <li>typescript</li>
              <li>sass</li>
              <li>vite</li>
            </ul>
          </div>

          <h3 class="mt-4">Completed Tasks</h3>
          <ul>
            <li>✅ UI Layout</li>
            <li>✅ Routing</li>
            <li>✅ State Management</li>
            <li>✅ Employee List</li>
            <li>✅ Employee Delete</li>
            <li>✅ Employee Edit</li>
            <li>✅ Employee Create</li>
            <li>✅ Contact Page</li>
            <li>❌ Language Support (additional time needed)</li>
            <li>❌ Testing (additional time needed)</li>
          </ul>
        </section>
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
