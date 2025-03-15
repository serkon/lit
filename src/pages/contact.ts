import { LitElement, html } from 'lit';

class ContactPage extends LitElement {
  render() {
    return html`
      <h1>Contact</h1>
      <a href="/">Geri Dön</a>
    `;
  }
}
customElements.define('page-contact', ContactPage);