import { RouterLocation } from '@vaadin/router';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('employee-detail')
export class EmployeeDetail extends LitElement {
  static route = {
    path: '/employee/:id',
    // children: [
    //   {
    //     path: 'detail',
    //     component: 'employee-detail',
    //   },
    // ],
  };

  @property({ type: String })
  employeeId = '';
  location!: RouterLocation;

  override connectedCallback() {
    super.connectedCallback();
    this.employeeId = this.location.params.id as string;
  }

  render() {
    return html`<div>
      <h1>Employee Detail</h1>
      <p>deneme +${this.employeeId}+</p>
    </div>`;
  }
}
