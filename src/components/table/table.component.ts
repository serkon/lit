import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

// SCSS stillerini içe aktar
import styles from './table.component.scss?inline';
import { Employee } from '@/stores/employee.store';
import { Router } from '@vaadin/router';

@customElement('srknc-table')
export class SrkncTable extends LitElement {
  @property({ type: Array }) data: Employee[] = [];
  @property({ type: Boolean }) idVisible = false;
  @property({ type: Object }) store: Record<string, any> = {};
  @property({ type: String }) storeKey = '';

  private _unsubscribe: (() => void) | null = null;
  @state() private _selected: Record<string, any> | null = null;
  @state() private _dialogTitle = 'Are you sure ?';

  private _delete(id: number) {
    this.store.delete(id);
  }

  private _select(id: number) {
    this._selected = this.store.get(id) || null;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._unsubscribe = this.store.$subscribe(() => {
      this.requestUpdate();
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribe?.();
  }

  private deleteHTML() {
    return html`<span>Selected Employee record of ${this._selected?.firstName} ${this._selected?.lastName} will be deleted</span>
      <div slot="dialog-footer">
        <button @click=${() => (this._delete(this._selected?.id), (this._selected = null))}>Proceed</button>
        <button class="outline" @click=${() => (this._selected = null)}>Cancel</button>
      </div>`;
  }

  private go(id: number) {
    Router.go(`/employee/${id}`);
  }

  render() {
    return html`
      <div class="flex flex-column items-start overflow-auto">
        ${Boolean(this._selected)
          ? html` <srknc-dialog .title="${this._dialogTitle}" .visible="${Boolean(this._selected)}" @close="${() => (this._selected = null)}"> ${this.deleteHTML()} </srknc-dialog>`
          : null}
        <table class="text-sm">
          <thead>
            <tr>
              ${this.store[this.storeKey][0]
                ? Object.keys(this.store[this.storeKey][0]).map((item: string) => (!Boolean(this.idVisible) && item === 'id' ? null : html`<th class="text-primary">${item}</th>`))
                : null}
              <th class="text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            ${this.store[this.storeKey]
              .slice()
              .reverse()
              .slice(0, 9)
              .map(
                (item: Employee) => html`
                  <tr class="text-gray">
                    ${(Object.keys(this.store[this.storeKey][0]) as (keyof Employee)[]).map((val: keyof Employee) => (!Boolean(this.idVisible) && val === 'id' ? null : html`<td>${item[val]}</td>`))}
                    <td>
                      <button class="w-8 ghost p-2 mr-2" @click=${() => this.go(item.id)}><img class="w-5" src="/edit.svg" alt="Edit" /></button>
                      <button class="w-8 ghost p-2" @click=${() => this._select(item.id)}><img class="w-5" src="/delete.svg" alt="Delete" /></button>
                    </td>
                  </tr>
                `,
              )}
          </tbody>
        </table>
      </div>
    `;
  }

  static styles = css`
    ${unsafeCSS(styles)}
  `;
}
