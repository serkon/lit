import { LitElement, html, css, unsafeCSS } from "lit";
import { customElement, property } from "lit/decorators.js";

// SCSS stillerini içe aktar
import styles from "./table.component.scss?inline";

@customElement("srknc-table")
export class SrkncTable extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String })
  title = "Lit Element ile Merhaba Dünya!";

  @property({ type: Number })
  counter = 0;

  private _incrementCounter() {
    this.counter++;
  }

  render() {
    return html`
      <div class="card">
        <h1 class="card__title">${this.title}</h1>
        <div class="card__content">
          <p>Şu anki sayaç değeri: ${this.counter}</p>
          <button class="card__button" @click=${this._incrementCounter}>
            Sayacı Artır
          </button>
        </div>
      </div>
    `;
  }
}
