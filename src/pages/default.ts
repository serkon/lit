import { LitElement, html, css, unsafeCSS } from "lit";
import { Router } from "@vaadin/router";
import common from "@/assets/styles/_common.scss?inline";

class PageDefault extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(common)}
    `,
    css``,
  ];
  render() {
    return html`<div>
      <h1>Default Page 2</h1>
      <nav>
        <a href="/contact">Contact</a>
        <a href="/user/1">User 1</a>
        <a href="/user/2">User 2</a>
      </nav>

      <button @click=${() => this.redirect("/contact")}>Contact</button>
      <div id="products-outlet">srknc</div>
      <div>
        <srknc-table></srknc-table>
      </div>
    </div>`;
  }

  public redirect(path: string) {
    Router.go(path);
  }
}
customElements.define("page-default", PageDefault);
