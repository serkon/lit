import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// SCSS stillerini içe aktar
import styles from './table.component.scss?inline';
import { Employee } from '@/stores/employee.store';

@customElement('srknc-table')
export class SrkncTable extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
  `;

  @property({ type: String })
  title = 'Lit Element ile Merhaba Dünya!';

  @property({ type: Number })
  counter = 0;

  @property({ type: Array })
  data: Employee[] = [];

  @property({ type: Boolean })
  idVisible = false;

  private _incrementCounter() {
    this.counter++;
  }

  render() {
    return html`
      <div class="flex flex-column items-start">
        <table class="text-sm" title="${this.title}">
          <thead>
            <tr>
              ${this.data[0] ? Object.keys(this.data[0]).map((item: string) => (!this.idVisible && item === 'id' ? null : html`<th class="text-primary">${item}</th>`)) : null}
            </tr>
          </thead>
          <tbody>
            ${this.data.map(
              (item: Employee) => html`
                <tr class="text-gray">
                  ${(Object.keys(item) as (keyof Employee)[]).map((val: keyof Employee) => (!this.idVisible && val === 'id' ? null : html`<td>${item[val]}</td>`))}
                </tr>
              `,
            )}
          </tbody>
        </table>

        <p>Şu anki sayaç değeri: ${this.counter}</p>
        <button class="card__button" @click=${this._incrementCounter}>Sayacı Artır</button>
      </div>
    `;
  }
}
