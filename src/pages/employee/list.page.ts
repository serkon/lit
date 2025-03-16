import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import common from '@/assets/styles/_common.scss?inline';
import { useEmplooyeeStore } from '@/stores/employee.store';
import { pinia } from '@/utils/store-create.util';

@customElement('employee-list')
export class EmployeeList extends LitElement {
  static styles = [
    css`
      ${unsafeCSS(common)}
      :host {
        --grow: 1;
        --direction: column;
      }
    `,
    css``,
  ];

  private employeeStore = useEmplooyeeStore(pinia);
  private unsubscribe: (() => void) | null = null;

  static route = {
    path: '/employee',
    // children: [
    //   {
    //     path: 'detail',
    //     component: 'employee-detail',
    //   },
    // ],
  };

  connectedCallback() {
    super.connectedCallback();
    this.unsubscribe = this.employeeStore.$subscribe(() => {
      // this.employees = this.employeeStore.getAllEmployees();
      this.requestUpdate();
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.unsubscribe?.();
  }

  render() {
    return html`<div class="flex flex-column">
      <h1 class="text-primary">Employee List</h1>
      ${this.employeeStore.all().length}
      <button
        class="p-2"
        @click=${() =>
          this.employeeStore.add({
            id: this.employeeStore.id,
            firstName: 'John',
            lastName: 'Doe',
            dateOfEmployment: '2020-01-01',
            dateOfBirth: '1985-03-15',
            phone: '+1 123 456 7890',
            email: 'john.doe@example.com',
            department: 'Engineering',
            position: 'Software Developer',
          })}
      >
        Add Employee
      </button>
      <srknc-table title="Table" .store="${this.employeeStore}" storeKey="employees" .idVisible="${true}">
      </srknc-table>
    </div>`;
  }
}
