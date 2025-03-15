import { LitElement, html } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("page-not-found")
export class PageNotFound extends LitElement {
  override render() {
    return html`
      <div>
        <h1>404 Not Found</h1>
        <a href="/">Geri Dön</a>
      </div>
    `;
  }
}
