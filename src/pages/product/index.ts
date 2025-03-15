import { LitElement, html } from "lit";

class PageProduct extends LitElement {
  render() {
    return html`<div>
      <h1>Product View</h1>
      <b><slot /></b>
    </div>`;
  }
}
customElements.define("page-product", PageProduct);
