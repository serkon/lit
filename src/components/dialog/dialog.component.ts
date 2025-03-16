import { LitElement, css, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import common from './dialog.component.scss?inline';

@customElement('srknc-dialog')
export class SrkncDialog extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(common)}
      :host {
        --grow: 1;
        --direction: column;
        --padding: 16px;
      }
    `,
    css``,
  ];

  @property({ type: String }) title = '';
  @property({ type: Boolean }) visible = false;

  private _event = new CustomEvent('close', {
    detail: {
      visible: false,
    },
  });

  private close() {
    this.visible = false;
    this.dispatchEvent(this._event);
  }

  render() {
    return html`
      <div class="flex flex-column grow w-100 h-100 dialog-root items-center justify-content-center ${this.visible ? 'visible' : 'hidden'}">
        <div class="flex flex-column position-absolute content p-6 gap-4">
          <div class="header text-primary flex justify-content-between">
            <h3>${this.title}</h3>
            <button class="ghost p-1 shadow-0" @click=${this.close}><img src="/close.svg" class="w-6" alt="Close" /></button>
          </div>
          <div class="text-sm text-gray"><slot></slot></div>
          <slot name="dialog-footer"></slot>
        </div>
        <div class="position-fixed overlay w-100 h-100" @click=${this.close}></div>
      </div>
    `;
  }
}
