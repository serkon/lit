import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import styles from '@/assets/styles/_common.scss?inline';
import { Employee, useEmplooyeeStore } from '@/stores/employee.store';
import { pinia } from '@/utils/store-create.util';

@customElement('employee-list')
export class EmployeeList extends LitElement {
  static styles = css`
    ${unsafeCSS(styles)}
    :host {
      --grow: 1;
      --direction: column;
      --width: 100%;
    }
  `;

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
      <srknc-table title="Table" counter="10" data="${JSON.stringify(this.employeeStore.employees)}"></srknc-table>
      <button
        @click=${() =>
          this.employeeStore.addEmployee({
            id: this.employeeStore.id,
            firstName: 'John',
            lastName: 'Doe',
            dateOfEmployment: new Date('2020-01-01'),
            dateOfBirth: new Date('1985-03-15'),
            phone: '+1 123 456 7890',
            email: 'john.doe@example.com',
            department: 'Engineering',
            position: 'Software Developer',
          })}
      >
        Add Employee
      </button>
    </div>`;
  }
}
