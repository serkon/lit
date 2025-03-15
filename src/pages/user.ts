import { LitElement, css, html, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";
import { RouterLocation } from "@vaadin/router";
import common from "@/assets/styles/_common.scss?inline";

@customElement("page-user")
export class PageUser extends LitElement {
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

  @property({ type: String })
  userId = "";

  declare location: RouterLocation;

  override connectedCallback() {
    super.connectedCallback();
    this.userId = this.location.params.id as string;
  }

  override render() {
    return html`
      <div>
        <h1>Kullanıcı ID: ${this.userId}</h1>
        <a href="/">Geri Dön</a>
      </div>
    `;
  }
}
