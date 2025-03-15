import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from '@/assets/styles/_common.scss?inline';

@customElement('employee-list')
export class EmployeeList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
    :host {
      --grow: 1;
      --direction: column;
    }
  `;
  static route = {
    path: '/employee',
    // children: [
    //   {
    //     path: 'detail',
    //     component: 'employee-detail',
    //   },
    // ],
  };

  render() {
    return html`<div>
      <h1 class="text-primary">Employee List</h1>
      <div><slot /></div>
    </div>`;
  }
}
